"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft, Layers, Pencil } from "lucide-react";
import { getSections } from "@/lib/cms";
import { cmsConfig } from "@/lib/cmsConfig";

function formatLabel(id) {
  return id
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export default function PageSections() {
  const { pageId } = useParams();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    async function loadSections() {
      if (!pageId) return;
      const configKeys = Object.keys(cmsConfig[pageId] || {});
      const data = await getSections(pageId);
      const firestoreKeys = data.map((s) => s.id);
      setSections([...new Set([...configKeys, ...firestoreKeys])].sort());
    }
    loadSections();
  }, [pageId]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/admin/content"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition hover:text-white"
      >
        <ChevronLeft size={16} />
        Back to Content
      </Link>

      <div>
        <h1 className="text-3xl font-extrabold text-white">{formatLabel(String(pageId))}</h1>
        <p className="mt-2 text-sm text-slate-500">Choose a section to edit.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-xl">
        <ul className="divide-y divide-white/[0.05]">
          {sections.map((sectionId) => {
            const fieldCount = cmsConfig[pageId]?.[sectionId]?.length ?? 0;
            return (
              <li key={sectionId}>
                <Link
                  href={`/admin/content/${pageId}/${sectionId}`}
                  className="group flex items-center gap-3 px-5 py-4 transition hover:bg-white/[0.03]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-400 group-hover:border-[#FF6B00]/30 group-hover:text-[#FF6B00]">
                    <Layers size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-white group-hover:text-[#FF6B00] transition">{formatLabel(sectionId)}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {fieldCount > 0
                        ? `${fieldCount} editable field${fieldCount === 1 ? "" : "s"}`
                        : "No CMS fields configured"}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#FF6B00]">
                    <Pencil size={12} />
                    Edit
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
