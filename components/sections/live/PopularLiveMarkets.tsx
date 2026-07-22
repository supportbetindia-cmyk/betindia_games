import { Trophy, Activity, TrendingUp, Goal, Wallet2, User, type LucideIcon } from "lucide-react";
import { liveContent } from "@/data/live";

type Market = {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  accent: "#FF6B00" | "#138808";
};

const MARKET_META: Record<string, { icon: LucideIcon; tag: string }> = {
  "Match Winner": { icon: Trophy, tag: "Most Popular" },
  "Next Wicket": { icon: Activity, tag: "Cricket" },
  "Over / Under": { icon: TrendingUp, tag: "All Sports" },
  "Next Goal": { icon: Goal, tag: "Football" },
  "Cashout Markets": { icon: Wallet2, tag: "All Sports" },
  "Player Performance": { icon: User, tag: "All Sports" },
};

const MARKETS: Market[] = liveContent.popularMarkets.items.map((item, index) => ({
  icon: MARKET_META[item.title]?.icon ?? Trophy,
  title: item.title,
  description: item.description,
  tag: MARKET_META[item.title]?.tag ?? "All Sports",
  accent: index % 2 === 0 ? "#FF6B00" : "#138808",
}));

export default function PopularLiveMarkets() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
            <Trophy size={11} strokeWidth={2} />
            In-Play Markets
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Popular Live{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Betting Markets
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            {liveContent.popularMarkets.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MARKETS.map(({ icon: Icon, title, description, tag, accent }) => {
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

                <div className="mb-5 flex items-start justify-between">
                  <div
                    className="grid place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
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
                  <span
                    className="rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide"
                    style={{
                      borderColor: `${accent}35`,
                      background: `${accent}10`,
                      color: accent,
                    }}
                  >
                    {tag}
                  </span>
                </div>

                <h3 className="mb-2 text-base font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{description}</p>

                <div className="mt-5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 transition-colors group-hover:text-slate-400">
                  <span>Bet now</span>
                  <span style={{ color: accent }}>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
