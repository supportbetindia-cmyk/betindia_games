import type { Metadata } from "next";
import SportsHero from "@/components/sections/sports/SportsHero";
import LiveMatches from "@/components/sections/sports/LiveMatches";
import PopularSports from "@/components/sections/sports/PopularSports";
import BettingMarkets from "@/components/sections/sports/BettingMarkets";
import SportsCTA from "@/components/sections/sports/SportsCTA";
import FAQ from "@/components/sections/FAQ";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RelatedSports from "@/components/sections/RelatedSports";
import InternalLinkGrid from "@/components/sections/InternalLinkGrid";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import sports, { sportsContent } from "@/data/sports";
import { Activity, ShieldCheck, TrendingUp, ZapIcon } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "sports",
    title: "Live Cricket Betting & Sports Betting Markets India | BetIndia ",
    description:
      "Enjoy live cricket betting and sports betting on football, tennis, kabaddi, and more. Get competitive odds, live markets, secure payments, and fast withdrawals at BetIndia.",
    path: "/sports",
  });
}

export const revalidate = 300;

const BETTING_MARKETS = [
  "Match Winner", "Toss Winner", "Top Batsman", "Top Bowler",
  "Over/Under Runs", "Both Teams to Score", "Player Performance",
] as const;

const FEATURES = [
  { icon: Activity,    title: "Live Betting",      sub: "Real-time odds" },
  { icon: ZapIcon,         title: "Fast Withdrawals",  sub: "Instant payouts" },
  { icon: ShieldCheck, title: "Secure Platform",   sub: "100% protected" },
  { icon: TrendingUp,  title: "Real-Time Markets", sub: "500+ markets" },
] as const;

export default async function SportsPage() {
  const page = await getPage("sports");
  const heroContent = {
    pageId: "sports",
    path: "/sports",
    name: "Sports Betting",
    ...sportsContent.hero,
    ...(page.hero ?? {}),
  };

  // Merge sections with fallbacks
  const whyBet = { ...sportsContent.whyBet, ...(page.whyBet ?? {}) };
  const whyBetItems = whyBet.items && whyBet.items.length > 0 ? whyBet.items : sportsContent.whyBet.items;

  const liveCricket = { ...sportsContent.liveCricket, ...(page.liveCricket ?? {}) };


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is live sports betting?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Live sports betting allows players to place bets while a match is in progress with odds updating in real time.",
                },
              },
              {
                "@type": "Question",
                "name": "Which sports can I bet on?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can bet on cricket, football, tennis, badminton, volleyball, kabaddi, and many other sports.",
                },
              },
              {
                "@type": "Question",
                "name": "What betting markets are available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Popular markets include Match Winner, Toss Winner, Top Batsman, Top Bowler, and Over/Under betting.",
                },
              },
              {
                "@type": "Question",
                "name": "Are withdrawals processed quickly?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most withdrawals are processed quickly through supported payment methods.",
                },
              },
            ],
          }),
        }}
      />
      <main>
        {/* 1. Hero */}
        <SportsHero content={heroContent} />
        <Breadcrumbs items={[{ label: "Sports Betting" }]} />

        <section className="relative overflow-hidden bg-[#050B18]">
          <div className="mx-auto max-w-7xl space-y-9 px-4 py-6 sm:px-6 lg:px-8">
            <ul className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-4">
              {FEATURES.map(({ icon: Icon, title, sub }) => (
                <li key={title} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-[#FF6B00] backdrop-blur-md">
                    <Icon size={16} strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{title}</span>
                    <span className="block text-xs text-slate-400">{sub}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              Experience the excitement of real-time sports betting with live markets, competitive odds, and seamless gameplay. From cricket and football to tennis, kabaddi, and more, BetIndia gives you access to a wide range of betting opportunities backed by fast payouts and a secure platform.
            </p>
          </div>
        </section>






        {/* 2. Why Bet with Us? */}
        <section className="relative overflow-hidden bg-[#050B18]">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/7 blur-2xl" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
                {whyBet.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {whyBetItems.map((item: { title: string; description: string }, i: number) => {
                const Icon = FEATURES[i]?.icon ?? FEATURES[0].icon;
                return (
                  <div
                    key={item.title}
                    className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B00]/40 hover:bg-white/[0.07]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00]">
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Live Cricket Betting (Centered Title & Centered Text) */}
        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
                {liveCricket.title}
              </h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              {liveCricket.text}
            </p>
          </div>
        </section>

 

        {/* 5. Explore Popular Sports */}
        <PopularSports content={page.popularSports} />

        {/* 6. Popular Betting Markets */}
        <BettingMarkets content={page.bettingMarkets} />

        {/* Live Cricket Betting & Sports Betting Markets */}
        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 space-y-14">

            {/* Block 1 — Live Cricket Betting */}
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl text-center">
                Live Cricket Betting &amp; Sports Betting Markets
              </h2>
              
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300">
                BetIndia provides a complete online sports betting experience with live cricket betting, football betting, tennis markets, kabaddi betting, and more. Access real-time odds, in-play betting opportunities, secure transactions, and fast withdrawals from a single platform.
              </p>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
                Our sportsbook covers domestic and international competitions, allowing players to bet on match winners, toss outcomes, player performances, over/under markets, and many other popular betting options.
              </p>
            </div>

            {/* Block 2 — Sportsbook */}
            <div className="border-t border-white/[0.06] pt-12">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl text-center">
                Sportsbook for Cricket, Football &amp; More
              </h2>
             
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300">
                BetIndia offers a complete sportsbook experience covering cricket, football, tennis, badminton, volleyball, kabaddi, and other popular sports. With live betting, pre-match markets, competitive odds, and secure transactions, players can enjoy a seamless betting experience across multiple sporting events.
              </p>
            </div>

            {/* Block 3 — Betting Markets Available */}
            <div className="border-t border-white/[0.06] pt-12">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl text-center">
                Sports Betting Markets Available
              </h2>
             
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300">
                Players can explore a variety of betting markets including Match Winner, Toss Winner, Top Batsman, Top Bowler, Over/Under Runs, Both Teams to Score, and Player Performance Markets. With live betting available throughout the match, users can place bets based on changing odds and real-time game situations.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {BETTING_MARKETS.map((market) => (
                  <span
                    key={market}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-slate-400 transition-colors duration-200 hover:border-[#FF6B00]/40 hover:text-[#FF6B00]"
                  >
                    {market}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Related Sports Cross-Linking */}
        <RelatedSports currentSportPath="/sports" />

        {/* Deep Internal Link Grid */}
        <InternalLinkGrid />

        {/* 11. FAQ Accordions */}
        <FAQ content={page.faq} defaultContent={sportsContent.faq} />

        {/* 12. Final CTA Section */}
        <SportsCTA content={page.finalCta} />
      </main>
    </>
  );
}