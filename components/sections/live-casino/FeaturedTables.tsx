import Link from "next/link";
import { Users } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";

type Table = {
  emoji: string;
  name: string;
  category: string;
  players: string;
  minBet: string;
  accent: "#FF6B00" | "#138808";
  hot?: boolean;
};

const TABLES: Table[] = [
  {
    emoji: "🎡",
    name: "VIP Roulette Table",
    category: "Roulette",
    players: "245",
    minBet: "₹100",
    accent: "#FF6B00",
    hot: false,
  },
  {
    emoji: "🃏",
    name: "Blackjack Elite",
    category: "Blackjack",
    players: "198",
    minBet: "₹200",
    accent: "#138808",
    hot: false,
  },
  {
    emoji: "♠",
    name: "Teen Patti Royal",
    category: "Teen Patti",
    players: "320",
    minBet: "₹50",
    accent: "#FF6B00",
    hot: true,
  },
  {
    emoji: "🎯",
    name: "Andar Bahar Pro",
    category: "Andar Bahar",
    players: "275",
    minBet: "₹50",
    accent: "#138808",
    hot: false,
  },
  {
    emoji: "🎪",
    name: "Crazy Time Live",
    category: "Game Show",
    players: "410",
    minBet: "₹20",
    accent: "#FF6B00",
    hot: true,
  },
  {
    emoji: "🚀",
    name: "Aviator Live",
    category: "Crash Game",
    players: "550",
    minBet: "₹10",
    accent: "#138808",
    hot: true,
  },
];

export default function FeaturedTables() {
  return (
    <section id="live-tables" className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Subtle top divider glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6B00]/20 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
            <Users size={11} strokeWidth={2} />
            Live Right Now
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Tables
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            Join the most popular live tables right now — real dealers, real action.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TABLES.map(({ emoji, name, category, players, minBet, accent, hot }) => {
            const isOrange = accent === "#FF6B00";
            return (
              <div
                key={name}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl",
                  "transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]",
                  isOrange
                    ? "hover:border-[#FF6B00]/40 hover:shadow-2xl hover:shadow-[#FF6B00]/10"
                    : "hover:border-[#138808]/40 hover:shadow-2xl hover:shadow-[#138808]/10",
                ].join(" ")}
              >
                {/* Top edge glow */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />

                {/* Visual panel */}
                <div
                  className="relative flex h-36 items-center justify-center overflow-hidden"
                  style={{
                    background: `radial-gradient(ellipse at 50% 120%, ${accent}22 0%, transparent 65%)`,
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(ellipse at 50% 80%, ${accent}28 0%, transparent 60%)` }}
                  />

                  {/* HOT badge */}
                  {hot && (
                    <span className="absolute right-3 top-3 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/15 px-2 py-0.5 text-[8px] font-black uppercase tracking-wide text-[#FF6B00]">
                      🔥 Hot
                    </span>
                  )}

                  {/* Live pulse */}
                  <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full border border-[#138808]/40 bg-[#138808]/12 px-2 py-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#138808] opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#138808]" />
                    </span>
                    <span className="text-[8px] font-bold text-[#138808]">Live</span>
                  </span>

                  {/* Game icon */}
                  <div
                    className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      borderColor: `${accent}35`,
                      background: `${accent}18`,
                      boxShadow: `0 4px 28px ${accent}20`,
                    }}
                  >
                    {emoji}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{category}</p>
                      <h3 className="mt-0.5 text-sm font-bold text-white">{name}</h3>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mb-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">Active Players</p>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        <Users size={10} className="text-[#FF6B00]" />
                        <p className="text-sm font-black" style={{ color: accent }}>{players}</p>
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">Min Bet</p>
                      <p className="mt-0.5 text-sm font-black text-white">{minBet}</p>
                    </div>
                  </div>

                  <Link
                    href={CTA_LINKS.signup}
                    className={[
                      "flex w-full items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-bold transition-all duration-200",
                      isOrange
                        ? "border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white hover:shadow-lg hover:shadow-[#FF6B00]/25"
                        : "border-[#138808]/30 bg-[#138808]/10 text-[#138808] hover:bg-[#138808] hover:text-white hover:shadow-lg hover:shadow-[#138808]/25",
                    ].join(" ")}
                  >
                    Join Table →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
