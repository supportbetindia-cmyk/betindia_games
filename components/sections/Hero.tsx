import Link from "next/link";
import HeroImage from "@/components/sections/HeroImage";
import MobileHeroBanner from "@/components/sections/MobileHeroBanner";
import { CTA_LINKS } from "@/lib/cta-links";
import { homeContent } from "@/data/home";

export default function Hero({content,}: {
  content?: Partial<typeof homeContent.hero> | null;
})
 {
  
  const data = { ...homeContent.hero, ...(content ?? {}) };
  return (
    <>
      <MobileHeroBanner
        image={(data as { imageUrlMobile?: string }).imageUrlMobile || data.imageUrl}
        title={data.title}
        highlightedTitle={data.highlightedTitle}
        description={data.description}
        primaryHref={CTA_LINKS.sports}
        primaryLabel={data.ctaPrimary}
        secondaryHref={CTA_LINKS.casino}
        secondaryLabel={data.ctaSecondary}
      />
      <section className="relative hidden items-center overflow-hidden bg-[#050B18] min-h-[480px] sm:min-h-[400px] md:flex md:min-h-[500px]">
      {/* Background Image from URL */}
      {data.imageUrl && (
        <div className="absolute  pointer-events-none select-none">
          <img
            src={data.imageUrl}
            alt=""
            className="w-full h-full object-cover object-right  sm:object-center"
          />
        </div>
      )}

     

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-[58px] sm:px-6 lg:px-8 lg:py-[86px]">
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-3xl">

          <h1 className="mt-6 text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,5vw,4rem)]">
            {data.title} {data.highlightedTitle}
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300 md:text-lg">
            {data.description}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href={CTA_LINKS.sports}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A00] sm:w-auto"
            >
              {data.ctaPrimary}
              <span aria-hidden>&rarr;</span>
            </Link>
            <Link
              href={CTA_LINKS.casino}
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A00] sm:w-auto"
            >
              {data.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      </section>
    </>
  );
}
