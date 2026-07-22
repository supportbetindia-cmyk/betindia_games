import Link from "next/link";
import { TrendingUp, Gem, Zap, Target, Crown, Trophy, type LucideIcon } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import { slotsContent } from "@/data/slots";

type Slot = {
  icon: LucideIcon;
  emoji: string;
  name: string;
  category: string;
  rtp: string;
  description: string;
  accent: "#FF6B00" | "#138808";
  gradientA: string;
  gradientB: string;
};

const SLOTS: Slot[] = [
  {
    icon: TrendingUp,
    emoji: "💰",
    name: "Mega Fortune",
    category: "Mega Jackpot",
    rtp: "96.6% RTP",
    description: "One of the most popular progressive jackpot slot experiences ever created.",
    accent: "#FF6B00",
    gradientA: "#FF6B00",
    gradientB: "#FF8A00",
  },
  {
    icon: Gem,
    emoji: "📖",
    name: "Book of Riches",
    category: "Adventure Slot",
    rtp: "95.1% RTP",
    description: "Unlock treasures and bonus features while exploring mysterious ancient worlds.",
    accent: "#138808",
    gradientA: "#138808",
    gradientB: "#22c55e",
  },
  {
    icon: Zap,
    emoji: "🌀",
    name: "Golden Spin",
    category: "Classic Slot",
    rtp: "97.0% RTP",
    description: "Traditional slot action with modern multipliers and rewarding bonus rounds.",
    accent: "#FF6B00",
    gradientA: "#d97706",
    gradientB: "#FF6B00",
  },
  {
    icon: Target,
    emoji: "💎",
    name: "Diamond Rush",
    category: "Premium Slot",
    rtp: "95.8% RTP",
    description: "High-value symbols, exciting multipliers, and a thrilling premium experience.",
    accent: "#138808",
    gradientA: "#2563eb",
    gradientB: "#06b6d4",
  },
  {
    icon: Trophy,
    emoji: "7️⃣",
    name: "Lucky 777",
    category: "Classic Slot",
    rtp: "96.2% RTP",
    description: "A timeless slot experience with rewarding gameplay and classic symbols.",
    accent: "#FF6B00",
    gradientA: "#FF6B00",
    gradientB: "#dc2626",
  },
  {
    icon: Crown,
    emoji: "👑",
    name: "Royal Treasure",
    category: "Video Slot",
    rtp: "97.3% RTP",
    description: "Luxury-themed slot with immersive bonus rounds and lucrative jackpot prizes.",
    accent: "#138808",
    gradientA: "#7c3aed",
    gradientB: "#a855f7",
  },
];

export default function PopularSlots() {
  const section = slotsContent.popularSlots;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
            <Zap size={11} strokeWidth={2} />
            Top Picks
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Popular Slot{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Games
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-6xl text-sm leading-relaxed text-slate-400 md:text-base">
            {section.intro}
          </p>
          <p className="mx-auto mt-4 text-sm font-semibold text-slate-300 md:text-base">
            {section.categoriesLabel}
          </p>
          <ul className="mx-auto mt-4 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {section.categories.map((category) => (
              <li
                key={category}
                className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-center text-xs font-semibold text-slate-300 transition-colors hover:border-[#FF6B00]/30 hover:text-white"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SLOTS.map(({ icon: Icon, emoji, name, category, rtp, description, accent, gradientA, gradientB }) => {
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
                  className="relative flex h-40 items-center justify-center overflow-hidden"
                  style={{
                    background: `radial-gradient(ellipse at 50% 110%, ${gradientA}25 0%, transparent 65%), radial-gradient(ellipse at 85% 15%, ${gradientB}12 0%, transparent 50%)`,
                  }}
                >
                  {/* Dot texture */}
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: `radial-gradient(circle, ${gradientA}80 1px, transparent 1px)`,
                      backgroundSize: "18px 18px",
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(ellipse at 50% 65%, ${gradientA}28 0%, transparent 60%)` }}
                  />

                  {/* Main icon */}
                  <div
                    className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
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
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                      style={{ borderColor: `${accent}40`, background: `${accent}12`, color: accent }}
                    >
                      {category}
                    </span>
                    <span className="shrink-0 text-[10px] font-semibold text-slate-500">{rtp}</span>
                  </div>

                  <h3 className="text-base font-bold text-white">{name}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-slate-400">{description}</p>

                  <Link
                    href={CTA_LINKS.signup}
                    className={[
                      "mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-bold transition-all duration-200",
                      isOrange
                        ? "border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white hover:shadow-lg hover:shadow-[#FF6B00]/25"
                        : "border-[#138808]/30 bg-[#138808]/10 text-[#138808] hover:bg-[#138808] hover:text-white hover:shadow-lg hover:shadow-[#138808]/25",
                    ].join(" ")}
                  >
                    Play Now →
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
