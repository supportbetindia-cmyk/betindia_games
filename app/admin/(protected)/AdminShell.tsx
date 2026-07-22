"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  FileText,
  LogOut,
  Shield,
  Menu,
  X,
  Bell,
  ChevronRight,
  Globe,
  Image,
  Newspaper,
  Share2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { useAdminUser } from "./AdminUserProvider";
import { can, canManageUsers } from "@/lib/permissions";

// Each nav item now carries the permission key it needs. `perm: null` means
// "always visible to any signed-in admin" (the dashboard). Items are filtered
// against the current user's permissions before rendering.
const NAV = [
  { label: "Dashboard",    href: "/admin/dashboard", icon: Shield,   perm: null      },
  { label: "Content",      href: "/admin/content",   icon: FileText, perm: "content" },
  { label: "Blog",         href: "/admin/blog",      icon: Newspaper, perm: "blog"   },
  { label: "Blog Posts",   href: "/admin/posts",     icon: FileText, perm: "blog"    },
  { label: "SEO Settings", href: "/admin/seo",       icon: Globe,    perm: "seo"     },
  { label: "Page Images",  href: "/admin/images",    icon: Image,    perm: "images"  },
  { label: "Social Links", href: "/admin/social",    icon: Share2,   perm: "social"  },
] as const;

const ALERTS = [
  { text: "12 withdrawals pending review", accent: "#FF6B00" },
  { text: "3 KYC verification requests", accent: "#3b82f6" },
  { text: "New promo expires in 2 days", accent: "#138808" },
] as const;

// Human-readable role for the sidebar footer.
function roleLabel(user: { role?: string; legacy?: boolean }) {
  if (user?.legacy) return "Super Admin";
  return user?.role === "superadmin" ? "Super Admin" : "Editor";
}

function Sidebar({
  onClose,
  onSignOut,
  signingOut,
}: {
  onClose?: () => void;
  onSignOut: () => void;
  signingOut: boolean;
}) {
  const pathname = usePathname();
  const { user } = useAdminUser();
  const email = user?.email || "admin";
  const initial = email.charAt(0).toUpperCase() || "A";

  // Only show links the user is allowed to open (superadmins pass everything).
  const visibleNav = NAV.filter((item) => item.perm === null || can(user, item.perm));

  return (
    <aside className="flex h-full w-60 flex-col border-r border-white/[0.07] bg-[#030810]">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-white/[0.07] px-5">
        <div className="grid h-8 w-8 place-items-center rounded-lg border border-[#FF6B00]/30 bg-[#FF6B00]/12 text-[#FF6B00]">
          <Shield size={14} strokeWidth={2.2} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-extrabold leading-none text-white">BetIndia</p>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">Admin Panel</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-auto text-slate-500 hover:text-white lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Alerts strip */}
      <div className="border-b border-white/[0.07] px-3 py-3 space-y-1.5">
        {ALERTS.map(({ text, accent }) => (
          <div key={text} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
            <p className="text-[11px] leading-snug text-slate-500">{text}</p>
          </div>
        ))}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
        {visibleNav.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150 ${
                active
                  ? "bg-[#FF6B00]/15 text-[#FF6B00]"
                  : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <Icon size={16} strokeWidth={1.8} className="shrink-0" />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={13} strokeWidth={2.5} className="opacity-60" />}
            </Link>
          );
        })}

        {/* Team & Access — superadmin only. */}
        {canManageUsers(user) && (
          <Link
            href="/admin/team"
            onClick={onClose}
            className={`group mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150 ${
              pathname.startsWith("/admin/team")
                ? "bg-[#FF6B00]/15 text-[#FF6B00]"
                : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
            }`}
          >
            <Users size={16} strokeWidth={1.8} className="shrink-0" />
            <span className="flex-1">Team &amp; Access</span>
          </Link>
        )}
      </nav>

      {/* Bottom */}
      <div className="shrink-0 border-t border-white/[0.07] px-3 py-3 space-y-0.5">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#FF6B00]/15 text-[10px] font-black text-[#FF6B00]">
            {initial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-300">{email}</p>
            <p className="text-[10px] text-slate-600">{roleLabel(user)}</p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          disabled={signingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-300 disabled:opacity-60"
        >
          <LogOut size={15} strokeWidth={1.8} />
          {signingOut ? "Signing out…" : "Sign Out"}
        </button>
      </div>
    </aside>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAdminUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const email = user?.email || "admin";

  const currentPage = NAV.find(
    (n) => pathname === n.href || pathname.startsWith(n.href + "/")
  );

  const getActiveBase = () => {
    if (pathname.startsWith("/admin/content")) return "/admin/content";
    if (pathname.startsWith("/admin/blog")) return "/admin/blog";
    if (pathname.startsWith("/admin/posts")) return "/admin/posts";
    if (pathname.startsWith("/admin/seo")) return "/admin/seo";
    if (pathname.startsWith("/admin/images")) return "/admin/images";
    if (pathname.startsWith("/admin/social")) return "/admin/social";
    if (pathname.startsWith("/admin/team")) return "/admin/team";
    return "";
  };

  const activeBase = getActiveBase();
  const contentTrail = activeBase
    ? pathname.replace(activeBase, "").split("/").filter(Boolean)
    : [];

  const formatTrailLabel = (segment: string) =>
    segment
      .replace(/([A-Z])/g, " $1")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim();

  const initial = email.charAt(0).toUpperCase() || "A";

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await signOut(auth);
    } catch {
      // Ignore — we redirect to login regardless.
    } finally {
      router.replace("/admin/login");
    }
  }

  return (
    <div className="flex min-h-screen bg-[#050B18] text-white">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:shrink-0">
        <Sidebar onSignOut={handleSignOut} signingOut={signingOut} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <Sidebar
            onClose={() => setSidebarOpen(false)}
            onSignOut={handleSignOut}
            signingOut={signingOut}
          />
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b border-white/[0.07] bg-[#030810]/95 px-5 backdrop-blur-xl lg:px-7">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-400 hover:text-white lg:hidden"
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <div className="flex min-w-0 flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-600">Admin</span>
            {currentPage && (
              <>
                <ChevronRight size={13} className="text-slate-700" />
                <Link href={currentPage.href} className="font-semibold text-slate-300 hover:text-white">
                  {currentPage.label}
                </Link>
              </>
            )}
            {contentTrail.map((segment, i) => (
              <span key={`${segment}-${i}`} className="flex items-center gap-2">
                <ChevronRight size={13} className="text-slate-700" />
                {i === contentTrail.length - 1 ? (
                  <span className="truncate font-semibold text-[#FF6B00]">{formatTrailLabel(segment)}</span>
                ) : (
                  <Link
                    href={`${activeBase}/${contentTrail.slice(0, i + 1).join("/")}`}
                    className="truncate font-semibold text-slate-300 hover:text-white"
                  >
                    {formatTrailLabel(segment)}
                  </Link>
                )}
              </span>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Live indicator */}
            <span className="hidden items-center gap-1.5 text-[11px] font-semibold text-slate-500 sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#138808] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#138808]" />
              </span>
              Live
            </span>

            {/* Notifications */}
            <button className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-slate-400 transition hover:border-white/15 hover:text-white">
              <Bell size={16} strokeWidth={1.8} />
              <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-[#FF6B00] text-[9px] font-black text-white">
                3
              </span>
            </button>

            {/* Avatar */}
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-[#FF6B00]/25 bg-[#FF6B00]/10 text-xs font-black text-[#FF6B00]">
              {initial}
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
