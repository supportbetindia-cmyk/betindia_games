import Link from "next/link";
import { Activity, ShieldCheck, Zap, BarChart3 } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import MobileHeroBanner from "@/components/sections/MobileHeroBanner";
import { cricketContent } from "@/data/cricket";


const MARKETS = [
  "Match Winner",
  "Top Batsman",
  "Top Bowler",
  "Over/Under",
  "Toss Winner",
  "Session Betting",
] as const;

export default function CricketHero({ content }: { content?: Partial<typeof cricketContent.hero> | null }) {
  const data = { ...cricketContent.hero, ...(content ?? {}) };

  return (
    <>
      <MobileHeroBanner
        image={data.imageUrlMobile || data.imageUrl}
        title={data.title}
        description={data.description}
        primaryHref={CTA_LINKS.signup}
        secondaryHref="#cricket-matches"
        secondaryLabel="View Matches"
      />
      <section className="relative hidden items-center overflow-hidden bg-[#050B18] min-h-[480px] sm:min-h-[400px] md:flex md:min-h-[500px]">
      {data.imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src={data.imageUrl}
            alt=""
            className="w-full h-full object-cover object-right sm:object-center"
          />
        </div>
      )}
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#FF6B00]/12 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-20 h-[460px] w-[460px] rounded-full bg-[#138808]/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-[58px] sm:px-6 lg:px-8 lg:py-[86px]">
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-3xl">

          <h1 className="mt-6 text-3xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,5vw,4rem)]">
            {data.title}
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">
            {data.description}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href={CTA_LINKS.signup}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/40 sm:w-auto"
            >
              Start Betting
              <span aria-hidden>&rarr;</span>
            </Link>
            <a
              href="#cricket-matches"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00] hover:bg-white/10 sm:w-auto"
            >
              View Matches
            </a>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
