import MobileHeroBanner from "@/components/sections/MobileHeroBanner";
import { liveCasinoPageContent } from "@/data/live-casino";

export default function LiveCasinoHero({
  content,
}: {
  content?: Partial<typeof liveCasinoPageContent.hero> | null;
}) {
  const data = { ...liveCasinoPageContent.hero, ...(content ?? {}) };
  const heroImage = data.imageUrl?.trim() || liveCasinoPageContent.hero.imageUrl;

  return (
    <>
      <MobileHeroBanner
        image={(data as { imageUrlMobile?: string }).imageUrlMobile || heroImage}
        title="Real Dealers."
        highlightedTitle="Real Action."
        description="Authentic casino entertainment with professional live dealers and real-time gameplay."
        primaryHref="#live-tables"
        primaryLabel="Join Live Tables"
        secondaryHref="#live-games"
        secondaryLabel="Explore Games"
      />
      <section className="relative hidden items-center overflow-hidden bg-[#050B18] min-h-[480px] sm:min-h-[400px] md:flex md:min-h-[500px]">
      {heroImage && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src={heroImage}
            alt={data.imageAlt || ""}
            className="h-full w-full object-cover object-right sm:object-center"
          />
        </div>
      )}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-[58px] sm:px-6 lg:px-8 lg:py-[86px]">
        {/* LEFT */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B00] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
            </span>
            Live Casino
          </span>

          <h1 className="mt-6 text-3xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,5vw,4rem)]">
            Real Dealers.{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Real Action.
            </span>{" "}
            Real Excitement.
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">
            Experience authentic casino entertainment with professional live dealers, real-time gameplay, premium tables, and interactive gaming action from anywhere.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href="#live-tables"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/40 sm:w-auto"
            >
              Join Live Tables
              <span aria-hidden>&rarr;</span>
            </a>
            <a
              href="#live-games"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00] hover:bg-white/10 sm:w-auto"
            >
              Explore Games
            </a>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
