import { kabaddiContent } from "@/data/kabaddi";

export default function KabaddiOddsWork() {
  const data = kabaddiContent.howOddsWork;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
            How Kabaddi Betting{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              Odds Work
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
        </div>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
          {data.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-md rounded-xl border border-[#FF6B00]/30 bg-[#FF6B00]/10 p-6 text-center">
          <p className="text-sm font-semibold text-[#FF6B00]">{data.example.label}</p>
          {data.example.lines.map((line) => (
            <p key={line} className="mt-2 text-base font-bold text-white">
              {line}
            </p>
          ))}
        </div>

        <p className="mt-8 text-sm font-semibold text-slate-200 sm:text-base">{data.factorsLabel}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.factors.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm text-slate-300"
            >
              <span className="shrink-0 text-[#138808]">✔</span>
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm leading-relaxed text-slate-400 sm:text-base">{data.closing}</p>
      </div>
    </section>
  );
}
