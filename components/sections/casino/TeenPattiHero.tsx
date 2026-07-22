import Link from "next/link";
import { ArrowRight, Spade, Users } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import { HudCorners } from "@/components/sections/kabaddi/KabaddiHud";
import MobileHeroBanner from "@/components/sections/MobileHeroBanner";
import { teenPattiContent } from "@/data/teen-patti";

const ORANGE = "#FF6B00";
const GREEN = "#138808";

const PLAYER_HAND = [
  { rank: "A", suit: "♠", color: ORANGE },
  { rank: "K", suit: "♥", color: "#ef4444" },
  { rank: "Q", suit: "♦", color: "#ef4444" },
] as const;

export default function TeenPattiHero({
  content,
}: {
  content?: Partial<typeof teenPattiContent.hero> & {
    primaryCta?: string;
    secondaryCta?: string;
    paragraphs?: string[];
  } | null;
}) {
  const data = {
    ...teenPattiContent.hero,
    primaryCta: "Play Teen Patti Now",
    secondaryCta: "Learn Rules",
    ...content,
  };

  return (
    <>
      <MobileHeroBanner
        image={(data as { imageUrlMobile?: string }).imageUrlMobile || data.imageUrl}
        title={data.title}
        highlightedTitle={data.highlightedTitle}
        description={data.description}
        primaryHref={CTA_LINKS.signup}
        primaryLabel={data.primaryCta}
        secondaryHref="#how-to-play-teen-patti-on-bet-india"
        secondaryLabel={data.secondaryCta}
      />
      <section className="relative hidden overflow-hidden bg-[#050B18] min-h-[420px] md:block md:min-h-[520px]">
      {data.imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img src={data.imageUrl} alt={data.imageAlt || ""} className="h-full w-full object-cover" />
        </div>
      )}

      <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#FF6B00]/12 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-20 h-[460px] w-[460px] rounded-full bg-[#138808]/12 blur-3xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${ORANGE} 1px, transparent 1px), linear-gradient(90deg, ${ORANGE} 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-[58px] sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-[86px]">
        <div className="flex max-w-3xl flex-col items-center text-center md:items-start md:text-left">
          <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-[1.2] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[clamp(2rem,4.5vw,3.5rem)]">
            <span className="inline">
              {data.title}
              {data.highlightedTitle ? (
                <>
                  {" "}
                  <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] mt-1 bg-clip-text text-transparent">
                    {data.highlightedTitle}
                  </span>
                </>
              ) : null}
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">{data.description}</p>
          {data.paragraphs?.map((p) => (
            <p key={p.slice(0, 30)} className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {p}
            </p>
          ))}

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href={CTA_LINKS.signup}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] sm:w-auto"
            >
              {data.primaryCta}
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
            <a
              href="#how-to-play-teen-patti-on-bet-india"
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
