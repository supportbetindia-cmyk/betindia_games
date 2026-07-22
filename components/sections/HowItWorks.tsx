import { UserPlus, Wallet, Target, Banknote, type LucideIcon } from "lucide-react";
import { homeContent } from "@/data/home";

const ICON_MAP: Record<string, LucideIcon> = {
  "Step 1 – Register": UserPlus,
  "Step 2 – Deposit": Wallet,
  "Step 3 – Play or Bet": Target,
  "Step 4 – Withdraw Winnings": Banknote,
};

function NumberBubble({ number }: { number: string }) {
  return (
    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#FF6B00]/40 bg-[#050B18] shadow-[0_0_24px_#FF6B0035]">
      <span className="bg-gradient-to-b from-[#FF6B00] to-[#FF8A00] bg-clip-text text-sm font-black text-transparent">
        {number}
      </span>
    </div>
  );
}

function StepCard({
  icon: Icon,
  title,
  description,
  accent,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "#FF6B00" | "#138808";
}) {
  const isOrange = accent === "#FF6B00";
  return (
    <div
      className={[
        "group relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl",
        "transition-all duration-300",
        isOrange
          ? "hover:border-[#FF6B00]/40 hover:shadow-xl hover:shadow-[#FF6B00]/10"
          : "hover:border-[#138808]/40 hover:shadow-xl hover:shadow-[#138808]/10",
        "hover:bg-white/[0.07] hover:-translate-y-1",
      ].join(" ")}
    >
      {/* Top edge glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      {/* Corner glow */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundColor: `${accent}20` }}
      />

      {/* Icon */}
      <div
        className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{
          background: `${accent}18`,
          borderColor: `${accent}35`,
          color: accent,
          boxShadow: `0 4px 20px ${accent}18`,
        }}
      >
        <Icon size={20} strokeWidth={1.7} />
      </div>

      <h3 className="mb-2 text-base font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}

export default function HowItWorks({ content }: { content?: Partial<typeof homeContent.howItWorks> | null }) {
  const data = { ...homeContent.howItWorks, ...(content ?? {}) };
  const title = data.howItWorksTitle;
  const subtitle = data.howItWorksSubtitle;
  const items = data.howItWorksItems && data.howItWorksItems.length > 0 ? data.howItWorksItems : homeContent.howItWorks.howItWorksItems;

  const steps = items.map((item, index) => ({
    number: `0${index + 1}`,
    icon: ICON_MAP[item.title] || Target,
    title: item.title,
    description: item.description,
    accent: index % 2 === 0 ? ("#FF6B00" as const) : ("#138808" as const),
  }));

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-12 sm:px-6 md:py-14 lg:px-4">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
            Simple &amp; Fast
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            {title.includes("Works") ? (
              <>
                {title.split("Works")[0]}{" "}
                <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
                  Works
                </span>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-400 md:text-base">
            {subtitle}
          </p>
        </div>

        {/* ─── Mobile: vertical timeline (<sm) ─────────────────── */}
        <div className="relative sm:hidden">
          {/* Continuous vertical glow line */}
          <div className="absolute left-7 top-7 bottom-7 w-px bg-gradient-to-b from-[#FF6B00] via-[#FF6B00]/50 to-[#FF6B00]/10" />
          <div className="absolute left-[27px] top-7 bottom-7 w-[3px] bg-gradient-to-b from-[#FF6B00]/30 via-[#FF6B00]/10 to-transparent blur-sm" />

          <div className="space-y-5">
            {steps.map(({ number, icon, title: stepTitle, description, accent }) => (
              <div key={stepTitle} className="flex items-start gap-5">
                <NumberBubble number={number} />
                <div className="flex-1 pt-1">
                  <StepCard
                    icon={icon}
                    title={stepTitle}
                    description={description}
                    accent={accent}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Tablet: 2×2 grid (sm → lg) ──────────────────────── */}
        <div className="hidden sm:grid sm:grid-cols-2 sm:gap-6 lg:hidden">
          {steps.map(({ number, icon, title: stepTitle, description, accent }) => (
            <div key={stepTitle} className="flex flex-col items-center gap-5">
              <NumberBubble number={number} />
              <div className="w-full flex-1">
                <StepCard
                  icon={icon}
                  title={stepTitle}
                  description={description}
                  accent={accent}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ─── Desktop: 4-col with connector (lg+) ─────────────── */}
        <div className="relative hidden lg:block">
          {/* Horizontal connector line */}
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7">
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent" />
            <div className="-mt-px h-4 bg-gradient-to-r from-transparent via-[#FF6B00]/20 to-transparent blur-md" />
          </div>

          <div className="grid grid-cols-4 gap-6">
            {steps.map(({ number, icon, title: stepTitle, description, accent }) => (
              <div key={stepTitle} className="flex flex-col items-center gap-6">
                <NumberBubble number={number} />
                <div className="w-full flex-1">
                  <StepCard
                    icon={icon}
                    title={stepTitle}
                    description={description}
                    accent={accent}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
