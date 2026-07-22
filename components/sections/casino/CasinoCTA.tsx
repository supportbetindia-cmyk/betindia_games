import Link from "next/link";
import { CTA_LINKS } from "@/lib/cta-links";
import { casinoContent } from "@/data/casino";

export default function CasinoCTA({ content }: { content?: Partial<typeof casinoContent.finalCta> | null }) {
  const data = { ...casinoContent.finalCta, ...(content ?? {}) };

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/4 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/12 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute right-1/4 top-1/2 h-[520px] w-[520px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl md:p-14">
          {/* Top edge glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/60 to-transparent" />
          {/* Bottom edge glow */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#138808]/40 to-transparent" />

          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6B00]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B00]" />
            500+ Games Waiting
          </span>

          <h2 className="mx-auto mt-6 max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl whitespace-pre-line">
            {data.finalCtaTitle}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base whitespace-pre-line">
            {data.finalCtaText}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={CTA_LINKS.signup}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/35 sm:w-auto"
            >
              Play Now
              <span aria-hidden>&rarr;</span>
            </Link>
            <Link
              href="#featured-games"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00]/40 hover:bg-white/10 sm:w-auto"
            >
              Explore Games
            </Link>
          </div>

          <p className="mt-7 text-xs text-slate-600">
            Secure Withdrawals &nbsp;·&nbsp; Live Dealers &nbsp;·&nbsp; Responsible Gaming
          </p>
        </div>
      </div>
    </section>
  );
}
