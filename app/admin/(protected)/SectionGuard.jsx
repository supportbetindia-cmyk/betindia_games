"use client";

// app/admin/(protected)/SectionGuard.jsx
// ---------------------------------------------------------------------------
// Wraps the page content. It looks at the current URL, figures out which section
// it belongs to, and blocks the page if the signed-in user lacks that permission.
// This backs up the hidden sidebar link: even if someone types /admin/seo by
// hand, they still get "no access" unless they're allowed. (The API is the final
// gatekeeper; this just keeps the UI honest.)
// ---------------------------------------------------------------------------

import { usePathname } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { useAdminUser } from "./AdminUserProvider";
import { sectionForPath, can, canManageUsers } from "@/lib/permissions";

export default function SectionGuard({ children }) {
  const pathname = usePathname();
  const { user } = useAdminUser();

  // The Team page (/admin/team) is special: superadmin-only, not a normal section.
  if (pathname === "/admin/team" || pathname.startsWith("/admin/team/")) {
    if (canManageUsers(user)) return children;
    return <Denied />;
  }

  // Which permission does this URL require? null = ungated (e.g. the dashboard),
  // which every signed-in admin may view.
  const section = sectionForPath(pathname);
  if (!section) return children;

  // Allowed if the user has that section permission (superadmins always pass).
  if (can(user, section)) return children;

  return <Denied />;
}

function Denied() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-6 text-center">
      <div className="max-w-sm">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-[#FF6B00]">
          <ShieldAlert size={22} />
        </div>
        <h1 className="text-lg font-bold text-white">You don&apos;t have access to this section</h1>
        <p className="mt-2 text-sm text-slate-400">
          Ask a super admin to grant you permission for this area.
        </p>
      </div>
    </div>
  );
}
