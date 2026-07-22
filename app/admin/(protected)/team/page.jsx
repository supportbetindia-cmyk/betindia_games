"use client";

// app/admin/(protected)/team/page.jsx
// ---------------------------------------------------------------------------
// The super-admin "Team & Access" screen. It lists admin users, lets you create
// a new login with a chosen role + section permissions, toggle those permissions
// later, disable/enable, or remove someone. Every action calls the /api/admin/
// users endpoints with the caller's Firebase token — the server re-checks that
// the caller is a superadmin, so this UI is convenience, not the security itself.
// ---------------------------------------------------------------------------

import { useCallback, useEffect, useState } from "react";
import { Loader2, Trash2, UserPlus, ShieldCheck, History } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAdminUser } from "../AdminUserProvider";
import { SECTIONS, makePerms } from "@/lib/permissions";

export default function TeamPage() {
  const { user, getToken } = useAdminUser();

  const [users, setUsers] = useState([]);
  const [audit, setAudit] = useState([]); // recent activity-log entries
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(""); // success/info message (e.g. invite sent)

  // New-user form state.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invite, setInvite] = useState(true); // true = email them a set-password link
  const [role, setRole] = useState("editor");
  const [perms, setPerms] = useState(() => makePerms(false));
  const [creating, setCreating] = useState(false);

  // Small wrapper that attaches the auth token to every admin API call.
  const api = useCallback(
    async (path, options = {}) => {
      const token = await getToken();
      const res = await fetch(path, {
        ...options,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
          ...(options.headers || {}),
        },
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Request failed.");
      return data;
    },
    [getToken]
  );

  // Load the user list once on mount.
  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api("/api/admin/users");
      setUsers(data.users || []);
      // Load the activity log alongside the roster (best-effort — don't fail the
      // whole screen if the audit read has an issue).
      try {
        const auditData = await api("/api/admin/audit");
        setAudit(auditData.entries || []);
      } catch {
        setAudit([]);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    // Load the roster once when the screen opens. (refresh() toggles loading
    // state; that's the intended one-time fetch, so we opt out of the lint rule.)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  // Create a new admin.
  async function handleCreate(e) {
    e.preventDefault();
    if (creating) return;
    setCreating(true);
    setError("");
    setNotice("");
    const targetEmail = email; // keep a copy before we clear the form
    try {
      const result = await api("/api/admin/users", {
        method: "POST",
        body: JSON.stringify({ email, password, role, perms, invite }),
      });

      // In invite mode the server made the account with a throwaway password;
      // now we ask Firebase to email the person a link to set their own.
      if (result.invited) {
        try {
          await sendPasswordResetEmail(auth, targetEmail);
          setNotice(`Invite sent to ${targetEmail} — they'll get an email to set their password.`);
        } catch {
          setNotice(
            `${targetEmail} was created, but the invite email failed to send. They can use "Forgot password" at the login page.`
          );
        }
      } else {
        setNotice(`${targetEmail} created with a temporary password.`);
      }

      // Reset the form and reload the list.
      setEmail("");
      setPassword("");
      setRole("editor");
      setPerms(makePerms(false));
      await refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setCreating(false);
    }
  }

  // Toggle a single permission for an existing editor.
  async function togglePerm(target, key) {
    const nextPerms = { ...target.perms, [key]: !target.perms[key] };
    // Optimistic UI: update locally first, then persist.
    setUsers((list) => list.map((u) => (u.uid === target.uid ? { ...u, perms: nextPerms } : u)));
    try {
      await api(`/api/admin/users/${target.uid}`, {
        method: "PATCH",
        body: JSON.stringify({ perms: nextPerms }),
      });
    } catch (e) {
      setError(e.message);
      refresh(); // roll back to server truth on failure
    }
  }

  // Enable / disable a login.
  async function toggleDisabled(target) {
    try {
      await api(`/api/admin/users/${target.uid}`, {
        method: "PATCH",
        body: JSON.stringify({ disabled: !target.disabled }),
      });
      refresh();
    } catch (e) {
      setError(e.message);
    }
  }

  // Remove a user entirely.
  async function remove(target) {
    if (!confirm(`Remove ${target.email}? This deletes their login.`)) return;
    try {
      await api(`/api/admin/users/${target.uid}`, { method: "DELETE" });
      refresh();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-white">Team &amp; Access</h1>
        <p className="mt-1 text-sm text-slate-400">
          Create logins and choose exactly which sections each person can manage.
        </p>
      </div>

      {user?.legacy && (
        <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-300">
          User management isn&apos;t active yet — add the Firebase Admin
          service-account env vars to enable real roles.
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">
          {error}
        </div>
      )}

      {notice && (
        <div className="mb-6 rounded-xl border border-[#138808]/30 bg-[#138808]/10 px-4 py-3 text-xs text-[#4ade80]">
          {notice}
        </div>
      )}

      {/* Create form */}
      <form onSubmit={handleCreate} className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
          <UserPlus size={16} className="text-[#FF6B00]" /> Add a team member
        </h2>
        <input
          type="email"
          required
          placeholder="email@betindia.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-[#FF6B00]/50"
        />

        {/* How to set their password: email them a link, or set a temp one now. */}
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
          <label className="flex items-center gap-2 text-slate-300">
            <input type="radio" name="pwmode" checked={invite} onChange={() => setInvite(true)} />
            Send invite email (they set their own password)
          </label>
          <label className="flex items-center gap-2 text-slate-300">
            <input type="radio" name="pwmode" checked={!invite} onChange={() => setInvite(false)} />
            Set a temporary password
          </label>
        </div>

        {/* Password field only appears in "temp password" mode. */}
        {!invite && (
          <input
            type="text"
            required
            placeholder="Temporary password (min 6)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-[#FF6B00]/50"
          />
        )}

        {/* Role selector */}
        <div className="mt-4 flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2 text-slate-300">
            <input type="radio" name="role" checked={role === "editor"} onChange={() => setRole("editor")} />
            Editor
          </label>
          <label className="flex items-center gap-2 text-slate-300">
            <input type="radio" name="role" checked={role === "superadmin"} onChange={() => setRole("superadmin")} />
            Super Admin (full access)
          </label>
        </div>

        {/* Per-section permissions (only meaningful for editors) */}
        {role === "editor" && (
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SECTIONS.map((s) => (
              <label
                key={s.key}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300"
              >
                <input
                  type="checkbox"
                  checked={perms[s.key]}
                  onChange={() => setPerms((p) => ({ ...p, [s.key]: !p[s.key] }))}
                />
                {s.label}
              </label>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={creating}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#FF6B00] px-4 py-2 text-sm font-bold text-white hover:bg-[#FF8A00] disabled:opacity-60"
        >
          {creating && <Loader2 size={14} className="animate-spin" />}
          {creating ? "Creating…" : "Create user"}
        </button>
      </form>

      {/* User list */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03]">
        <div className="border-b border-white/[0.07] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Team members
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10 text-slate-500">
            <Loader2 size={18} className="animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-slate-500">No team members yet.</div>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {users.map((u) => {
              const isSuper = u.role === "superadmin";
              return (
                <li key={u.uid} className="px-5 py-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 truncate text-sm font-semibold text-white">
                        {u.email}
                        {isSuper && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#FF6B00]/15 px-2 py-0.5 text-[10px] font-bold text-[#FF6B00]">
                            <ShieldCheck size={11} /> Super Admin
                          </span>
                        )}
                        {u.disabled && (
                          <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-bold text-red-300">
                            Disabled
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Actions — hidden for your own row to avoid self-lockout. */}
                    {u.uid !== user?.uid && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleDisabled(u)}
                          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/5"
                        >
                          {u.disabled ? "Enable" : "Disable"}
                        </button>
                        <button
                          onClick={() => remove(u)}
                          className="grid h-8 w-8 place-items-center rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10"
                          aria-label="Delete user"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Per-section permission toggles (editors only). */}
                  {!isSuper && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SECTIONS.map((s) => (
                        <button
                          key={s.key}
                          onClick={() => togglePerm(u, s.key)}
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                            u.perms[s.key]
                              ? "bg-[#138808]/20 text-[#4ade80]"
                              : "bg-white/[0.04] text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Activity log — the last 50 admin actions, newest first. */}
      <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <History size={13} /> Activity log
        </div>
        {audit.length === 0 ? (
          <div className="px-5 py-6 text-center text-sm text-slate-500">No activity yet.</div>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {audit.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center gap-x-2 gap-y-1 px-5 py-3 text-xs">
                <span className="font-semibold text-slate-300">{a.actorEmail}</span>
                <span className="font-semibold text-[#FF6B00]">{a.action}</span>
                {a.targetEmail && <span className="text-slate-400">{a.targetEmail}</span>}
                <span className="ml-auto text-slate-600">{formatWhen(a.at)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Turn the stored ISO timestamp into something human-readable, e.g.
// "16 Jul 2026, 11:52". Falls back to the raw value if parsing fails.
function formatWhen(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso || "";
  }
}
