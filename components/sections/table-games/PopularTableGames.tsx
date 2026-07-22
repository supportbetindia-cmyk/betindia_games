import Link from "next/link";
import { Check } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";

type Game = {
  emoji: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  href: string;
  ctaLabel: string;
  accent: "#FF6B00" | "#138808";
  gradientA: string;
  gradientB: string;
};

const GAMES: Game[] = [
  {
    emoji: "🃏",
    name: "Blackjack",
    category: "Card Game",
    description: "Beat the dealer by getting closer to 21 without going over. One of the most strategic and exciting casino games ever created.",
    features: ["Strategic Gameplay", "Quick Rounds", "Popular Worldwide"],
    href: CTA_LINKS.signup,
    ctaLabel: "Play Blackjack",
    accent: "#FF6B00",
    gradientA: "#FF6B00",
    gradientB: "#FF8A00",
  },
  {
    emoji: "🎡",
    name: "Roulette",
    category: "Wheel Game",
    description: "Predict the winning number, color, or section and enjoy classic casino excitement with every spin of the wheel.",
    features: ["Multiple Betting Options", "Fast Action", "High Entertainment"],
    href: CTA_LINKS.signup,
    ctaLabel: "Play Roulette",
    accent: "#138808",
    gradientA: "#138808",
    gradientB: "#22c55e",
  },
  {
    emoji: "🎴",
    name: "Baccarat",
    category: "Premium Card Game",
    description: "One of the world's most elegant casino games with simple rules, fast rounds, and exciting Player vs Banker outcomes.",
    features: ["Easy To Learn", "High Popularity", "Fast Gameplay"],
    href: CTA_LINKS.signup,
    ctaLabel: "Play Baccarat",
    accent: "#FF6B00",
    gradientA: "#7c3aed",
    gradientB: "#a855f7",
  },
  {
    emoji: "♣",
    name: "Poker",
    category: "Skill-Based Game",
    description: "Test your strategy and decision-making against players and dealers across multiple exciting variants and formats.",
    features: ["Skill Focused", "Competitive Play", "Multiple Variants"],
    href: CTA_LINKS.signup,
    ctaLabel: "Play Poker",
    accent: "#138808",
    gradientA: "#2563eb",
    gradientB: "#06b6d4",
  },
  {
    emoji: "♠",
    name: "Teen Patti",
    category: "Indian Favorite",
    description: "India's most popular card game with exciting multiplayer live tables, traditional gameplay, and premium casino atmosphere.",
    features: ["Live Tables", "Multiplayer", "Traditional Gameplay"],
    href: CTA_LINKS.signup,
    ctaLabel: "Play Teen Patti",
    accent: "#FF6B00",
    gradientA: "#FF6B00",
    gradientB: "#138808",
  },
  {
    emoji: "🎯",
    name: "Andar Bahar",
    category: "Traditional Indian Game",
    description: "A simple yet incredibly exciting card game loved by players across India. Fast rounds, easy rules, instant results.",
    features: ["Beginner Friendly", "Fast Rounds", "Easy Rules"],
    href: CTA_LINKS.signup,
    ctaLabel: "Play Andar Bahar",
    accent: "#138808",
    gradientA: "#d97706",
    gradientB: "#fbbf24",
  },
];

export default function PopularTableGames() {
  return (
    <section id="table-games-grid" className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
            🃏 Casino Classics
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Popular Table{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Games
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            Discover the most loved casino table games on BetIndia — strategy, skill, and nonstop action.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map(({ emoji, name, category, description, features, href, ctaLabel, accent, gradientA, gradientB }) => {
            const isOrange = accent === "#FF6B00";
            return (
              <div
                key={name}
                className={[
                  "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl",
                  "transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]",
                  isOrange
                    ? "hover:border-[#FF6B00]/40 hover:shadow-2xl hover:shadow-[#FF6B00]/10"
                    : "hover:border-[#138808]/40 hover:shadow-2xl hover:shadow-[#138808]/10",
                ].join(" ")}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${gradientA}, transparent)` }}
                />

                {/* Visual panel */}
                <div
                  className="relative flex h-36 items-center justify-center overflow-hidden"
                  style={{
                    background: `radial-gradient(ellipse at 50% 110%, ${gradientA}25 0%, transparent 65%), radial-gradient(ellipse at 85% 10%, ${gradientB}10 0%, transparent 50%)`,
                  }}
                >
                  {/* Dot texture */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: `radial-gradient(circle, ${gradientA}70 1px, transparent 1px)`,
                      backgroundSize: "16px 16px",
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(ellipse at 50% 65%, ${gradientA}28 0%, transparent 60%)` }}
                  />

                  {/* Category badge */}
                  <span
                    className="absolute left-3 top-3 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide backdrop-blur-sm"
                    style={{ borderColor: `${gradientA}35`, background: `${gradientA}15`, color: gradientA }}
                  >
                    {category}
                  </span>

                  {/* Emoji icon */}
                  <div
                    className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `linear-gradient(135deg, ${gradientA}20, ${gradientB}15)`,
                      borderColor: `${gradientA}35`,
                      boxShadow: `0 4px 28px ${gradientA}25`,
                    }}
                  >
                    {emoji}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="text-base font-bold text-white">{name}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{description}</p>

                  {/* Feature bullets */}
                  <ul className="space-y-1.5">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[11px] text-slate-500">
                        <Check
                          size={11}
                          strokeWidth={2.5}
                          className="shrink-0"
                          style={{ color: gradientA }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={href}
                    className={[
                      "mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-bold transition-all duration-200",
                      isOrange
                        ? "border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white hover:shadow-lg hover:shadow-[#FF6B00]/25"
                        : "border-[#138808]/30 bg-[#138808]/10 text-[#138808] hover:bg-[#138808] hover:text-white hover:shadow-lg hover:shadow-[#138808]/25",
                    ].join(" ")}
                  >
                    {ctaLabel} →
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
