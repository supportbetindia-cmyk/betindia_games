import Link from "next/link";
import { casinoContent } from "@/data/casino";
import { CTA_LINKS } from "@/lib/cta-links";

export default function CasinoSeoContent({ pageContent }: { pageContent?: Partial<typeof casinoContent> | null }) {
  const about = { ...casinoContent.about, ...(pageContent?.about ?? {}) };
  const featured = { ...casinoContent.featured, ...(pageContent?.featured ?? {}) };
  const liveCasino = { ...casinoContent.liveCasino, ...(pageContent?.liveCasino ?? {}) };
  const popularSlots = { ...casinoContent.popularSlots, ...(pageContent?.popularSlots ?? {}) };
  const teenPatti = { ...casinoContent.teenPatti, ...(pageContent?.teenPatti ?? {}) };
  const aviator = { ...casinoContent.aviator, ...(pageContent?.aviator ?? {}) };
  const whyChoose = { ...casinoContent.whyChoose, ...(pageContent?.whyChoose ?? {}) };
  const cricketId = { ...casinoContent.cricketId, ...(pageContent?.cricketId ?? {}) };
  const platform = { ...casinoContent.platform, ...(pageContent?.platform ?? {}) };
  const bestCasino = { ...casinoContent.bestCasino, ...(pageContent?.bestCasino ?? {}) };
  const finalCta = { ...casinoContent.finalCta, ...(pageContent?.finalCta ?? {}) };

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Ambient Glows */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#FF6B00]/5 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#138808]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Main 2-column Grid for SEO text blocks */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          
          {/* LEFT COLUMN: About & Featured Info */}
          <div className="space-y-10">
            {/* About Section */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md">
              <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                {about.aboutTitle}
              </h2>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-[#FF6B00] to-[#138808] rounded-full" />
              <p className="mt-5 text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                {about.aboutText}
              </p>
            </div>

            {/* Featured Games Info */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md">
              <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                {featured.featuredTitle}
              </h2>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-[#FF6B00] to-[#138808] rounded-full" />
              <p className="mt-5 text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                {featured.featuredText}
              </p>
            </div>

            {/* Why Choose BetIndia */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md">
              <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                {whyChoose.whyChooseTitle}
              </h2>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-[#FF6B00] to-[#138808] rounded-full" />
              <p className="mt-5 text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                {whyChoose.whyChooseText}
              </p>
            </div>

            {/* Cricket ID Provider */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md">
              <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                {cricketId.cricketIdTitle}
              </h2>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-[#FF6B00] to-[#138808] rounded-full" />
              <p className="mt-5 text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                {cricketId.cricketIdText}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Game details & Platforms */}
          <div className="space-y-10">
            {/* Live Casino Info */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md">
              <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                {liveCasino.liveCasinoTitle}
              </h2>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-[#FF6B00] to-[#138808] rounded-full" />
              <p className="mt-5 text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                {liveCasino.liveCasinoText}
              </p>

              {/* Sub-blocks for specific live games */}
              <div className="mt-6 space-y-6 border-t border-white/[0.06] pt-6">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">{liveCasino.liveBlackjackTitle}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{liveCasino.liveBlackjackText}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">{liveCasino.liveRouletteTitle}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{liveCasino.liveRouletteText}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">{liveCasino.liveBaccaratTitle}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{liveCasino.liveBaccaratText}</p>
                </div>
              </div>
            </div>

            {/* Popular Slots Section */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md">
              <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                {popularSlots.popularSlotsTitle}
              </h2>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-[#FF6B00] to-[#138808] rounded-full" />
              <p className="mt-5 text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                {popularSlots.popularSlotsText}
              </p>
            </div>

            {/* Teen Patti Section */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md">
              <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                {teenPatti.teenPattiTitle}
              </h2>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-[#FF6B00] to-[#138808] rounded-full" />
              <p className="mt-5 text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                {teenPatti.teenPattiText}
              </p>
            </div>

            {/* Aviator Section */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md">
              <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                {aviator.aviatorTitle}
              </h2>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-[#FF6B00] to-[#138808] rounded-full" />
              <p className="mt-5 text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                {aviator.aviatorText}
              </p>
            </div>
          </div>

        </div>

        {/* Dynamic SEO Text blocks below */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white">{platform.platformTitle}</h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-400 whitespace-pre-line">{platform.platformText}</p>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white">{bestCasino.bestCasinoTitle}</h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-400 whitespace-pre-line">{bestCasino.bestCasinoText}</p>
          </div>
        </div>

        {/* BOTTOM PANEL: Ready to Experience Casino Gaming CTA */}
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-[#FF6B00]/30 bg-gradient-to-br from-[#081425] via-[#050B18] to-[#0a1e36] p-8 text-center sm:p-12">
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#FF6B00]/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-[#138808]/10 blur-2xl" />

          <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
            {finalCta.finalCtaTitle}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {finalCta.finalCtaText}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={CTA_LINKS.signup}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition hover:bg-[#FF8A00]"
            >
              Play Now
              <span aria-hidden>&rarr;</span>
            </Link>
            <Link
              href="/casino#live-casino"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition hover:border-[#FF6B00] hover:bg-white/10"
            >
              Join Live Tables
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
