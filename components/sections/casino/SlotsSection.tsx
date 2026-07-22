import Link from "next/link";
import { TrendingUp, Gem, Zap, Trophy, Crown, Target, ArrowRight, type LucideIcon } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import { casinoContent } from "@/data/casino";

type Slot = {
  icon: LucideIcon;
  name: string;
  category: string;
  rtp: string;
  accent: "#FF6B00" | "#138808";
};

const SLOTS: Slot[] = [
  { icon: TrendingUp, name: "Mega Fortune",   category: "Progressive Jackpot", rtp: "96.6% RTP", accent: "#FF6B00" },
  { icon: Gem,        name: "Book of Riches", category: "Adventure Slot",      rtp: "95.1% RTP", accent: "#138808" },
  { icon: Zap,        name: "Golden Spin",    category: "Classic Casino Slot",  rtp: "97.0% RTP", accent: "#FF6B00" },
  { icon: Trophy,     name: "Lucky 777",      category: "Popular Slot Machine", rtp: "96.2% RTP", accent: "#138808" },
  { icon: Crown,      name: "Royal Treasure", category: "High RTP Slot",        rtp: "97.3% RTP", accent: "#FF6B00" },
  { icon: Target,     name: "Diamond Rush",   category: "Premium Jackpot Slot", rtp: "95.8% RTP", accent: "#138808" },
];

export default function SlotsSection({ content }: { content?: Partial<typeof casinoContent.popularSlots> | null }) {
  const data = { ...casinoContent.popularSlots, ...(content ?? {}) };

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[340px] w-[340px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
            Top Slots
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl whitespace-pre-line">
            {data.popularSlotsTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-6xl text-sm leading-relaxed text-slate-400 md:text-base">
            {data.popularSlotsText}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SLOTS.map(({ icon: Icon, name, category, rtp, accent }) => {
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
                {/* Top edge glow */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />

                {/* Thumbnail area */}
                <div
                  className="relative flex h-36 items-center justify-center overflow-hidden"
                  style={{ background: `radial-gradient(ellipse at 50% 110%, ${accent}20 0%, transparent 70%)` }}
                >
                  {/* Dot grid texture */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle, ${accent}50 1px, transparent 1px)`,
                      backgroundSize: "20px 20px",
                    }}
                  />
                  {/* Hover radial */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(ellipse at 50% 60%, ${accent}25 0%, transparent 65%)` }}
                  />
                  {/* Icon */}
                  <div
                    className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `${accent}18`,
                      borderColor: `${accent}35`,
                      color: accent,
                      boxShadow: `0 0 28px ${accent}20`,
                    }}
                  >
                    <Icon size={24} strokeWidth={1.6} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-2 p-5">
                  {/* Category + RTP */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                      style={{ borderColor: `${accent}40`, background: `${accent}12`, color: accent }}
                    >
                      {category}
                    </span>
                    <span className="shrink-0 text-[10px] font-semibold text-slate-500">{rtp}</span>
                  </div>

                  <h3 className="text-base font-bold text-white">{name}</h3>

                  <div className="mt-auto pt-3">
                    <Link
                      href={CTA_LINKS.signup}
                      className="inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200 group-hover:gap-2.5"
                      style={{ color: accent }}
                    >
                      Play Now
                      <ArrowRight size={13} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
