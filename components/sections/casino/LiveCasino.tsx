import Link from "next/link";
import { Gamepad2, RefreshCw, Crown, ArrowRight, type LucideIcon } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import { casinoContent } from "@/data/casino";

export default function LiveCasino({ content }: { content?: Partial<typeof casinoContent.liveCasino> | null }) {
  const data = { ...casinoContent.liveCasino, ...(content ?? {}) };

  const tables = [
    {
      icon: Gamepad2,
      name: data.liveBlackjackTitle,
      description: data.liveBlackjackText,
      stat: "12 Tables Live",
      accent: "#FF6B00" as const,
    },
    {
      icon: RefreshCw,
      name: data.liveRouletteTitle,
      description: data.liveRouletteText,
      stat: "8 Tables Live",
      accent: "#138808" as const,
    },
    {
      icon: Crown,
      name: data.liveBaccaratTitle,
      description: data.liveBaccaratText,
      stat: "10 Tables Live",
      accent: "#FF6B00" as const,
    },
  ];

  return (
    <section id="live-casino" className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/7 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B00] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
            </span>
            Streaming Live Now
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl whitespace-pre-line">
            {data.liveCasinoTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-6xl text-sm leading-relaxed text-slate-400 md:text-base">
            {data.liveCasinoText}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {tables.map(({ icon: Icon, name, description, stat, accent }) => {
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

                {/* Visual area */}
                <div
                  className="relative flex h-40 items-center justify-center overflow-hidden"
                  style={{ background: `radial-gradient(ellipse at 50% 110%, ${accent}22 0%, transparent 65%)` }}
                >
                  {/* Corner glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(ellipse at 50% 80%, ${accent}28 0%, transparent 60%)` }}
                  />
                  {/* LIVE badge */}
                  <span
                    className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ borderColor: `${accent}40`, background: `${accent}15`, color: accent }}
                  >
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: accent }} />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
                    </span>
                    Live
                  </span>
                  {/* Icon */}
                  <div
                    className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `${accent}18`,
                      borderColor: `${accent}35`,
                      color: accent,
                      boxShadow: `0 4px 28px ${accent}20`,
                    }}
                  >
                    <Icon size={28} strokeWidth={1.6} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  {/* Stat chip */}
                  <span
                    className="inline-flex w-fit items-center rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold"
                    style={{ color: accent }}
                  >
                    {stat}
                  </span>

                  <h3 className="text-lg font-bold text-white">{name}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-slate-400 whitespace-pre-line">{description}</p>

                  <Link
                    href={CTA_LINKS.signup}
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200 group-hover:gap-2.5"
                    style={{ color: accent }}
                  >
                    Join Table
                    <ArrowRight size={14} strokeWidth={2.5} />
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
