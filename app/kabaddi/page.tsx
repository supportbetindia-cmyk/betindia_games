import type { Metadata } from "next";
import KabaddiHero from "@/components/sections/kabaddi/KabaddiHero";
import KabaddiWhatIs, {
  KabaddiHowMatchesWork,
  KabaddiWhyPopular,
  KabaddiMistakes,
  KabaddiResponsible,
} from "@/components/sections/kabaddi/KabaddiContentBlocks";
import KabaddiWhyBet from "@/components/sections/kabaddi/KabaddiWhyBet";
import KabaddiMarkets from "@/components/sections/kabaddi/KabaddiMarkets";
import KabaddiLiveBetting from "@/components/sections/kabaddi/KabaddiLiveBetting";
import KabaddiOddsWork from "@/components/sections/kabaddi/KabaddiOddsWork";
import KabaddiHowToPlace from "@/components/sections/kabaddi/KabaddiHowToPlace";
import KabaddiPKLGuide from "@/components/sections/kabaddi/KabaddiPKLGuide";
import KabaddiTournaments from "@/components/sections/kabaddi/KabaddiTournaments";
import KabaddiTips from "@/components/sections/kabaddi/KabaddiTips";
import KabaddiWhyChoose from "@/components/sections/kabaddi/KabaddiWhyChoose";
import KabaddiCTA from "@/components/sections/kabaddi/KabaddiCTA";
import FAQ from "@/components/sections/FAQ";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RelatedSports from "@/components/sections/RelatedSports";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import { kabaddiContent } from "@/data/kabaddi";
import { LiveBadge } from "@/components/sections/kabaddi/KabaddiHud";
import { Activity, BarChart3, ShieldCheck, Zap } from "lucide-react";

const ACCENT = "#f59e0b";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Kabaddi Betting in India – Live Odds, Pro Kabaddi Betting & Expert Guide";
  return pageMetadata({
    pageId: "kabaddi",
    title,
    description:
      "Online kabaddi betting on Pro Kabaddi League, Kabaddi World Cup, and live in-play markets. Competitive odds and secure sportsbook on Bet India.",
    path: "/kabaddi",
    absoluteTitle: title,
  });
}

export const revalidate = 300;



export default async function KabaddiPage() {
  const page = await getPage("kabaddi");
  const heroContent = page.hero || kabaddiContent.hero;

  const TRUST = [
    { icon: Activity, text: "Live Kabaddi Odds" },
    { icon: Zap, text: "Pro Kabaddi League" },
    { icon: BarChart3, text: "Raid & Tackle Markets" },
    { icon: ShieldCheck, text: "Secure Sportsbook" },
  ] as const;



  return (
    <>
      <main>
        <KabaddiHero content={heroContent} />
        <Breadcrumbs items={[{ label: "Sports", href: "/sports" }, { label: "Kabaddi Betting" }]} />

        <section className="relative overflow-hidden bg-[#050B18]">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-6 flex justify-center">
              <LiveBadge label="Live Match HUD" color={ACCENT} />
            </div>
            <ul className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
              {TRUST.map(({ icon: Icon, text }, i) => {
                const color = i % 2 === 0 ? ACCENT : "#FF6B00";
                return (
                  <li
                    key={text}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-5 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                    />
                    <span
                      className="mx-auto grid h-11 w-11 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-110"
                      style={{ borderColor: `${color}40`, background: `${color}15`, color }}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <span className="mt-3 block text-xs font-bold uppercase tracking-wider text-slate-300">{text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <KabaddiWhatIs />
        <KabaddiWhyBet />
        <KabaddiHowMatchesWork />
        <KabaddiLiveBetting />
        <KabaddiTournaments />
        <KabaddiMarkets />
        <KabaddiHowToPlace />
        <KabaddiOddsWork />
        <KabaddiPKLGuide />
        <KabaddiWhyPopular />
        <KabaddiTips />
        <KabaddiMistakes />
        <KabaddiWhyChoose />
        <KabaddiResponsible />
        <RelatedSports currentSportPath="/kabaddi" />
        <FAQ content={page.faq} defaultContent={kabaddiContent.faq} />
        <KabaddiCTA content={page.cta} />
      </main>
    </>
  );
}
