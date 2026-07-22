import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import { slotsContent } from "@/data/slots";

type Jackpot = {
  emoji: string;
  name: string;
  amount: string;
  amountNote: string;
  category: string;
  players: string;
  gradientA: string;
  gradientB: string;
  hot?: boolean;
};

const JACKPOTS: Jackpot[] = [
  {
    emoji: "💰",
    name: "Mega Fortune",
    amount: "₹2.5 Crore+",
    amountNote: "Progressive · Growing Now",
    category: "Mega Jackpot",
    players: "3.2k playing",
    gradientA: "#FF6B00",
    gradientB: "#FF8A00",
    hot: true,
  },
  {
    emoji: "💎",
    name: "Diamond Rush",
    amount: "₹1.8 Crore+",
    amountNote: "Progressive · Growing Now",
    category: "Premium Jackpot",
    players: "1.9k playing",
    gradientA: "#2563eb",
    gradientB: "#06b6d4",
    hot: false,
  },
  {
    emoji: "👑",
    name: "Royal Treasure",
    amount: "₹1.2 Crore+",
    amountNote: "Progressive · Growing Now",
    category: "Video Jackpot",
    players: "1.4k playing",
    gradientA: "#7c3aed",
    gradientB: "#a855f7",
    hot: false,
  },
  {
    emoji: "🏆",
    name: "Golden Empire",
    amount: "₹90 Lakh+",
    amountNote: "Progressive · Growing Now",
    category: "Classic Jackpot",
    players: "980 playing",
    gradientA: "#d97706",
    gradientB: "#fbbf24",
    hot: false,
  },
];

export default function JackpotSlots() {
  const section = slotsContent.jackpotSlots;

  return (
    <section id="jackpot-slots" className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Divider glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6B00]/25 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
            <TrendingUp size={11} strokeWidth={2} />
            Life-Changing Wins
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Progressive Jackpot{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Slot Games
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 whitespace-pre-line md:text-base">
            {section.text}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {JACKPOTS.map(({ emoji, name, amount, amountNote, category, players, gradientA, gradientB, hot }) => (
            <div
              key={name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]"
              style={
                ({
                  "--g": gradientA,
                } as React.CSSProperties)
              }
            >
              {/* Hover border */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 0 1px ${gradientA}50` }}
              />

              {/* Top edge glow */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${gradientA}, transparent)` }}
              />

              {/* Visual panel */}
              <div
                className="relative flex h-44 flex-col items-center justify-center gap-3 overflow-hidden px-4"
                style={{
                  background: `radial-gradient(ellipse at 50% 120%, ${gradientA}28 0%, transparent 65%), radial-gradient(ellipse at 85% 10%, ${gradientB}12 0%, transparent 50%)`,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(ellipse at 50% 70%, ${gradientA}30 0%, transparent 60%)` }}
                />

                {/* HOT badge */}
                {hot && (
                  <span className="absolute right-3 top-3 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/15 px-2 py-0.5 text-[8px] font-black text-[#FF6B00]">
                    🔥 HOT
                  </span>
                )}

                {/* Jackpot badge */}
                <span
                  className="absolute left-3 top-3 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wide backdrop-blur-sm"
                  style={{ borderColor: `${gradientA}40`, background: `${gradientA}18`, color: gradientA }}
                >
                  JACKPOT
                </span>

                {/* Emoji */}
                <div
                  className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `linear-gradient(135deg, ${gradientA}20, ${gradientB}15)`,
                    borderColor: `${gradientA}35`,
                    boxShadow: `0 4px 28px ${gradientA}25`,
                  }}
                >
                  {emoji}
                </div>

                {/* Jackpot amount */}
                <div className="relative z-10 text-center">
                  <p
                    className="text-xl font-black leading-none tracking-tight"
                    style={{ color: gradientA }}
                  >
                    {amount}
                  </p>
                  <p className="mt-1 flex items-center justify-center gap-1 text-[9px] text-slate-500">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: gradientA }} />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: gradientA }} />
                    </span>
                    {amountNote}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <span
                    className="inline-flex rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                    style={{ borderColor: `${gradientA}35`, background: `${gradientA}10`, color: gradientA }}
                  >
                    {category}
                  </span>
                  <h3 className="mt-2 text-sm font-bold text-white">{name}</h3>
                  <p className="mt-0.5 text-[11px] text-slate-500">{players}</p>
                </div>

                <Link
                  href={CTA_LINKS.signup}
                  className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition-all duration-200 hover:opacity-90 hover:brightness-110"
                  style={{
                    borderColor: `${gradientA}30`,
                    background: `${gradientA}10`,
                    color: gradientA,
                  }}
                >
                  Play Jackpot →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
