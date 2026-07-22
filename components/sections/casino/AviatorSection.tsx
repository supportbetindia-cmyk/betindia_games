import Link from "next/link";
import { Plane, CheckCircle2, TrendingUp } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import { casinoContent } from "@/data/casino";

const FEATURES = [
  "Real-Time Gameplay",
  "Instant Rounds",
  "High Multipliers",
  "Provably Fair",
] as const;

const RECENT_RESULTS = [
  { value: "1.23×",  hot: false },
  { value: "5.41×",  hot: true  },
  { value: "2.08×",  hot: false },
  { value: "12.6×",  hot: true  },
  { value: "1.47×",  hot: false },
  { value: "3.91×",  hot: true  },
] as const;

export default function AviatorSection({ content }: { content?: Partial<typeof casinoContent.aviator> | null }) {
  const data = { ...casinoContent.aviator, ...(content ?? {}) };

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/8 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[300px] w-[300px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/5 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — Aviator Visual */}
          <div className="order-2 mx-auto w-full max-w-sm lg:order-1 lg:max-w-none">
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[#FF6B00]/8 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
              {/* Game header */}
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-3 py-1 text-[11px] font-bold text-[#FF6B00]">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B00] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
                  </span>
                  LIVE
                </span>
                <span className="text-[11px] font-semibold text-slate-500">Round #41,892</span>
              </div>

              {/* Multiplier display */}
              <div className="relative mb-5 flex h-36 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-[#050B18]">
                {/* Graph line */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 300 144"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="aviator-line" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FF8A00" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="aviator-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 130 Q 60 120 100 100 Q 160 70 200 50 Q 240 30 300 10"
                    fill="none"
                    stroke="url(#aviator-line)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 0 130 Q 60 120 100 100 Q 160 70 200 50 Q 240 30 300 10 L 300 144 L 0 144 Z"
                    fill="url(#aviator-fill)"
                  />
                </svg>

                {/* Plane icon */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <Plane size={28} className="text-[#FF6B00]" strokeWidth={1.6} />
                  <span className="text-3xl font-black text-[#FF6B00]">2.45×</span>
                  <span className="text-[11px] font-semibold text-slate-400">Flying...</span>
                </div>
              </div>

              {/* Cash out button */}
              <button className="mb-4 w-full rounded-xl bg-[#FF6B00] py-3.5 text-sm font-black text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-200 hover:bg-[#FF8A00]">
                CASH OUT — ₹2,450
              </button>

              {/* Recent results */}
              <div>
                <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  Recent Results
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {RECENT_RESULTS.map(({ value, hot }, i) => (
                    <span
                      key={i}
                      className={[
                        "rounded-lg border px-2.5 py-1 text-[11px] font-black",
                        hot
                          ? "border-[#FF6B00]/40 bg-[#FF6B00]/15 text-[#FF6B00]"
                          : "border-white/10 bg-white/[0.04] text-slate-400",
                      ].join(" ")}
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-center text-[10px] text-slate-600">
                Sample data · 18+ · Play responsibly
              </p>
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className="order-1 flex flex-col items-center text-center lg:order-2 lg:items-start lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
              <TrendingUp size={12} className="text-[#FF6B00]" strokeWidth={2} />
              Trending Crash Game
            </span>

            <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl whitespace-pre-line">
              {data.aviatorTitle}
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400 md:text-base whitespace-pre-line">
              {data.aviatorText}
            </p>

            <ul className="mt-7 grid grid-cols-2 gap-3 text-left">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm font-semibold text-white">
                  <CheckCircle2 size={16} className="shrink-0 text-[#FF6B00]" strokeWidth={2} />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={CTA_LINKS.signup}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/30"
            >
              Play Aviator
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
