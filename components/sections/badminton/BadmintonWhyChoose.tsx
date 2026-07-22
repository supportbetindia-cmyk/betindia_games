import { badmintonContent } from "@/data/badminton";

export default function BadmintonWhyChoose() {
  const data = badmintonContent.whyChoose;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
          Why BetIndia is the{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            Preferred Choice
          </span>
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />

        <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
          {data.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-300"
            >
              <span className="mt-0.5 shrink-0 text-[#138808]">✔</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
