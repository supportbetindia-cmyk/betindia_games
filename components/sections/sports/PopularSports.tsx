import Link from "next/link";
import { Trophy, Target, Activity, Zap, Users, Shield, ArrowRight, type LucideIcon } from "lucide-react";
import { sportsContent } from "@/data/sports";

type Sport = {
  icon: LucideIcon;
  name: string;
  markets: string;
  href: string;
  accent: "#FF6B00" | "#138808";
};

const ICON_MAP: Record<string, LucideIcon> = {
  Cricket: Trophy,
  Football: Target,
  Tennis: Activity,
  Badminton: Zap,
  Volleyball: Users,
  Kabaddi: Shield,
};

export default function PopularSports({ content }: { content?: Partial<typeof sportsContent.popularSports> | null }) {
  const data = { ...sportsContent.popularSports, ...(content ?? {}) };
  const title = data.title;
  const subtitle = data.subtitle;
  const text = data.text;
  const items = data.items && data.items.length > 0 ? data.items : sportsContent.popularSports.items;

  const sports = items.map((item, index) => ({
    icon: ICON_MAP[item.title] || Trophy,
    name: item.title,
    markets: item.description,
    href: `/${item.title.toLowerCase().replace(/\s+/g, "-")}`,
    accent: index % 2 === 0 ? ("#FF6B00" as const) : ("#138808" as const),
  }));

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
            {subtitle}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            {title.includes("Popular") ? (
              <>
                Popular{" "}
                <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
                  Sports
                </span>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-5xl text-sm leading-relaxed text-slate-400 md:text-base">
            {text}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sports.map(({ icon: Icon, name, markets, href, accent }) => {
            const isOrange = accent === "#FF6B00";
            return (
              <Link
                key={name}
                href={href}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl",
                  "transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]",
                  isOrange
                    ? "hover:border-[#FF6B00]/40 hover:shadow-xl hover:shadow-[#FF6B00]/10"
                    : "hover:border-[#138808]/40 hover:shadow-xl hover:shadow-[#138808]/10",
                  "sm:p-6",
                ].join(" ")}
              >
                {/* Top edge glow */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />
                {/* Corner glow */}
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundColor: `${accent}20` }}
                />

                {/* Icon */}
                <div
                  className="mb-4 grid h-12 w-12 place-items-center rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `${accent}18`,
                    borderColor: `${accent}35`,
                    color: accent,
                    boxShadow: `0 4px 20px ${accent}15`,
                  }}
                >
                  <Icon size={22} strokeWidth={1.7} />
                </div>

                {/* Name */}
                <h3 className="mb-1 text-base font-bold text-white">{name}</h3>

                {/* Market count */}
                <p
                  className="mb-4 text-sm font-semibold"
                  style={{ color: accent }}
                >
                  {markets}
                </p>

                {/* CTA */}
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-200 group-hover:gap-2.5"
                  style={{ color: accent }}
                >
                  Explore Markets
                  <ArrowRight size={13} strokeWidth={2.5} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
