import { tennisContent } from "@/data/tennis";

export default function LiveTennisMarkets() {
  const data = tennisContent;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 ">
          <h2 className="text-2xl text-center font-extrabold text-white md:text-3xl lg:text-4xl">
            Live Tennis{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#eab308] bg-clip-text text-transparent">
              Betting
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#eab308]" />
          <p className="mx-auto mt-6  text-sm leading-relaxed text-slate-400 sm:text-base">
            {data.liveTennisBetting.text}
          </p>
          {((data.liveTennisBetting as any).marketsLabel || "").trim() && (
            <p className="mx-auto mt-6 text-sm font-semibold text-slate-300 sm:text-base whitespace-pre-line">
              {(data.liveTennisBetting as any).marketsLabel}
            </p>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.04]">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#FF6B00]">Market</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#FF6B00]">Description</th>
              </tr>
            </thead>
            <tbody>
              {data.liveMarkets.map(({ market, description }, i) => (
                <tr
                  key={market}
                  className={[
                    "border-b border-white/[0.06] transition-colors hover:bg-white/[0.04]",
                    i === data.liveMarkets.length - 1 ? "border-b-0" : "",
                  ].join(" ")}
                >
                  <td className="px-5 py-4 font-semibold text-white">{market}</td>
                  <td className="px-5 py-4 text-slate-400">{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
