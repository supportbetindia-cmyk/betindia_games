import type { Metadata } from "next";
import Link from "next/link";
import PromotionsHero from "@/components/sections/promotions/PromotionsHero";
import FeaturedPromotions from "@/components/sections/promotions/FeaturedPromotions";
import WhyJoinBetIndia from "@/components/sections/promotions/WhyJoinBetIndia";
import PromotionsCTA from "@/components/sections/promotions/PromotionsCTA";
import FAQ from "@/components/sections/FAQ";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import Promotions, { promotionsContent } from "@/data/promotions";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "promotions",
    title: "Promotions & Bonuses",
    description:
      "Unlock exclusive bonuses, cashback offers, VIP rewards and referral benefits at BetIndia. India's most rewarding sportsbook.",
    path: "/promotions",
  });
}

export const revalidate = 300;

export default async function PromotionsPage() {
  const page = await getPage("promotions");
  const heroContent = page.hero || promotionsContent.hero;

  const STATS = [
  { value: "10,000+", label: "Active Players",    accent: "#FF6B00" },
  { value: "₹ Fast",  label: "Withdrawals",       accent: "#138808" },
  { value: "24/7",    label: "Support",            accent: "#FF6B00" },
  { value: "Secure",  label: "Platform",           accent: "#138808" },
] as const;

  const seoBlocks = { ...promotionsContent.seoBlocks, ...(page.seoBlocks ?? {}) };

  return (
    <>
      <main>
        {/* 1. Hero */}
        <PromotionsHero content={heroContent} />

        <section className="relative overflow-hidden bg-[#050B18]">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map(({ value, label, accent }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-3 py-4 text-center backdrop-blur-md"
                >
                  <span className="text-lg font-black leading-none" style={{ color: accent }}>{value}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                Discover exciting bonuses, cashback offers, referral rewards, and VIP benefits designed to enhance your betting and gaming experience. Whether you enjoy live casino games, online slots, Teen Patti, Aviator, or sports betting, BetIndia rewards you every step of the way.
              </p>
            </div>

            <div className="border-t border-white/10 pt-10 mt-10 space-y-8">
              <div className="text-center space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6B00]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B00]" />
                  4 Exclusive Casino Promotions Available
                </span>
                <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
                  Active Bonuses &amp; Rewards
                </h2>
              </div>

              {/* Grid of Active Promotions */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Card 1 */}
                <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:border-[#FF6B00]/40">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                    Welcome Bonus
                  </h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    Start your journey with extra value and enjoy a 5% Welcome Bonus on your first qualifying deposit.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:border-[#138808]/40">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#138808]" />
                    Every Deposit Bonus
                  </h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    Earn an extra 2% bonus on every qualifying deposit, giving you more value every time you add funds and play your favorite games.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:border-[#FF6B00]/40">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                    Weekly Loseback Bonus
                  </h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    Receive a 3% Weekly Loseback Bonus on eligible losses, helping you recover a portion of your losses each week.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:border-[#138808]/40">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#138808]" />
                    VIP Rewards
                  </h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    Unlock premium benefits, exclusive offers, and priority support.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:border-[#FF6B00]/40">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                    Referral Program
                  </h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    Invite friends and earn rewards when they join and start playing.
                  </p>
                </div>
              </div>

              {/* Trust badges & CTA */}
              <div className="pt-6 flex flex-col items-center justify-center gap-6">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
                    Instant Credit
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
                    Secure Transactions
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
                    24/7 Support
                  </span>
                </div>

                <div className="w-full text-center space-y-4">
                  
                  <p className="text-[11px] font-semibold text-slate-500 tracking-wide">
                    18+ Only • Terms &amp; Conditions Apply • Play Responsibly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Active Promotions Grid */}
        <FeaturedPromotions content={page.featured} />

        {/* 3. Centered Info Block 1: Online Casino Bonuses & Sports Betting Promotions */}
        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
                {seoBlocks.bonusesTitle}
              </h2>
            </div>
            <p className="mx-auto text-sm sm:text-base leading-relaxed text-slate-300 whitespace-pre-line">
              {seoBlocks.bonusesText}
            </p>
          </div>
        </section>

        {/* 4. Centered Info Block 2: Online Casino Promotions in India */}
        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
                {seoBlocks.casinoPromotionsTitle}
              </h3>
            </div>
            <p className="mx-auto text-sm sm:text-base leading-relaxed text-slate-300 whitespace-pre-line">
              {seoBlocks.casinoPromotionsText}
            </p>
          </div>
        </section>

        {/* 5. Why Players Choose BetIndia Features */}
        <WhyJoinBetIndia content={page.whyJoin} />

        {/* 6. Centered Info Block 3: Why Our Bonuses Stand Out */}
        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
                {seoBlocks.whyStandOutTitle}
              </h2>
            </div>
            <p className="mx-auto text-sm sm:text-base leading-relaxed text-slate-300 whitespace-pre-line">
              {seoBlocks.whyStandOutText}
            </p>
          </div>
        </section>

        {/* 7. FAQs */}
        <FAQ content={page.faq} defaultContent={promotionsContent.faq} />

        {/* 8. Final CTA */}
        <PromotionsCTA content={page.finalCta} />
      </main>
    </>
  );
}
