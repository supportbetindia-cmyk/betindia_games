import { kabaddiContent } from "@/data/kabaddi";

export default function KabaddiPKLGuide() {
  const data = kabaddiContent.pklGuide;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
            Pro Kabaddi League (PKL){" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              Betting Guide
            </span>
          </h2>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-slate-400 sm:text-base">{data.intro}</p>

        <div className="mt-10 space-y-6">
          {data.sections.map(({ title, paragraphs }) => (
            <article
              key={title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8"
            >
              <h3 className="text-lg font-bold text-white sm:text-xl">{title}</h3>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm font-semibold text-slate-300 sm:text-base">{data.marketsLabel}</p>
        <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{data.marketsIntro}</p>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {data.markets.map((market) => (
            <li
              key={market}
              className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-xs font-semibold text-slate-300 transition-colors hover:border-[#FF6B00]/30 hover:text-white"
            >
              <span aria-hidden>🤼</span>
              {market}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm leading-relaxed text-slate-400 sm:text-base">{data.closing}</p>
      </div>
    </section>
  );
}
