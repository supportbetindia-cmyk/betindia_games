import Link from "next/link";
import { Timer, Wallet, PhoneOff, BarChart2, type LucideIcon } from "lucide-react";

type Tool = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const TOOLS: Tool[] = [
  {
    icon: Wallet,
    title: "Deposit Limits",
    body: "Set daily, weekly, or monthly deposit limits to keep your spending within your comfort zone — enforced instantly.",
  },
  {
    icon: Timer,
    title: "Session Time Limits",
    body: "Set a session timer and BetIndia will automatically remind you or log you out when your chosen limit is reached.",
  },
  {
    icon: PhoneOff,
    title: "Self-Exclusion",
    body: "Take a break for 24 hours, 7 days, 30 days, or permanently. Your exclusion goes live immediately with no override.",
  },
  {
    icon: BarChart2,
    title: "Spending History",
    body: "Full transparency over your betting activity with detailed transaction history and spend tracking tools.",
  },
];

const SIGNALS = [
  "Spending more than you can afford",
  "Betting to recover previous losses",
  "Neglecting work or family for gambling",
  "Feeling anxious or irritable when not betting",
  "Borrowing money to fund your bets",
];

export default function ResponsibleGaming() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#138808]/7 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#138808]" />
            Play Safe, Play Smart
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Responsible{" "}
            <span className="bg-gradient-to-r from-[#138808] to-[#FF6B00] bg-clip-text text-transparent">
              Gaming
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            Gambling should always be fun. We provide every player with powerful tools to stay in control.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Tools grid */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-slate-400">
              Player Protection Tools
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {TOOLS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#138808]/35 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-[#138808]/8"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#138808]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl border border-[#138808]/30 bg-[#138808]/12 text-[#138808] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon size={21} strokeWidth={1.7} />
                  </div>
                  <h4 className="mb-1.5 text-sm font-bold text-white">{title}</h4>
                  <p className="text-xs leading-relaxed text-slate-400">{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Warning signs */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-slate-400">
                Warning Signs to Watch
              </h3>
              <div className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                <ul className="space-y-3">
                  {SIGNALS.map((signal) => (
                    <li key={signal} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#FF6B00]" />
                      <span className="text-sm leading-relaxed text-slate-300">{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Help CTA */}
            <div
              className="overflow-hidden rounded-[20px] p-px"
              style={{ background: "linear-gradient(135deg, rgba(19,136,8,0.45) 0%, rgba(255,107,0,0.2) 100%)" }}
            >
              <div className="relative overflow-hidden rounded-[calc(1.25rem-1px)] bg-[#081425]/95 p-6 backdrop-blur-xl">
                <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#138808]/12 blur-2xl" />
                <p className="relative text-sm font-semibold text-white">Need help? You&apos;re not alone.</p>
                <p className="relative mt-1.5 text-xs leading-relaxed text-slate-400">
                  If gambling is no longer fun, reach out. Our support team and our dedicated Responsible Gaming page have resources to help.
                </p>
                <div className="relative mt-4 flex flex-col gap-2 sm:flex-row">
                  <Link
                    href="/responsible-gaming"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#138808]/40 bg-[#138808]/15 px-5 py-2.5 text-sm font-bold text-[#138808] transition-all duration-200 hover:bg-[#138808]/25 hover:border-[#138808]/60"
                  >
                    Responsible Gaming
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-slate-300 transition-all duration-200 hover:bg-white/10"
                  >
                    Get Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
