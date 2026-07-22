import { aboutUsContent } from "@/data/AboutUs";

export default function WhyChooseAbout() {
  const data = aboutUsContent.whyChoose;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
          Why Players Choose{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            BetIndia
          </span>
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-300 whitespace-pre-line sm:text-base">
          {data.text}
        </p>
      </div>
    </section>
  );
}
