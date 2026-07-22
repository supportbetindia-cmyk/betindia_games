import Link from "next/link";
import { Check, HeartHandshake } from "lucide-react";

const PRINCIPLES = [
  "Play For Entertainment",
  "Set Personal Limits",
  "Take Regular Breaks",
  "Avoid Chasing Losses",
  "Seek Help When Needed",
];

export default function ResponsibleGamingTerms() {
  return (
    <section className="relative bg-[#050B18] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-3xl" />

      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-[#138808]/20 bg-[#138808]/[0.04] backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="border-b border-white/[0.07] p-7 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#138808]/35 bg-[#138808]/15 text-[#138808]">
                  <HeartHandshake size={18} strokeWidth={1.7} />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#138808]">
                  Our Commitment
                </span>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                Responsible{" "}
                <span className="bg-gradient-to-r from-[#138808] via-[#22c55e] to-[#138808] bg-clip-text text-transparent">
                  Gaming
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">
                BetIndia promotes responsible gaming and encourages users to participate in a controlled and enjoyable manner.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                Gaming should remain a form of entertainment and should never exceed personal financial limits.
              </p>

              <Link
                href="/responsible-gaming"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#138808]/35 bg-[#138808]/12 px-5 py-3 text-sm font-bold text-[#138808] transition-all duration-200 hover:bg-[#138808] hover:text-white"
              >
                Learn More About Responsible Gaming
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>

            <div className="p-7">
              <ul className="space-y-3">
                {PRINCIPLES.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#138808]/40 bg-[#138808]/12 text-[#138808]">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span className="text-sm font-medium text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
