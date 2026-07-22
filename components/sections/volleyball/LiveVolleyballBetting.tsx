import { volleyballContent } from "@/data/volleyball";

export default function LiveVolleyballBetting() {
  const data = volleyballContent.liveBetting;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
            Feel Every Match with Live Online{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#6366f1] bg-clip-text text-transparent">
              Volleyball Betting
            </span>
          </h2>
          <p className="mt-3 text-sm font-semibold text-[#6366f1] sm:text-base">{data.subtitle}</p>
        </div>
        <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-slate-400 sm:text-base">
          {data.text}
        </p>
        <p className="mt-8 text-sm font-semibold text-slate-300 sm:text-base">{data.featuresLabel}</p>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {data.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm font-semibold text-slate-300"
            >
              <span className="shrink-0 text-[#6366f1]">•</span>
              {feature}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm leading-relaxed text-slate-400 sm:text-base">
          {data.closing}
        </p>
      </div>
    </section>
  );
}
