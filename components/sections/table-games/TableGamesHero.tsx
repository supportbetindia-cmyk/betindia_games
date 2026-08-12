import Link from "next/link";
import { Crown, Layers, Zap, ShieldCheck } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import MobileHeroBanner from "@/components/sections/MobileHeroBanner";
import { tableGamesContent } from "@/data/tablegames";

const TRUST = [
  { icon: Crown, text: "Classic Casino Games" },
  { icon: Layers, text: "Live Dealer Tables" },
  { icon: Zap, text: "Fast Withdrawals" },
  { icon: ShieldCheck, text: "Secure Gaming" },
] as const;

const GAMES_PREVIEW = [
  { emoji: "🃏", name: "Blackjack",   badge: "Live",    accent: "#FF6B00" },
  { emoji: "🎡", name: "Roulette",    badge: "Live",    accent: "#138808" },
  { emoji: "🎴", name: "Baccarat",    badge: "VIP",     accent: "#FF6B00" },
  { emoji: "♠",  name: "Teen Patti",  badge: "Popular", accent: "#138808" },
  { emoji: "🎯", name: "Andar Bahar", badge: "Classic", accent: "#FF6B00" },
  { emoji: "🎲", name: "Hold'em",     badge: "Poker",   accent: "#138808" },
] as const;

const PLAYER_CARDS  = ["A♠", "K♥"] as const;
const DEALER_CARDS  = ["7♣", "?"]  as const;

export default function TableGamesHero({ content }: { content?: Partial<typeof tableGamesContent.hero> | null }) {
  const data = { ...tableGamesContent.hero, ...(content ?? {}) };

  return (
    <>
      <MobileHeroBanner
        image={
          (data as { imageUrlMobile?: string }).imageUrlMobile ||
          (data as { imageUrl?: string }).imageUrl
        }
        title={data?.title ?? "Table Games"}
        description={data?.description}
        primaryHref={CTA_LINKS.signup}
        primaryLabel={data.primaryCta ?? "Play Table Games"}
        secondaryHref={CTA_LINKS.casino}
        secondaryLabel={data.secondaryCta ?? "Explore Casino"}
      />

      {/* Desktop Hero Section */}
      <section className="relative hidden items-center overflow-hidden bg-[#050B18] min-h-[480px] sm:min-h-[400px] md:flex md:min-h-[500px]">
      {(data as { imageUrl?: string }).imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src={(data as { imageUrl?: string }).imageUrl}
            alt=""
            className="w-full h-full object-cover object-right sm:object-center"
          />
        </div>
      )}
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#FF6B00]/12 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-20 h-[460px] w-[460px] rounded-full bg-[#138808]/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-[58px] sm:px-6 lg:px-8 lg:py-[86px]">
        {/* LEFT */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-3xl">

          <h1 className="mt-6 text-3xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,5vw,4rem)]">
            {data?.title}
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300 md:text-lg">
            {data?.description}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href={CTA_LINKS.signup}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/40 sm:w-auto"
            >
              {data.primaryCta ?? "Play Table Games"}
              <span aria-hidden>&rarr;</span>
            </Link>
            <Link
              href={CTA_LINKS.casino}
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00] hover:bg-white/10 sm:w-auto"
            >
              {data.secondaryCta ?? "Explore Casino"}
            </Link>
          </div>

          <p className="mt-4 text-[11px] font-medium text-slate-600">18+ Only • Play Responsibly</p>
        </div>
      </div>
      </section>

      {/* ─── FEATURE BUTTONS BAR BELOW HERO SECTION ──────────────────────── */}
      <section className="relative bg-[#050B18] px-4 py-8 border-t border-b border-white/[0.06] sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <ul className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
            {TRUST.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] p-3.5 sm:px-5 sm:py-4 backdrop-blur-md transition-all duration-300 hover:border-[#FF6B00]/40 hover:bg-white/[0.08]"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00]">
                  <Icon size={18} strokeWidth={2} />
                </span>
                <span className="text-xs font-semibold leading-snug text-slate-200 sm:text-sm">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
