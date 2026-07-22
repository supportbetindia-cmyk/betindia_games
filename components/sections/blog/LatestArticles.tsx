"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BarChart2 } from "lucide-react";
import { ArticleCard, type Article } from "@/components/sections/LatestArticles";

// ─── Inner grid (reads URL params) ────────────────────────────────────────────

function ArticlesGrid({ articles }: { articles: Article[] }) {
  const params = useSearchParams();
  const rawCategory = params.get("category") ?? "all";
  const rawSearch   = (params.get("q") ?? "").toLowerCase().trim();

  const filtered = articles.filter((a) => {
    const matchCat =
      rawCategory === "all" ||
      a.category.toLowerCase() === rawCategory.toLowerCase();
    const matchSearch =
      !rawSearch ||
      a.title.toLowerCase().includes(rawSearch) ||
      a.excerpt.toLowerCase().includes(rawSearch) ||
      a.category.toLowerCase().includes(rawSearch);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-600">
          <BarChart2 size={28} strokeWidth={1.5} />
        </div>
        <p className="text-base font-semibold text-slate-400">No articles found</p>
        <p className="text-sm text-slate-600">Try a different search term or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

type HeaderContent = {
  titleLead?: string;
  titleAccent?: string;
  description?: string;
};

const DEFAULT_HEADER: Required<HeaderContent> = {
  titleLead: "Latest",
  titleAccent: "Articles",
  description: "Discover our newest guides and insights.",
};

export default function LatestArticles({
  articles,
  content = DEFAULT_HEADER,
}: {
  articles: Article[];
  content?: HeaderContent;
}) {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 pb-16 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/4 h-[380px] w-[380px] translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl">
            {content.titleLead ?? DEFAULT_HEADER.titleLead}{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              {content.titleAccent ?? DEFAULT_HEADER.titleAccent}
            </span>
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {content.description ?? DEFAULT_HEADER.description}
          </p>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-[24px] border border-white/10 bg-white/[0.04]"
                />
              ))}
            </div>
          }
        >
          <ArticlesGrid articles={articles} />
        </Suspense>
      </div>
    </section>
  );
}
