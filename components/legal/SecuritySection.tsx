import { Check } from "lucide-react";

const MEASURES = [
  "Encrypted Connections",
  "Secure Data Storage",
  "Access Controls",
  "Account Protection",
  "Continuous Monitoring",
  "Security Reviews",
];

export default function SecuritySection() {
  return (
    <section className="relative bg-[#050B18] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/5 blur-3xl" />

      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left */}
            <div className="border-b border-white/[0.07] p-7 lg:border-b-0 lg:border-r">
              <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                Security &amp; Data{" "}
                <span className="bg-gradient-to-r from-[#138808] via-[#22c55e] to-[#138808] bg-clip-text text-transparent">
                  Protection
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">
                Protecting user information is one of our highest priorities.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-slate-500">
                BetIndia implements industry-standard security practices designed to help safeguard personal and account-related information.
              </p>
            </div>

            {/* Right */}
            <div className="p-7">
              <ul className="space-y-3">
                {MEASURES.map((item) => (
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
