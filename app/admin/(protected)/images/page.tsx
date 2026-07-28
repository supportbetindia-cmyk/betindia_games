"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Image as ImageIcon, Loader2, ChevronRight, FileImage } from "lucide-react";
import { getPages } from "@/lib/cms";
import { CMS_DATA } from "@/data";
import { PAGE_ROUTES } from "@/lib/page-routes";

type PageItem = {
  id: string;
  name: string;
  slug: string;
  defaultImage?: string;
};

export default function ImagesPageList() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      // Local CMS_DATA is the source of truth so the list works even before the
      // Firestore `pages` collection is seeded (the site renders from CMS_DATA).
      // Firestore page docs, when present, only override the name/slug.
      const fsPages = await getPages();
      const fsById = new Map(fsPages.map((p) => [p.id, p]));

      // Only show pages wired to a public route.
      const pageList = CMS_DATA.filter((p) => p.pageId in PAGE_ROUTES)
        .map((p) => {
          const fs = fsById.get(p.pageId);
          const defaultImage = p.sections?.hero?.imageUrl || "";

          return {
            id: p.pageId,
            name: fs?.name || p.name || p.pageId,
            slug: fs?.slug || p.slug || PAGE_ROUTES[p.pageId] || "",
            defaultImage,
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
      <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-6 py-10 text-slate-400">
        <Loader2 size={18} className="animate-spin" />
        Loading pages…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Page Images</h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage the primary hero images and alt texts across the different pages of the website.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-xl">
        <div className="border-b border-white/[0.05] px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <ImageIcon size={16} className="text-[#FF6B00]" />
            Website Pages primary images
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Select a page below to update its hero image or upload a custom image.
          </p>
        </div>

        <ul className="divide-y divide-white/[0.05]">
          {pages.map((page) => (
            <li key={page.id}>
              <Link
                href={`/admin/images/${page.id}`}
                className="group flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-white/[0.03]"
              >
                {page.defaultImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={page.defaultImage}
                    alt={page.name}
                    className="h-12 w-20 shrink-0 rounded-lg object-cover border border-white/10 group-hover:border-[#FF6B00]/40 transition"
                  />
                ) : (
                  <span className="grid h-12 w-20 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-500 group-hover:border-[#FF6B00]/40 transition">
                    <FileImage size={20} />
                  </span>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="block text-base font-semibold text-white group-hover:text-[#FF6B00] transition">
                      {page.name}
                    </span>
                    <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-500 uppercase font-mono">
                      {page.id}
                    </span>
                  </div>
                  <span className="mt-0.5 block truncate text-xs text-slate-500">
                    {page.slug || `/${page.id}`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 transition group-hover:translate-x-1">
                    <ChevronRight size={18} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
