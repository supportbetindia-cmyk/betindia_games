"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  Gem,
  Plane,
  ArrowRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { iconFromName } from "@/lib/blog-icons";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Article = {
  slug: string;
  category: string;
  accent: "#FF6B00" | "#138808";
  title: string;
  excerpt: string;
  readTime: string;
  image?: string;
  placeholderIcon: string | LucideIcon;
};

// ─── Static content ───────────────────────────────────────────────────────────

const ARTICLES: Article[] = [
  {
    slug: "ipl-betting-guide",
    category: "Sports Betting",
    accent: "#FF6B00",
    title: "IPL Betting Guide",
    excerpt:
      "Learn the fundamentals of IPL betting, odds, match analysis, and bankroll management.",
    readTime: "8 min read",
    placeholderIcon: Trophy,
  },
  {
    slug: "best-casino-games",
    category: "Casino",
    accent: "#138808",
    title: "Best Casino Games",
    excerpt:
      "Discover the most popular casino games and learn how to maximize your winning potential.",
    readTime: "6 min read",
    placeholderIcon: Gem,
  },
  {
    slug: "aviator-strategy",
    category: "Crash Games",
    accent: "#FF6B00",
    title: "Aviator Strategy",
    excerpt:
      "Explore proven Aviator strategies, risk management techniques, and gameplay insights.",
    readTime: "5 min read",
    placeholderIcon: Plane,
  },
];

// ─── Article Card ─────────────────────────────────────────────────────────────

export function ArticleCard({ article }: { article: Article }) {
  const { slug, category, accent, title, excerpt, readTime, image, placeholderIcon } =
    article;
  const Icon = typeof placeholderIcon === "string" ? iconFromName(placeholderIcon) : placeholderIcon;
  const isOrange = accent === "#FF6B00";

  return (
    <Link
      href={`/blog/${slug}`}
      className={[
        "group relative flex flex-col overflow-hidden rounded-[24px] border border-white/10",
        "bg-white/[0.04] backdrop-blur-xl transition-all duration-300",
        isOrange
          ? "hover:border-[#FF6B00]/40 hover:shadow-2xl hover:shadow-[#FF6B00]/10"
          : "hover:border-[#138808]/40 hover:shadow-2xl hover:shadow-[#138808]/10",
        "hover:-translate-y-1.5 hover:bg-white/[0.07]",
      ].join(" ")}
    >
      {/* Top edge glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      {/* ── Image / Placeholder ──────────────────────────────────── */}
      <div className="relative h-48 overflow-hidden bg-[#081425]">
        {image ? (
          <>
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050B18]/80 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${accent}22 0%, #081425 60%, #050B18 100%)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 55%, ${accent}28 0%, transparent 65%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle, ${accent}40 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
            <div
              className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
              style={{
                background: `${accent}18`,
                borderColor: `${accent}35`,
                color: accent,
                boxShadow: `0 0 32px ${accent}25`,
              }}
            >
              <Icon size={28} strokeWidth={1.5} />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050B18]/90 to-transparent" />
          </div>
        )}
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 p-5 pt-4">
        <span
          className="inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
          style={{
            borderColor: `${accent}40`,
            background: `${accent}12`,
            color: accent,
          }}
        >
          {category}
        </span>

        <h3 className="text-base font-bold leading-snug text-white transition-colors duration-200 group-hover:text-white/90">
          {title}
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-slate-400">{excerpt}</p>

        <div className="mt-1 flex items-center justify-between border-t border-white/[0.06] pt-3">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Clock size={11} className="shrink-0" />
            {readTime}
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200 group-hover:gap-2.5"
            style={{ color: accent }}
          >
            Read More
            <ArrowRight size={14} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function LatestArticles({ articles = ARTICLES }: { articles?: Article[]; content?: Record<string, unknown> }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncArrows();
    el.addEventListener("scroll", syncArrows, { passive: true });
    const ro = new ResizeObserver(syncArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncArrows);
      ro.disconnect();
    };
  }, [syncArrows]);

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-article-card]");
    const gap = 20;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 340) + gap), behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-[340px] w-[340px] -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/4 h-[340px] w-[340px] translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center md:items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div className="flex flex-col items-center sm:items-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
              Betting &amp; Casino Insights
            </span>

            <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
              Latest{" "}
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
                Articles
              </span>
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
              Expert betting guides, casino tips, and winning strategies.
            </p>
          </div>

          {/* View all + desktop arrows */}
          <div className="flex shrink-0 items-center gap-3">
            {/* Arrows (desktop only) */}
            <div className="hidden items-center gap-2 lg:flex">
              <button
                onClick={() => scroll(-1)}
                disabled={atStart}
                aria-label="Previous article"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/60 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/[0.1] hover:text-white disabled:pointer-events-none disabled:opacity-0"
              >
                <ChevronLeft size={18} strokeWidth={2} />
              </button>
              <button
                onClick={() => scroll(1)}
                disabled={atEnd}
                aria-label="Next article"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/60 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/[0.1] hover:text-white disabled:pointer-events-none disabled:opacity-0"
              >
                <ChevronRight size={18} strokeWidth={2} />
              </button>
            </div>

            <Link
              href="/blog"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 backdrop-blur-md transition-all duration-200 hover:border-[#FF6B00]/40 hover:text-[#FF6B00]"
            >
              View All
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Carousel track wrapper */}
        <div className="relative">
          {/* Edge fades */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#050B18] to-transparent transition-opacity duration-300 sm:w-4"
            style={{ opacity: atStart ? 0 : 1 }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#050B18] to-transparent transition-opacity duration-300 sm:w-8"
            style={{ opacity: atEnd ? 0 : 1 }}
          />

          {/* Scrollable track */}
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {articles.map((article) => (
              <div
                key={article.slug}
                data-article-card
                className="flex-none snap-start w-[82%] max-w-sm sm:w-[calc(50%-10px)] lg:w-[calc(40%-12px)]"
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
