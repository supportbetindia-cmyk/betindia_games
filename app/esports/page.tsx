import type { Metadata } from "next";
import EsportsHero from "@/components/sections/esports/EsportsHero";
import {
  EsportsWhatIs,
  EsportsWhyBet,
  EsportsHowWorks,
  EsportsMarkets,
  EsportsLiveBetting,
  EsportsOddsWork,
  EsportsHowToPlace,
  EsportsPopularGames,
  EsportsTournaments,
  EsportsWhyChoose,
  EsportsTips,
  EsportsMistakes,
  EsportsResponsible,
} from "@/components/sections/esports/EsportsContentBlocks";
import EsportsCTA from "@/components/sections/esports/EsportsCTA";
import FAQ from "@/components/sections/FAQ";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RelatedSports from "@/components/sections/RelatedSports";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import { esportsContent } from "@/data/esports";
import { Activity, BarChart3, ShieldCheck, Zap } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Esports Betting in India – Live Esports Betting Odds & Expert Guide";
  return pageMetadata({
    pageId: "esports",
    title,
    description:
      "Online esports betting at Bet India. Get competitive esports betting odds and live markets on CS2, Valorant, Dota 2, League of Legends, PUBG, Mobile Legends, and Call of Duty.",
    path: "/esports",
    absoluteTitle: title,
  });
}

export const revalidate = 300;

export default async function EsportsPage() {
  const page = await getPage("esports");
  const heroContent = page.hero || esportsContent.hero;

  const TRUST = [
    { icon: Activity, text: "Live Esports Odds" },
    { icon: Zap, text: "Major Gaming Leagues" },
    { icon: BarChart3, text: "Wide Range of Markets" },
    { icon: ShieldCheck, text: "Secure Sportsbook" },
  ] as const;

  return (
    <>
      <main>
        <EsportsHero content={heroContent} />
        <Breadcrumbs items={[{ label: "Sports", href: "/sports" }, { label: "Esports Betting" }]} />

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

        <EsportsWhatIs />
        <EsportsWhyBet />
        <EsportsHowWorks />
        <EsportsMarkets />
        <EsportsLiveBetting />
        <EsportsOddsWork />
        <EsportsHowToPlace />
        <EsportsPopularGames />
        <EsportsTournaments />
        <EsportsWhyChoose />
        <EsportsTips />
        <EsportsMistakes />
        <EsportsResponsible />
        <RelatedSports currentSportPath="/esports" />
        <FAQ content={page.faq} defaultContent={esportsContent.faq} />
        <EsportsCTA content={page.cta} />
      </main>
    </>
  );
}
