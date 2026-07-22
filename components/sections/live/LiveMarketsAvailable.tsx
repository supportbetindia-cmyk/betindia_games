import { liveContent } from "@/data/live";

export default function LiveMarketsAvailable() {
  const data = liveContent.availableMarkets;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
          In-Play Markets
        </span>

        <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Live Sports Betting{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            Markets Available
          </span>
        </h2>

        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />

        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {data.intro}
        </p>

        <div className="mt-8">
          <p className="mb-4 text-sm font-semibold text-slate-300">{data.listLabel}</p>
          <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {data.markets.map((market) => (
              <li
                key={market}
                className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-center text-xs font-semibold text-slate-300 transition-colors hover:border-[#FF6B00]/30 hover:text-white"
              >
                {market}
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {data.outro}
        </p>
      </div>
    </section>
  );
}
