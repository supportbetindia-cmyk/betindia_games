import Link from "next/link";
import { Radio, Activity, Wallet, BarChart3, type LucideIcon } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: Radio,
    title: "Live Match Updates",
    description: "Follow goals, cards, substitutions, and key events in real time.",
  },
  {
    icon: Activity,
    title: "Dynamic Odds",
    description: "Odds update instantly based on match action and momentum shifts.",
  },
  {
    icon: Wallet,
    title: "Instant Cashout",
    description: "Take control of your bets and secure winnings at any moment.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Statistics",
    description: "Track possession, shots, corners, and live match momentum.",
  },
];

type LiveMatch = {
  home: string;
  homeEmoji: string;
  away: string;
  awayEmoji: string;
  league: string;
  minute: string;
  score: string;
  odds: [string, string, string];
};

const LIVE_MATCHES: LiveMatch[] = [
  {
    home: "Man City",
    homeEmoji: "🔵",
    away: "Arsenal",
    awayEmoji: "🔴",
    league: "Premier League",
    minute: "63'",
    score: "2 — 1",
    odds: ["1.85", "3.40", "4.10"],
  },
  {
    home: "Real Madrid",
    homeEmoji: "⚪",
    away: "Barcelona",
    awayEmoji: "🔵",
    league: "La Liga",
    minute: "41'",
    score: "0 — 0",
    odds: ["2.05", "3.20", "3.60"],
  },
  {
    home: "Liverpool",
    homeEmoji: "🔴",
    away: "Chelsea",
    awayEmoji: "🔵",
    league: "Premier League",
    minute: "78'",
    score: "3 — 2",
    odds: ["1.95", "3.30", "3.90"],
  },
];

export default function LiveFootballBetting() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#138808]/25 bg-[#138808]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#138808]">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#138808] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#138808]" />
            </span>
            In-Play
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Live Match{" "}
            <span className="bg-gradient-to-r from-[#138808] via-[#22c55e] to-[#138808] bg-clip-text text-transparent">
              Previews
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            Explore live football matches with real-time odds and in-play betting opportunities.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }, i) => {
            const accent = i % 2 === 0 ? "#138808" : "#FF6B00";
            return (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
                style={
                  ({
                    "--hover-accent": accent,
                  } as React.CSSProperties)
                }
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />
                <div
                  className="mb-4 grid place-items-center rounded-xl border transition-all duration-300 group-hover:scale-110"
                  style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    background: `${accent}18`,
                    borderColor: `${accent}35`,
                    color: accent,
                  }}
                >
                  <Icon size={18} strokeWidth={1.7} />
                </div>
                <h3 className="mb-1.5 text-sm font-bold text-white">{title}</h3>
                <p className="text-xs leading-relaxed text-slate-400">{description}</p>
              </div>
            );
          })}
        </div>

        {/* Live match previews */}
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-base font-bold text-white">
            Live{" "}
            <span className="text-[#138808]">Now</span>
          </h3>
          <span className="text-[11px] text-slate-500">Sample data · real matches coming soon</span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {LIVE_MATCHES.map((m) => (
            <div
              key={m.home + m.away}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#138808]/30 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-[#138808]/8"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#138808]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* League + live */}
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{m.league}</span>
                <div className="flex items-center gap-1.5 rounded-full border border-[#138808]/40 bg-[#138808]/12 px-2.5 py-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#138808] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#138808]" />
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-wide text-[#138808]">Live · {m.minute}</span>
                </div>
              </div>

              {/* Teams + score */}
              <div className="mb-4 flex items-center justify-between gap-2">
                <div className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-xl">{m.homeEmoji}</span>
                  <span className="text-[11px] font-bold text-white">{m.home}</span>
                </div>
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-center">
                  <span className="text-base font-black text-white">{m.score}</span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-xl">{m.awayEmoji}</span>
                  <span className="text-[11px] font-bold text-white">{m.away}</span>
                </div>
              </div>

              {/* 1X2 odds */}
              <div className="grid grid-cols-3 gap-1.5">
                {(["1", "X", "2"] as const).map((label, i) => (
                  <button
                    key={label}
                    className="flex flex-col items-center gap-0.5 rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 transition-all duration-200 hover:border-[#138808]/40 hover:bg-[#138808]/10 hover:scale-[1.03]"
                  >
                    <span className="text-[9px] font-semibold text-slate-500">{label}</span>
                    <span className="text-sm font-black text-white">{m.odds[i]}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={CTA_LINKS.signup}
            className="inline-flex items-center gap-2 rounded-xl border border-[#138808]/30 bg-[#138808]/10 px-7 py-3.5 text-sm font-bold text-[#138808] transition-all duration-300 hover:bg-[#138808] hover:text-white hover:shadow-lg hover:shadow-[#138808]/25"
          >
            View All Live Matches →
          </Link>
        </div>
      </div>
    </section>
  );
}
