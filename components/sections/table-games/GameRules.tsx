import Link from "next/link";
import { BookOpen } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";

type Rule = {
  emoji: string;
  name: string;
  objective: string;
  steps: string[];
  accent: "#FF6B00" | "#138808";
};

const RULES: Rule[] = [
  {
    emoji: "🃏",
    name: "Blackjack",
    objective: "Reach 21 or get closer than the dealer without going over.",
    steps: ["Place your bet", "Receive two cards", "Hit, Stand, or Double Down", "Dealer reveals — closest to 21 wins"],
    accent: "#FF6B00",
  },
  {
    emoji: "🎡",
    name: "Roulette",
    objective: "Predict where the roulette ball will land on the wheel.",
    steps: ["Choose a number, color, or section", "Place chips on the layout", "Dealer spins the wheel", "Ball lands — winners are paid"],
    accent: "#138808",
  },
  {
    emoji: "🎴",
    name: "Baccarat",
    objective: "Choose whether Player, Banker, or Tie wins the hand.",
    steps: ["Bet on Player, Banker, or Tie", "Cards are dealt to both sides", "Closest to 9 wins", "Winning bets are paid out"],
    accent: "#FF6B00",
  },
  {
    emoji: "♣",
    name: "Poker",
    objective: "Build the strongest five-card poker hand possible.",
    steps: ["Place an ante and optional bonus bet", "Receive hole cards", "Call or fold after seeing flop", "Best hand at showdown wins"],
    accent: "#138808",
  },
  {
    emoji: "♠",
    name: "Teen Patti",
    objective: "Create the best three-card hand among all players.",
    steps: ["Place boot amount in pot", "Three cards are dealt face-down", "Play seen or blind", "Best hand wins the pot"],
    accent: "#FF6B00",
  },
  {
    emoji: "🎯",
    name: "Andar Bahar",
    objective: "Predict which side — Andar or Bahar — receives the matching card.",
    steps: ["Dealer reveals a Joker card", "Bet on Andar (left) or Bahar (right)", "Cards are dealt alternately to each side", "First side matching the Joker wins"],
    accent: "#138808",
  },
];

export default function GameRules() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6B00]/20 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/5 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#138808]/25 bg-[#138808]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#138808]">
            <BookOpen size={11} strokeWidth={2} />
            Quick Guide
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Learn The{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Basics
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            Understand the fundamentals of each game before you start playing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RULES.map(({ emoji, name, objective, steps, accent }) => {
            const isOrange = accent === "#FF6B00";
            return (
              <div
                key={name}
                className={[
                  "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl",
                  "transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]",
                  isOrange
                    ? "hover:border-[#FF6B00]/35 hover:shadow-xl hover:shadow-[#FF6B00]/8"
                    : "hover:border-[#138808]/35 hover:shadow-xl hover:shadow-[#138808]/8",
                ].join(" ")}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />

                {/* Icon + name */}
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      borderColor: `${accent}35`,
                      background: `${accent}18`,
                      boxShadow: `0 4px 20px ${accent}15`,
                    }}
                  >
                    {emoji}
                  </div>
                  <h3 className="text-base font-bold text-white">{name}</h3>
                </div>

                {/* Objective */}
                <div
                  className="mb-4 rounded-xl border px-4 py-3"
                  style={{ borderColor: `${accent}25`, background: `${accent}08` }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: accent }}>Objective</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">{objective}</p>
                </div>

                {/* Steps */}
                <ol className="mb-5 flex-1 space-y-2">
                  {steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[11px] text-slate-400">
                      <span
                        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-black"
                        style={{ background: `${accent}20`, color: accent }}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>

                <Link
                  href={CTA_LINKS.signup}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 text-xs font-bold text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  <BookOpen size={11} strokeWidth={2} />
                  Learn More
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
