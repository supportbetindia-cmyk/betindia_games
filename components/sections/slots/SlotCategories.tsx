import Link from "next/link";
import { CTA_LINKS } from "@/lib/cta-links";

type Category = {
  emoji: string;
  name: string;
  description: string;
  games: string;
  accent: string;
  gradientA: string;
  gradientB: string;
};

const CATEGORIES: Category[] = [
  {
    emoji: "🎰",
    name: "Classic Slots",
    description: "Traditional slot machines with simple gameplay, nostalgic themes, and timeless symbols.",
    games: "120+ titles",
    accent: "#FF6B00",
    gradientA: "#FF6B00",
    gradientB: "#FF8A00",
  },
  {
    emoji: "🎥",
    name: "Video Slots",
    description: "Modern slot games featuring rich animations, immersive storylines, and exciting bonus rounds.",
    games: "200+ titles",
    accent: "#138808",
    gradientA: "#138808",
    gradientB: "#22c55e",
  },
  {
    emoji: "💰",
    name: "Mega Jackpot Slots",
    description: "Progressive jackpot slots with massive, ever-growing prize pools and life-changing payouts.",
    games: "45+ titles",
    accent: "#d97706",
    gradientA: "#d97706",
    gradientB: "#fbbf24",
  },
  {
    emoji: "🎁",
    name: "Bonus Buy Slots",
    description: "Skip directly to the bonus round — instantly access free spins and special game features.",
    games: "85+ titles",
    accent: "#7c3aed",
    gradientA: "#7c3aed",
    gradientB: "#a855f7",
  },
];

export default function SlotCategories() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/5 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
            🎰 Categories
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Explore Slot{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            Choose your preferred slot experience — from classics to progressive jackpots.
          </p>
        </div>

        {/* 1-col mobile / 2-col tablet / 4-col desktop */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map(({ emoji, name, description, games, gradientA, gradientB }) => (
            <div
              key={name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${gradientA}, transparent)` }}
              />

              {/* Visual */}
              <div
                className="relative flex h-36 items-center justify-center overflow-hidden"
                style={{
                  background: `radial-gradient(ellipse at 50% 110%, ${gradientA}25 0%, transparent 65%), radial-gradient(ellipse at 80% 15%, ${gradientB}10 0%, transparent 50%)`,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: `radial-gradient(circle, ${gradientA}60 1px, transparent 1px)`,
                    backgroundSize: "16px 16px",
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(ellipse at 50% 70%, ${gradientA}30 0%, transparent 60%)` }}
                />
                <div
                  className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `linear-gradient(135deg, ${gradientA}20, ${gradientB}15)`,
                    borderColor: `${gradientA}35`,
                    boxShadow: `0 4px 28px ${gradientA}22`,
                  }}
                >
                  {emoji}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{name}</h3>
                  <span
                    className="shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold"
                    style={{ borderColor: `${gradientA}30`, background: `${gradientA}10`, color: gradientA }}
                  >
                    {games}
                  </span>
                </div>
                <p className="flex-1 text-xs leading-relaxed text-slate-400">{description}</p>

                <Link
                  href={CTA_LINKS.signup}
                  className="mt-2 flex w-full items-center justify-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 text-xs font-bold text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  Browse Games →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
