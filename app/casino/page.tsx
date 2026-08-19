import type { Metadata } from "next";
import Link from "next/link";
import CasinoHero from "@/components/sections/casino/CasinoHero";
import LiveCasino from "@/components/sections/casino/LiveCasino";
import SlotsSection from "@/components/sections/casino/SlotsSection";
import TeenPattiSection from "@/components/sections/casino/TeenPattiSection";
import AviatorSection from "@/components/sections/casino/AviatorSection";
import FeaturedGames from "@/components/sections/casino/FeaturedGames";
import CasinoCTA from "@/components/sections/casino/CasinoCTA";
import FAQ from "@/components/sections/FAQ";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RelatedGames from "@/components/sections/RelatedGames";
import InternalLinkGrid from "@/components/sections/InternalLinkGrid";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import casino, { casinoContent } from "@/data/casino";
import { Check } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "casino",
    title: "Online Casino",
    description:
      "Play premium casino games at BetIndia. Live dealers, slots, Teen Patti, Aviator, and 500+ games with fast withdrawals.",
    path: "/casino",
  });
}

export const revalidate = 300;

export default async function CasinoPage() {
  const page = await getPage("casino");
  const heroContent = page.hero || casinoContent.hero;


  const TRUST = [
  "500+ Casino Games",
  "Live Dealers",
  "Fast Withdrawals",
  "Secure Gaming",
] as const;

 
  const about = { ...casinoContent.about, ...(page.about ?? {}) };
  const whyChoose = { ...casinoContent.whyChoose, ...(page.whyChoose ?? {}) };
  const cricketId = { ...casinoContent.cricketId, ...(page.cricketId ?? {}) };
  const platform = { ...casinoContent.platform, ...(page.platform ?? {}) };
  const bestCasino = { ...casinoContent.bestCasino, ...(page.bestCasino ?? {}) };

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
                "name": "Is BetIndia a trusted online casino in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BetIndia offers secure gameplay, fast withdrawals, live casino games, and premium entertainment for players across India.",
                },
              },
              {
                "@type": "Question",
                "name": "Can I play casino games on mobile devices?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, BetIndia is fully optimized for mobile, tablet, and desktop devices, allowing players to enjoy casino games anytime and anywhere.",
                },
              },
              {
                "@type": "Question",
                "name": "Which casino games are most popular on BetIndia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Popular games include Live Blackjack, Live Roulette, Live Baccarat, Online Slots, Teen Patti, and Aviator.",
                },
              },
              {
                "@type": "Question",
                "name": "Can I play Live Casino Games online in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, BetIndia offers Live Blackjack, Live Roulette, and Live Baccarat with professional dealers and real-time gameplay.",
                },
              },
              {
                "@type": "Question",
                "name": "Are online slot games available on BetIndia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, players can enjoy a wide range of online slot games featuring jackpots, bonus rounds, free spins, and exciting themes.",
                },
              },
              {
                "@type": "Question",
                "name": "What makes BetIndia one of the best online casinos in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BetIndia offers live dealer casino games, secure transactions, fast withdrawals, premium gaming entertainment, and a seamless user experience across all devices.",
                },
              },
            ],
          }),
        }}
      />
      <main>
        {/* 1. Hero */}
        <CasinoHero content={heroContent} />
        <Breadcrumbs items={[{ label: "Casino Games" }]} />


        <section className="relative overflow-hidden bg-[#050B18]">  
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
            <ul className="flex flex-wrap justify-center gap-3">
              {TRUST.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 backdrop-blur-md"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                Welcome to BetIndia, a trusted online casino in India offering Live Blackjack, Live Roulette, Live Baccarat, Online Slots, Teen Patti, Aviator, and premium casino entertainment. Enjoy secure gameplay, fast withdrawals, professional live dealers, and an immersive gaming experience designed for players across India.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                Whether you're looking for an online betting ID or immersive casino entertainment, BetIndia offers everything in one platform.
              </p>
              
             
            </div>
          </div>
        </section>

        {/* 2. About Section (Centered Title & Centered Text) */}
        <section className="relative overflow-hidden bg-[#050B18]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
                {about.aboutTitle}
              </h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              {about.aboutText}
            </p>
          </div>
        </section>

        {/* 3. Featured Games */}
        <FeaturedGames content={page.featured} />

        {/* 4. Live Casino */}
        <LiveCasino content={page.liveCasino} />

        {/* 5. Popular Slots */}
        <SlotsSection content={page.popularSlots} />

        {/* 6. Teen Patti */}
        <TeenPattiSection content={page.teenPatti} />

        {/* 7. Aviator */}
        <AviatorSection content={page.aviator} />

        {/* 8. Why Choose Section (Centered Title & Centered Text) */}
        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
                {whyChoose.whyChooseTitle}
              </h2>
            </div>
            <p className="mx-auto text-sm sm:text-base leading-relaxed text-slate-300 whitespace-pre-line">
              {whyChoose.whyChooseText}
            </p>
          </div>
        </section>

        {/* 9. SEO Text Blocks (Editorial Split Stacks) */}
        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
            {/* Cricket ID */}
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl text-center">{cricketId.cricketIdTitle}</h2>
              <p className="mt-5 text-slate-400 text-sm leading-relaxed whitespace-pre-line">{cricketId.cricketIdText}</p>
            </div>

            {/* Platform */}
            <div className="border-t border-white/[0.06] pt-12">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl text-center">{platform.platformTitle}</h2>
              <p className="mt-5 text-slate-400 text-sm leading-relaxed whitespace-pre-line">{platform.platformText}</p>
            </div>

            {/* Best Casino */}
            <div className="border-t border-white/[0.06] pt-12">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl text-center">{bestCasino.bestCasinoTitle}</h2>
              <p className="mt-5 text-slate-400 text-sm leading-relaxed whitespace-pre-line">{bestCasino.bestCasinoText}</p>
            </div>
          </div>
        </section>

        {/* 10. Final CTA */}
        <CasinoCTA content={page.finalCta} />

        {/* 10. Related Games */}
        <RelatedGames currentGamePath="/casino" />

        {/* Deep Internal Link Grid */}
        <InternalLinkGrid />

        {/* 11. FAQ */}
        <FAQ content={page.faq} defaultContent={casinoContent.faq} />
      </main>
    </>
  );
}
