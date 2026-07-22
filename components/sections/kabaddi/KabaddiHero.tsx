import Link from "next/link";
import { CTA_LINKS } from "@/lib/cta-links";
import MobileHeroBanner from "@/components/sections/MobileHeroBanner";
import { kabaddiContent } from "@/data/kabaddi";
import { LiveBadge } from "./KabaddiHud";

const ACCENT = "#f59e0b";

export default function KabaddiHero({
  content,
}: {
  content?: Partial<typeof kabaddiContent.hero> | null;
}) {
  const data = { ...kabaddiContent.hero, ...(content ?? {}) };
  const imageUrl = (data as { imageUrl?: string }).imageUrl;

  // Give "Bet India" inside the title its own gradient-accent treatment.
  const titleParts = data.title.split("Bet India");
  const hasBrandSplit = titleParts.length === 2;

  return (
    <>
      <MobileHeroBanner
        image={(data as { imageUrlMobile?: string }).imageUrlMobile || imageUrl}
        title={data.title}
        description={data.description}
        primaryHref={CTA_LINKS.signup}
        secondaryHref="#kabaddi-markets"
        secondaryLabel="View Markets"
      />
      <section className="relative hidden items-center overflow-hidden bg-[#050B18] min-h-[480px] sm:min-h-[400px] md:flex md:min-h-[500px]">
      {imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img src={imageUrl} alt="" className="w-full h-full object-cover object-right sm:object-center" />
        </div>
      )}
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#FF6B00]/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-20 h-[460px] w-[460px] rounded-full blur-3xl" style={{ background: `${ACCENT}1A` }} />
      {/* Arena grid overlay — subtle scoreboard/stadium-floor texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-[58px] sm:px-6 lg:px-8 lg:py-[86px]">
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-3xl">
          <LiveBadge label="PKL Season · Live Betting Open" color={ACCENT} />

          <h1 className="mt-5 text-3xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,5vw,4rem)]">
            {hasBrandSplit ? (
              <>
                {titleParts[0]}
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#f59e0b] to-[#FF6B00] bg-clip-text text-transparent">
                  Bet India
                </span>
                {titleParts[1]}
              </>
            ) : (
              data.title
            )}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">{data.description}</p>
          {data.paragraphs?.map((p) => (
            <p key={p.slice(0, 40)} className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {p}
            </p>
          ))}

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href={CTA_LINKS.signup}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] sm:w-auto"
            >
              {data.primaryCta}
              <span aria-hidden>&rarr;</span>
            </Link>
            <a
              href="#kabaddi-markets"
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
