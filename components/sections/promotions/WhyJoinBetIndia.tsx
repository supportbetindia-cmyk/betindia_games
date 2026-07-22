import { Trophy, Zap, Crown, Headphones, Activity, ShieldCheck, type LucideIcon } from "lucide-react";
import { promotionsContent } from "@/data/promotions";

const ICON_MAP: Record<string, LucideIcon> = {
  "Premium Sportsbook Experience": Trophy,
  "Fast & Secure Withdrawals": Zap,
  "Exclusive VIP Benefits": Crown,
  "24/7 Customer Support": Headphones,
  "Mobile-Friendly Platform": Activity,
  "Responsible Gaming": ShieldCheck,
};

export default function WhyJoinBetIndia({ content }: { content?: Partial<typeof promotionsContent.whyJoin> | null }) {
  const data = { ...promotionsContent.whyJoin, ...(content ?? {}) };
  const title = data.title;
  const subtitle = data.subtitle;
  const items = data.items && data.items.length > 0 ? data.items : promotionsContent.whyJoin.items;

  const features = items.map((item, index) => ({
    icon: ICON_MAP[item.title] || ShieldCheck,
    title: item.title,
    description: item.description,
    accent: index % 2 === 0 ? ("#FF6B00" as const) : ("#138808" as const),
  }));

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
            {subtitle}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            {title.includes("Choose") ? (
              <>
                {title.split("Choose")[0]}{" "}
                <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
                  Choose BetIndia
                </span>
              </>
            ) : (
              title
            )}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title: itemTitle, description, accent }) => {
            const isOrange = accent === "#FF6B00";
            return (
              <div
                key={itemTitle}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl",
                  "transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]",
                  isOrange
                    ? "hover:border-[#FF6B00]/40 hover:shadow-xl hover:shadow-[#FF6B00]/8"
                    : "hover:border-[#138808]/40 hover:shadow-xl hover:shadow-[#138808]/8",
                ].join(" ")}
              >
                {/* Top edge glow */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />

                {/* Icon + title row */}
                <div className="mb-4 flex items-start gap-4">
                  <div
                    className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${accent}18`,
                      borderColor: `${accent}35`,
                      color: accent,
                    }}
                  >
                    <Icon size={19} strokeWidth={1.7} />
                  </div>
                  <h3 className="text-[15px] font-bold leading-snug text-white">{itemTitle}</h3>
                </div>

                <p className="text-sm leading-relaxed text-slate-400">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
