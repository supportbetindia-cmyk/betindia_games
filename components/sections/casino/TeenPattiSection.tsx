import Link from "next/link";
import { Users, CheckCircle2 } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import { casinoContent } from "@/data/casino";

const FEATURES = [
  "Multiplayer Tables",
  "Private Rooms",
  "Live Gameplay",
  "Instant Joining",
] as const;

const CARDS = [
  { suit: "♠", value: "A", color: "text-white" },
  { suit: "♥", value: "K", color: "text-[#FF6B00]" },
  { suit: "♣", value: "Q", color: "text-white" },
] as const;

export default function TeenPattiSection({ content }: { content?: Partial<typeof casinoContent.teenPatti> | null }) {
  const data = { ...casinoContent.teenPatti, ...(content ?? {}) };

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[400px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/7 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
              India&apos;s Favourite Card Game
            </span>

            <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl whitespace-pre-line">
              {data.teenPattiTitle}
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400 md:text-base whitespace-pre-line">
              {data.teenPattiText}
            </p>

            {/* Features */}
            <ul className="mt-7 grid grid-cols-2 gap-3 text-left">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm font-semibold text-white">
                  <CheckCircle2 size={16} className="shrink-0 text-[#138808]" strokeWidth={2} />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={CTA_LINKS.signup}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#138808] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#138808]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#1aa30a] hover:shadow-[#138808]/30"
            >
              Play Teen Patti
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>

          {/* RIGHT — Card Table Visual */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[#138808]/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
              {/* Table felt */}
              <div className="relative mb-6 flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-[#138808]/8">
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-[#138808]/15" />
                {/* Oval table outline */}
                <div className="absolute inset-6 rounded-full border border-[#138808]/20" />

                {/* Cards fan */}
                <div className="relative flex items-end">
                  {CARDS.map((card, i) => (
                    <div
                      key={i}
                      className={[
                        "relative rounded-xl border border-white/20 bg-[#081425] px-3 py-2 shadow-xl",
                        i === 0 ? "-rotate-12 -mr-2 z-10" : "",
                        i === 1 ? "rotate-0 z-20 scale-105" : "",
                        i === 2 ? "rotate-12 -ml-2 z-10" : "",
                      ].join(" ")}
                    >
                      <div className={`text-lg font-black leading-none ${card.color}`}>
                        {card.value}
                      </div>
                      <div className={`text-sm leading-none ${card.color}`}>{card.suit}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table info */}
              <div className="mb-5 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Players",  value: "2,400+", accent: "#138808" },
                  { label: "Tables",   value: "Live",   accent: "#FF6B00" },
                  { label: "Min Bet",  value: "₹10",    accent: "#138808" },
                ].map(({ label, value, accent }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.04] px-2 py-3"
                  >
                    <p className="text-xs font-semibold text-slate-500">{label}</p>
                    <p className="mt-0.5 text-sm font-black" style={{ color: accent }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href={CTA_LINKS.signup}
                  className="rounded-xl border border-[#138808]/30 bg-[#138808]/10 py-3 text-sm font-bold text-[#138808] transition-all duration-200 hover:bg-[#138808]/20 text-center"
                >
                  Join Table
                </Link>
                <Link
                  href={CTA_LINKS.signup}
                  className="rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-bold text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] text-center"
                >
                  Private Room
                </Link>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Users size={11} />
                  2,400+ players online
                </span>
                <span className="text-[11px] text-[#138808]">● Live Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
