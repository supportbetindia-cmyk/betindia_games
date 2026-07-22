import type { PageHeroContent } from "@/lib/page-content";
import MobileHeroBanner from "@/components/sections/MobileHeroBanner";
const STATS = [
  { value: "100+", label: "Articles" },
  { value: "Guides", label: "Sports Betting" },
  { value: "Tips", label: "Casino Strategy" },
  { value: "Updates", label: "Latest News" },
 ] as const;

const DEFAULT_CONTENT: PageHeroContent = {
  pageId: "blog",
  path: "/blog",
  name: "Blog",
  eyebrow: "BetIndia Blog",
  title: "Betting Guides, Casino Tips",
  highlightedTitle: "& Winning Strategies",
  description:
    "Stay informed with expert insights, sports betting guides, casino strategies, Aviator tips, and the latest gaming trends from the BetIndia team.",
  imageUrl: "",
  imageAlt: "BetIndia blog",
};

export default function BlogHero({ content = DEFAULT_CONTENT }: { content?: PageHeroContent }) {
  return (
    <>
      <MobileHeroBanner
        image={(content as { imageUrl?: string }).imageUrl}
        title={content.title ?? ""}
        highlightedTitle={content.highlightedTitle}
        description={content.description}
      />
      <section className="relative hidden overflow-hidden bg-[#050B18] min-h-[400px] md:block md:min-h-[500px] text-center">

      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-[#FF6B00]/12 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[480px] w-[480px] rounded-full bg-[#138808]/10 blur-3xl"
      />
      {/* Dot grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FF6B00 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto  px-4 sm:px-6 lg:px-8 py-[58px] lg:py-[86px]">
        <div className="flex flex-col items-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
          BetIndia Blog
        </span>

        <h1 className="mt-6  font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            {content.title} {content.highlightedTitle}
          </h1>

          <p className="mt-5  text-base leading-relaxed text-slate-300 md:text-lg">
            {content.description}
          </p>


        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04] py-5 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B00]/25 hover:bg-white/[0.07]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <p className="text-xl font-black text-[#FF6B00]">{value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
      </section>
    </>
  );
}


