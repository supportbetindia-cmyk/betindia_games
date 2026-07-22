import { kabaddiContent } from "@/data/kabaddi";
import { Crown, Trophy, Medal, Award, Star, type LucideIcon } from "lucide-react";

const ACCENT = "#f59e0b";

// Icons mapped in the same order as kabaddiContent.majorTournaments.list.
// The first entry (Pro Kabaddi League) is the flagship competition and gets a
// larger, highlighted card.
const TOURNAMENT_ICONS: LucideIcon[] = [Crown, Trophy, Medal, Award, Star];

export default function KabaddiTournaments() {
  const data = kabaddiContent.majorTournaments;

  return (
    <section
      id="kabaddi-tournaments"
      className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
            Major{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              Kabaddi Tournaments
            </span>
          </h2>
        </div>
        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-slate-400 sm:text-base">
          {data.intro}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {data.list.map((tournament, i) => {
            const Icon = TOURNAMENT_ICONS[i] ?? Trophy;
            const isFlagship = i === 0;
            return (
              <div
                key={tournament}
                className={[
                  "group relative flex flex-col items-center gap-2.5 overflow-hidden rounded-2xl border p-4 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1",
                  isFlagship
                    ? "col-span-2 border-[#f59e0b]/40 bg-[#f59e0b]/[0.08] sm:col-span-1"
                    : "border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]",
                ].join(" ")}
              >
                {isFlagship && (
                  <span
                    className="absolute right-2 top-2 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                    style={{ borderColor: `${ACCENT}60`, background: `${ACCENT}20`, color: ACCENT }}
                  >
                    Flagship
                  </span>
                )}
                <span
                  className="grid h-10 w-10 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-110"
                  style={{
                    borderColor: isFlagship ? `${ACCENT}60` : "rgba(255,255,255,0.12)",
                    background: isFlagship ? `${ACCENT}20` : "rgba(255,255,255,0.05)",
                    color: isFlagship ? ACCENT : "#94a3b8",
                  }}
                >
                  <Icon size={16} strokeWidth={2} />
                </span>
                <span className="text-xs font-semibold text-slate-200">{tournament}</span>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-sm leading-relaxed text-slate-400 sm:text-base">{data.closing}</p>
      </div>
    </section>
  );
}
