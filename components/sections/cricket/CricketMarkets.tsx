import { Trophy, User, Wind, TrendingUp, Coins, LayoutList, type LucideIcon } from "lucide-react";

type Market = {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  examples: string[];
  accent: "#FF6B00" | "#138808";
};

const MARKETS: Market[] = [
  {
    icon: Trophy,
    title: "Match Winner",
    tagline: "Most Popular",
    description:
      "Bet on which team wins the match outright. Available pre-match and in-play with dynamic live odds.",
    examples: ["Team A to Win", "Team B to Win", "Tie / No Result"],
    accent: "#FF6B00",
  },
  {
    icon: User,
    title: "Top Batsman",
    tagline: "Player Markets",
    description:
      "Predict which batsman will score the most runs for their team in the match or innings.",
    examples: ["Top scorer — Team A", "Top scorer — Team B", "50+ Runs scorer"],
    accent: "#138808",
  },
  {
    icon: Wind,
    title: "Top Bowler",
    tagline: "Player Markets",
    description:
      "Wager on which bowler will take the most wickets or deliver the most economical spell.",
    examples: ["Most wickets — Team A", "Most wickets — Team B", "3+ wickets"],
    accent: "#FF6B00",
  },
  {
    icon: TrendingUp,
    title: "Over / Under",
    tagline: "Totals",
    description:
      "Bet on whether the total runs, wickets, or boundaries in an over or innings will be above or below a set line.",
    examples: ["1st innings — Over 160.5", "Powerplay runs", "Total sixes"],
    accent: "#138808",
  },
  {
    icon: Coins,
    title: "Toss Winner",
    tagline: "Pre-Match",
    description:
      "A simple pre-match 50/50 market — predict which captain wins the toss and choose their decision.",
    examples: ["Team A wins toss", "Team B wins toss", "Toss winner bats"],
    accent: "#FF6B00",
  },
  {
    icon: LayoutList,
    title: "Session Betting",
    tagline: "In-Play",
    description:
      "Unique to cricket — bet on runs scored in a specific session, over, or between fall of wickets.",
    examples: ["Runs in next over", "Session runs", "Fall of next wicket"],
    accent: "#138808",
  },
];

export default function CricketMarkets() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
            <Trophy size={11} strokeWidth={2} />
            Betting Markets
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Popular Cricket{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Markets
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            From match winners to ball-by-ball specials — explore every way to bet on cricket.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MARKETS.map(({ icon: Icon, title, tagline, description, examples, accent }) => {
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
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundColor: `${accent}1A` }}
                />

                {/* Icon + tag */}
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
                    style={{ borderColor: `${accent}30`, background: `${accent}10`, color: accent }}
                  >
                    {tagline}
                  </span>
                </div>

                <h3 className="mb-2 text-base font-bold text-white">{title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-400">{description}</p>

                {/* Example bets */}
                <ul className="space-y-1.5">
                  {examples.map((ex) => (
                    <li key={ex} className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span
                        className="h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: accent }}
                      />
                      {ex}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 transition-colors group-hover:text-slate-400">
                  <span>Bet this market</span>
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
