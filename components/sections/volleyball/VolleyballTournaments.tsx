import { volleyballContent } from "@/data/volleyball";

export default function VolleyballTournaments() {
  const data = volleyballContent.tournaments;

  return (
    <section
      id="volleyball-matches"
      className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
            Volleyball Tournaments{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              Available for Betting
            </span>
          </h2>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-slate-400 sm:text-base">{data.intro}</p>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="mt-10 text-sm font-semibold text-slate-300 sm:text-base">
          {data.listLabel}
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {data.list.map((tournament) => (
            <li
              key={tournament}
              className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-xs font-semibold text-slate-300 transition-colors hover:border-[#FF6B00]/30 hover:text-white"
            >
              <span aria-hidden>🏐</span>
              {tournament}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm leading-relaxed text-slate-400 sm:text-base">
          {data.closing}
        </p>
      </div>
    </section>
  );
}
