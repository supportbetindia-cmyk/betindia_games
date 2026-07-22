import type { Metadata } from "next";
import FootballHero from "@/components/sections/football/FootballHero";
import TopLeagues from "@/components/sections/football/TopLeagues";
import PopularMarkets from "@/components/sections/football/PopularMarkets";
import LiveFootballBetting from "@/components/sections/football/LiveFootballBetting";
import FootballCTA from "@/components/sections/football/FootballCTA";
import FAQ from "@/components/sections/FAQ";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import football, { footballContent } from "@/data/football";
import { Activity, BarChart3, ShieldCheck, Zap } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "football",
    title: "Football Betting",
    description:
      "Bet on Premier League, La Liga, Champions League, Serie A, Bundesliga and more with BetIndia's premium football betting experience.",
    path: "/football",
  });
}

export const revalidate = 300;

function CenteredSeoSection({
  title,
  text,
  accent = "#138808",
}: {
  title: string;
  text: string;
  accent?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
          {title.includes("BetIndia") ? (
            <>
              Why Football Fans Choose{" "}
              <span className="bg-gradient-to-r from-[#138808] to-[#FF6B00] bg-clip-text text-transparent">
                BetIndia
              </span>
            </>
          ) : title.includes("Live Football") ? (
            <>
              Live Football{" "}
              <span className="bg-gradient-to-r from-[#138808] via-[#22c55e] to-[#138808] bg-clip-text text-transparent">
                Betting
              </span>
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

export default async function FootballPage() {
  const page = await getPage("football");
  const heroContent = page.hero || footballContent.hero;
  const seoBlocks = { ...footballContent.seoBlocks, ...(page.seoBlocks ?? {}) };

  const TRUST = [
    { icon: Activity,    text: "Live Football Odds"    },
    { icon: Zap,         text: "In-Play Betting"       },
    { icon: BarChart3,   text: "Real-Time Match Stats" },
    { icon: ShieldCheck, text: "Fast Withdrawals"      },
  ] as const;

  return (
    <>
      <main>
        <FootballHero content={heroContent} />

        <section className="relative overflow-hidden bg-[#050B18]">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <ul className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
              {TRUST.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-3 backdrop-blur-md"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#138808]/30 bg-[#138808]/10 text-[#138808]">
                    <Icon size={14} strokeWidth={2} />
                  </span>
                  <span className="text-xs font-semibold leading-snug text-slate-300">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CenteredSeoSection
          title={seoBlocks.footballBettingTitle}
          text={seoBlocks.footballBettingText}
        />

        <div id="football-leagues">
          <TopLeagues />
        </div>
        <PopularMarkets />

        <CenteredSeoSection
          title={seoBlocks.liveFootballBettingTitle}
          text={seoBlocks.liveFootballBettingText}
        />

        <LiveFootballBetting />

        <CenteredSeoSection
          title={seoBlocks.whyChooseTitle}
          text={seoBlocks.whyChooseText}
          accent="#FF6B00"
        />

        <FAQ content={page.faq} defaultContent={footballContent.faq} />
        <FootballCTA content={page.cta} />
      </main>
    </>
  );
}
