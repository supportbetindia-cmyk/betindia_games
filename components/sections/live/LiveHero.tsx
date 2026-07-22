import Link from "next/link";
import { Activity, Wallet, BarChart3, Zap } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import MobileHeroBanner from "@/components/sections/MobileHeroBanner";
import { liveContent } from "@/data/live";

const TRUST = [
  { icon: Activity, text: "Real-Time Odds" },
  { icon: Zap,      text: "Instant Cashout" },
  { icon: BarChart3, text: "Live Match Stats" },
  { icon: Wallet,   text: "Fast Settlements" },
] as const;

export default function LiveHero({ content }: { content?: { imageUrl?: string } | null }) {
  return (
    <>
      <MobileHeroBanner
        image={
          (content as { imageUrlMobile?: string } | null)?.imageUrlMobile ||
          content?.imageUrl
        }
        title={liveContent.hero.title}
        description={liveContent.hero.description}
        primaryHref="#live-events"
        primaryLabel={liveContent.hero.primaryCta}
        secondaryHref={CTA_LINKS.signup}
        secondaryLabel={liveContent.hero.secondaryCta}
      />
      <section className="relative hidden items-center overflow-hidden bg-[#050B18] min-h-[480px] sm:min-h-[400px] md:flex md:min-h-[500px]">
      {content?.imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src={content.imageUrl}
            alt=""
            className="w-full h-full object-cover object-right sm:object-center"
          />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-[58px] sm:px-6 lg:px-8 lg:py-[86px]">
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-3xl">
          <h1 className="mt-6 text-3xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,5vw,4rem)]">
            {liveContent.hero.title}
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300">
            {liveContent.hero.description}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href="#live-events"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/40 sm:w-auto"
            >
              {liveContent.hero.primaryCta}
              <span aria-hidden>&rarr;</span>
            </a>
            <Link
              href={CTA_LINKS.signup}
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00] hover:bg-white/10 sm:w-auto"
            >
              {liveContent.hero.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
