"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Newspaper, Layers, Loader2, ChevronRight, Pencil } from "lucide-react";
import { getSections } from "@/lib/cms";
import { cmsConfig } from "@/lib/cmsConfig";

const PAGE_ID = "blog";

function formatLabel(id: string) {
  return id
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

type SectionItem = {
  id: string;
  label: string;
  fieldCount: number;
};

export default function BlogAdminPage() {
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const config = (cmsConfig as Record<string, Record<string, unknown[]>>)[PAGE_ID] || {};
      const configKeys = Object.keys(config);
      const firestoreKeys = (await getSections(PAGE_ID)).map((s) => s.id);
      // Preserve the cmsConfig order, then append any extra Firestore-only sections.
      const orderedKeys = [
        ...configKeys,
        ...firestoreKeys.filter((k) => !configKeys.includes(k)),
      ];
      setSections(
        orderedKeys.map((id) => ({
          id,
          label: formatLabel(id),
          fieldCount: Array.isArray(config[id]) ? config[id].length : 0,
        }))
      );
      setLoading(false);
    }
    init();
  }, []);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Blog</h1>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Manage the sections of the blog page — hero, featured posts, categories, newsletter and SEO.
          </p>
        </div>
        <Link
          href="/admin/posts"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF8A00] px-4 py-2.5 text-sm font-bold text-white transition cursor-pointer"
        >
          Manage Blog Articles (Posts)
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-xl">
        <div className="border-b border-white/[0.05] px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <Newspaper size={16} className="text-[#FF6B00]" />
            Blog Page Sections
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Choose a section to edit. Changes appear on the public blog page immediately.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 px-6 py-10 text-slate-400">
            <Loader2 size={18} className="animate-spin" />
            Loading sections…
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.05]">
            {sections.map((section) => (
              <li key={section.id}>
                <Link
                  href={`/admin/blog/${section.id}`}
                  className="group flex items-center gap-3 px-5 py-4 transition hover:bg-white/[0.03]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-400 group-hover:border-[#FF6B00]/30 group-hover:text-[#FF6B00]">
                    <Layers size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-white group-hover:text-[#FF6B00] transition">{section.label}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {section.fieldCount > 0
                        ? `${section.fieldCount} editable field${section.fieldCount === 1 ? "" : "s"}`
                        : "No CMS fields configured"}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#FF6B00]">
                    <Pencil size={12} />
                    Edit
                    <ChevronRight size={14} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
