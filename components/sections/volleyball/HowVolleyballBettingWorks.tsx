import { UserPlus, Wallet, Search, BarChart3, CheckCircle2 } from "lucide-react";
import { volleyballContent } from "@/data/volleyball";

const STEP_ICONS = [UserPlus, Wallet, Search, BarChart3, CheckCircle2] as const;

export default function HowVolleyballBettingWorks() {
  const data = volleyballContent.howItWorks;
  const steps = data.steps.map((step, i) => ({
    number: String(i + 1).padStart(2, "0"),
    icon: STEP_ICONS[i],
    title: step.title,
    description: step.description,
  }));

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
            Quick Start
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            How to Start Online Volleyball{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#6366f1] to-[#138808] bg-clip-text text-transparent">
              Betting
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl whitespace-pre-line text-sm leading-relaxed text-slate-400 md:text-base">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ number, icon: Icon, title, description }, i) => {
            const accent = i % 2 === 0 ? "#FF6B00" : "#6366f1";

            return (
              <div
                key={number}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.07] lg:p-4"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />

                <div className="mb-4 flex items-center justify-between gap-3">
                  <div
                    className="grid place-items-center rounded-xl border transition-all duration-300 group-hover:scale-110"
                    style={{
                      width: "2.75rem",
                      height: "2.75rem",
                      background: `${accent}18`,
                      borderColor: `${accent}35`,
                      color: accent,
                    }}
                  >
                    <Icon size={18} strokeWidth={1.7} />
                  </div>
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white"
                    style={{ background: accent }}
                  >
                    {i + 1}
                  </span>
                </div>

                <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6B00]/60">
                  Step {number}
                </span>
                <h3 className="mb-2 text-sm font-bold text-white lg:text-xs xl:text-sm">{title}</h3>
                <p className="text-xs leading-relaxed text-slate-400 lg:text-[11px] xl:text-xs">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
