import Link from "next/link";
import { CTA_LINKS } from "@/lib/cta-links";
import type { PageHeroContent } from "@/lib/page-content";

const DEFAULT_HERO_BG = "/betindia_front_banner.png";
const DEFAULT_HERO_MOBILE = "/sportsbanner.png";

const DEFAULT_CONTENT: PageHeroContent & { imageUrlMobile?: string } = {
  pageId: "sports",
  path: "/sports",
  name: "Sports Betting",
  eyebrow: "Live Sports Betting",
  title: "BET ON YOUR",
  highlightedTitle: "FAVORITE SPORTS",
  description:
    "Experience real-time sports betting with live markets, competitive odds, and fast withdrawals.",
  imageUrl: DEFAULT_HERO_BG,
  imageUrlMobile: DEFAULT_HERO_MOBILE,
  imageAlt: "Sports betting at BetIndia",
};

export default function SportsHero({
  content = DEFAULT_CONTENT,
}: {
  content?: PageHeroContent & { imageUrlMobile?: string };
}) {
  const heroImage = content.imageUrl?.trim() || DEFAULT_HERO_BG;
  const mobileHeroImage = content.imageUrlMobile?.trim() || DEFAULT_HERO_MOBILE;

  return (
    <section className="bg-[#050B18]   md:px-0 md:pt-0">
      {/* Mobile hero poster with HTML text overlaid on the image. */}
      <div className="relative overflow-hidden md:hidden">
        <img src={mobileHeroImage} alt="" className="h-auto w-full" />

        {/* Readability gradient behind the text (top area). */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 z-[1] h-1/2 bg-gradient-to-b from-[#050B18]/85 via-[#050B18]/40 to-transparent"
        />

        {/* Text layer */}
        <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center px-5 pt-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B00]!">
            {content.eyebrow}
          </p>
          <h1 className="mt-1 text-2xl! font-extrabold leading-tight! tracking-tight text-white">
            {content.title}{" "}
            <span className="text-[#FF6B00]!">{content.highlightedTitle}</span>
          </h1>
          <p className="mt-2 max-w-[80%] text-xs leading-snug text-slate-200">
            {content.description}
          </p>
          {/* Both CTAs side by side, mirroring the desktop hero. */}
          <div className="mt-3 flex flex-row flex-wrap items-center justify-center gap-2">
            <Link
              href={CTA_LINKS.signup}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#FF6B00] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:bg-[#FF8A00]"
            >
              Start Betting
              <span aria-hidden>&rarr;</span>
            </Link>
            <a
              href="#live-matches"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-[#FF6B00] hover:bg-white/10"
            >
              View Live Matches
            </a>
          </div>
        </div>
      </div>

      {/* Desktop hero */}
      <div className="relative hidden min-h-[500px] overflow-hidden md:block">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 z-[1] h-[520px] w-[520px] rounded-full bg-[#FF6B00]/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-20 z-[1] h-[460px] w-[460px] rounded-full bg-[#138808]/10 blur-3xl" />

        <div className="relative z-10 mx-auto flex min-h-[500px] w-full max-w-7xl items-center px-4 py-[58px] sm:px-6 lg:px-8 lg:py-[86px]">
          <div className="flex w-full max-w-3xl flex-col items-start text-left">
            <h1 className="mt-4 tracking-tight text-white sm:mt-6">
              {content.title} {content.highlightedTitle}
            </h1>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300 sm:mt-5 sm:text-base">
              {content.description}
            </p>

            <div className="mt-5 flex flex-row flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3">
              <Link
                href={CTA_LINKS.signup}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/30"
              >
                Start Betting
                <span aria-hidden>&rarr;</span>
              </Link>
              <a
                href="#live-matches"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00] hover:bg-white/10"
              >
                View Live Matches
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
