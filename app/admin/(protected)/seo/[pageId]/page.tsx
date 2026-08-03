"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Loader2, Save } from "lucide-react";
import { getPageMeta, savePageMeta } from "@/lib/cms";
import { revalidateSeo } from "../actions";
import { useToast, ToastHost } from "@/components/admin/Toast";

function formatLabel(id: string) {
  return id
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export default function PageSeoEditor() {
  const { pageId } = useParams();
  const router = useRouter();

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [pageName, setPageName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast, showToast, dismissToast } = useToast();

  useEffect(() => {
    if (!pageId) return;

    async function loadData() {
      const data = await getPageMeta(String(pageId));
      if (data) {
        setMetaTitle(data.metaTitle || "");
        setMetaDescription(data.metaDescription || "");
        setSlug(data.slug || `/${pageId}`);
        setPageName(data.name || formatLabel(String(pageId)));
      } else {
        setPageName(formatLabel(String(pageId)));
        setSlug(`/${pageId}`);
      }
      setLoading(false);
    }

    loadData();
  }, [pageId]);

  async function handleSave() {
    if (!metaTitle.trim() || !metaDescription.trim()) {
      showToast("error", "Please fill in both the Meta Title and Meta Description.");
      return;
    }

    setSaving(true);
    const success = await savePageMeta(String(pageId), {
      metaTitle: metaTitle.trim(),
      metaDescription: metaDescription.trim(),
    });
    if (success) {
      // Refresh the live page so the new meta tags appear immediately
      // instead of waiting for the ISR revalidate window.
      try {
        await revalidateSeo(String(pageId));
      } catch {
        // Non-fatal: the page will still refresh on its next revalidate.
      }
    }
    setSaving(false);
    if (success) {
      showToast("success", "SEO settings saved.");
      // Give the toast a beat to register before leaving the page.
      setTimeout(() => router.push("/admin/seo"), 900);
    } else {
      showToast("error", "Could not save the SEO settings. Please try again.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-6 py-10 text-slate-400">
        <Loader2 size={18} className="animate-spin" />
        Loading Page SEO Data…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 text-white">
      <ToastHost toast={toast} onDismiss={dismissToast} />

      <Link
        href="/admin/seo"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition hover:text-white"
      >
        <ChevronLeft size={16} />
        Back to SEO Pages
      </Link>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#FF6B00]">
          SEO Settings
        </p>
        <h1 className="mt-1 text-3xl font-extrabold">{pageName}</h1>
        <p className="mt-2 text-sm text-slate-500">
          Edit search engine metadata for this page.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Editor Form */}
        <div className="space-y-6 md:col-span-2 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 backdrop-blur-xl">
          <div className="space-y-2">
            <label htmlFor="metaTitle" className="block text-sm font-semibold text-slate-300">
              Meta Title
            </label>
            <input
              id="metaTitle"
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="e.g. Best Cricket Betting Sites in India | BetIndia"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-[#FF6B00]/50 focus:bg-white/[0.07] focus:outline-none transition"
            />
            <p className="text-right text-[11px] text-slate-500">
              {metaTitle.length} characters (Recommended: 50-60)
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="metaDescription" className="block text-sm font-semibold text-slate-300">
              Meta Description
            </label>
            <textarea
              id="metaDescription"
              rows={4}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="e.g. Find India's most trusted online cricket betting sites with live IPL odds..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-[#FF6B00]/50 focus:bg-white/[0.07] focus:outline-none transition"
            />
            <p className="text-right text-[11px] text-slate-500">
              {metaDescription.length} characters (Recommended: 150-160)
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF8A00] px-4 py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? "Saving Changes…" : "Save SEO Settings"}
          </button>
        </div>

        {/* Live Search Engine Preview */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Search Result Preview
          </p>
          <div className="rounded-2xl border border-white/[0.07] bg-[#030810]/60 p-5 shadow-lg backdrop-blur-xl">
            <span className="text-xs text-slate-400">google.com</span>
            <div className="mt-1.5">
              <span className="text-[11px] text-slate-500 block truncate">
                https://betindia.games{slug}
              </span>
              <span className="text-lg font-medium text-[#8ab4f8] hover:underline cursor-pointer leading-tight mt-0.5 block">
                {metaTitle || `${pageName} | BetIndia`}
              </span>
              <p className="mt-1 text-sm text-slate-400 leading-normal line-clamp-3 font-sans">
                {metaDescription || "Please write a meta description to see how your site will appear in Google search results."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
