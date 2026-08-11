import type { Metadata } from "next";
import Link from "next/link";
import { CTA_LINKS } from "@/lib/cta-links";
import LiveCasinoHero from "@/components/sections/live-casino/LiveCasinoHero";
import LiveDealerGames from "@/components/sections/live-casino/LiveDealerGames";
import WhyLiveCasino from "@/components/sections/live-casino/WhyLiveCasino";
import FeaturedTables from "@/components/sections/live-casino/FeaturedTables";
import LiveCasinoCTA from "@/components/sections/live-casino/LiveCasinoCTA";
import FAQ from "@/components/sections/FAQ";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RelatedGames from "@/components/sections/RelatedGames";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import { Users, Video, Zap, ShieldCheck } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "live-casino",
    title: "Live Casino",
    description:
      "Play Live Roulette, Blackjack, Baccarat, Teen Patti Live, Andar Bahar Live, Aviator, Crazy Time, and more on BetIndia's premium live casino platform.",
    path: "/live-casino",
  });
}

export const revalidate = 300;

export default async function LiveCasinoPage() {
  const page = await getPage("live-casino");

  const TRUST = [
    { icon: Users,      text: "Live Dealers"        },
    { icon: Video,      text: "Real-Time Gameplay"  },
    { icon: Zap,        text: "Instant Results"     },
    { icon: ShieldCheck, text: "Secure Gaming"      },
  ] as const;

  const pageFaqs = {
    items: [
      {
        question: "What is a live casino?",
        answer: "A live casino is an online casino experience where real dealers host games in real time through HD video streaming, allowing players to participate remotely."
      },
      {
        question: "Which live casino games are available?",
        answer: "Players can enjoy Live Roulette, Live Blackjack, Live Baccarat, Teen Patti Live, Andar Bahar Live, Aviator, Crazy Time, and other live dealer games."
      },
      {
        question: "Can I play live casino games on mobile devices?",
        answer: "Yes. BetIndia's live casino platform is fully optimized for mobile, tablet, and desktop devices."
      },
      {
        question: "Do live casino games use real dealers?",
        answer: "Yes. Live casino games are hosted by professional dealers who manage gameplay in real time through live video streaming."
      },
      {
        question: "What are the most popular live casino games?",
        answer: "Some of the most popular live casino games include Live Roulette, Live Blackjack, Live Baccarat, Teen Patti Live, Andar Bahar Live, and interactive game shows."
      }
    ]
  };

  return (
    <>
      <main>
        <LiveCasinoHero content={page.hero} />
        <Breadcrumbs items={[{ label: "Casino Games", href: "/casino" }, { label: "Live Dealer Casino" }]} />

        {/* 1. Trust & Intro (Welcome description) */}
        <section className="relative overflow-hidden bg-[#050B18]">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
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
                Live casino games bring the excitement of a traditional casino together with the convenience of online play. BetIndia offers a premium live casino experience featuring professional dealers, HD streaming, live roulette, live blackjack, live baccarat, and real-time gameplay across a wide range of popular casino games.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                Players can enjoy authentic casino action from anywhere while interacting with live dealers and participating in immersive gaming sessions. Whether you're joining a live roulette table, playing blackjack, enjoying baccarat, or exploring popular games like Teen Patti and Aviator, BetIndia delivers a realistic and engaging live casino experience.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Existing Content Components */}
        <LiveDealerGames />
        <WhyLiveCasino />
        <FeaturedTables />
        <LiveCasinoCTA />

        {/* 3. Live Casino Games With Real Dealers */}
        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
                Live Casino Games With Real Dealers
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                Experience real-time gaming with professionally hosted live casino tables. Whether you prefer Live Roulette, Live Blackjack, Live Baccarat, Teen Patti, Andar Bahar, or interactive game shows, BetIndia delivers an engaging and realistic casino environment.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                Live dealers manage every game in real time, creating a transparent and interactive experience for players.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Popular Live Casino Games */}
        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
                Popular Live Casino Games
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                BetIndia features a wide range of live casino games designed to suit different playing styles and preferences.
              </p>
              
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  "Live Roulette",
                  "Live Blackjack",
                  "Live Baccarat",
                  "Teen Patti Live",
                  "Andar Bahar Live",
                  "Aviator",
                  "Crazy Time",
                  "Live Game Shows"
                ].map((game) => (
                  <div key={game} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                    <span className="text-sm font-semibold text-slate-300">{game}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                Each game offers real-time gameplay, professional dealers, and interactive features designed to enhance the casino experience.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Why Players Choose BetIndia Live Casino */}
        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
                Why Players Choose BetIndia Live Casino
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                BetIndia delivers a premium live casino experience with secure gaming, professional dealers, HD live streams, and fast withdrawals. Our platform is optimized for desktop and mobile devices, allowing players to enjoy live casino action anytime and anywhere.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                Whether you're joining a live roulette table, playing blackjack, or exploring interactive game shows, you'll find an engaging and seamless experience across every game.
              </p>
            </div>
          </div>
        </section>

        {/* Explore Other Casino Games */}
        <RelatedGames currentGamePath="/live-casino" />

        {/* 6. Frequently Asked Questions */}
        <FAQ content={pageFaqs} defaultContent={pageFaqs} />

        {/* 7. Ready To Join The Live Casino Action? */}
        <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl md:p-14">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/60 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#138808]/40 to-transparent" />

              <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6B00]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B00]" />
                Live Casino Action
              </span>

              <h2 className="mx-auto mt-6 max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
                Ready To Join The Live Casino Action?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
                Experience premium live casino entertainment with professional dealers, real-time gameplay, immersive tables, and exciting casino action from anywhere.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={CTA_LINKS.signup}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] sm:w-auto"
                >
                  Play Live Casino
                  <span aria-hidden>&rarr;</span>
                </Link>
                <a
                  href="#featured-tables"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00] hover:bg-white/10 sm:w-auto"
                >
                  Explore Games
                </a>
              </div>

              {/* Checklist & Disclaimer */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-400 border-t border-white/10 pt-8">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#138808]">✓</span> Live Dealers
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#138808]">✓</span> Real-Time Action
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#138808]">✓</span> Secure Gaming
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#138808]">✓</span> Fast Withdrawals
                </span>
              </div>
              <p className="mt-4 text-[10px] font-semibold text-slate-500 tracking-wider">
                18+ Only • Play Responsibly
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
