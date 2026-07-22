import type { Metadata } from "next";
import VolleyballHero from "@/components/sections/volleyball/VolleyballHero";
import VolleyballWhyChoose from "@/components/sections/volleyball/VolleyballWhyChoose";
import VolleyballPerfectChoice from "@/components/sections/volleyball/VolleyballPerfectChoice";
import LiveVolleyballBetting from "@/components/sections/volleyball/LiveVolleyballBetting";
import VolleyballTournaments from "@/components/sections/volleyball/VolleyballTournaments";
import VolleyballMarkets from "@/components/sections/volleyball/VolleyballMarkets";
import HowVolleyballBettingWorks from "@/components/sections/volleyball/HowVolleyballBettingWorks";
import VolleyballPremiumFeatures from "@/components/sections/volleyball/VolleyballPremiumFeatures";
import VolleyballTips from "@/components/sections/volleyball/VolleyballTips";
import VolleyballCTA from "@/components/sections/volleyball/VolleyballCTA";
import FAQ from "@/components/sections/FAQ";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import { volleyballContent } from "@/data/volleyball";
import { Activity, BarChart3, ShieldCheck, Zap } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "volleyball",
    title: "Volleyball Betting India",
    description:
      "Online volleyball betting on VNL, FIVB World Championships, Olympics, and live in-play markets. Competitive odds and fast withdrawals on BetIndia.",
    path: "/volleyball",
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
        <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-slate-300 sm:text-base">
          {text}
        </p>
      </div>
    </section>
  );
}

export default async function VolleyballPage() {
  const page = await getPage("volleyball");
  const heroContent = page.hero || volleyballContent.hero;

  const TRUST = [
    { icon: Activity, text: "Live Volleyball Odds" },
    { icon: Zap, text: "In-Play Betting" },
    { icon: BarChart3, text: "Set-by-Set Markets" },
    { icon: ShieldCheck, text: "Fast Withdrawals" },
  ] as const;

  return (
    <>
      <main>
        <VolleyballHero content={heroContent} />

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
        <CenteredSeoSection
          title={volleyballContent.intro.title}
          text={volleyballContent.intro.text}
          gradientWord="Indian"
        />
        <VolleyballWhyChoose />
        <CenteredSeoSection
          title={volleyballContent.growingFast.title}
          text={volleyballContent.growingFast.text}
          gradientWord="Fast"
        />
        <VolleyballPerfectChoice />
        <LiveVolleyballBetting />
        <VolleyballTournaments />
        <VolleyballMarkets />
        <HowVolleyballBettingWorks />
        <VolleyballPremiumFeatures />
        <VolleyballTips />
        <CenteredSeoSection
          title={volleyballContent.responsible.title}
          text={volleyballContent.responsible.text}
          gradientWord="Responsible"
        />
        <FAQ content={page.faq} defaultContent={volleyballContent.faq} />
        <VolleyballCTA content={page.cta} />
      </main>
    </>
  );
}
