import { Zap, TrendingUp, ShieldCheck, Smartphone, Wallet, Headphones } from "lucide-react";
import { badmintonContent } from "@/data/badminton";

const FEATURE_ICONS = [Zap, TrendingUp, ShieldCheck, Smartphone, Wallet, Headphones] as const;

export default function BadmintonPremiumFeatures() {
  const data = badmintonContent.premiumFeatures;
  const features = data.features.map((feature, i) => ({
    ...feature,
    icon: FEATURE_ICONS[i],
  }));

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
            Why Players Choose BetIndia for{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              Badminton Betting India
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {data.intro}
          </p>
          <p className="mx-auto mt-6 text-sm font-semibold text-slate-300 sm:text-base">
            {data.featuresLabel}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, i) => {
            const accent = i % 2 === 0 ? "#FF6B00" : "#138808";
            return (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
              >
                <div
                  className="mb-4 grid place-items-center rounded-xl border transition-all duration-300 group-hover:scale-110"
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
                <h3 className="mb-1.5 text-sm font-bold text-white">{title}</h3>
                <p className="text-xs leading-relaxed text-slate-400">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
