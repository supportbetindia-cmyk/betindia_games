import { badmintonContent } from "@/data/badminton";

export default function LiveBadmintonBetting() {
  const data = badmintonContent.liveBetting;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
            Live Online Badminton{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#0ea5e9] bg-clip-text text-transparent">
              Betting
            </span>
          </h2>
          <p className="mx-auto mt-3 text-sm font-semibold text-[#0ea5e9] sm:text-base">
            {data.subtitle}
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#0ea5e9]" />
          <p className="mx-auto mt-6 max-w-3xl whitespace-pre-line text-sm leading-relaxed text-slate-400 sm:text-base">
            {data.text}
          </p>
          <p className="mx-auto mt-8 text-sm font-semibold text-slate-300 sm:text-base">
            {data.featuresLabel}
          </p>
        </div>

        <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
          {data.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm font-semibold text-slate-300"
            >
              <span className="shrink-0 text-[#138808]">✔</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
