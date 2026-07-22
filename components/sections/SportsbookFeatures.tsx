import Link from "next/link";
import {
  Activity,
  Trophy,
  Gem,
  Plane,
  Gamepad2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type Card = {
  icon: LucideIcon;
  badge: string;
  live?: boolean;
  title: string;
  stat: string;
  description: string;
  cta: string;
  href: string;
  accent: "#FF6B00" | "#138808";
};

const CARDS: Card[] = [
  {
    icon: Activity,
    badge: "LIVE",
    live: true,
    title: "Live Cricket Betting",
    stat: "500+ Markets",
    description: "Ball-by-ball live odds on every IPL, T20 & Test match.",
    cta: "Bet Now",
    href: "/cricket",
    accent: "#FF6B00",
  },
  {
    icon: Trophy,
    badge: "50+ SPORTS",
    title: "Sportsbook",
    stat: "Best Odds",
    description: "Football, kabaddi, tennis and more at market-leading odds.",
    cta: "Explore",
    href: "/sports",
    accent: "#138808",
  },
  {
    icon: Gem,
    badge: "HOT",
    title: "Live Casino",
    stat: "200+ Tables",
    description: "Real dealers and real-time gameplay from top studios.",
    cta: "Play Now",
    href: "/casino",
    accent: "#FF6B00",
  },
  {
    icon: Plane,
    badge: "NEW",
    title: "Aviator",
    stat: "Up to 100×",
    description: "Fly high and cash out before the plane disappears.",
    cta: "Take Off",
    href: "/aviator",
    accent: "#138808",
  },
  {
    icon: Gamepad2,
    badge: "POPULAR",
    title: "Teen Patti",
    stat: "₹10 Min Bet",
    description: "India's favourite card game with live tournaments.",
    cta: "Play",
    href: "/teen-patti",
    accent: "#FF6B00",
  },
];

export default function SportsbookFeatures({ content }: { content?: Record<string, unknown> }) {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[320px] w-[320px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#FF6B00]/7 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[320px] w-[320px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#138808]/7 blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
            Sportsbook &amp; Casino
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            PLAY WHAT YOU{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              LOVE
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
            Cricket, casino, aviator &amp; more — India&apos;s most complete
            betting experience, all under one roof.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {CARDS.map(
            ({ icon: Icon, badge, live, title, stat, description, cta, href, accent }, i) => {
              const isOrange = accent === "#FF6B00";
              return (
                <div
                  key={title}
                  className={[
                    "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10",
                    "bg-white/[0.04] backdrop-blur-xl transition-all duration-300",
                    isOrange
                      ? "hover:border-[#FF6B00]/40 hover:shadow-xl hover:shadow-[#FF6B00]/10"
                      : "hover:border-[#138808]/40 hover:shadow-xl hover:shadow-[#138808]/10",
                    "hover:bg-white/[0.07] hover:-translate-y-1",
                    i === 4
                      ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[calc(50%-10px)] lg:col-span-1 lg:mx-0 lg:max-w-none"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {/* Top border glow */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                    }}
                  />

                  {/* Visual area */}
                  <div
                    className="relative flex h-36 items-center justify-center"
                    style={{
                      background: `radial-gradient(ellipse at 50% 120%, ${accent}22 0%, transparent 70%)`,
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(ellipse at 50% 80%, ${accent}30 0%, transparent 65%)`,
                      }}
                    />
                    <div
                      className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: `${accent}18`,
                        borderColor: `${accent}35`,
                        color: accent,
                        boxShadow: `0 4px 24px ${accent}20`,
                      }}
                    >
                      <Icon size={28} strokeWidth={1.6} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-3 p-5 pt-4">
                    {/* Badge */}
                    <span
                      className="inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        borderColor: `${accent}40`,
                        background: `${accent}12`,
                        color: accent,
                      }}
                    >
                      {live && (
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                          <span
                            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                            style={{ backgroundColor: accent }}
                          />
                          <span
                            className="relative inline-flex h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: accent }}
                          />
                        </span>
                      )}
                      {badge}
                    </span>

                    {/* Title */}
                    <h3 className="text-base font-bold leading-snug text-white">
                      {title}
                    </h3>

                    {/* Stat */}
                    <span
                      className="inline-flex w-fit items-center rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold"
                      style={{ color: accent }}
                    >
                      {stat}
                    </span>

                    {/* Description */}
                    <p className="flex-1 text-sm leading-relaxed text-slate-400">
                      {description}
                    </p>

                    {/* CTA */}
                    <Link
                      href={href}
                      className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200 group-hover:gap-3"
                      style={{ color: accent }}
                    >
                      {cta}
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
