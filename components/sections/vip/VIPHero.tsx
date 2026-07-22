import Link from "next/link";
import { Zap, Users, TrendingUp, Gift } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import MobileHeroBanner from "@/components/sections/MobileHeroBanner";
import { vipBenefitsContent } from "@/data/VIPBenefits";



export default function VIPHero({
  content,
}: {
  content?: Partial<typeof vipBenefitsContent.hero> | null;
}) {
  const data = { ...vipBenefitsContent.hero, ...(content ?? {}) };
  const highlights = data.highlights?.length
    ? data.highlights
    : vipBenefitsContent.hero.highlights;

  return (
    <>
      <MobileHeroBanner
        image={
          (data as { imageUrlMobile?: string }).imageUrlMobile ||
          (data as { imageUrl?: string }).imageUrl
        }
        title="Unlock Premium Rewards &"
        highlightedTitle="VIP Privileges"
        description={data.description}
        primaryHref={CTA_LINKS.signup}
        primaryLabel={data.primaryCta}
        secondaryHref="#vip-benefits"
        secondaryLabel={data.secondaryCta}
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
      <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-[460px] w-[460px] rounded-full bg-[#FF6B00]/14 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-44 -right-20 h-[440px] w-[440px] rounded-full bg-[#138808]/10 blur-2xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-[58px] sm:px-6 lg:px-8 lg:py-[86px]">
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-3xl">
          <h1 className="mt-6 text-3xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[clamp(2rem,4.5vw,3.75rem)]">
            {data.title.includes("VIP Privileges") ? (
              <>
                Unlock Premium Rewards, Exclusive Benefits &{" "}
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#138808] bg-clip-text text-transparent">
                  VIP Privileges
                </span>
              </>
            ) : (
              data.title
            )}
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300">{data.description}</p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href={CTA_LINKS.signup}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] sm:w-auto"
            >
              {data.primaryCta}
              <span aria-hidden>&rarr;</span>
            </Link>
            <a
              href="#vip-benefits"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00] hover:bg-white/10 sm:w-auto"
            >
              {data.secondaryCta}
            </a>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
