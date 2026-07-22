import { liveContent } from "@/data/live";

export default function WhyChooseLiveBetting() {
  const data = liveContent.whyChooseLive;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-6xl ">
        <h2 className="text-2xl font-extrabold text-center leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
            Live Betting?
          </span>
        </h2>
        
        <p className="mx-auto mt-6  text-sm leading-relaxed text-slate-400 whitespace-pre-line sm:text-base">
          {data.description}
        </p>
      </div>
    </section>
  );
}
