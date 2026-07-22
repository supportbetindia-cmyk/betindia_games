import Link from "next/link";
import { CTA_LINKS } from "@/lib/cta-links";

type League = {
  emoji: string;
  name: string;
  country: string;
  description: string;
  accent: string;
  markets: string;
};

const LEAGUES: League[] = [
  {
    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    name: "Premier League",
    country: "England",
    description: "England's top football competition featuring the biggest clubs and fiercest rivalries.",
    accent: "#38003c",
    markets: "300+ markets",
  },
  {
    emoji: "🇪🇸",
    name: "La Liga",
    country: "Spain",
    description: "Home of Spain's elite clubs and world-class football action with iconic El Clásico.",
    accent: "#FF6B00",
    markets: "250+ markets",
  },
  {
    emoji: "🇪🇺",
    name: "Champions League",
    country: "Europe",
    description: "Europe's most prestigious club competition — the ultimate stage for football glory.",
    accent: "#1d4ed8",
    markets: "400+ markets",
  },
  {
    emoji: "🇮🇹",
    name: "Serie A",
    country: "Italy",
    description: "Italy's premier football league with legendary clubs and fierce tactical battles.",
    accent: "#16a34a",
    markets: "220+ markets",
  },
  {
    emoji: "🇩🇪",
    name: "Bundesliga",
    country: "Germany",
    description: "Germany's top division known for high-scoring, fast-paced attacking football.",
    accent: "#d97706",
    markets: "200+ markets",
  },
];

export default function TopLeagues() {
  return (
    <section
      id="football-leagues"
      className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8"
    >
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#138808]/25 bg-[#138808]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#138808]">
            🏆 Top Competitions
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Top Football{" "}
            <span className="bg-gradient-to-r from-[#138808] via-[#22c55e] to-[#138808] bg-clip-text text-transparent">
              Leagues
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            Bet on the biggest football competitions from around the world.
          </p>
        </div>

        {/* Mobile: 1-col / Tablet: 2-col / Desktop: 5-col */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {LEAGUES.map(({ emoji, name, country, description, markets }) => (
            <div
              key={name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#138808]/35 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-[#138808]/8"
            >
              {/* Top edge glow */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#138808]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* League emblem */}
              <div className="mb-4 flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {emoji}
                </div>
                <span className="rounded-full border border-[#138808]/25 bg-[#138808]/8 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#138808]">
                  {country}
                </span>
              </div>

              <h3 className="mb-1.5 text-sm font-bold text-white">{name}</h3>
              <p className="mb-4 flex-1 text-xs leading-relaxed text-slate-400">{description}</p>

              <div className="mb-3 text-[10px] font-semibold text-slate-600">{markets}</div>

              <Link
                href={CTA_LINKS.signup}
                className="flex w-full items-center justify-center gap-1 rounded-xl border border-[#138808]/30 bg-[#138808]/10 py-2.5 text-xs font-bold text-[#138808] transition-all duration-200 hover:bg-[#138808] hover:text-white hover:shadow-lg hover:shadow-[#138808]/25"
              >
                Explore Markets →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
