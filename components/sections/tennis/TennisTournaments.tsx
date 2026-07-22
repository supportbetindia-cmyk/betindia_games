import { tennisContent } from "@/data/tennis";

export default function TennisTournaments() {
  const data = tennisContent.tournaments;

  return (
    <section
      id="tennis-tournaments"
      className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
            Major Tennis Tournaments{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              Available
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">{data.intro}</p>
        </div>

        <ul className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {data.list.map((tournament) => (
            <li
              key={tournament}
              className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-center text-xs font-semibold text-slate-300 transition-colors hover:border-[#FF6B00]/30 hover:text-white"
            >
              {tournament}
            </li>
          ))}
        </ul>

        <div className="mt-14 text-center">
          <h3 className="text-xl font-extrabold text-white sm:text-2xl">{data.comparisonTitle}</h3>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#FF6B00]" />
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.04]">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#FF6B00]">Tournament</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#FF6B00]">Surface</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#FF6B00]">Category</th>
              </tr>
            </thead>
            <tbody>
              {data.comparison.map(({ tournament, surface, category }, i) => (
                <tr
                  key={tournament}
                  className={[
                    "border-b border-white/[0.06] transition-colors hover:bg-white/[0.04]",
                    i === data.comparison.length - 1 ? "border-b-0" : "",
                  ].join(" ")}
                >
                  <td className="px-5 py-4 font-semibold text-white">{tournament}</td>
                  <td className="px-5 py-4 text-slate-400">{surface}</td>
                  <td className="px-5 py-4 text-slate-400">{category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
