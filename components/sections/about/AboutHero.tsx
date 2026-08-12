import Link from "next/link";
import { CTA_LINKS } from "@/lib/cta-links";
import MobileHeroBanner from "@/components/sections/MobileHeroBanner";
import { aboutUsContent } from "@/data/AboutUs";

export default function AboutHero({
  content,
}: {
  content?: Partial<typeof aboutUsContent.hero> | null;
}) {
  const data = { ...aboutUsContent.hero, ...(content ?? {}) };

  return (
    <>
      <MobileHeroBanner
        image={
          (data as { imageUrlMobile?: string }).imageUrlMobile ||
          (data as { imageUrl?: string }).imageUrl
        }
        title="India's Trusted"
        highlightedTitle="Betting & Casino Platform"
        description={data.description}
        primaryHref={CTA_LINKS.signup}
        primaryLabel={data.primaryCta}
        secondaryHref="/contact"
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
      <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#FF6B00]/12 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#138808]/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-[58px] sm:px-6 lg:px-8 lg:py-[86px]">
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-3xl">

        <h1 className="mt-6 text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
          India&apos;s Trusted Online Sports Betting &{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            Casino Platform
          </span>
        </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300 md:text-lg">
            {data.description}
          </p>


        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Link
            href={CTA_LINKS.signup}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] sm:w-auto"
          >
            {data.primaryCta}
            <span aria-hidden>&rarr;</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-[#FF6B00]/40 hover:bg-white/10 sm:w-auto"
          >
            {data.secondaryCta}
          </Link>
        </div>
        </div>
      </div>
      </section>
    </>
  );
}
