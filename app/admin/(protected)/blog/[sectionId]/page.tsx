"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Save, Loader2 } from "lucide-react";
import { getSection, saveSection } from "@/lib/cms";
import { blogContent } from "@/data/blog";
import DynamicField from "../../../component/cms/dynamic/DynamicField";
import { humanize } from "../../../component/cms/dynamic/utils";
import { useToast, ToastHost } from "@/components/admin/Toast";
import { revalidateContent } from "../../content/actions";

const PAGE_ID = "blog";

function formatLabel(id: string) {
  return id
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export default function BlogSectionEditor() {
  const { sectionId } = useParams<{ sectionId: string }>();

  const [form, setForm] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast, showToast, dismissToast } = useToast();

  useEffect(() => {
    if (!sectionId) return;

    async function loadData() {
      const data = await getSection(PAGE_ID, sectionId);
      // Fall back to code defaults so the section is editable even before the
      // first CMS sync writes the Firestore document.
      const defaults = (blogContent as Record<string, Record<string, unknown>>)[sectionId];
      setForm(data || defaults || {});
      setLoading(false);
    }

    loadData();
  }, [sectionId]);

  function updateKey(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveSection(PAGE_ID, sectionId, form);
      // Purge the cached /blog render so the edit is visible immediately.
      try {
        await revalidateContent(PAGE_ID);
      } catch {
        // Non-fatal: the page still refreshes on its next revalidate.
      }
      showToast("success", "Changes saved.");
    } catch (err) {
      console.error("Failed to save section", err);
      showToast("error", "Could not save your changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-6 py-10 text-slate-400">
        <Loader2 size={18} className="animate-spin" />
        Loading section data…
      </div>
    );
  }

  const keys = Object.keys(form);

  return (
    <div className="mx-auto max-w-3xl space-y-6 text-white">
      <ToastHost toast={toast} onDismiss={dismissToast} />

      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition hover:text-white"
      >
        <ChevronLeft size={16} />
        Back to Blog
      </Link>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#FF6B00]">Blog</p>
        <h1 className="mt-1 text-3xl font-extrabold">{formatLabel(String(sectionId))}</h1>
        <p className="mt-2 text-sm text-slate-500">Edit section fields and save changes.</p>
      </div>

      {keys.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] px-6 py-10 text-slate-400 backdrop-blur-xl">
          This section has no data to edit yet.
        </div>
      ) : (
        <div className="space-y-6 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 backdrop-blur-xl">
          <div className="space-y-5">
            {keys.map((key) => (
              <DynamicField
                key={key}
                label={humanize(key)}
                value={form[key]}
                onChange={(value: unknown) => updateKey(key, value)}
              />
            ))}
          </div>

          <div className="pt-2 border-t border-white/[0.05]">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF8A00] px-4 py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? "Saving Changes…" : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
