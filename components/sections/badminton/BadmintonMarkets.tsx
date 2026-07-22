import { badmintonContent } from "@/data/badminton";

export default function BadmintonMarkets() {
  const data = badmintonContent.markets;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
            Explore Multiple Badminton{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              Betting Markets
            </span>
          </h2>
        </div>
        <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-slate-400 sm:text-base">
          {data.intro}
        </p>
        <p className="mt-6 text-sm font-semibold text-slate-300 sm:text-base">
          {data.listLabel}
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl mt-6">
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.04]">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#FF6B00]">Market</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#FF6B00]">Description</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map(({ market, description }, i) => (
                <tr
                  key={market}
                  className={[
                    "border-b border-white/[0.06] transition-colors hover:bg-white/[0.04]",
                    i === data.items.length - 1 ? "border-b-0" : "",
                  ].join(" ")}
                >
                  <td className="px-5 py-4 font-semibold text-white">{market}</td>
                  <td className="px-5 py-4 text-slate-400">{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-slate-400 sm:text-base">
          {data.closing}
        </p>
      </div>
    </section>
  );
}
