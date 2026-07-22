"use client";

import { Suspense, useCallback, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";

const CATEGORIES = [
  { label: "All Articles", value: "all" },
  { label: "Sports Betting", value: "Sports Betting" },
  { label: "Cricket",        value: "Cricket" },
  { label: "Casino",         value: "Casino" },
  { label: "Teen Patti",     value: "Teen Patti" },
  { label: "Aviator",        value: "Aviator" },
  { label: "Promotions",     value: "Promotions" },
  { label: "VIP",            value: "VIP" },
] as const;

// ─── Inner (reads searchParams) ───────────────────────────────────────────────

function SearchInner() {
  const router   = useRouter();
  const pathname = usePathname();
  const params   = useSearchParams();
  const [, startTransition] = useTransition();

  const activeCategory = params.get("category") ?? "all";
  const searchQuery    = params.get("q") ?? "";

  const update = useCallback(
    (key: "category" | "q", value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value === "" || value === "all") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      // Reset other param when switching categories
      if (key === "category") next.delete("q");
      startTransition(() => {
        router.replace(`${pathname}?${next.toString()}`, { scroll: false });
      });
    },
    [params, pathname, router]
  );

  return (
    <div className="space-y-5">
      {/* Search input */}
      <div className="relative">
        <Search
          size={16}
          strokeWidth={2}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => update("q", e.target.value)}
          placeholder="Search articles…"
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 outline-none backdrop-blur-sm transition-all duration-200 focus:border-[#FF6B00]/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#FF6B00]/15"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ label, value }) => {
          const isActive = activeCategory === value;
          return (
            <button
              key={value}
              onClick={() => update("category", value)}
              className={[
                "rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-all duration-200",
                isActive
                  ? "border-[#FF6B00]/50 bg-[#FF6B00]/15 text-[#FF6B00] shadow-lg shadow-[#FF6B00]/10"
                  : "border-white/10 bg-white/[0.04] text-slate-400 hover:border-white/20 hover:bg-white/[0.07] hover:text-slate-200",
              ].join(" ")}
            >
              {label}
            </button>
          );
        })}
      </div>
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
  titleLead: "Explore",
  titleAccent: "Articles",
  description: "Filter by category or search by keyword.",
};

export default function BlogSearch({
  content = DEFAULT_HEADER,
}: {
  content?: HeaderContent;
}) {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-10 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-7">
          <h2 className="text-lg font-extrabold text-white md:text-xl">
            {content.titleLead ?? DEFAULT_HEADER.titleLead}{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              {content.titleAccent ?? DEFAULT_HEADER.titleAccent}
            </span>
          </h2>
          <p className="mt-1 text-sm text-slate-500">{content.description ?? DEFAULT_HEADER.description}</p>
        </div>

        <Suspense
          fallback={
            <div className="space-y-5">
              <div className="h-12 w-full animate-pulse rounded-xl border border-white/10 bg-white/[0.04]" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-8 w-24 animate-pulse rounded-full border border-white/10 bg-white/[0.04]" />
                ))}
              </div>
            </div>
          }
        >
          <SearchInner />
        </Suspense>
      </div>
    </section>
  );
}
