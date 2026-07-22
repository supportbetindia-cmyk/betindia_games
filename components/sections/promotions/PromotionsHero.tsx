import Link from "next/link";
import { Gift, RefreshCw, Crown, Users, Zap, ShieldCheck, Headphones } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import MobileHeroBanner from "@/components/sections/MobileHeroBanner";
import { promotionsContent } from "@/data/promotions";

const STATS = [
  { value: "10,000+", label: "Active Players",    accent: "#FF6B00" },
  { value: "₹ Fast",  label: "Withdrawals",       accent: "#138808" },
  { value: "24/7",    label: "Support",            accent: "#FF6B00" },
  { value: "Secure",  label: "Platform",           accent: "#138808" },
] as const;

const BONUS_PREVIEW = [
  { icon: Gift,      value: "₹25,000",    label: "Welcome Bonus",    accent: "#FF6B00" },
  { icon: RefreshCw, value: "Up to 10%",  label: "Weekly Cashback",  accent: "#138808" },
  { icon: Crown,     value: "Exclusive",  label: "VIP Rewards",      accent: "#FF6B00" },
  { icon: Users,     value: "Refer & Earn",label: "Referral Program",accent: "#138808" },
] as const;

export default function PromotionsHero({ content }: { content?: Partial<typeof promotionsContent.hero> | null }) {
  const data = { ...promotionsContent.hero, ...(content ?? {}) };

  return (
    <>
      <MobileHeroBanner
        image={
          (data as { imageUrlMobile?: string }).imageUrlMobile ||
          (data as { imageUrl?: string }).imageUrl
        }
        title={data.title}
        description={data.description}
        primaryHref={CTA_LINKS.signup}
        primaryLabel="Claim Bonus"
        secondaryHref="#featured-promotions"
        secondaryLabel="Explore Promotions"
      />
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
      <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-[440px] w-[440px] rounded-full bg-[#FF6B00]/14 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-20 h-[420px] w-[420px] rounded-full bg-[#138808]/12 blur-2xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-[58px] sm:px-6 lg:px-8 lg:py-[86px]">
        {/* LEFT — Content */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-3xl">

          <h1 className="mt-6 text-3xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,5vw,4rem)]">
            {data.title}
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">
            {data.description}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href={CTA_LINKS.signup}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/30 sm:w-auto"
            >
              Claim Bonus
              <span aria-hidden>&rarr;</span>
            </Link>
            <a
              href="#featured-promotions"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00] hover:bg-white/10 sm:w-auto"
            >
              Explore Promotions
            </a>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
