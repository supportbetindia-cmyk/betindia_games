import type { Metadata } from "next";
import LiveHero from "@/components/sections/live/LiveHero";
import LiveFeatures from "@/components/sections/live/LiveFeatures";
import LiveInPlayBetting from "@/components/sections/live/LiveInPlayBetting";
import LiveEventsPreview from "@/components/sections/live/LiveEventsPreview";
import HowLiveBettingWorks from "@/components/sections/live/HowLiveBettingWorks";
import PopularLiveMarkets from "@/components/sections/live/PopularLiveMarkets";
import WhyChooseLiveBetting from "@/components/sections/live/WhyChooseLiveBetting";
import LiveMarketsAvailable from "@/components/sections/live/LiveMarketsAvailable";
import LiveCTA from "@/components/sections/live/LiveCTA";
import FAQ from "@/components/sections/FAQ";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import { liveContent } from "@/data/live";
import { ActivityIcon, BarChart3, Wallet, Zap } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "live",
    title: "Live Betting & In-Play Sports Betting",
    description:
      "Bet in real time on live cricket, football, tennis and more. Real-time odds, instant cashout, and exciting in-play betting opportunities.",
    path: "/live",
  });
}

const ACCENT_COLORS = ["#FF6B00", "#138808"] as const;

export default async function LivePage() {
  const page = await getPage("live");

  const seoSections = [
    {
      title: liveContent.seoBlocks.whyChooseTitle,
      text: liveContent.seoBlocks.whyChooseText,
    },
    {
      title: liveContent.seoBlocks.experienceTitle,
      text: liveContent.seoBlocks.experienceText,
    },
  ];

  
const TRUST = [
  { icon: ActivityIcon, text: "Real-Time Odds" },
  { icon: Zap,      text: "Instant Cashout" },
  { icon: BarChart3, text: "Live Match Stats" },
  { icon: Wallet,   text: "Fast Settlements" },
] as const;

  return (
    <>
      <main>
        <LiveHero content={page.hero} />
        <section className="relative overflow-hidden bg-[#050B18]">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
            <ul className="mt-9 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
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
                Experience live cricket betting, football betting, and casino action with real-time odds, instant updates, and exciting in-play betting opportunities. Follow every moment as it happens and place bets based on live match conditions, player performance, and changing game momentum.
              </p>
            </div>
          </div>
        </section>
        <LiveFeatures />
        <LiveInPlayBetting />
        <LiveEventsPreview />
        <HowLiveBettingWorks />
        <PopularLiveMarkets />
        <WhyChooseLiveBetting />
        <LiveMarketsAvailable />

        {/* SEO editorial blocks */}
        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
            {seoSections.map((block, index) => (
              <div
                key={block.title}
                className={index > 0 ? "border-t border-white/[0.06] pt-12" : ""}
              >
                <div className="text-center mb-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: ACCENT_COLORS[index] }}
                    />
                    BetIndia
                  </span>
                  <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl text-center">
                    {block.title}
                  </h2>
                </div>
                <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-line sm:text-base">
                  {block.text}
                </div>
              </div>
            ))}
          </div>
        </section>

        <FAQ content={liveContent.faq} defaultContent={liveContent.faq} />
        <LiveCTA />
      </main>
    </>
  );
}
