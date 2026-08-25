import Image from "next/image";
import Link from "next/link";
import SocialIcon from "@/components/icons/SocialIcon";
import { getSection } from "@/lib/cms";
import { DEFAULT_SOCIALS, type SocialLink } from "@/lib/social-links";

// ─── Types ────────────────────────────────────────────────────────────────────
// Exported so future pages can customise the footer columns.

export type FooterLink = { label: string; href: string };
export type FooterColumn = { heading: string; accent: "#FF6B00" | "#138808"; links: FooterLink[] };

// ─── Data ─────────────────────────────────────────────────────────────────────

const COLUMNS: FooterColumn[] = [
  {
    heading: "Sports",
    accent: "#FF6B00",
    links: [
      { label: "Sports", href: "/sports" },
      { label: "Live Betting", href: "/live" },
      { label: "Cricket", href: "/cricket" },
      { label: "Football", href: "/football" },
      { label: "Tennis", href: "/tennis" },
      { label: "Badminton", href: "/badminton" },
      { label: "Volleyball", href: "/volleyball" },
      { label: "Kabaddi", href: "/kabaddi" },
      { label: "Aviator", href: "/aviator" },
      { label: "Esport", href: "/esports" },
      { label: "AndharBhar", href: "/andar-bahar" },
      { label: "TeenPatti", href: "/teen-patti" },
    ],
  },
  {
    heading: "Casino",
    accent: "#138808",
    links: [
      { label: "Casino Games", href: "/casino" },
      { label: "Live Casino", href: "/live-casino" },
      { label: "Slots", href: "/slots" },
      { label: "Table Games", href: "/table-games" },
    ],
  },
  {
    heading: "Quick Links",
    accent: "#FF6B00",
    links: [
      { label: "Promotions", href: "/promotions" },
      { label: "VIP", href: "/vip" },
      { label: "News", href: "/blog" },
      { label: "Blog", href: "/blog" },
      { label: "Responsible Gaming", href: "/responsible-gaming" },
      { label: "Site Map", href: "https://www.betindia.games/sitemap.xml" },
    ],
  },
  {
    heading: "Legal",
    accent: "#138808",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default async function Footer({ columns = COLUMNS }: { columns?: FooterColumn[]; content?: Record<string, unknown> }) {
  // Social links are managed in Admin → Social Links (Firestore); fall back to
  // the code defaults when nothing has been saved.
  const saved = await getSection("settings", "social");
  const socials: SocialLink[] =
    Array.isArray(saved?.items) && saved.items.length > 0 ? saved.items : DEFAULT_SOCIALS;

  return (
    <footer className="relative bg-[#050B18]">
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FF6B00]/[0.03] via-transparent to-transparent" />

      {/* Top divider with orange centre glow */}
      <div className="relative h-px w-full overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.06]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF6B00]/50 to-transparent" />
      </div>

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-[#FF6B00]/6 blur-3xl"
      />

      {/* ── Main column grid ─────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3
                className="mb-5 text-[11px] font-black uppercase tracking-[0.18em]"
                style={{ color: col.accent }}
              >
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group relative inline-flex text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                      {/* Sliding underline */}
                      <span
                        className="absolute -bottom-px left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                        style={{ backgroundColor: col.accent }}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Thin mid-divider */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Image
              src="/logo/betindialogo.png"
              alt="BetIndia"
              width={148}
              height={44}
              className="h-auto w-auto"
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Play Smart. Win Bigger.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            {socials.map(({ label, href, icon }) => (
              <Link
                key={label}
                href={href || "#"}
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-200 hover:border-[#FF6B00]/40 hover:bg-[#FF6B00]/10 hover:shadow-md hover:shadow-[#FF6B00]/10 hover:scale-105"
              >
                <SocialIcon name={icon} size={20} />
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-600">
            © 2026 BetIndia. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Disclaimer ───────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-white/[0.04]">
        <p className="mx-auto max-w-3xl px-6 py-4 text-center text-[11px] leading-relaxed text-slate-700">
          18+ only. Gambling can be addictive — please play responsibly.
          BetIndia is an entertainment platform. Verify compliance with local
          laws before placing bets.
        </p>
      </div>
    </footer>
  );
}
