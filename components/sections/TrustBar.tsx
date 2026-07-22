import { Users, Zap, ShieldCheck, Headphones, Lock, type LucideIcon } from "lucide-react";
import { homeContent } from "@/data/home";

// Icon names (stored as strings in the content data) → Lucide components.
const ICONS: Record<string, LucideIcon> = { Users, Zap, ShieldCheck, Headphones, Lock };

type Item = {
  icon: string;
  label: string;
  sub: string;
  accent: string;
  highlight?: boolean;
};

type TrustBarContent = { items?: Item[] };

export default function TrustBar({ content }: { content?: TrustBarContent }) {
  const items: Item[] =
    content?.items && content.items.length > 0 ? content.items : homeContent.trustBar.items;

  return (
    <section className="bg-[#050B18] px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        {items.map(({ icon, label, sub, accent, highlight }, i) => {
          const Icon = ICONS[icon] ?? Users;
          const isOrange = accent === "#FF6B00";
          return (
            <div
              key={sub}
              className={[
                "group relative flex flex-col items-center gap-4 rounded-2xl border p-6 text-center",
                "backdrop-blur-xl transition-all duration-300",
                "border-white/10 bg-white/[0.04]",
                isOrange
                  ? "hover:border-[#FF6B00]/40 hover:shadow-lg hover:shadow-[#FF6B00]/10"
                  : "hover:border-[#138808]/40 hover:shadow-lg hover:shadow-[#138808]/10",
                "hover:bg-white/[0.08] hover:scale-[1.03]",
                i === 4
                  ? "col-span-2 max-w-[calc(50%-8px)] mx-auto w-full lg:max-w-none lg:mx-0 lg:col-span-1"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Top border glow on hover */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                }}
              />

              {/* Icon */}
              <span
                className="grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${accent}18`, color: accent }}
              >
                <Icon size={24} strokeWidth={1.7} />
              </span>

              {/* Label + sub */}
              <span className="flex flex-col gap-1">
                {highlight ? (
                  <span className="block text-xl font-black uppercase tracking-tight bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] bg-clip-text text-transparent">
                    {label}
                  </span>
                ) : (
                  <span
                    className="block text-xl font-black uppercase tracking-tight"
                    style={{ color: accent }}
                  >
                    {label}
                  </span>
                )}
                <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {sub}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
