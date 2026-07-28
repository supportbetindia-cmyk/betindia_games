"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Globe, Loader2, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";
import { getPages } from "@/lib/cms";
import { CMS_DATA } from "@/data";
import { PAGE_ROUTES } from "@/lib/page-routes";

type PageItem = {
  id: string;
  name: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
};

export default function SeoPageList() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      // Local CMS_DATA is the source of truth so the list works even before the
      // Firestore `pages` collection is seeded. Firestore page docs, when
      // present, override name/slug and provide the saved meta title/description.
      // Only show pages wired to a public route.
      const fsPages = await getPages();
      const fsById = new Map(fsPages.map((p) => [p.id, p]));

      const pageList = CMS_DATA.filter((p) => p.pageId in PAGE_ROUTES)
        .map((p) => {
          const fs = fsById.get(p.pageId);
          return {
            id: p.pageId,
            name: fs?.name || p.name || p.pageId,
            slug: fs?.slug || p.slug || PAGE_ROUTES[p.pageId] || "",
            metaTitle: fs?.metaTitle,
            metaDescription: fs?.metaDescription,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
      setPages(pageList);
      setLoading(false);
    }
    init();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-10 text-zinc-400">
        <Loader2 size={18} className="animate-spin" />
        Loading pages…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">SEO Settings</h1>
        <p className="mt-2 text-zinc-400">
          Manage search engine optimization (meta titles and descriptions) for the website pages.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
        <div className="border-b border-zinc-800 px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
            <Globe size={16} className="text-[#FF6B00]" />
            Website Pages Metadata
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            Select a page to edit its meta title and description for search engines.
          </p>
        </div>

        <ul className="divide-y divide-zinc-800">
          {pages.map((page) => {
            const hasMeta = !!(page.metaTitle && page.metaDescription);
            return (
              <li key={page.id}>
                <Link
                  href={`/admin/seo/${page.id}`}
                  className="group flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-zinc-800/60"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#FF6B00]/20 bg-[#FF6B00]/10 text-[#FF6B00]">
                    <Globe size={18} />
                  </span>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="block text-base font-semibold text-white group-hover:text-[#FF6B00] transition">
                        {page.name}
                      </span>
                      <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500 uppercase font-mono">
                        {page.id}
                      </span>
                    </div>
                    <span className="mt-0.5 block truncate text-xs text-zinc-500">
                      {page.slug || `/${page.id}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {hasMeta ? (
                      <span className="hidden items-center gap-1 text-xs text-[#138808] sm:flex bg-[#138808]/10 border border-[#138808]/20 px-2.5 py-1 rounded-full font-semibold">
                        <CheckCircle2 size={12} />
                        Customized
                      </span>
                    ) : (
                      <span className="hidden items-center gap-1 text-xs text-zinc-500 sm:flex bg-zinc-800/50 border border-zinc-700/50 px-2.5 py-1 rounded-full font-semibold">
                        <AlertCircle size={12} />
                        Default
                      </span>
                    )}
                    <span className="text-zinc-500 transition group-hover:translate-x-1">
                      <ChevronRight size={18} />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
