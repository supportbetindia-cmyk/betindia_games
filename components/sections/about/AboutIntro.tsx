import { aboutUsContent } from "@/data/AboutUs";

export default function AboutIntro() {
  const data = aboutUsContent.intro;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-300 whitespace-pre-line sm:text-base">
          {data.text}
        </p>
      </div>
    </section>
  );
}
