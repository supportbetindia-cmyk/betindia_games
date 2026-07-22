import {
  Zap,
  Trophy,
  Smartphone,
  IndianRupee,
  Activity,
  Headphones,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "#FF6B00" | "#138808";
};

const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: "Instant Withdrawals",
    description: "Withdraw your winnings in minutes, not days. We partner with all major Indian payment gateways for seamless, instant payouts.",
    accent: "#FF6B00",
  },
  {
    icon: Trophy,
    title: "Best Odds in India",
    description: "Industry-leading odds across cricket, football, kabaddi, and 50+ other sports. Our margins are designed to maximise your returns.",
    accent: "#138808",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "A lightning-fast experience optimised for every screen. Bet from anywhere — stadium, home, or on the go — with zero friction.",
    accent: "#FF6B00",
  },
  {
    icon: IndianRupee,
    title: "INR Transactions",
    description: "Deposit and withdraw in rupees with UPI, Net Banking, and popular wallets. No conversion fees, no hassle.",
    accent: "#138808",
  },
  {
    icon: Activity,
    title: "Live In-Play Betting",
    description: "Dynamic odds updated ball-by-ball. Place bets while the match is live and react to every moment as it unfolds.",
    accent: "#FF6B00",
  },
  {
    icon: Headphones,
    title: "24/7 Indian Support",
    description: "Our Hindi and English-speaking support team is available round the clock via chat, email, and phone — always ready to help.",
    accent: "#138808",
  },
];

export default function WhyBetIndia() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
            Why 10,000+ Players Trust Us
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            The BetIndia{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              Advantage
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            We didn&apos;t just build another betting site — we built the platform we always wanted to use ourselves.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, accent }) => {
            const isOrange = accent === "#FF6B00";
            return (
              <div
                key={title}
                className={[
                  "group relative overflow-hidden rounded-[24px] border border-white/10",
                  "bg-white/[0.04] p-7 backdrop-blur-xl",
                  "transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]",
                  isOrange
                    ? "hover:border-[#FF6B00]/40 hover:shadow-xl hover:shadow-[#FF6B00]/8"
                    : "hover:border-[#138808]/40 hover:shadow-xl hover:shadow-[#138808]/8",
                ].join(" ")}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundColor: `${accent}20` }}
                />

                <div
                  className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `${accent}18`,
                    borderColor: `${accent}35`,
                    color: accent,
                    boxShadow: `0 4px 20px ${accent}18`,
                  }}
                >
                  <Icon size={24} strokeWidth={1.7} />
                </div>

                <h3 className="mb-2 text-base font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{description}</p>

                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
