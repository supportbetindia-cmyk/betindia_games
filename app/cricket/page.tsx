import type { Metadata } from "next";
import CricketHero from "@/components/sections/cricket/CricketHero";
import CricketMarkets from "@/components/sections/cricket/CricketMarkets";
import LiveCricketMatches from "@/components/sections/LiveCricketMatches";
import WhyBetOnCricket from "@/components/sections/cricket/WhyBetOnCricket";
import CricketCTA from "@/components/sections/cricket/CricketCTA";
import FAQ from "@/components/sections/FAQ";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import cricket, { cricketContent } from "@/data/cricket";
import { Activity, BarChart3, ShieldCheck, Zap } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "cricket",
    title: "Cricket Betting",
    description:
      "Live cricket betting on IPL, Test matches, ODI, and T20. Real-time ball-by-ball odds, competitive betting markets, and instant withdrawals on BetIndia.",
    path: "/cricket",
  });
}

export const revalidate = 300;

export default async function CricketPage() {
  const page = await getPage("cricket");
  const heroContent = page.hero || cricketContent.hero;

  const seoBlocks = { ...cricketContent.seoBlocks, ...(page.seoBlocks ?? {}) };

  const TRUST = [
    { icon: Activity,    text: "Ball-by-Ball Odds"   },
    { icon: Zap,         text: "Instant Cashout"      },
    { icon: BarChart3,   text: "500+ Markets"         },
    { icon: ShieldCheck, text: "Secure & Licensed"    },
  ] as const;


  return (
    <>
      <main>
        {/* 1. Hero */}
        <CricketHero content={heroContent} />

        <section className="relative overflow-hidden bg-[#050B18]">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
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
          </div>
        </section>

        {/* 2. Cricket Betting in India (Centered Title & Centered Text) */}
        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
            
              <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
                {seoBlocks.cricketBettingTitle}
              </h2>
            </div>
            <p className="mx-auto text-sm sm:text-base leading-relaxed text-slate-300 whitespace-pre-line">
              {seoBlocks.cricketBettingText}
            </p>
          </div>
        </section>

        {/* 3. Cricket Markets */}
        <CricketMarkets />

       
        {/* 5. Live Cricket Betting */}
        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
                Live Betting
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-center">
                {seoBlocks.liveCricketBettingTitle}
              </h2>
            </div>
            <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
              {seoBlocks.liveCricketBettingText}
            </div>
          </div>
        </section>

        {/* 6. Why Bet On Cricket */}
        <WhyBetOnCricket />

        {/* 7. Why Cricket Fans Choose BetIndia */}
        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
                Why BetIndia
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-center">
                {seoBlocks.whyChooseTitle}
              </h2>
            </div>
            <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
              {seoBlocks.whyChooseText}
            </div>
          </div>
        </section>

        {/* 8. Cricket CTA */}
        <CricketCTA />

        {/* 9. Dynamic FAQ Block */}
        <FAQ content={page.faq} defaultContent={cricketContent.faq} />
      </main>
    </>
  );
}
