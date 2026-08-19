import type { Metadata } from "next";
import Link from "next/link";
import {
  Gamepad2,
  RefreshCw,
  Crown,
  Gem,
  Users,
  Plane,
  ArrowRight,
} from "lucide-react";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import WhyBetIndia from "@/components/sections/WhyBetIndia";
import Promotions from "@/components/sections/Promotions";
import HowItWorks from "@/components/sections/HowItWorks";
import LiveCricketMatches from "@/components/sections/LiveCricketMatches";
import LatestArticles from "@/components/sections/LatestArticles";
import FAQ from "@/components/sections/FAQ";
import InternalLinkGrid from "@/components/sections/InternalLinkGrid";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import { homeContent } from "@/data/home";
import { CTA_LINKS } from "@/lib/cta-links";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "home",
    title: "BetIndia",
    description:
      "Get your trusted Online Cricket ID with BetIndia. Play Cricket Exchange, Live Casino, Sports Betting, and Aviator Games securely in India.",
    path: "/",
    absoluteTitle: "BetIndia – Trusted Online Cricket ID & Casino Platform",
  });
}

export const revalidate = 300;

export default async function Home() {
  const page = await getPage("home");

  // Merge home page sections with fallback defaults (data/home.js splits the
  // old single `seo` section into per-topic sections).
  const about = { ...homeContent.about, ...(page.about ?? {}) };
  const liveCasino = { ...homeContent.liveCasino, ...(page.liveCasino ?? {}) };
  const popular = { ...homeContent.poupar, ...(page.poupar ?? {}) };
  const cricketSec = { ...homeContent.cricket, ...(page.cricket ?? {}) };

  const liveCasinoItems = liveCasino.liveCasinoItems && liveCasino.liveCasinoItems.length > 0 ? liveCasino.liveCasinoItems : homeContent.liveCasino.liveCasinoItems;
  const liveCasinoCards = [
    { icon: Gamepad2, title: liveCasinoItems[0]?.title ?? "Live Blackjack", description: liveCasinoItems[0]?.description ?? "", image: liveCasinoItems[0]?.image ?? "", accent: "#FF6B00" as const },
    { icon: RefreshCw, title: liveCasinoItems[1]?.title ?? "Live Roulette", description: liveCasinoItems[1]?.description ?? "", image: liveCasinoItems[1]?.image ?? "", accent: "#138808" as const },
    { icon: Crown, title: liveCasinoItems[2]?.title ?? "Live Baccarat", description: liveCasinoItems[2]?.description ?? "", image: liveCasinoItems[2]?.image ?? "", accent: "#FF6B00" as const },
  ];

  const popularCasinoItems = popular.popularCasinoItems && popular.popularCasinoItems.length > 0 ? popular.popularCasinoItems : homeContent.poupar.popularCasinoItems;
  const popularCasinoCards = [
    { icon: Gem, title: popularCasinoItems[0]?.title ?? "Online Slots", description: popularCasinoItems[0]?.description ?? "", image: popularCasinoItems[0]?.image ?? "", accent: "#FF6B00" as const },
    { icon: Users, title: popularCasinoItems[1]?.title ?? "Teen Patti Online", description: popularCasinoItems[1]?.description ?? "", image: popularCasinoItems[1]?.image ?? "", accent: "#138808" as const },
    { icon: Plane, title: popularCasinoItems[2]?.title ?? "Aviator Game", description: popularCasinoItems[2]?.description ?? "", image: popularCasinoItems[2]?.image ?? "", accent: "#FF6B00" as const },
  ];

  return (
    <>
      <main>
        {/* 1. Hero */}
        <Hero content={page.hero || homeContent.hero} />
        <section className="relative overflow-hidden bg-[#050B18]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              Welcome to BetIndia, India's trusted destination for online casino games, live sports betting, and cricket betting IDs. Whether you're looking to enjoy Live Blackjack, Roulette, Baccarat, Online Slots, Teen Patti, Aviator, or place bets on your favorite sports, BetIndia delivers a secure and premium gaming experience.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
              With fast withdrawals, competitive odds, secure payments, and 24/7 support, BetIndia provides everything you need in one powerful platform.
            </p>
          </div>
        </section>

        {/* Trust Bar (Optional dashboard stat indicator) */}
        <TrustBar content={page.trustBar || homeContent.trustBar} />

        <section className="relative overflow-hidden bg-[#050B18]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
                {about.aboutTitle}
              </h2>
            </div>
            <p className="mx-auto text-sm sm:text-base leading-relaxed text-slate-300">
              {about.aboutText}
            </p>
          </div>
        </section>

        {/* 3. Why Choose Section */}
        <WhyBetIndia content={page.whyChoose} />

        {/* 4. Exclusive Promotions Section */}
        <Promotions content={page.promotions} />

        {/* 5. How It Works Section */}
        <HowItWorks content={page.howItWorks} />

        {/* 6. Live Casino Games Section */}
        <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/7 blur-2xl" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B00] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
                </span>
                Live Action
              </span>
              <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl whitespace-pre-line">
                {liveCasino.liveCasinoTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base whitespace-pre-line">
                {liveCasino.liveCasinoSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {liveCasinoCards.map(({ icon: Icon, title: cardTitle, description, image, accent }) => {
                const isOrange = accent === "#FF6B00";
                return (
                  <div
                    key={cardTitle}
                    className={[
                      "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl",
                      "transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]",
                      isOrange
                        ? "hover:border-[#FF6B00]/40 hover:shadow-2xl hover:shadow-[#FF6B00]/10"
                        : "hover:border-[#138808]/40 hover:shadow-2xl hover:shadow-[#138808]/10",
                    ].join(" ")}
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                    />
                    <div
                      className="relative flex h-40 items-center justify-center overflow-hidden"
                      style={{ background: `radial-gradient(ellipse at 50% 110%, ${accent}22 0%, transparent 65%)` }}
                    >
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ background: `radial-gradient(ellipse at 50% 80%, ${accent}28 0%, transparent 60%)` }}
                      />
                      <span
                        className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                        style={{ borderColor: `${accent}40`, background: `${accent}15`, color: accent }}
                      >
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: accent }} />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
                        </span>
                        Live
                      </span>
                      {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={image}
                          alt={cardTitle}
                          className="absolute inset-0 z-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                          style={{
                            background: `${accent}18`,
                            borderColor: `${accent}35`,
                            color: accent,
                            boxShadow: `0 4px 28px ${accent}20`,
                          }}
                        >
                          <Icon size={28} strokeWidth={1.6} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <h3 className="text-lg font-bold text-white">{cardTitle}</h3>
                      <p className="flex-1 text-sm leading-relaxed text-slate-400 whitespace-pre-line">{description}</p>
                      <Link
                        href={CTA_LINKS.signup}
                        className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200 group-hover:gap-2.5"
                        style={{ color: accent }}
                      >
                        Play Now
                        <ArrowRight size={14} strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. Popular Casino Games Section */}
        <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8">
          <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
                Top Choice
              </span>
              <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl whitespace-pre-line">
                {popular.popularCasinoTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base whitespace-pre-line">
                {popular.popularCasinoSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {popularCasinoCards.map(({ icon: Icon, title: cardTitle, description, image, accent }) => {
                const isOrange = accent === "#FF6B00";
                return (
                  <div
                    key={cardTitle}
                    className={[
                      "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl",
                      "transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]",
                      isOrange
                        ? "hover:border-[#FF6B00]/40 hover:shadow-2xl hover:shadow-[#FF6B00]/10"
                        : "hover:border-[#138808]/40 hover:shadow-2xl hover:shadow-[#138808]/10",
                    ].join(" ")}
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                    />
                    <div
                      className="relative flex h-40 items-center justify-center overflow-hidden"
                      style={{ background: `radial-gradient(ellipse at 50% 110%, ${accent}22 0%, transparent 65%)` }}
                    >
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ background: `radial-gradient(ellipse at 50% 80%, ${accent}28 0%, transparent 60%)` }}
                      />
                      {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={image}
                          alt={cardTitle}
                          className="absolute inset-0 z-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                          style={{
                            background: `${accent}18`,
                            borderColor: `${accent}35`,
                            color: accent,
                            boxShadow: `0 4px 28px ${accent}20`,
                          }}
                        >
                          <Icon size={28} strokeWidth={1.6} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <h3 className="text-lg font-bold text-white">{cardTitle}</h3>
                      <p className="flex-1 text-sm leading-relaxed text-slate-400 whitespace-pre-line">{description}</p>
                      <Link
                        href={CTA_LINKS.signup}
                        className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200 group-hover:gap-2.5"
                        style={{ color: accent }}
                      >
                        Play Now
                        <ArrowRight size={14} strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Live Cricket Matches widget */}
        {/* <LiveCricketMatches /> */}

        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
                {cricketSec.cricketIdTitle}
              </h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              {cricketSec.cricketIdText}
            </p>
          </div>
        </section>

        {/* 9. SEO Text Blocks (Editorial Split Stacks) */}
        <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
            {/* Trusted Provider */}
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl text-center">{cricketSec.trustedProviderTitle}</h2>
              <p className="mt-5 text-slate-400 text-sm leading-relaxed whitespace-pre-line">{cricketSec.trustedProviderText}</p>
            </div>

            {/* Sportsbook Platform */}
            <div className="border-t border-white/[0.06] pt-12">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl text-center">{cricketSec.sportsbookPlatformTitle}</h2>
              <p className="mt-5 text-slate-400 text-sm leading-relaxed whitespace-pre-line">{cricketSec.sportsbookPlatformText}</p>
            </div>
          </div>
        </section>

        {/* Latest Articles section */}
        <LatestArticles content={page.latestArticles} />

        {/* Deep Internal Link Grid */}
        <InternalLinkGrid />

        {/* 10. Frequently Asked Questions */}
        <FAQ content={page.faq} defaultContent={homeContent.faq} />

        {/* 11. Final CTA */}
        <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl md:p-14">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/60 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#138808]/40 to-transparent" />

              <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6B00]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B00]" />
                Get Started Now
              </span>

              <h2 className="mx-auto mt-6 max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl whitespace-pre-line">
                {cricketSec.playSmartTitle}
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base whitespace-pre-line">
                {cricketSec.playSmartText}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={CTA_LINKS.signup}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/35 sm:w-auto"
                >
                  Play Now
                  <span aria-hidden>&rarr;</span>
                </Link>
                <Link
                  href="/sports"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00]/40 hover:bg-white/10 sm:w-auto"
                >
                  Bet on Sports
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
