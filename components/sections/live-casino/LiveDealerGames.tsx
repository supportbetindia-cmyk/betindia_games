import Link from "next/link";
import { CTA_LINKS } from "@/lib/cta-links";

type Game = {
  emoji: string;
  name: string;
  description: string;
  badge: string;
  badgeAccent: string;
  gradientFrom: string;
  gradientTo: string;
};

const GAMES: Game[] = [
  {
    emoji: "🎡",
    name: "Live Roulette",
    description: "Spin the wheel and experience authentic roulette streamed live.",
    badge: "LIVE",
    badgeAccent: "#FF6B00",
    gradientFrom: "#FF6B00",
    gradientTo: "#FF8A00",
  },
  {
    emoji: "🃏",
    name: "Live Blackjack",
    description: "Beat professional dealers in real-time blackjack sessions.",
    badge: "POPULAR",
    badgeAccent: "#138808",
    gradientFrom: "#138808",
    gradientTo: "#22c55e",
  },
  {
    emoji: "🎴",
    name: "Live Baccarat",
    description: "Enjoy one of the world's most elegant casino card games live.",
    badge: "PREMIUM",
    badgeAccent: "#a855f7",
    gradientFrom: "#7c3aed",
    gradientTo: "#a855f7",
  },
  {
    emoji: "♠",
    name: "Teen Patti",
    description: "India's favorite card game with live dealer interaction.",
    badge: "🇮🇳 INDIA FAV",
    badgeAccent: "#FF6B00",
    gradientFrom: "#FF6B00",
    gradientTo: "#138808",
  },
  {
    emoji: "🎯",
    name: "Andar Bahar Live",
    description: "Fast-paced traditional Indian card game with live action.",
    badge: "TRENDING",
    badgeAccent: "#06b6d4",
    gradientFrom: "#0891b2",
    gradientTo: "#06b6d4",
  },
  {
    emoji: "🚀",
    name: "Aviator",
    description: "Watch the multiplier rise and cash out at the perfect moment.",
    badge: "🔥 HOT",
    badgeAccent: "#FF6B00",
    gradientFrom: "#FF6B00",
    gradientTo: "#ef4444",
  },
  {
    emoji: "🐔",
    name: "Chicken Road",
    description: "Navigate risky paths and maximize your winnings.",
    badge: "NEW",
    badgeAccent: "#138808",
    gradientFrom: "#15803d",
    gradientTo: "#4ade80",
  },
  {
    emoji: "🏰",
    name: "Tower Rush",
    description: "Climb higher levels and unlock bigger multipliers.",
    badge: "TRENDING",
    badgeAccent: "#f59e0b",
    gradientFrom: "#d97706",
    gradientTo: "#fbbf24",
  },
  {
    emoji: "🎪",
    name: "Crazy Time",
    description: "One of the most exciting live casino game shows ever made.",
    badge: "FEATURED",
    badgeAccent: "#ec4899",
    gradientFrom: "#be185d",
    gradientTo: "#ec4899",
  },
  {
    emoji: "🎨",
    name: "Color Trading",
    description: "Fast-paced prediction game with simple yet exciting gameplay.",
    badge: "POPULAR",
    badgeAccent: "#138808",
    gradientFrom: "#138808",
    gradientTo: "#3b82f6",
  },
];

export default function LiveDealerGames() {
  return (
    <section id="live-games" className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[380px] w-[380px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B00] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
            </span>
            Streaming Live
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Popular Live Casino{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Games
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            Join professional dealers and enjoy immersive real-time casino action.
          </p>
        </div>

        {/* Grid: 2-col mobile / 3-col tablet / 5-col desktop */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {GAMES.map(({ emoji, name, description, badge, badgeAccent, gradientFrom, gradientTo }) => (
            <div
              key={name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-2xl"
              style={{ ["--hover-shadow" as string]: `${gradientFrom}18` }}
            >
              {/* Top glow strip */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${gradientFrom}, transparent)` }}
              />

              {/* Visual panel */}
              <div
                className="relative flex h-32 items-center justify-center overflow-hidden"
                style={{
                  background: `radial-gradient(ellipse at 50% 110%, ${gradientFrom}30 0%, transparent 65%), radial-gradient(ellipse at 80% 20%, ${gradientTo}15 0%, transparent 50%)`,
                }}
              >
                {/* Glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(ellipse at 50% 80%, ${gradientFrom}35 0%, transparent 60%)` }}
                />

                {/* Badge */}
                <span
                  className="absolute left-2.5 top-2.5 rounded-full border px-2 py-0.5 text-[8px] font-black uppercase tracking-wide backdrop-blur-sm"
                  style={{
                    borderColor: `${badgeAccent}40`,
                    background: `${badgeAccent}18`,
                    color: badgeAccent,
                  }}
                >
                  {badge}
                </span>

                {/* Emoji */}
                <div
                  className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    borderColor: `${gradientFrom}35`,
                    background: `${gradientFrom}18`,
                    boxShadow: `0 4px 24px ${gradientFrom}25`,
                  }}
                >
                  {emoji}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="text-[13px] font-bold leading-snug text-white">{name}</h3>
                <p className="flex-1 text-[11px] leading-relaxed text-slate-400">{description}</p>
                <Link
                  href={CTA_LINKS.signup}
                  className="mt-1 flex w-full items-center justify-center gap-1 rounded-xl border border-[#FF6B00]/30 bg-[#FF6B00]/10 py-2 text-xs font-bold text-[#FF6B00] transition-all duration-200 hover:bg-[#FF6B00] hover:text-white"
                >
                  Play Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
