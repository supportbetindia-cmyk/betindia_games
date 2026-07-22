import { Zap, Smartphone, TrendingUp, ShieldCheck, Layers } from "lucide-react";
import { volleyballContent } from "@/data/volleyball";

const FEATURE_ICONS = [Zap, Smartphone, TrendingUp, ShieldCheck, Layers] as const;

export default function VolleyballPerfectChoice() {
  const data = volleyballContent.perfectChoice;
  const features = data.features.map((feature, i) => ({
    ...feature,
    icon: FEATURE_ICONS[i],
  }));

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
            Why BetIndia is the Perfect Choice for{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#6366f1] bg-clip-text text-transparent">
              Volleyball Betting India
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#6366f1]" />
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {data.intro}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }, i) => {
            const accent = i % 2 === 0 ? "#FF6B00" : "#6366f1";
            const isLastOdd = i === features.length - 1 && features.length % 2 !== 0;
            return (
              <div
                key={title}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]",
                  isLastOdd ? "sm:col-span-2 sm:max-w-md sm:mx-auto sm:w-full" : "",
                ].join(" ")}
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
