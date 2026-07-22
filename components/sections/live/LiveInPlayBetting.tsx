import { liveContent } from "@/data/live";

export default function LiveInPlayBetting() {
  const data = liveContent.inPlayBetting;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-6xl ">
        

        <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl text-center">
          Live Cricket Betting &{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            In-Play Sports Betting
          </span>
        </h2>

    
        <p className="mx-auto mt-6  text-sm leading-relaxed text-slate-400 whitespace-pre-line sm:text-base">
          {data.text}
        </p>
      </div>
    </section>
  );
}
