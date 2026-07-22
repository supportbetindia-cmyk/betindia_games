import Link from "next/link";
import {
  TrendingUp, Users, Plane, RefreshCw, Zap, Gamepad2, ArrowRight, type LucideIcon,
} from "lucide-react";
import { casinoContent } from "@/data/casino";

type Game = {
  icon: LucideIcon;
  category: string;
  name: string;
  description: string;
  href: string;
  accent: "#FF6B00" | "#138808";
};

const GAMES: Game[] = [
  {
    icon: TrendingUp,
    category: "Slots",
    name: "Mega Fortune",
    description: "Progressive jackpot slot with life-changing prize pools.",
    href: "/casino",
    accent: "#FF6B00",
  },
  {
    icon: Users,
    category: "Card Game",
    name: "Teen Patti",
    description: "India's most popular card game with live multiplayer tables.",
    href: "/casino",
    accent: "#138808",
  },
  {
    icon: Plane,
    category: "Crash Game",
    name: "Aviator",
    description: "Watch the multiplier soar — cash out before it crashes.",
    href: "/casino",
    accent: "#FF6B00",
  },
  {
    icon: RefreshCw,
    category: "Live Casino",
    name: "Live Roulette",
    description: "Real dealer roulette streamed live in stunning HD quality.",
    href: "/casino",
    accent: "#138808",
  },
  {
    icon: Zap,
    category: "Slots",
    name: "Golden Spin",
    description: "Classic casino slot with high payout potential and free spins.",
    href: "/casino",
    accent: "#FF6B00",
  },
  {
    icon: Gamepad2,
    category: "Live Casino",
    name: "Live Blackjack",
    description: "Beat the dealer at a premium live blackjack table.",
    href: "/casino",
    accent: "#138808",
  },
];

export default function FeaturedGames({ content }: { content?: Partial<typeof casinoContent.featured> | null }) {
  const data = { ...casinoContent.featured, ...(content ?? {}) };

  return (
    <section id="featured-games" className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B00]" />
            Most Played
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl whitespace-pre-line">
            {data.featuredTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-6xl text-sm leading-relaxed text-slate-400 md:text-base">
            {data.featuredText}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map(({ icon: Icon, category, name, description, href, accent }) => {
            const isOrange = accent === "#FF6B00";
            return (
              <Link
                key={name}
                href={href}
                className={[
                  "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl",
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

                {/* Thumbnail */}
                <div
                  className="relative flex h-40 items-center justify-center overflow-hidden"
                  style={{ background: `radial-gradient(ellipse at 50% 110%, ${accent}22 0%, transparent 65%)` }}
                >
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage: `radial-gradient(circle, ${accent}60 1px, transparent 1px)`,
                      backgroundSize: "22px 22px",
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(ellipse at 50% 60%, ${accent}28 0%, transparent 65%)` }}
                  />
                  <div
                    className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `${accent}18`,
                      borderColor: `${accent}35`,
                      color: accent,
                      boxShadow: `0 0 32px ${accent}25`,
                    }}
                  >
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-2.5 p-5">
                  <span
                    className="inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    style={{ borderColor: `${accent}40`, background: `${accent}12`, color: accent }}
                  >
                    {category}
                  </span>

                  <h3 className="text-base font-bold leading-snug text-white">{name}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-slate-400">{description}</p>

                  <div className="mt-2 flex items-center justify-between border-t border-white/[0.06] pt-3">
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200 group-hover:gap-2.5"
                      style={{ color: accent }}
                    >
                      Play Now
                      <ArrowRight size={13} strokeWidth={2.5} />
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600">18+</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
