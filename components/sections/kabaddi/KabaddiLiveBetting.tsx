import { kabaddiContent } from "@/data/kabaddi";
import { LiveBadge, HudCorners } from "./KabaddiHud";
import {
  BarChart2,
  Activity,
  ShieldCheck,
  TrendingUp,
  History,
  Clock,
  Swords,
  Sword,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

const ACCENT = "#f59e0b";

// Icons mapped in the same order as kabaddiContent.liveBetting.monitorItems.
const MONITOR_ICONS: LucideIcon[] = [
  BarChart2, // Current score
  Activity, // Raider performance
  ShieldCheck, // Defensive strength
  TrendingUp, // Team form
  History, // Head-to-head statistics
  Clock, // Remaining match time
  Swords, // Super raids
  Sword, // Super tackles
  AlertTriangle, // Player injuries
];

export default function KabaddiLiveBetting() {
  const data = kabaddiContent.liveBetting;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `${ACCENT}12` }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <LiveBadge label="Live Odds Feed" color={ACCENT} />
          </div>
          <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
            Live{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#f59e0b] bg-clip-text text-transparent">
              Kabaddi Betting
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-slate-400 sm:text-base">
            {data.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>

        {/* Broadcast HUD panel */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
          <HudCorners color={ACCENT} />
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            {data.monitorLabel}
          </p>

          <ul className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {data.monitorItems.map((item, i) => {
              const Icon = MONITOR_ICONS[i] ?? Activity;
              return (
                <li
                  key={item}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-white/[0.06]"
                >
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-transform duration-300 group-hover:scale-110"
                    style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}15`, color: ACCENT }}
                  >
                    <Icon size={14} strokeWidth={2} />
                  </span>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-slate-400 sm:text-base">
          {data.closing}
        </p>
      </div>
    </section>
  );
}
