import Link from "next/link";
import { CTA_LINKS } from "@/lib/cta-links";

const TRUST = [
  "500+ Cricket Markets",
  "Ball-by-Ball Odds",
  "Instant Cashout",
  "Secure Platform",
] as const;

export default function CricketCTA() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/4 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/12 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute right-1/4 top-1/2 h-[560px] w-[560px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/9 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div
          className="rounded-3xl p-px"
          style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.5) 0%, rgba(255,138,0,0.2) 40%, rgba(19,136,8,0.25) 100%)" }}
        >
          <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#081425]/95 p-8 text-center backdrop-blur-xl md:p-14">
            <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#FF6B00]/10 blur-2xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[#138808]/8 blur-2xl" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />

            {/* Emoji + badge */}
            <div className="relative mb-4 text-4xl">🏏</div>
            <span className="relative inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B00] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
              </span>
              Cricket Betting
            </span>

            <h2 className="relative mx-auto mt-6 max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
              Ready to Bet on{" "}
              <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
                Cricket?
              </span>
            </h2>

            <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
              Join millions of Indian cricket fans betting live on IPL, T20Is, ODIs, and Test matches with ball-by-ball odds, instant cashouts, and exclusive promotions.
            </p>

            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={CTA_LINKS.signup}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/30 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/45 sm:w-auto"
              >
                Create Account
                <span aria-hidden>&rarr;</span>
              </Link>
              <a
                href="#cricket-matches"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00]/40 hover:bg-white/10 sm:w-auto"
              >
                View Live Matches
              </a>
            </div>

            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {TRUST.map((t, i) => (
                <span key={t} className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                  {i > 0 && <span className="hidden text-slate-700 sm:inline">•</span>}
                  <span className="h-1 w-1 rounded-full bg-[#FF6B00] sm:hidden" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
