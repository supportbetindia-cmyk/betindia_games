import { kabaddiContent } from "@/data/kabaddi";
import {
  Trophy,
  Percent,
  BarChart2,
  Zap,
  ShieldCheck,
  TrendingUp,
  Timer,
  Crown,
  type LucideIcon,
} from "lucide-react";

const ACCENT = "#f59e0b";

// Icons mapped in the same order as kabaddiContent.popularMarkets.items.
const MARKET_ICONS: LucideIcon[] = [
  Trophy, // Match Winner Betting
  Percent, // Handicap Betting
  BarChart2, // Total Points Betting
  Zap, // Raid Points Betting
  ShieldCheck, // Tackle Points Betting
  TrendingUp, // Winning Margin Betting
  Timer, // First Half Betting
  Crown, // Outright Winner Betting
];

export default function KabaddiMarkets() {
  const data = kabaddiContent.popularMarkets;

  return (
    <section
      id="kabaddi-markets"
      className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 h-[340px] w-[340px] -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `${ACCENT}10` }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
            Popular Kabaddi{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              Betting Markets
            </span>
          </h2>
        </div>
        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-slate-400 sm:text-base">
          {data.intro}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map(({ market, description }, i) => {
            const Icon = MARKET_ICONS[i] ?? Trophy;
            return (
              <div
                key={market}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f59e0b]/40 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-[#f59e0b]/10"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }}
                />
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}15`, color: ACCENT }}
                >
                  <Icon size={18} strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-sm font-bold text-white">{market}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
