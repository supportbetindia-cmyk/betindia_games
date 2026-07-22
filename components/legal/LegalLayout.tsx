import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

export type LegalBullet =
  | string
  | { heading: string; text: string };

export type LegalSection = {
  id: string;
  title: string;
  intro?: string;
  bullets?: LegalBullet[];
  closing?: string;
  highlight?: {
    title?: string;
    items: string[];
    accent?: "#FF6B00" | "#138808";
  };
};

type LegalLayoutProps = {
  badge: string;
  title: string;
  accentTitle: string;
  lastUpdated: string;
  preparedBy?: string;
  intro: string;
  sections: LegalSection[];
  relatedLinks?: { label: string; href: string }[];
  footerNote?: string;
};

// ─── Section renderer ─────────────────────────────────────────────────────────

function Section({ section, index }: { section: LegalSection; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div id={section.id} className="scroll-mt-28">
      {/* Section header */}
      <div className="mb-5 flex items-start gap-4">
        <span className="mt-0.5 shrink-0 font-mono text-sm font-black text-[#FF6B00]/50">
          {num}
        </span>
        <h2 className="text-lg font-extrabold leading-snug text-white md:text-xl">
          {section.title}
        </h2>
      </div>

      <div className="ml-[calc(1.5ch+1rem)] space-y-4">
        {/* Intro paragraph */}
        {section.intro && (
          <p className="whitespace-pre-line text-sm leading-[1.8] text-slate-400">{section.intro}</p>
        )}

        {/* Bullets */}
        {section.bullets && section.bullets.length > 0 && (
          <ul className="space-y-2.5">
            {section.bullets.map((b, i) => {
              if (typeof b === "string") {
                return (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B00]/60" />
                    <span className="text-sm leading-[1.8] text-slate-300">{b}</span>
                  </li>
                );
              }
              return (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B00]/60" />
                  <span className="text-sm leading-[1.8] text-slate-300">
                    <span className="font-semibold text-slate-200">{b.heading}: </span>
                    {b.text}
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        {/* Highlight block */}
        {section.highlight && (
          <div
            className="rounded-xl border p-5"
            style={{
              borderColor: `${section.highlight.accent ?? "#FF6B00"}25`,
              background: `${section.highlight.accent ?? "#FF6B00"}08`,
            }}
          >
            {section.highlight.title && (
              <p className="mb-3 text-sm font-semibold text-slate-200">{section.highlight.title}</p>
            )}
            <ul className="space-y-2">
              {section.highlight.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: section.highlight?.accent ?? "#FF6B00" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Closing paragraph */}
        {section.closing && (
          <p className="text-sm leading-[1.8] text-slate-400">{section.closing}</p>
        )}
      </div>

      {/* Divider */}
      <div className="mt-8 h-px bg-white/[0.05]" />
    </div>
  );
}

// ─── Main layout ──────────────────────────────────────────────────────────────

export default function LegalLayout({
  badge,
  title,
  accentTitle,
  lastUpdated,
  preparedBy = "BetIndia Legal Team",
  intro,
  sections,
  relatedLinks,
  footerNote,
}: LegalLayoutProps) {
  return (
    <>

      <main className="min-h-screen bg-[#050B18] text-white no-center-mobile">
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none fixed left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16">

            {/* ── Sidebar ────────────────────────────────────────────────── */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Legal badge */}
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
                  {badge}
                </span>

                {/* TOC */}
                <nav aria-label="Table of contents">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                    Contents
                  </p>
                  <ol className="space-y-1">
                    {sections.map((s, i) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-500 transition-all duration-150 hover:bg-white/[0.04] hover:text-slate-200"
                        >
                          <span className="font-mono text-[11px] text-[#FF6B00]/50">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                {/* Related links */}
                {relatedLinks && relatedLinks.length > 0 && (
                  <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                      Related
                    </p>
                    <ul className="space-y-2">
                      {relatedLinks.map(({ label, href }) => (
                        <li key={href}>
                          <Link
                            href={href}
                            className="text-sm text-[#FF6B00]/80 transition-colors hover:text-[#FF6B00]"
                          >
                            {label} →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Support card */}
                <div className="rounded-xl border border-[#138808]/20 bg-[#138808]/6 p-4">
                  <p className="text-xs font-semibold text-slate-300">Need help?</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                    Our support team is available 24/7.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#138808] transition-colors hover:text-[#16a009]"
                  >
                    Contact Support →
                  </Link>
                </div>
              </div>
            </aside>

            {/* ── Article body ────────────────────────────────────────────── */}
            <article className="min-w-0">
              {/* Mobile badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 backdrop-blur-md lg:hidden">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
                {badge}
              </span>

              {/* Title */}
              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
                {title}{" "}
                <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
                  {accentTitle}
                </span>
              </h1>

              {/* Meta row */}
              <div className="mt-4 flex flex-wrap items-center gap-4 border-b border-white/[0.06] pb-6">
                <span className="text-xs text-slate-500">Last Updated: {lastUpdated}</span>
                <span className="hidden text-slate-700 sm:inline">·</span>
                <span className="text-xs text-slate-500">Prepared By: {preparedBy}</span>
              </div>

              {/* Intro */}
              <p className="mt-8 text-base leading-[1.85] text-slate-300">{intro}</p>

              {/* Sections */}
              <div className="mt-10 space-y-10">
                {sections.map((section, i) => (
                  <Section key={section.id} section={section} index={i} />
                ))}
              </div>

              {/* Footer note */}
              <div className="mt-12 rounded-xl border border-white/8 bg-white/[0.03] p-5 text-center">
                <p className="text-xs leading-relaxed text-slate-500">
                  Last Updated: {lastUpdated}.{" "}
                  {footerNote ??
                    "BetIndia reserves the right to update these terms at any time. Continued use of the platform constitutes acceptance of any changes."}
                </p>
              </div>
            </article>

          </div>
        </div>
      </main>
     
    </>
  );
}
