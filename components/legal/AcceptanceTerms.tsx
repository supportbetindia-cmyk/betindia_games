import { Check } from "lucide-react";

const POINTS = [
  "Agreement To Platform Rules",
  "Compliance With Applicable Laws",
  "Acceptance Of Future Updates",
  "Responsible Platform Usage",
];

export default function AcceptanceTerms() {
  return (
    <section className="relative bg-[#050B18] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-3xl" />

      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="border-b border-white/[0.07] p-7 lg:border-b-0 lg:border-r">
              <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                Acceptance Of{" "}
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
                  Terms
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">
                By accessing, browsing, or using BetIndia, users acknowledge that they have read, understood, and agreed to these Terms &amp; Conditions.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-slate-500">
                Continued use of the platform constitutes acceptance of any future modifications or updates to these terms.
              </p>
            </div>

            <div className="p-7">
              <ul className="space-y-3">
                {POINTS.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/12 text-[#FF6B00]">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span className="text-sm font-medium text-slate-300">{point}</span>
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
