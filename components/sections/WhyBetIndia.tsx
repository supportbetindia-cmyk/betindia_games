import {
  Zap,
  Shield,
  Activity,
  TrendingUp,
  Headphones,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { homeContent } from "@/data/home";

const ICON_MAP: Record<string, LucideIcon> = {
  "Instant Withdrawals": Zap,
  "Secure Payments": Shield,
  "Live Betting": Activity,
  "Premium Odds": TrendingUp,
  "24/7 Support": Headphones,
  "Responsible Gaming": ShieldCheck,
};

export default function WhyBetIndia({ content }: { content?: Partial<typeof homeContent.whyChoose> | null }) {
  const data = { ...homeContent.whyChoose, ...(content ?? {}) };
  const title = data.whyChooseTitle;
  const subtitle = data.whyChooseSubtitle;
  const items = data.whyChooseItems && data.whyChooseItems.length > 0 ? data.whyChooseItems : homeContent.whyChoose.whyChooseItems;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
            Trusted by 10,000+ Players
          </span>

          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl whitespace-pre-line">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-5xl text-sm leading-relaxed text-slate-400 md:text-base ">
            {subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title: itemTitle, description }) => {
            const Icon = ICON_MAP[itemTitle] || Shield;
            // Alternate colors for aesthetics
            const isOrange = itemTitle.includes("Withdrawals") || itemTitle.includes("Betting") || itemTitle.includes("Support");
            const accent = isOrange ? "#FF6B00" : "#138808";

            return (
              <div
                key={itemTitle}
                className={[
                  "group relative overflow-hidden rounded-[24px] border border-white/10",
                  "bg-white/[0.04] p-7 backdrop-blur-xl",
                  "transition-all duration-300",
                  isOrange
                    ? "hover:border-[#FF6B00]/40 hover:shadow-xl hover:shadow-[#FF6B00]/8"
                    : "hover:border-[#138808]/40 hover:shadow-xl hover:shadow-[#138808]/8",
                  "hover:bg-white/[0.07] hover:-translate-y-1.5",
                ].join(" ")}
              >
                {/* Top edge glow */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                  }}
                />

                {/* Corner glow blob */}
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundColor: `${accent}20` }}
                />

                {/* Icon */}
                <div
                  className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `${accent}18`,
                    borderColor: `${accent}35`,
                    color: accent,
                    boxShadow: `0 4px 20px ${accent}18`,
                  }}
                >
                  <Icon size={24} strokeWidth={1.7} />
                </div>

                {/* Text */}
                <h3 className="mb-2 text-base font-bold text-white">{itemTitle}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{description}</p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${accent}60, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
