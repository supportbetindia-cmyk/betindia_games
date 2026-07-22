import Link from "next/link";
import { BookOpen, ArrowRight, IndianRupee, Wallet, Trophy, Dice5, CircleUserRound } from "lucide-react";

const FAQ_TOPICS = [
  { icon: IndianRupee, label: "Deposits" },
  { icon: Wallet,      label: "Withdrawals" },
  { icon: Trophy,      label: "Sports Betting" },
  { icon: Dice5,       label: "Casino Games" },
  { icon: CircleUserRound, label: "Account Management" },
] as const;

export default function FAQLink() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div
          className="overflow-hidden rounded-3xl p-px"
          style={{ background: "linear-gradient(135deg, rgba(19,136,8,0.4) 0%, rgba(255,255,255,0.06) 50%, rgba(255,107,0,0.25) 100%)" }}
        >
          <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#081425]/95 p-8 backdrop-blur-xl md:p-12">
            <div aria-hidden className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-[#138808]/10 blur-2xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-[#FF6B00]/8 blur-2xl" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />

            <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              {/* Left */}
              <div>
                <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-[#138808]/30 bg-[#138808]/12">
                  <BookOpen size={28} strokeWidth={1.6} className="text-[#138808]" />
                </div>

                <h2 className="text-2xl font-extrabold text-white md:text-3xl">
                  Need Quick{" "}
                  <span className="bg-gradient-to-r from-[#138808] to-[#FF6B00] bg-clip-text text-transparent">
                    Answers?
                  </span>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Many common questions are already answered in our FAQ section. Browse topics covering:
                </p>

                {/* Topics */}
                <ul className="mt-4 space-y-2">
                  {FAQ_TOPICS.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-2.5">
                      <Icon size={14} strokeWidth={1.8} className="shrink-0 text-[#FF6B00]" />
                      <span className="text-sm text-slate-300">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right */}
              <div className="flex flex-col items-start gap-4 md:items-center md:text-center">
                <p className="text-sm leading-relaxed text-slate-400 md:text-center">
                  Our FAQ section is constantly updated with answers to the latest player questions. It&apos;s the fastest way to find solutions without waiting for support.
                </p>

                <Link
                  href="/#faq"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[#138808] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#138808]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#16a009] hover:shadow-[#138808]/40"
                >
                  Visit FAQ
                  <ArrowRight size={17} strokeWidth={2.2} />
                </Link>

                <p className="text-[11px] text-slate-600">
                  No account needed · Instant answers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
