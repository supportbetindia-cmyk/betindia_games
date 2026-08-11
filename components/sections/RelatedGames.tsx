import Link from "next/link";
import { ArrowRight, Flame, Dices, Gamepad2, Layers, Sparkles } from "lucide-react";

type GameCard = {
  name: string;
  href: string;
  desc: string;
  badge?: string;
  icon: typeof Flame;
};

const ALL_GAMES: GameCard[] = [
  { name: "Teen Patti Online", href: "/teen-patti", desc: "Real money 3-card Indian poker tables", badge: "Trending", icon: Flame },
  { name: "Aviator Crash Game", href: "/aviator", desc: "Multiplier crash game with instant cashouts", badge: "Hot", icon: Sparkles },
  { name: "Andar Bahar", href: "/andar-bahar", desc: "Traditional Indian card game with fast rounds", badge: "Popular", icon: Dices },
  { name: "Live Casino", href: "/live-casino", desc: "HD live dealers for Roulette, Baccarat & Blackjack", icon: Sparkles },
  { name: "Online Slots", href: "/slots", desc: "Jackpot reels & megaways slot games", icon: Gamepad2 },
  { name: "Table Games", href: "/table-games", desc: "RNG Poker, Roulette & Blackjack variations", icon: Layers },
];

export default function RelatedGames({ currentGamePath }: { currentGamePath?: string }) {
  const filteredGames = ALL_GAMES.filter((g) => g.href !== currentGamePath).slice(0, 4);

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#050B18] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#138808]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
              Internal Navigation
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
              Explore Popular Casino & Card Games
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Discover top-rated real money casino games, live dealer tables, and instant crash games.
            </p>
          </div>
          <Link
            href="/casino"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#138808] transition-all hover:text-white"
          >
            Casino Hub <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredGames.map((game) => {
            const Icon = game.icon;
            return (
              <Link
                key={game.href}
                href={game.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#138808]/40 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-[#138808]/5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#138808]/10 text-[#138808] group-hover:scale-110 transition-transform">
                      <Icon size={20} />
                    </div>
                    {game.badge && (
                      <span className="rounded-full bg-[#138808]/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#138808]">
                        {game.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white group-hover:text-[#138808] transition-colors">
                    {game.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    {game.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-white">
                  <span>Play Game</span>
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
