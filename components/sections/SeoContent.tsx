import Link from "next/link";
import { homeContent } from "@/data/home";
import { CTA_LINKS } from "@/lib/cta-links";

// Defaults span the `about` + `cricket` home sections (the old single `seo`
// section was split into per-topic sections in data/home.js).
const SEO_DEFAULTS = { ...homeContent.about, ...homeContent.cricket };

export default function SeoContent({ content }: { content?: Partial<typeof SEO_DEFAULTS> | null }) {
  const data = { ...SEO_DEFAULTS, ...(content ?? {}) };

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Ambient Glows */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#FF6B00]/6 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#138808]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Main Grid for About / Cricket ID / SEO sections */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          
          {/* LEFT COLUMN: About & Cricket ID */}
          <div className="space-y-10">
            {/* About Section */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md">
              <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                {data.aboutTitle}
              </h2>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-[#FF6B00] to-[#138808] rounded-full" />
              <p className="mt-5 text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                {data.aboutText}
              </p>
            </div>

            {/* Get Your Cricket Betting ID */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md">
              <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                {data.cricketIdTitle}
              </h2>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-[#FF6B00] to-[#138808] rounded-full" />
              <p className="mt-5 text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                {data.cricketIdText}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Trusted Provider & Sportsbook Platform */}
          <div className="space-y-10">
            {/* Trusted Provider */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md">
              <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                {data.trustedProviderTitle}
              </h2>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-[#FF6B00] to-[#138808] rounded-full" />
              <p className="mt-5 text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                {data.trustedProviderText}
              </p>
            </div>

            {/* Sportsbook Platform */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md">
              <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                {data.sportsbookPlatformTitle}
              </h2>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-[#FF6B00] to-[#138808] rounded-full" />
              <p className="mt-5 text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                {data.sportsbookPlatformText}
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM PANEL: Play Smart. Win Bigger CTA */}
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-[#FF6B00]/30 bg-gradient-to-br from-[#081425] via-[#050B18] to-[#0a1e36] p-8 text-center sm:p-12">
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#FF6B00]/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-[#138808]/10 blur-2xl" />

          <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
            {data.playSmartTitle}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {data.playSmartText}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={CTA_LINKS.signup}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition hover:bg-[#FF8A00]"
            >
              Get Your Betting ID
              <span aria-hidden>&rarr;</span>
            </Link>
            <Link
              href="/casino"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition hover:border-[#FF6B00] hover:bg-white/10"
            >
              Explore Casino
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
