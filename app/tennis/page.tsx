import type { Metadata } from "next";
import TennisHero from "@/components/sections/tennis/TennisHero";
import LiveTennisMarkets from "@/components/sections/tennis/LiveTennisMarkets";
import TennisTournaments from "@/components/sections/tennis/TennisTournaments";
import TennisTips from "@/components/sections/tennis/TennisTips";
import TennisCTA from "@/components/sections/tennis/TennisCTA";
import FAQ from "@/components/sections/FAQ";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import tennis, { tennisContent } from "@/data/tennis";
import { Activity, BarChart3, ShieldCheck, Zap } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "tennis",
    title: "Tennis Betting India | Live Tennis Betting & ATP/WTA Odds | BetIndia",
    description:
     "Bet on tennis with live tennis betting, ATP & WTA odds, Grand Slam betting, Wimbledon betting, and real-time tennis betting markets. Enjoy secure gameplay, fast withdrawals, and premium online tennis betting at BetIndia.",
    path: "/tennis",
  });
}

export const revalidate = 300;

function CenteredSeoSection({
  title,
  text,
  gradientWord,
}: {
  title: string;
  text: string;
  gradientWord?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
          {gradientWord && title.includes(gradientWord) ? (
            <>
              {title.split(gradientWord)[0]}
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
                {gradientWord}
              </span>
              {title.split(gradientWord)[1]}
            </>
          ) : (
            title
          )}
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-slate-300 whitespace-pre-line sm:text-base">
          {text}
        </p>
      </div>
    </section>
  );
}

export default async function TennisPage() {
  const page = await getPage("tennis");
  const heroContent = page.hero || tennisContent.hero;
  const seoBlocks = { ...tennisContent.seoBlocks, ...(page.seoBlocks ?? {}) };

  const TRUST = [
  { icon: Activity, text: "Live Tennis Odds" },
  { icon: Zap, text: "In-Play Betting" },
  { icon: BarChart3, text: "Point-by-Point Stats" },
  { icon: ShieldCheck, text: "Fast Withdrawals" },
] as const;

  return (
    <>
      <main>
        <TennisHero content={heroContent} />
        <section className="relative overflow-hidden bg-[#050B18]">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
            <ul className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
              {TRUST.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-3 backdrop-blur-md"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00]">
                    <Icon size={14} strokeWidth={2} />
                  </span>
                  <span className="text-xs font-semibold leading-snug text-slate-300">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                Bet on the world's biggest tennis tournaments with competitive tennis betting odds, live tennis betting, and exciting in-play betting markets at BetIndia. As one of the leading destinations for online tennis betting in India, BetIndia offers real-time odds, secure gameplay, fast withdrawals, and extensive betting markets across every major tournament.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                Whether you're betting on a Grand Slam final, an ATP Tour match, or a WTA tournament, BetIndia offers extensive tennis betting markets, live tennis odds, and a seamless betting experience across desktop and mobile devices.
              </p>
            </div>

            <div className="border-t border-white/10 pt-8 space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                  How to Bet on Tennis at BetIndia
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Getting started with tennis betting is simple. Follow these steps to place your bet:
                </p>
              </div>

              <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Create or log in to your BetIndia account.",
                  "Navigate to the Tennis Betting section.",
                  "Choose an upcoming or live tennis match.",
                  "Select your preferred betting market, such as Match Winner, Set Winner, or Total Games.",
                  "Enter your stake and confirm your bet.",
                  "Follow the match live and track your bet in real time."
                ].map((step, index) => (
                  <li key={index} className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FF6B00]/10 text-xs font-bold text-[#FF6B00]">
                      {index + 1}
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <LiveTennisMarkets />
        <TennisTournaments />
        <CenteredSeoSection
          title={seoBlocks.whyChooseTitle}
          text={seoBlocks.whyChooseText}
          gradientWord="BetIndia"
        />
        <CenteredSeoSection
          title={seoBlocks.oddsTitle}
          text={seoBlocks.oddsText}
          gradientWord="Odds"
        />
        <TennisTips />
        <FAQ content={page.faq} defaultContent={tennisContent.faq} />
        <TennisCTA content={page.cta} />
      </main>
    </>
  );
}
