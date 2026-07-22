import Link from "next/link";
import { Gift, RefreshCw, Crown, Users, ArrowRight, type LucideIcon } from "lucide-react";
import { promotionsContent } from "@/data/promotions";

const ICON_MAP: Record<string, LucideIcon> = {
  "Welcome Bonus": Gift,
  "Weekly Cashback": RefreshCw,
  "VIP Rewards": Crown,
  "Refer & Earn": Users,
};

const ACCENT_MAP: Record<string, "#FF6B00" | "#138808"> = {
  "Welcome Bonus": "#FF6B00",
  "Weekly Cashback": "#138808",
  "VIP Rewards": "#FF6B00",
  "Refer & Earn": "#138808",
};

const BADGE_MAP: Record<string, string> = {
  "Welcome Bonus": "NEW PLAYERS",
  "Weekly Cashback": "POPULAR",
  "VIP Rewards": "PREMIUM",
  "Refer & Earn": "EARN MORE",
};

const VALUE_MAP: Record<string, string> = {
  "Welcome Bonus": "₹25,000",
  "Weekly Cashback": "Up to 10%",
  "VIP Rewards": "Exclusive",
  "Refer & Earn": "Referral",
};

export default function FeaturedPromotions({ content }: { content?: Partial<typeof promotionsContent.featured> | null }) {
  const data = { ...promotionsContent.featured, ...(content ?? {}) };
  const title = data.title;
  const subtitle = data.subtitle;
  const description = data.description;
  const items = data.items && data.items.length > 0 ? data.items : promotionsContent.featured.items;

  const promos = items.map((item) => ({
    icon: ICON_MAP[item.title] || Gift,
    badge: BADGE_MAP[item.title] || "SPECIAL OFFER",
    value: VALUE_MAP[item.title] || "Bonus",
    title: item.title,
    description: item.description,
    cta: item.cta,
    href: item.href,
    accent: ACCENT_MAP[item.title] || "#FF6B00",
  }));

  return (
    <section id="featured-promotions" className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B00]" />
            {subtitle}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            {title.includes("Featured") ? (
              <>
                Featured{" "}
                <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
                  Promotions
                </span>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            {description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {promos.map(({ icon: Icon, badge, value, title: itemTitle, description: itemDesc, cta, href, accent }) => {
            const isOrange = accent === "#FF6B00";
            return (
              <div
                key={itemTitle}
                className={[
                  "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl",
                  "transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]",
                  isOrange
                    ? "hover:border-[#FF6B00]/45 hover:shadow-2xl hover:shadow-[#FF6B00]/10"
                    : "hover:border-[#138808]/45 hover:shadow-2xl hover:shadow-[#138808]/10",
                ].join(" ")}
              >
                {/* Shine sweep */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {/* Top edge glow */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />
                {/* Corner glow */}
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundColor: `${accent}20` }}
                />

                {/* Badge */}
                <span
                  className="mb-5 inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{ borderColor: `${accent}40`, background: `${accent}12`, color: accent }}
                >
                  {badge}
                </span>

                {/* Icon + value row */}
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `${accent}18`,
                      borderColor: `${accent}35`,
                      color: accent,
                      boxShadow: `0 4px 20px ${accent}18`,
                    }}
                  >
                    <Icon size={24} strokeWidth={1.7} />
                  </div>
                  <div>
                    <p
                      className="text-2xl font-black leading-none tracking-tight"
                      style={{ color: accent }}
                    >
                      {value}
                    </p>
                    <h3 className="mt-1 text-base font-bold text-white">{itemTitle}</h3>
                  </div>
                </div>

                <p className="flex-1 text-sm leading-relaxed text-slate-400">{itemDesc}</p>

                {/* CTA */}
                <div className="mt-6 border-t border-white/[0.06] pt-5">
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200 group-hover:gap-3"
                    style={{ color: accent }}
                  >
                    {cta}
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </Link>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-7 right-7 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
