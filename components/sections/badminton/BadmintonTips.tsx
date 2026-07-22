import { badmintonContent } from "@/data/badminton";

export default function BadmintonTips() {
  const data = badmintonContent.tips;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
          Tips for Better{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            Badminton Betting
          </span>
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
        <p className="mx-auto mt-6 text-sm leading-relaxed text-slate-400 sm:text-base">{data.intro}</p>

        <ul className="mx-auto mt-8 space-y-3 text-left">
          {data.items.map(({ title, description }) => (
            <li
              key={title}
              className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-300"
            >
              <span className="font-semibold text-white">{title}: </span>
              {description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
