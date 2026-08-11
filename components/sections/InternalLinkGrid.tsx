import Link from "next/link";
import { Compass } from "lucide-react";

type LinkItem = { label: string; href: string; badge?: string };
type LinkGroup = { title: string; accent: string; links: LinkItem[] };

const LINK_GROUPS: LinkGroup[] = [
  {
    title: "Sports Betting Markets",
    accent: "#FF6B00",
    links: [
      { label: "Cricket Betting India", href: "/cricket", badge: "IPL" },
      { label: "Live In-Play Betting", href: "/live", badge: "Real-time" },
      { label: "Football Odds & Matches", href: "/football" },
      { label: "Tennis Betting Markets", href: "/tennis" },
      { label: "Pro Kabaddi Betting", href: "/kabaddi", badge: "PKL" },
      { label: "Esports Tournaments", href: "/esports" },
      { label: "Badminton Matches", href: "/badminton" },
      { label: "Volleyball Leagues", href: "/volleyball" },
      { label: "All Sports Hub", href: "/sports" },
    ],
  },
  {
    title: "Casino & Card Games",
    accent: "#138808",
    links: [
      { label: "Teen Patti Real Money", href: "/teen-patti", badge: "Popular" },
      { label: "Aviator Crash Game", href: "/aviator", badge: "Instant Win" },
      { label: "Andar Bahar Online", href: "/andar-bahar" },
      { label: "Live Dealer Casino", href: "/live-casino" },
      { label: "Online Slots & Jackpots", href: "/slots" },
      { label: "Table Games & Poker", href: "/table-games" },
      { label: "All Casino Games", href: "/casino" },
    ],
  },
  {
    title: "Promotions & Loyalty",
    accent: "#FF6B00",
    links: [
      { label: "Welcome Bonuses & Offers", href: "/promotions", badge: "Bonus" },
      { label: "BetIndia VIP Club", href: "/vip", badge: "Rewards" },
      { label: "Betting Guides & News", href: "/blog" },
      { label: "Responsible Gaming Guide", href: "/responsible-gaming" },
    ],
  },
  {
    title: "About & Support",
    accent: "#138808",
    links: [
      { label: "About BetIndia", href: "/about" },
      { label: "Customer Support & Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
];

export default function InternalLinkGrid() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#030712] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#FF6B00]/10 text-[#FF6B00]">
            <Compass size={18} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Quick Navigation & Related Pages
            </h2>
            <p className="text-xs text-slate-400">
              Browse popular sports markets, real money casino games, and player guides on BetIndia.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {LINK_GROUPS.map((group) => (
            <div key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
              <h3
                className="mb-4 text-xs font-black uppercase tracking-wider"
                style={{ color: group.accent }}
              >
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-xs sm:text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {link.label}
                      </span>
                      {link.badge && (
                        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold text-slate-400 group-hover:bg-[#FF6B00]/20 group-hover:text-[#FF6B00] transition-colors">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
