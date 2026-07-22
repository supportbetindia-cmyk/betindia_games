"use client";

// app/admin/(protected)/AdminUserProvider.jsx
// ---------------------------------------------------------------------------
// Runs once around the whole protected admin area. It:
//   1) waits for Firebase to tell us who is signed in (or bounces to /login),
//   2) asks our own /api/admin/users/me endpoint for that person's role + perms,
//   3) shares the result through React context so any admin component can call
//      useAdminUser() to read the role, check permissions, or get a fresh token.
//
// While the Admin SDK key isn't configured yet, it falls back to "legacy" mode:
// any signed-in user is treated as a full superadmin, so the panel keeps working
// exactly like before until you switch on real roles.
// ---------------------------------------------------------------------------

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { Loader2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import { makePerms } from "@/lib/permissions";

// The context value: the loaded user plus a helper to fetch a fresh ID token
// (needed when the Team screen calls the admin API). The JSDoc cast tells
// TypeScript consumers (e.g. AdminShell.tsx) that the value is dynamic, so
// destructuring `user`/`getToken` from the hook type-checks cleanly.
const AdminUserContext = createContext(/** @type {any} */ (null));

// Convenience hook. Throws if used outside the provider so mistakes are obvious.
export function useAdminUser() {
  const ctx = useContext(AdminUserContext);
  if (!ctx) throw new Error("useAdminUser must be used inside <AdminUserProvider>");
  return ctx;
}

export default function AdminUserProvider({ children }) {
  const router = useRouter();
  // status: "loading" | "denied" | "ready"
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  // Return a fresh Firebase ID token for authenticating API calls. Any admin
  // component can grab this to talk to /api/admin/* securely.
  const getToken = useCallback(async () => {
    const current = auth.currentUser;
    if (!current) return null;
    return current.getIdToken();
  }, []);

  useEffect(() => {
    // Fires whenever the sign-in state changes (initial load, login, logout).
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      // Not signed in -> leave the admin area.
      if (!firebaseUser) {
        router.replace("/admin/login");
        return;
      }

      try {
        // Ask our server who this person is and what they may do.
        const token = await firebaseUser.getIdToken();
        const res = await fetch("/api/admin/users/me", {
          headers: { authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const data = await res.json();

        // The Admin SDK isn't set up yet -> legacy full-access mode.
        if (data.configured === false) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || "admin",
            role: "superadmin",
            perms: makePerms(true),
            disabled: false,
            legacy: true, // flag so the UI can hint that roles aren't live yet
          });
          setStatus("ready");
          return;
        }

        // Signed in with Firebase but not granted admin access.
        if (!res.ok || !data.user) {
          setMessage(data.error || "You do not have access to this admin.");
          setStatus("denied");
          return;
        }

        // All good — store the real role + permissions.
        setUser(data.user);
        setStatus("ready");
      } catch {
        setMessage("Could not verify your access. Please try again.");
        setStatus("denied");
      }
    });

    return () => unsub();
  }, [router]);

  // While we resolve auth + role, show a spinner (matches the old layout).
  if (status === "loading") {
    return (
      <div className="grid min-h-screen place-items-center bg-[#050B18] text-slate-500">
        <Loader2 size={22} className="animate-spin" />
      </div>
    );
  }

  // Signed in but not authorized: a clear dead-end with a way out.
  if (status === "denied") {
    return (
      <div className="grid min-h-screen place-items-center bg-[#050B18] px-6 text-center">
        <div className="max-w-sm">
          <h1 className="text-lg font-bold text-white">Access denied</h1>
          <p className="mt-2 text-sm text-slate-400">{message}</p>
          <button
            onClick={() => auth.signOut().then(() => router.replace("/admin/login"))}
            className="mt-5 rounded-lg bg-[#FF6B00] px-4 py-2 text-sm font-semibold text-white hover:bg-[#FF8A00]"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  // Authorized: expose the user + token helper to the whole admin tree.
  return (
    <AdminUserContext.Provider value={{ user, getToken }}>
      {children}
    </AdminUserContext.Provider>
  );
}
