import type { Metadata } from "next";
import Link from "next/link";
import VIPHero from "@/components/sections/vip/VIPHero";
import VIPBenefits from "@/components/sections/vip/VIPBenefits";
import VIPLevels from "@/components/sections/vip/VIPLevels";
import VIPManager from "@/components/sections/vip/VIPManager";
import VIPCTA from "@/components/sections/vip/VIPCTA";
import FAQ from "@/components/sections/FAQ";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import VIPBenefitsData, { vipBenefitsContent } from "@/data/VIPBenefits";
import { Gift, TrendingUp, Users, Zap } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "vip-benefits",
    title: "VIP Program India",
    absoluteTitle: "VIP Program India | Casino VIP Membership, Rewards & Exclusive Benefits | BetIndia",
    description:
      "Join the BetIndia VIP Program and enjoy exclusive VIP rewards, faster withdrawals, dedicated account managers, higher betting limits, personalized promotions, and premium gaming benefits for loyal players.",
    path: "/vip",
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

export default async function VIPPage() {
  const page = await getPage("vip-benefits");
  const heroContent = page.hero || VIPBenefitsData.sections.hero;
  const seoBlocks = { ...vipBenefitsContent.seoBlocks, ...(page.seoBlocks ?? {}) };
  const HIGHLIGHT_ICONS = [Gift, Users, TrendingUp, Zap] as const;
  const highlights = ["Exclusive VIP Rewards", "Dedicated Support", "Higher Limits", "Faster Withdrawals"] as const;

  return (
    <>
      <main>
        <VIPHero content={heroContent} />

        <section className="relative overflow-hidden bg-[#050B18]">  
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">

            
             <ul className="mt-9 grid w-full  md:grid-cols-4 gap-3">
            {highlights.map((text, i) => {
              const Icon = HIGHLIGHT_ICONS[i] ?? Gift;
              return (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-3 backdrop-blur-md"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00]">
                    <Icon size={14} strokeWidth={2} />
                  </span>
                  <span className="text-xs font-semibold leading-snug text-slate-300">{text}</span>
                </li>
              );
            })}
          </ul>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              Welcome to the BetIndia VIP Program, an exclusive membership designed for players who want more from their gaming experience. Enjoy faster withdrawals, dedicated account management, higher betting limits, personalized rewards, and exclusive VIP promotions. Whether you enjoy Live Casino Games, Online Slots, Teen Patti, Aviator, or Sports Betting, our VIP Membership is built to reward loyalty and elevate every moment of play.
            </p>


           
          </div>
        </section>

        <VIPBenefits />
        <VIPLevels />
        <VIPManager />
        <CenteredSeoSection
          title={seoBlocks.whyJoinTitle}
          text={seoBlocks.whyJoinText}
          gradientWord="VIP Program"
        />
        <CenteredSeoSection
          title={seoBlocks.premiumRewardsTitle}
          text={seoBlocks.premiumRewardsText}
          gradientWord="VIP Rewards"
        />
        <CenteredSeoSection
          title={seoBlocks.exclusiveMembershipTitle}
          text={seoBlocks.exclusiveMembershipText}
          gradientWord="VIP Membership"
        />
        <FAQ content={page.faq} defaultContent={vipBenefitsContent.faq} />
        <VIPCTA content={page.cta} />
      </main>
    </>
  );
}
