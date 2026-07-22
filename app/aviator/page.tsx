import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import { aviatorContent } from "@/data/aviator";
import BetIndiaHero from "@/components/sections/casino/BetIndiaHero";
import BetIndiaMultiplierPanel from "@/components/sections/casino/BetIndiaMultiplierPanel";
import BetIndiaLiveStats from "@/components/sections/casino/BetIndiaLiveStats";
import FAQ from "@/components/sections/FAQ";
import BetIndiaBottomCTA from "@/components/sections/casino/BetIndiaBottomCTA";
import {
  Zap,
  GraduationCap,
  Crosshair,
  Smartphone,
  Coins,
  ShieldCheck,
  Clock,
  Plane,
  Star,
  ArrowRight,
  Check,
  AlertTriangle,
  Activity,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Zap,
  GraduationCap,
  Crosshair,
  Smartphone,
  Coins,
  ShieldCheck,
  Clock,
  Plane,
  Star,
  ArrowRight,
  Check,
  AlertTriangle,
  Activity,
  TrendingUp,
};

// Helper for dynamic TOC anchor slug creation
function slug(label: string) {
  return label
    .toLowerCase()
    .replace(/[?&]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Play Aviator Online India – Live Aviator Game & Complete Guide";
  return pageMetadata({
    pageId: "aviator",
    title,
    description:
      "Play Aviator online at Bet India with fast rounds, real-time multipliers, and real money action. Learn the rules, strategies, and tips in our complete guide.",
    path: "/aviator",
    absoluteTitle: title,
  });
}

export const revalidate = 300;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">{children}</h2>
  );
}

export default async function AviatorPage() {
  const page = await getPage("aviator");
  const c = aviatorContent;

  const heroContent = { ...c.hero, ...(page.hero ?? {}) };
  const ctaContent = { ...c.cta, ...(page.cta ?? {}) };

  return (
    <>
      <main className="bg-[#050B18]">
        {/* 1. Cinematic Hero Section */}
        <BetIndiaHero content={heroContent} />

        {/* 2. Cockpit Live Multiplier HUD Panel */}
        <div className="py-6">
          <BetIndiaMultiplierPanel />
        </div>

        {/* 3. Intro Paragraphs & Overview Info Table */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Intro texts */}
            <div className="lg:col-span-7 space-y-8 text-slate-300  text-sm sm:text-base leading-relaxed">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono text-[#FF7A00]">
                Game Overview
              </h3>
              <p className="mt-2">{heroContent.description}</p>
              {heroContent.paragraphs?.map((p: string, idx: number) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            {/* Info Table */}
            <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r w-[600px] from-transparent via-[#FF7A00]/50 to-transparent" />
              <ul className="divide-y divide-white/[0.06]">
                {c.infoTable.map(({ feature, details }) => (
                  <li key={feature} className="flex items-center justify-between gap-4 py-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">{feature}</span>
                    <span className="text-sm font-semibold text-white">{details}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Table of Contents */}
        <section className="relative overflow-hidden bg-[#050B18] px-4 py-10 sm:px-6 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-5xl">
            <SectionHeading>Table of Contents</SectionHeading>
            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {c.toc.map((label, i) => (
                <a
                  key={label}
                  href={`#${slug(label)}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-slate-300 transition-all duration-200 hover:border-[#FF7A00]/40 hover:bg-white/[0.06] hover:text-white"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#FF7A00]/15 text-[11px] font-black text-[#FF7A00]">
                    {i + 1}
                  </span>
                  <span className="font-semibold">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 5. What Is Aviator? */}
        <section id={slug(c.whatIs.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <SectionHeading>{c.whatIs.title}</SectionHeading>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                {c.whatIs.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)}>{p}</p>
                ))}
              </div>
            </div>
            {/* Visual Airplane takeoff graphic mockup */}
            <div className="lg:col-span-5 relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 overflow-hidden flex flex-col items-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.06),transparent)] pointer-events-none" />
              <div className="text-[9px] font-mono text-[#FF7A00] uppercase tracking-widest mb-4 font-bold">Multiplier Altitude Map</div>
              <svg viewBox="0 0 100 60" className="w-full h-auto text-[#FF7A00] stroke-current fill-none">
                <path d="M 10,50 L 90,50" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                <path d="M 10,10 L 10,50" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                <path d="M 30,10 L 30,50" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="1,1" />
                <path d="M 50,10 L 50,50" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="1,1" />
                <path d="M 70,10 L 70,50" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="1,1" />
                {/* Rising Flight path */}
                <path d="M 10,50 Q 50,45 80,15" stroke="#FF7A00" strokeWidth="2.5" />
                {/* Interactive Cashout line annotation */}
                <path d="M 55,42 L 55,25" stroke="#4EA8FF" strokeWidth="0.8" strokeDasharray="2,2" />
                <circle cx="55" cy="42" r="1.5" fill="#4EA8FF" />
                <g transform="translate(77, 11) rotate(-40)">
                  <path d="M 0,0 L 5,3 L 15,3 L 5,5 L 4,12 L 8,13 L 5,14 L 3,13 L -3,11 L 3,5 L -5,3 Z" fill="#FF7A00" />
                </g>
                <text x="58" y="32" fill="#4EA8FF" fontSize="2.8" fontWeight="black" fontFamily="monospace" stroke="none">CASHED OUT</text>
                <text x="83" y="14" fill="#FF7A00" fontSize="3" fontWeight="bold" fontFamily="monospace" stroke="none">CLIMBING...</text>
              </svg>
              <div className="mt-4 rounded-xl bg-white/[0.03] border border-white/5 px-4 py-2 text-xs font-semibold text-slate-300">
                Objective: Cash Out before takeoff ends
              </div>
            </div>
          </div>
        </section>

        {/* 6. Why Play Aviator Online? */}
        <section id={slug(c.whyPlay.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading>{c.whyPlay.title}</SectionHeading>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">{c.whyPlay.intro}</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.whyPlay.items.map((item) => {
                const Icon = ICONS[item.icon] ?? Star;
                return (
                  <div
                    key={item.title}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FF7A00]/40 hover:bg-white/[0.06]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF7A00]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#FF7A00]/30 bg-[#FF7A00]/10 text-[#FF7A00]">
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Horizontal Trust ribbon */}
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/10 px-4 py-2 text-xs font-bold text-[#FF7A00]">
                <Star size={13} className="fill-[#FF7A00]" /> Trusted by Thousands of Players
              </span>
              {c.trustStrip.map(({ icon, text }) => {
                const Icon = ICONS[icon] ?? Star;
                return (
                  <span
                    key={text}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-300"
                  >
                    <Icon size={13} className="text-[#4EA8FF]" />
                    {text}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. How Aviator Works */}
        <section id={slug(c.howItWorks.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-5xl">
            <SectionHeading>{c.howItWorks.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.howItWorks.intro}</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.howItWorks.steps.map((step, i) => (
                <div key={step} className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#FF7A00] text-sm font-black text-white font-mono">
                    {i + 1}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {c.howItWorks.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Aviator Rules */}
        <section id={slug(c.rules.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-4xl">
            <SectionHeading>{c.rules.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.rules.intro}</p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {c.rules.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#138808]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 9. Understanding Multipliers */}
        <section id={slug(c.multipliers.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-4xl">
            <SectionHeading>{c.multipliers.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.multipliers.intro}</p>
            
            {/* Returns Table */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E1B30]/40 backdrop-blur-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Multiplier</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Example Return (₹1,000 Bet)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {c.multipliers.rows.map((row) => (
                    <tr key={row.multiplier} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-6 py-4 text-sm font-black text-[#FF7A00] font-mono">{row.multiplier}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 rounded-xl border border-[#FF7A00]/20 bg-[#FF7A00]/[0.06] px-4 py-3 text-sm font-semibold text-slate-300 leading-relaxed">
              {c.multipliers.note}
            </p>
          </div>
        </section>

        {/* 10. How to Play on Bet India */}
        <section id={slug(c.howToPlay.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-5xl">
            <SectionHeading>{c.howToPlay.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.howToPlay.intro}</p>
            
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {c.howToPlay.steps.map((step, i) => (
                <div key={step} className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E1B30]/60 p-5 backdrop-blur-xl flex gap-4 items-start">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#FF7A00] to-[#E05E00] text-xs font-black text-white font-mono">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-350 font-semibold">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Statistics Cockpit counters */}
        <div className="py-6">
          <BetIndiaLiveStats />
        </div>

        {/* 11. Winning Tips & Strategies */}
        <section id={slug("Winning Tips & Strategies")} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading>{c.tips.title}</SectionHeading>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">{c.tips.intro}</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.tips.items.map((item) => (
                <div key={item.title} className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#4EA8FF]/40 hover:bg-white/[0.06]">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#4EA8FF]/30 bg-[#4EA8FF]/10 text-[#4EA8FF]">
                    <TrendingUp size={16} strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. Common Mistakes */}
        <section id={slug(c.mistakes.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-4xl">
            <SectionHeading>{c.mistakes.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.mistakes.intro}</p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {c.mistakes.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-sm text-slate-350">
                  <AlertTriangle size={16} className="mt-0.5 shrink-0 text-red-400" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-slate-400 sm:text-base">{c.mistakes.closing}</p>
          </div>
        </section>

        {/* 13. Why Play at Bet India */}
        <section id={slug(c.whyChoose.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading>{c.whyChoose.title}</SectionHeading>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-400 sm:text-base">{c.whyChoose.intro}</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.whyChoose.features.map((f) => {
                const Icon = ICONS[f.icon] ?? Star;
                return (
                  <div key={f.title} className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FF7A00]/40 hover:bg-white/[0.06]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF7A00]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#FF7A00]/30 bg-[#FF7A00]/10 text-[#FF7A00]">
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-450">{f.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 14. Explore More Casino Games */}
        <section id={slug(c.exploreGames.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-5xl">
            <SectionHeading>{c.exploreGames.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.exploreGames.intro}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {c.exploreGames.games.map((g) => (
                <Link
                  key={g.label}
                  href={g.href}
                  className="group flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF7A00]/40 hover:bg-white/[0.06] hover:text-white"
                >
                  <Plane size={14} className="text-[#FF7A00]" />
                  {g.label}
                </Link>
              ))}
            </div>
            <p className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 text-sm leading-relaxed text-slate-400">
              {c.exploreGames.note}
            </p>
          </div>
        </section>

        {/* 15. Responsible Gambling */}
        <section id={slug(c.responsible.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-4xl">
            <SectionHeading>{c.responsible.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.responsible.intro}</p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {c.responsible.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-slate-350">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#138808]" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-slate-400 sm:text-base">{c.responsible.closing}</p>
          </div>
        </section>

        {/* 16. FAQs (dynamic/default fallback FAQ component) */}
        <div id={slug("Frequently Asked Questions")}>
          <FAQ content={page.faq} defaultContent={c.faq} />
        </div>

        {/* 17. Final CTA runway banner */}
        <BetIndiaBottomCTA content={ctaContent} />
      </main>
    </>
  );
}
