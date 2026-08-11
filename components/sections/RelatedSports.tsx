import Link from "next/link";
import { ArrowRight, Trophy, Zap, Gamepad2, Activity, Target } from "lucide-react";

type SportCard = {
  name: string;
  href: string;
  desc: string;
  badge?: string;
  icon: typeof Trophy;
};

const ALL_SPORTS: SportCard[] = [
  { name: "Cricket Betting", href: "/cricket", desc: "IPL, Test Matches & T20 League odds", badge: "Hot", icon: Trophy },
  { name: "Live Betting", href: "/live", desc: "Real-time odds & fast in-play cashouts", badge: "Live", icon: Zap },
  { name: "Football Betting", href: "/football", desc: "Premier League, Champions League & ISL", icon: Target },
  { name: "Tennis Betting", href: "/tennis", desc: "Wimbledon, US Open & ATP Tour", icon: Activity },
  { name: "Kabaddi Betting", href: "/kabaddi", desc: "Pro Kabaddi League (PKL) live odds", badge: "Popular", icon: Trophy },
  { name: "Esports Betting", href: "/esports", desc: "CS2, Dota 2 & Valorant tournaments", icon: Gamepad2 },
  { name: "Badminton", href: "/badminton", desc: "BWF World Tour & Smash odds", icon: Activity },
  { name: "Volleyball", href: "/volleyball", desc: "International leagues & match betting", icon: Target },
];

export default function RelatedSports({ currentSportPath }: { currentSportPath?: string }) {
  const filteredSports = ALL_SPORTS.filter((s) => s.href !== currentSportPath).slice(0, 4);

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#050B18] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6B00]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
              Internal Navigation
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
              Explore Other Sports Betting Markets
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Switch seamlessly to other live sports markets with high odds and instant withdrawals.
            </p>
          </div>
          <Link
            href="/sports"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF6B00] transition-all hover:text-white"
          >
            All Sports Hub <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredSports.map((sport) => {
            const Icon = sport.icon;
            return (
              <Link
                key={sport.href}
                href={sport.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B00]/40 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-[#FF6B00]/5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#FF6B00]/10 text-[#FF6B00] group-hover:scale-110 transition-transform">
                      <Icon size={20} />
                    </div>
                    {sport.badge && (
                      <span className="rounded-full bg-[#FF6B00]/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#FF6B00]">
                        {sport.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white group-hover:text-[#FF6B00] transition-colors">
                    {sport.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    {sport.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-white">
                  <span>Bet Now</span>
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
