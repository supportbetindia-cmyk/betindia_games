import { Activity, Zap, BarChart3, Globe2, ShieldCheck, Gift, type LucideIcon } from "lucide-react";

type Reason = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "#FF6B00" | "#138808";
};

const REASONS: Reason[] = [
  {
    icon: Activity,
    title: "Ball-by-Ball Live Odds",
    description:
      "Odds refresh on every delivery — react to wickets, boundaries, and momentum shifts in real time.",
    accent: "#FF6B00",
  },
  {
    icon: Zap,
    title: "Instant Cashout",
    description:
      "Lock in a profit or cut your losses at any point during the match, before the last ball is bowled.",
    accent: "#138808",
  },
  {
    icon: BarChart3,
    title: "Deep In-Play Markets",
    description:
      "500+ markets per match including session totals, next wicket, powerplay runs, and player specials.",
    accent: "#FF6B00",
  },
  {
    icon: Globe2,
    title: "All Formats Covered",
    description:
      "IPL, T20I, ODI, Test, and domestic tournaments worldwide — all in one place, every day.",
    accent: "#138808",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Licensed",
    description:
      "Bet with confidence on a fully licensed platform with bank-grade encryption and instant payouts.",
    accent: "#FF6B00",
  },
  {
    icon: Gift,
    title: "Cricket Promotions",
    description:
      "Exclusive IPL bonuses, reload offers, and free bets during major tournaments and series.",
    accent: "#138808",
  },
];

export default function WhyBetOnCricket() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#138808]/25 bg-[#138808]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#138808]">
            <ShieldCheck size={11} strokeWidth={2} />
            Why BetIndia
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Why Bet on Cricket{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              With Us?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            Built for Indian cricket fans — the fastest odds, the deepest markets, the best experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, description, accent }) => {
            const isOrange = accent === "#FF6B00";
            return (
              <div
                key={title}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl",
                  "transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]",
                  isOrange
                    ? "hover:border-[#FF6B00]/40 hover:shadow-2xl hover:shadow-[#FF6B00]/8"
                    : "hover:border-[#138808]/40 hover:shadow-2xl hover:shadow-[#138808]/8",
                ].join(" ")}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />

                <div
                  className="mb-5 grid place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    width: "3.25rem",
                    height: "3.25rem",
                    background: `${accent}18`,
                    borderColor: `${accent}35`,
                    color: accent,
                    boxShadow: `0 4px 20px ${accent}15`,
                  }}
                >
                  <Icon size={22} strokeWidth={1.7} />
                </div>

                <h3 className="mb-2 text-base font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
