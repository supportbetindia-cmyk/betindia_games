import Link from "next/link";
import { Shield, Trophy, Gem, Crown } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import { vipBenefitsContent } from "@/data/VIPBenefits";

const LEVEL_ICONS = [Shield, Trophy, Gem, Crown] as const;
const LEVEL_STYLES = [
  { color: "#94a3b8", borderColor: "rgba(148,163,184,0.30)", glowColor: "rgba(148,163,184,0.08)" },
  { color: "#FF8A00", borderColor: "rgba(255,138,0,0.35)", glowColor: "rgba(255,107,0,0.10)" },
  { color: "#138808", borderColor: "rgba(19,136,8,0.35)", glowColor: "rgba(19,136,8,0.10)" },
  { color: "#FF6B00", borderColor: "rgba(255,107,0,0.60)", glowColor: "rgba(255,107,0,0.18)" },
];

export default function VIPLevels() {
  const data = vipBenefitsContent.levels;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
            4 Exclusive Tiers
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            VIP Membership{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Levels
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((level, index) => {
            const Icon = LEVEL_ICONS[index] ?? Crown;
            const style = LEVEL_STYLES[index] ?? LEVEL_STYLES[0];
            const diamond = level.diamond ?? false;
            const shortName = level.name.replace(" VIP", "");

            return (
              <div
                key={level.name}
                className={[
                  "group relative flex flex-col overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-300",
                  diamond ? "scale-[1.02] hover:-translate-y-2 hover:shadow-2xl" : "hover:-translate-y-1.5 hover:shadow-xl",
                ].join(" ")}
                style={{
                  border: `1px solid ${style.borderColor}`,
                  background: diamond
                    ? "linear-gradient(135deg, rgba(255,107,0,0.10) 0%, rgba(8,20,37,0.95) 50%, rgba(19,136,8,0.06) 100%)"
                    : "rgba(255,255,255,0.04)",
                  boxShadow: diamond ? `0 0 40px ${style.glowColor}` : undefined,
                }}
              >
                {diamond && (
                  <div className="absolute right-4 top-4 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#FF6B00]">
                    Most Exclusive
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="grid h-12 w-12 place-items-center rounded-xl border"
                      style={{
                        background: `${style.color}18`,
                        borderColor: `${style.color}40`,
                        color: style.color,
                      }}
                    >
                      <Icon size={22} strokeWidth={1.7} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                        Level {index + 1}
                      </p>
                      <p className="text-lg font-black tracking-tight" style={{ color: diamond ? undefined : style.color }}>
                        {diamond ? (
                          <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
                            {shortName}
                          </span>
                        ) : (
                          shortName
                        )}
                      </p>
                    </div>
                  </div>

                  <p className="mb-4 text-xs leading-relaxed text-slate-400">{level.description}</p>

                  <ul className="mb-6 flex-1 space-y-2.5">
                    {level.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: style.color }} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={CTA_LINKS.signup}
                    className={[
                      "mt-auto w-full rounded-xl py-3 text-center text-sm font-bold transition-all duration-200",
                      diamond
                        ? "bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/25 hover:bg-[#FF8A00]"
                        : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white",
                    ].join(" ")}
                  >
                    {diamond ? "Claim Diamond VIP" : `Unlock ${shortName}`}
                  </Link>
                </div>

                {diamond && (
                  <div
                    className="h-1 w-full"
                    style={{ background: "linear-gradient(90deg, transparent, #FF6B00, #FF8A00, #FF6B00, transparent)" }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-slate-500">{data.note}</p>
      </div>
    </section>
  );
}
