"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Save, Loader2 } from "lucide-react";
import { getSection, saveSection } from "@/lib/cms";
import { CMS_DATA } from "@/data";
import DynamicField from "../../../../component/cms/dynamic/DynamicField";
import { humanize } from "../../../../component/cms/dynamic/utils";

/**
 * Merge code defaults into the saved Firestore data so newly-added fields
 * (e.g. a card `image`) show up in the editor without a destructive re-sync.
 * Saved values always win; defaults only fill in missing keys — including keys
 * inside repeater/card items (arrays of objects use the first default item as
 * the shape template).
 */
function mergeDefaults(def, val) {
  if (Array.isArray(def)) {
    if (!Array.isArray(val)) return val ?? def;
    const template = def[0];
    return val.map((item) =>
      template && typeof template === "object" && item && typeof item === "object"
        ? mergeDefaults(template, item)
        : item
    );
  }
  if (def && typeof def === "object") {
    if (!val || typeof val !== "object") return val ?? def;
    const out = { ...def, ...val };
    for (const key of Object.keys(def)) {
      if (def[key] && typeof def[key] === "object") {
        out[key] = mergeDefaults(def[key], val[key]);
      }
    }
    return out;
  }
  return val === undefined ? def : val;
}

function formatLabel(id) {
  return id
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export default function SectionEditor() {
  const { pageId, sectionId } = useParams();

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!pageId || !sectionId) return;

    async function loadData() {
      const data = await getSection(pageId, sectionId);
      const defaults =
        CMS_DATA.find((p) => p.pageId === pageId)?.sections?.[sectionId] ?? {};
      // Fill in any fields missing from the saved doc (e.g. new card images)
      // from code defaults, without overwriting saved content.
      setForm(mergeDefaults(defaults, data ?? {}));
      setLoading(false);
    }

    loadData();
  }, [pageId, sectionId]);

  // Update one top-level key; DynamicField handles any nesting beneath it.
  function updateKey(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    await saveSection(pageId, sectionId, form);
    setSaving(false);
    alert("Saved!");
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-6 py-10 text-slate-400">
        <Loader2 size={18} className="animate-spin" />
        Loading section data…
      </div>
    );
  }

  // Hide retired fields from the editor (e.g. the old hero "eyebrow").
  const HIDDEN_KEYS = ["eyebrow"];
  const keys = Object.keys(form).filter((k) => !HIDDEN_KEYS.includes(k));

  return (
    <div className="mx-auto max-w-3xl space-y-6 text-white">
      <Link
        href="/admin/content"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition hover:text-white"
      >
        <ChevronLeft size={16} />
        Back to Content
      </Link>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#FF6B00]">
          {formatLabel(String(pageId))}
        </p>
        <h1 className="mt-1 text-3xl font-extrabold">{formatLabel(String(sectionId))}</h1>
        <p className="mt-2 text-sm text-slate-500">Edit section fields and save changes.</p>
      </div>

      {keys.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] px-6 py-10 text-slate-400 backdrop-blur-xl">
          This section has no data to edit yet.
        </div>
      ) : (
        <div className="space-y-6 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 backdrop-blur-xl">
          {/* Fields are generated automatically from the section data — any
              JSON shape becomes an editable form, no config needed. */}
          <div className="space-y-5">
            {keys.map((key) => (
              <DynamicField
                key={key}
                label={humanize(key)}
                value={form[key]}
                onChange={(value) => updateKey(key, value)}
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
