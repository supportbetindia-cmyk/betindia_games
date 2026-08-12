import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import { HudCorners } from "@/components/sections/kabaddi/KabaddiHud";
import MobileHeroBanner from "@/components/sections/MobileHeroBanner";
import { aviatorContent } from "@/data/aviator";

const ORANGE = "#FF6B00";

export default function BetIndiaHero({
  content,
}: {
  content?: Partial<typeof aviatorContent.hero> & {
    primaryCta?: string;
    secondaryCta?: string;
    paragraphs?: string[];
  } | null;
}) {
  const data = { ...aviatorContent.hero, ...content };
  const heroImage = data.imageUrl?.trim();

  return (
    <>
      <MobileHeroBanner
        image={(data as { imageUrlMobile?: string }).imageUrlMobile || heroImage}
        title={data.title}
        description={data.description}
        primaryHref={CTA_LINKS.signup}
        primaryLabel={data.primaryCta}
        secondaryHref="#how-to-play-aviator-on-bet-india"
        secondaryLabel={data.secondaryCta}
      />
      <section className="relative hidden items-center overflow-hidden bg-[#050B18] min-h-[480px] sm:min-h-[400px] md:flex md:min-h-[500px]">
      {heroImage && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src={heroImage}
            alt={data.imageAlt || ""}
            className="h-full w-full object-cover"
          />
        </div>
      )}


      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-[58px] sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-[86px]">
        <div className="flex max-w-3xl flex-col items-center text-center md:items-start md:text-left">
          <h1 className="mt-4 text-3xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,5vw,3.75rem)]">
            {data.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">{data.description}</p>
          {data.paragraphs?.map((p) => (
            <p key={p.slice(0, 30)} className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {p}
            </p>
          ))}

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href={CTA_LINKS.signup}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] sm:w-auto"
            >
              {data.primaryCta}
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
            <a
              href="#how-to-play-aviator-on-bet-india"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00] hover:bg-white/10 sm:w-auto"
            >
              {data.secondaryCta}
            </a>
          </div>
        </div>


      </div>
      </section>
    </>
  );
}
