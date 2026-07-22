import { Zap, Users, TrendingUp, Gift, Headphones, Crown, type LucideIcon } from "lucide-react";
import { vipBenefitsContent } from "@/data/VIPBenefits";

const BENEFIT_ICONS: LucideIcon[] = [Zap, Users, TrendingUp, Gift, Headphones, Crown];
const ACCENTS: Array<"#FF6B00" | "#138808"> = ["#FF6B00", "#138808", "#FF6B00", "#138808", "#FF6B00", "#138808"];

export default function VIPBenefits() {
  const data = vipBenefitsContent.benefits;

  return (
    <section id="vip-benefits" className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
            <Crown size={11} strokeWidth={2} />
            Exclusive Privileges
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            {data.title.includes("VIP Benefits") ? (
              <>
                Exclusive{" "}
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
                  VIP Benefits
                </span>
              </>
            ) : (
              data.title
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map(({ title, description }, i) => {
            const Icon = BENEFIT_ICONS[i] ?? Crown;
            const accent = ACCENTS[i] ?? "#FF6B00";
            const isOrange = accent === "#FF6B00";
            return (
              <div
                key={title}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]",
                  isOrange
                    ? "hover:border-[#FF6B00]/45 hover:shadow-2xl hover:shadow-[#FF6B00]/10"
                    : "hover:border-[#138808]/45 hover:shadow-2xl hover:shadow-[#138808]/10",
                ].join(" ")}
              >
                <div
                  className="mb-5 grid place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110"
                  style={{
                    width: "3.25rem",
                    height: "3.25rem",
                    background: `${accent}18`,
                    borderColor: `${accent}35`,
                    color: accent,
                  }}
                >
                  <Icon size={22} strokeWidth={1.7} />
                </div>
                <h3 className="mb-2 text-base font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
