import type { Metadata } from "next";
import Link from "next/link";
import FAQ from "@/components/sections/FAQ";
import MobileHeroBanner from "@/components/sections/MobileHeroBanner";
import { LiveBadge, HudCorners } from "@/components/sections/kabaddi/KabaddiHud";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import { andarBaharContent } from "@/data/andar-bahar";
import { CTA_LINKS } from "@/lib/cta-links";
import {
  Zap,
  GraduationCap,
  Video,
  Smartphone,
  Coins,
  ShieldCheck,
  Clock,
  TrendingUp,
  Spade,
  Layers,
  CircleDot,
  Star,
  ArrowRight,
  Check,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

const ANDAR = "#FF6B00";
const BAHAR = "#138808";

const ICONS: Record<string, LucideIcon> = {
  Zap,
  GraduationCap,
  Video,
  Smartphone,
  Coins,
  ShieldCheck,
  Clock,
  TrendingUp,
};

// A slug for TOC anchor links, matching the ids assigned to each section below.
function slug(label: string) {
  return label
    .toLowerCase()
    .replace(/[?&]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Andar Bahar Online India – Live Andar Bahar Casino & Complete Game Guide";
  return pageMetadata({
    pageId: "andar-bahar",
    title,
    description:
      "Play Andar Bahar online at Bet India with live dealers, fast rounds, and real money action. Learn the rules, betting options, payouts, and tips in our complete guide.",
    path: "/andar-bahar",
    absoluteTitle: title,
  });
}

export const revalidate = 300;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">{children}</h2>
  );
}

export default async function AndarBaharPage() {
  const page = await getPage("andar-bahar");
  const c = andarBaharContent;
  const hero = { ...c.hero, ...(page.hero ?? {}) };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "BetIndia",
            alternateName: "BetIndia Games",
            url: "https://www.betindia.games/",
            logo: "https://www.betindia.games/logo/betindialogo.png",
            sameAs: [
              "https://www.facebook.com/people/BetIndia/61590950743315/",
              "https://x.com/playbetindia",
              "https://www.instagram.com/playbetindia/",
              "https://www.linkedin.com/company/135704073/admin/dashboard/",
              "https://www.betindia.games/",
            ],
          }),
        }}
      />
      <main className="bg-[#050B18]">
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <MobileHeroBanner
          image={(hero as { imageUrlMobile?: string }).imageUrlMobile || hero.imageUrl}
          title={hero.title}
          description={hero.description}
          primaryHref={CTA_LINKS.signup}
          primaryLabel={hero.primaryCta}
          secondaryHref="#how-to-play-on-bet-india"
          secondaryLabel={hero.secondaryCta}
        />
        <section className="relative hidden overflow-hidden bg-[#050B18] min-h-[420px] md:block md:min-h-[520px]">
          {hero.imageUrl && (
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
              <img
                src={hero.imageUrl}
                alt={hero.imageAlt || ""}
                className="h-full w-full object-cover"
              />
            </div>
          )}
       

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-[58px] sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-[86px]">
            {/* Left — copy */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-3xl">
            
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,5vw,3.75rem)]">
                {hero.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">{hero.description}</p>
              {hero.paragraphs?.map((p: string) => (
                <p key={p.slice(0, 30)} className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                  {p}
                </p>
              ))}
              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Link
                  href={CTA_LINKS.signup}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] sm:w-auto"
                >
                  {hero.primaryCta}
                  <ArrowRight size={18} strokeWidth={2.5} />
                </Link>
                <a
                  href="#how-to-play-on-bet-india"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00] hover:bg-white/10 sm:w-auto"
                >
                  {hero.secondaryCta}
                </a>
              </div>
            </div>

            {/* Right — hero image or Andar/Bahar game board */}
            
          </div>
        </section>


        <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-base text-slate-300 leading-relaxed whitespace-pre-line">
            Andar Bahar is one of India's most iconic card games, loved for its simple rules, fast-paced gameplay, and exciting betting opportunities. Today, players can enjoy Andar Bahar online from anywhere through secure live casino platforms that recreate the authentic casino experience.
At Bet India, you can play live Andar Bahar with professional dealers, competitive betting limits, and a seamless gaming experience across desktop and mobile devices. Whether you're learning how to play Andar Bahar online for the first time or you're an experienced player looking for real money action, our platform offers everything you need in one place.
With straightforward gameplay, quick rounds, and live dealer interaction, online Andar Bahar continues to be one of the most popular games in the online casino India market.
          </p>
        </section>

        {/* ─── INFO TABLE (HUD stat panel) ──────────────────────── */}
        <section className="relative overflow-hidden bg-[#050B18] px-4 py-12 sm:px-6 lg:px-8">
          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
              <HudCorners color={ANDAR} />
              <ul className="divide-y divide-white/[0.06]">
                {c.infoTable.map(({ feature, details }) => (
                  <li key={feature} className="flex items-center justify-between gap-4 px-5 py-3.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{feature}</span>
                    <span className="text-sm font-semibold text-white">{details}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── TABLE OF CONTENTS ────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#050B18] px-4 py-10 sm:px-6 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-5xl">
            <SectionHeading>Table of Contents</SectionHeading>
            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {c.toc.map((label, i) => (
                <a
                  key={label}
                  href={`#${slug(label)}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-slate-300 transition-all duration-200 hover:border-[#FF6B00]/40 hover:bg-white/[0.06] hover:text-white"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#FF6B00]/15 text-[11px] font-black text-[#FF6B00]">
                    {i + 1}
                  </span>
                  <span className="font-semibold">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHAT IS ──────────────────────────────────────────── */}
        <section id={slug(c.whatIs.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-4xl">
            <SectionHeading>{c.whatIs.title}</SectionHeading>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {c.whatIs.paragraphs.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY PLAY ─────────────────────────────────────────── */}
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
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B00]/40 hover:bg-white/[0.06]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00]">
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Trust strip */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-4 py-2 text-xs font-bold text-[#FF6B00]">
                <Star size={13} className="fill-[#FF6B00]" /> Trusted by Thousands of Players
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

        {/* ─── HOW ANDAR BAHAR WORKS ────────────────────────────── */}
        <section id={slug(c.howItWorks.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-5xl">
            <SectionHeading>{c.howItWorks.title}</SectionHeading>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {c.howItWorks.paragraphs.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>

            {/* Andar / Bahar board */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {c.howItWorks.sides.map((side, i) => {
                const color = i === 0 ? ANDAR : BAHAR;
                return (
                  <div
                    key={side}
                    className="relative overflow-hidden rounded-2xl border p-6 text-center"
                    style={{ borderColor: `${color}40`, background: `${color}12` }}
                  >
                    <Layers size={22} className="mx-auto" style={{ color }} />
                    <span className="mt-3 block text-lg font-black uppercase tracking-widest" style={{ color }}>
                      {side}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {c.howItWorks.closing.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ─── RULES ────────────────────────────────────────────── */}
        <section id={slug(c.rules.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-4xl">
            <SectionHeading>{c.rules.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.rules.intro}</p>
            <p className="mt-6 text-sm font-semibold text-slate-300">{c.rules.listLabel}</p>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {c.rules.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#138808]" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-slate-400 sm:text-base">{c.rules.closing}</p>
          </div>
        </section>

        {/* ─── BETTING OPTIONS ──────────────────────────────────── */}
        <section id={slug(c.betting.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-4xl">
            <SectionHeading>{c.betting.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.betting.intro}</p>
            <p className="mt-6 text-sm font-semibold text-slate-300">{c.betting.listLabel}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {c.betting.options.map((o) => (
                <span
                  key={o}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:border-[#FF6B00]/40 hover:text-white"
                >
                  <CircleDot size={13} className="text-[#FF6B00]" />
                  {o}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-slate-400 sm:text-base">{c.betting.closing}</p>
          </div>
        </section>

        {/* ─── PAYOUTS ──────────────────────────────────────────── */}
        <section id={slug(c.payouts.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-4xl">
            <SectionHeading>{c.payouts.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.payouts.intro}</p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {c.payouts.rows.map(({ option, description }) => (
                <div key={option} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl">
                  <span className="inline-flex rounded-lg bg-[#FF6B00]/12 px-3 py-1 text-sm font-black text-[#FF6B00]">{option}</span>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-xl border border-[#FF6B00]/20 bg-[#FF6B00]/[0.06] px-4 py-3 text-sm font-semibold text-slate-300">
              {c.payouts.note}
            </p>
          </div>
        </section>

        {/* ─── LIVE ANDAR BAHAR ─────────────────────────────────── */}
        <section id={slug(c.live.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[340px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/10 blur-3xl"
          />
          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="mb-6 flex justify-center">
              <LiveBadge label="HD Live Stream" color={ANDAR} />
            </div>
            <div className="text-center">
              <SectionHeading>{c.live.title}</SectionHeading>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">{c.live.intro}</p>
            </div>
            <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
              <HudCorners color={ANDAR} />
              <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{c.live.benefitsLabel}</p>
              <ul className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
                {c.live.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm font-semibold text-slate-300">
                    <Check size={15} className="shrink-0 text-[#138808]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-slate-400 sm:text-base">{c.live.closing}</p>
          </div>
        </section>

        {/* ─── HOW TO PLAY ──────────────────────────────────────── */}
        <section id="how-to-play-on-bet-india" className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-5xl">
            <SectionHeading>{c.howToPlay.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.howToPlay.intro}</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.howToPlay.steps.map((step, i) => (
                <div key={step} className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#FF6B00] text-sm font-black text-white">
                    {i + 1}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TIPS ─────────────────────────────────────────────── */}
        <section id={slug("Winning Tips & Strategies")} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading>{c.tips.title}</SectionHeading>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">{c.tips.intro}</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.tips.items.map((item) => (
                <div key={item.title} className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#138808]/40 hover:bg-white/[0.06]">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#138808]/30 bg-[#138808]/10 text-[#138808]">
                    <TrendingUp size={16} strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── COMMON MISTAKES ──────────────────────────────────── */}
        <section id={slug(c.mistakes.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-4xl">
            <SectionHeading>{c.mistakes.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.mistakes.intro}</p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {c.mistakes.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-sm text-slate-300">
                  <AlertTriangle size={16} className="mt-0.5 shrink-0 text-red-400" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-slate-400 sm:text-base">{c.mistakes.closing}</p>
          </div>
        </section>

        {/* ─── WHY CHOOSE ───────────────────────────────────────── */}
        <section id={slug(c.whyChoose.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-6xl">
            <SectionHeading>{c.whyChoose.title}</SectionHeading>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-400 sm:text-base">{c.whyChoose.intro}</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.whyChoose.features.map((f) => {
                const Icon = ICONS[f.icon] ?? Star;
                return (
                  <div key={f.title} className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B00]/40 hover:bg-white/[0.06]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00]">
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── EXPLORE MORE GAMES ───────────────────────────────── */}
        <section id={slug(c.exploreGames.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-5xl">
            <SectionHeading>{c.exploreGames.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.exploreGames.intro}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {c.exploreGames.games.map((g) => (
                <Link
                  key={g.label}
                  href={g.href}
                  className="group flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B00]/40 hover:bg-white/[0.06] hover:text-white"
                >
                  <Spade size={14} className="text-[#FF6B00]" />
                  {g.label}
                </Link>
              ))}
            </div>
            <p className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 text-sm leading-relaxed text-slate-400">
              {c.exploreGames.note}
            </p>
          </div>
        </section>

        {/* ─── RESPONSIBLE GAMBLING ─────────────────────────────── */}
        <section id={slug(c.responsible.title)} className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8 border-t border-white/[0.04]">
          <div className="relative z-10 mx-auto max-w-4xl">
            <SectionHeading>{c.responsible.title}</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{c.responsible.intro}</p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {c.responsible.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#138808]" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-slate-400 sm:text-base">{c.responsible.closing}</p>
          </div>
        </section>

        {/* ─── FAQ ──────────────────────────────────────────────── */}
        <div id={slug("Frequently Asked Questions")}>
          <FAQ content={page.faq} defaultContent={c.faq} />
        </div>

        {/* ─── FINAL CTA ────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div aria-hidden className="pointer-events-none absolute left-1/4 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/12 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute right-1/4 top-1/2 h-[540px] w-[540px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#081425]/95 p-8 text-center backdrop-blur-xl md:p-14">
              <HudCorners color={ANDAR} />
              <LiveBadge label="Live Casino · Andar Bahar" color={ANDAR} />
              <h2 className="mt-6 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
                {c.cta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
                {c.cta.description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={CTA_LINKS.signup}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] sm:w-auto"
                >
                  {c.cta.primaryCta}
                  <ArrowRight size={18} strokeWidth={2.5} />
                </Link>
                <Link
                  href={CTA_LINKS.signup}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6B00]/40 hover:bg-white/10 sm:w-auto"
                >
                  {c.cta.secondaryCta}
                </Link>
              </div>
              <p className="mt-6 text-[11px] font-medium text-slate-600">18+ Only • Play Responsibly</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
