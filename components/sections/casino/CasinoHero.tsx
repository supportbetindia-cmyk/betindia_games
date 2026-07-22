import Link from "next/link";
import { Gem, Users, Crown, Plane, Gamepad2, TrendingUp } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import MobileHeroBanner from "@/components/sections/MobileHeroBanner";
import type { PageHeroContent } from "@/lib/page-content";

const TRUST = [
  "500+ Casino Games",
  "Live Dealers",
  "Fast Withdrawals",
  "Secure Gaming",
] as const;

const PREVIEW_GAMES = [
  { icon: Gamepad2, label: "Live Blackjack",  badge: "LIVE",    accent: "#FF6B00" },
  { icon: TrendingUp, label: "Mega Fortune",  badge: "JACKPOT", accent: "#138808" },
  { icon: Plane,    label: "Aviator",         badge: "HOT",     accent: "#FF6B00" },
  { icon: Users,    label: "Teen Patti",      badge: "POPULAR", accent: "#138808" },
  { icon: Crown,    label: "Live Baccarat",   badge: "LIVE",    accent: "#FF6B00" },
  { icon: Gem,      label: "Golden Spin",     badge: "NEW",     accent: "#138808" },
] as const;

const DEFAULT_CONTENT: PageHeroContent = {
  pageId: "casino",
  path: "/casino",
  name: "Casino",
  eyebrow: "Premium Online Casino",
  title: "Spin Bigger.",
  highlightedTitle: "Win More.",
  description:
    "Experience world-class casino entertainment with premium slots, live dealers, Teen Patti, Aviator, and exciting table games. Fast withdrawals and luxury gameplay guaranteed.",
  imageUrl: "",
  imageAlt: "BetIndia online casino",
};

export default function CasinoHero({ content = DEFAULT_CONTENT }: { content?: PageHeroContent }) {
  return (
    <>
      <MobileHeroBanner
        image={content.imageUrlMobile || content.imageUrl}
        title={content.title}
        highlightedTitle={content.highlightedTitle}
        description={content.description}
        primaryHref="#featured-games"
        primaryLabel="Explore Games"
        secondaryHref="#live-casino"
        secondaryLabel="Play Live Casino"
      />
      <section className="relative hidden items-center overflow-hidden bg-[#050B18] min-h-[480px] sm:min-h-[400px] md:flex md:min-h-[500px]">
      {content.imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src={content.imageUrl}
            alt=""
            className="w-full h-full object-cover object-right sm:object-center"
          />
        </div>
      )}
      <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#FF6B00]/15 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-44 -right-24 h-[460px] w-[460px] rounded-full bg-[#138808]/12 blur-2xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-[58px] sm:px-6 lg:px-8 lg:py-[86px]">
        {/* LEFT */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-3xl">

          <h1 className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,5vw,4rem)]">
            {content.title} {content.highlightedTitle}
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">
            {content.description}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href="#featured-games"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/30 sm:w-auto"
            >
              Explore Games
              <span aria-hidden>&rarr;</span>
            </Link>
            <Link
              href="#live-casino"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00] hover:bg-white/10 sm:w-auto"
            >
              Play Live Casino
            </Link>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}



