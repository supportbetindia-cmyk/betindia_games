import { CheckCircle2 } from "lucide-react";
import MobileHeroBanner from "@/components/sections/MobileHeroBanner";
import { contactUsContent } from "@/data/ContactUs";

const TRUST_POINTS = [
  "Fast Support",
  "Secure Assistance",
  "24/7 Platform Access",
  "Player-Focused Service",
] as const;

export default function ContactHero({
  content,
}: {
  content?: Partial<typeof contactUsContent.hero> | null;
}) {
  const data = { ...contactUsContent.hero, ...(content ?? {}) };

  return (
    <>
      <MobileHeroBanner
        image={(data as { imageUrl?: string }).imageUrl}
        title="Contact BetIndia"
        highlightedTitle="Customer Support"
        description={data.description}
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

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-[58px] lg:py-[86px]">
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
          BetIndia Support
        </span>

        <h1 className="mt-6 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Contact BetIndia{" "}
          <span className="block mt-2 bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#138808] bg-clip-text text-transparent">
            Customer Support
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
          {data.description}
        </p>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap gap-3">
          {TRUST_POINTS.map((point) => (
            <div
              key={point}
              className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4.5 py-2 text-xs font-semibold text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-[#FF6B00]/40 hover:bg-white/[0.08] hover:text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#138808] shadow-[0_0_8px_#138808] animate-pulse" />
              {point}
            </div>
          ))}
        </div>
        </div>
      </div>
      </section>
    </>
  );
}
