import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import teenPatti, { teenPattiContent } from "@/data/teen-patti";
import TeenPattiHero from "@/components/sections/casino/TeenPattiHero";
import TeenPattiStats from "@/components/sections/casino/TeenPattiStats";
import FAQ from "@/components/sections/FAQ";
import TeenPattiBottomCTA from "@/components/sections/casino/TeenPattiBottomCTA";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RelatedGames from "@/components/sections/RelatedGames";
import {
  Zap,
  HelpCircle,
  Heart,
  Smartphone,
  Coins,
  ShieldCheck,
  Clock,
  Users,
  Star,
  ArrowRight,
  Check,
  AlertTriangle,
  Activity,
  TrendingUp,
  Spade,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Zap,
  HelpCircle,
  Heart,
  Smartphone,
  Coins,
  ShieldCheck,
  Clock,
  Users,
  Star,
  ArrowRight,
  Check,
  AlertTriangle,
  Activity,
  TrendingUp,
  Spade,
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
  const title = "Play Teen Patti Online India – Live Teen Patti Game & Complete Guide";
  return pageMetadata({
    pageId: "teen-patti",
    title,
    description:
      "Play live Teen Patti online at Bet India with professional dealers, real-time betting, and secure gaming. Learn rules, hand rankings, and play strategy.",
    path: "/teen-patti",
    absoluteTitle: title,
  });
}

export const revalidate = 300;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">{children}</h2>
  );
}

export default async function TeenPattiPage() {
  const page = await getPage("teen-patti");
  const c = teenPattiContent;

  const heroContent = { ...c.hero, ...(page.hero ?? {}) };
  const ctaContent = page.cta || c.cta;

  return (
    <>
      <main className="bg-[#050B18]">
        <TeenPattiHero content={heroContent} />
        <Breadcrumbs items={[{ label: "Casino Games", href: "/casino" }, { label: "Teen Patti Online" }]} />

        {/* Intro + overview info table */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Intro texts */}
            <div className="lg:col-span-7 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono text-[#D4AF37]">
                Game Overview
              </h3>
              <p className="mt-2">{heroContent.description}</p>
              <p>
                Teen Patti combines simple gameplay with strategic decision-making, making it one of the most entertaining live casino games available for Indian players.
              </p>
            </div>
            {/* Info Table */}
            <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
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
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-slate-300 transition-all duration-200 hover:border-[#D4AF37]/40 hover:bg-white/[0.06] hover:text-white"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#D4AF37]/15 text-[11px] font-black text-[#D4AF37]">
                    {i + 1}
                  </span>
                  <span className="font-semibold">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 5. What Is Teen Patti? */}
        <section id={slug(c.whatIs.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-4xl">
            <SectionHeading>{c.whatIs.title}</SectionHeading>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {c.whatIs.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Why Play Teen Patti Online? */}
        <section id={slug(c.whyPlay.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading>{c.whyPlay.title}</SectionHeading>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">{c.whyPlay.intro}</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {c.whyPlay.items.map((item) => {
                const Icon = ICONS[item.icon] ?? Star;
                return (
                  <div
                    key={item.title}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/45 hover:bg-white/[0.06]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37]">
                      <Icon size={16} strokeWidth={2} />
                    </span>
                    <h3 className="mt-4 text-sm font-bold text-white group-hover:text-[#FF6B00] transition-colors">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Horizontal Trust ribbon */}
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-xs font-bold text-[#D4AF37]">
                <Star size={13} className="fill-[#D4AF37]" /> Trusted by Thousands of Players
              </span>
              {c.trustStrip.map(({ icon, text }) => {
                const Icon = ICONS[icon] ?? Star;
                return (
                  <span
                    key={text}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-300"
                  >
                    <Icon size={13} className="text-[#138808]" />
                    {text}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. How Teen Patti Works */}
        <section id={slug(c.howItWorks.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-5xl">
            <SectionHeading>{c.howItWorks.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.howItWorks.intro}</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {c.howItWorks.steps.map((step, i) => (
                <div key={step} className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#FF6B00] text-sm font-black text-white font-mono">
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

        {/* 8. Teen Patti Rules */}
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

        {/* 9. Betting Options */}
        <section id={slug(c.betting.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-4xl">
            <SectionHeading>{c.betting.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.betting.intro}</p>
            
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E1B30]/40 backdrop-blur-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Betting Option</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {c.betting.options.map((o) => (
                    <tr key={o.option} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-6 py-4 text-sm font-black text-[#D4AF37]">{o.option}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-300">{o.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 10. Teen Patti Hand Rankings */}
        <section id={slug(c.handRankings.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-4xl">
            <SectionHeading>{c.handRankings.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
              Understanding hand rankings helps players make better betting decisions throughout the game.
            </p>
            
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E1B30]/40 backdrop-blur-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Hand Ranking</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {c.handRankings.rows.map((row) => (
                    <tr key={row.hand} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-6 py-4 text-sm font-black text-[#FF6B00]">{row.hand}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-350">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 11. How to Play on Bet India */}
        <section id={slug(c.howToPlay.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-5xl">
            <SectionHeading>{c.howToPlay.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.howToPlay.intro}</p>
            
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {c.howToPlay.steps.map((step, i) => (
                <div key={step} className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E1B30]/60 p-5 backdrop-blur-xl flex gap-4 items-start">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#E05E00] text-xs font-black text-white font-mono">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-350 font-semibold">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Statistics Panel */}
        <div className="py-6">
          <TeenPattiStats />
        </div>

        {/* 12. Winning Tips & Strategies */}
        <section id={slug("Winning Tips & Strategies")} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading>{c.tips.title}</SectionHeading>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">{c.tips.intro}</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.tips.items.map((item) => (
                <div key={item.title} className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/45 hover:bg-white/[0.06]">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37]">
                    <TrendingUp size={16} strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 13. Common Mistakes */}
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

        {/* 14. Why Play at Bet India */}
        <section id={slug(c.whyChoose.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading>{c.whyChoose.title}</SectionHeading>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-400 sm:text-base">{c.whyChoose.intro}</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.whyChoose.features.map((f) => {
                const Icon = ICONS[f.icon] ?? Star;
                return (
                  <div key={f.title} className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/45 hover:bg-white/[0.06]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37]">
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

        {/* 15. Explore More Casino Games */}
        <section id={slug(c.exploreGames.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-5xl">
            <SectionHeading>{c.exploreGames.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.exploreGames.intro}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {c.exploreGames.games.map((g) => (
                <Link
                  key={g.label}
                  href={g.href}
                  className="group flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/45 hover:bg-white/[0.06] hover:text-white"
                >
                  <Spade size={14} className="text-[#D4AF37]" />
                  {g.label}
                </Link>
              ))}
            </div>
            <p className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 text-sm leading-relaxed text-slate-400">
              {c.exploreGames.note}
            </p>
          </div>
        </section>

        {/* 16. Responsible Gambling */}
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

        {/* Explore Other Casino Games */}
        <RelatedGames currentGamePath="/teen-patti" />

        {/* 17. FAQs */}
        <div id={slug("Frequently Asked Questions")}>
          <FAQ content={page.faq} defaultContent={c.faq} />
        </div>

        {/* 18. Final CTA Banner */}
        <TeenPattiBottomCTA content={ctaContent} />
      </main>
    </>
  );
}

