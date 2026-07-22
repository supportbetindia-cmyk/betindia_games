import Link from "next/link";
import { CTA_LINKS } from "@/lib/cta-links";
import { contactUsContent } from "@/data/ContactUs";

export default function ContactCTA({
  content,
}: {
  content?: Partial<typeof contactUsContent.cta> | null;
}) {
  const data = { ...contactUsContent.cta, ...(content ?? {}) };

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Dynamic Glows */}
      <div aria-hidden className="pointer-events-none absolute left-1/4 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/12 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute right-1/4 top-1/2 h-[540px] w-[540px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/9 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div
          className="rounded-[32px] p-px"
          style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.4) 0%, rgba(255,138,0,0.15) 40%, rgba(19,136,8,0.2) 100%)" }}
        >
          <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-[#081425]/95 p-8 text-center backdrop-blur-xl md:p-14">
            <span className="relative inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
              BetIndia
            </span>

            <h2 className="relative mx-auto mt-6 max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
              Ready To Enjoy Premium{" "}
              <span className="block mt-2 bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#138808] bg-clip-text text-transparent">
                Sports Betting & Casino Games?
              </span>
            </h2>

            <p className="relative mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
              {data.description}
            </p>

            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={CTA_LINKS.signup}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/30 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] sm:w-auto"
              >
                {data.primaryCta}
                <span aria-hidden>&rarr;</span>
              </Link>
              <Link
                href={CTA_LINKS.sports}
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00]/40 hover:bg-white/10 sm:w-auto"
              >
                {data.secondaryCta}
              </Link>
            </div>

            {/* Checklist Row */}
            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
              {data.trust.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.02] px-3.5 py-1.5 text-[11px] font-semibold text-slate-400 backdrop-blur-md"
                >
                  <span className="text-[#138808] font-bold">✓</span>
                  {t}
                </span>
              ))}
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-[#FF6B00]/15 bg-[#FF6B00]/5 px-3.5 py-1.5 text-[11px] font-semibold text-[#FF6B00] backdrop-blur-md"
              >
                <span className="h-1 w-1 rounded-full bg-[#FF6B00]" />
                {data.disclaimer}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
