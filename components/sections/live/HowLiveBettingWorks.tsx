import { MonitorPlay, TrendingUp, CheckCircle2, Radio } from "lucide-react";
import { liveContent } from "@/data/live";

const STEP_ICONS = [MonitorPlay, TrendingUp, CheckCircle2, Radio] as const;

const STEPS = liveContent.howItWorks.steps.map((step, i) => ({
  number: String(i + 1).padStart(2, "0"),
  icon: STEP_ICONS[i],
  title: step.title,
  description: step.description,
}));

export default function HowLiveBettingWorks() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
            <Radio size={11} strokeWidth={2} />
            Quick Start
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            How Live Betting{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            {liveContent.howItWorks.subtitle}
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-[12.5%] right-[12.5%] top-[2.6rem] h-px bg-gradient-to-r from-transparent via-[#FF6B00]/30 to-transparent" />

            <div className="grid grid-cols-4 gap-6">
              {STEPS.map(({ number, icon: Icon, title, description }, i) => (
                <div key={number} className="group flex flex-col items-center text-center">
                  {/* Step node */}
                  <div className="relative mb-7">
                    <div
                      className="relative z-10 grid h-[5.25rem] w-[5.25rem] place-items-center rounded-full border-2 border-[#FF6B00]/40 bg-[#081425] text-[#FF6B00] transition-all duration-300 group-hover:border-[#FF6B00] group-hover:shadow-[0_0_32px_rgba(255,107,0,0.3)]"
                      style={{ boxShadow: "0 0 0 6px rgba(255,107,0,0.06)" }}
                    >
                      <Icon size={26} strokeWidth={1.6} />
                    </div>
                    {/* Number badge */}
                    <span className="absolute -right-1 -top-1 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6B00] text-[9px] font-black text-white">
                      {i + 1}
                    </span>
                  </div>

                  <span className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6B00]/60">
                    {number}
                  </span>
                  <h3 className="mb-2 text-sm font-bold text-white">{title}</h3>
                  <p className="text-xs leading-relaxed text-slate-400">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="relative lg:hidden">
          {/* Vertical line */}
          <div className="absolute bottom-4 left-[2.1rem] top-4 w-px bg-gradient-to-b from-[#FF6B00]/40 via-[#FF6B00]/20 to-transparent" />

          <div className="space-y-8">
            {STEPS.map(({ number, icon: Icon, title, description }) => (
              <div key={number} className="group relative flex gap-5">
                {/* Node */}
                <div className="relative z-10 shrink-0">
                  <div
                    className="grid h-[4.25rem] w-[4.25rem] place-items-center rounded-full border-2 border-[#FF6B00]/40 bg-[#081425] text-[#FF6B00] transition-all duration-300 group-hover:border-[#FF6B00] group-hover:shadow-[0_0_24px_rgba(255,107,0,0.25)]"
                  >
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6B00] text-[8px] font-black text-white">
                    {number.replace("0", "")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 transition-all duration-300 group-hover:border-[#FF6B00]/25 group-hover:bg-white/[0.06]">
                  <span className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#FF6B00]/60">
                    {number}
                  </span>
                  <h3 className="mb-1 text-sm font-bold text-white">{title}</h3>
                  <p className="text-xs leading-relaxed text-slate-400">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
