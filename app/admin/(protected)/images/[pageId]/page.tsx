"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Loader2, Save, ImageOff } from "lucide-react";
import { getSections, saveSection } from "@/lib/cms";
import { CMS_DATA } from "@/data";
import { revalidateSeo } from "../../seo/actions";
import ImageField from "../../../component/cms/ImageField";
import { humanize } from "../../../component/cms/dynamic/utils";

// Image-URL / alt fields to surface in this editor.
const IMAGE_KEY = /(image|img|photo|banner|thumbnail|picture|logo|cover|avatar)/i;
const ALT_KEY = /alt/i;

type Path = (string | number)[];
type Entry = { path: Path; kind: "image" | "alt" };
type Sections = Record<string, Record<string, unknown>>;

function formatLabel(id: string) {
  return id
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

// Merge code defaults into saved data so new image fields appear without a
// re-sync (saved values always win; defaults only fill missing keys).
function mergeDefaults(def: unknown, val: unknown): unknown {
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
    const out: Record<string, unknown> = { ...(def as object), ...(val as object) };
    for (const key of Object.keys(def as object)) {
      const dv = (def as Record<string, unknown>)[key];
      if (dv && typeof dv === "object") {
        out[key] = mergeDefaults(dv, (val as Record<string, unknown>)[key]);
      }
    }
    return out;
  }
  return val === undefined ? def : val;
}

// Collect every image / alt field path within a section's data.
function collectFields(value: unknown, path: Path = [], out: Entry[] = []): Entry[] {
  if (Array.isArray(value)) {
    value.forEach((v, i) => collectFields(v, [...path, i], out));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (typeof v === "string") {
        if (IMAGE_KEY.test(k)) out.push({ path: [...path, k], kind: "image" });
        else if (ALT_KEY.test(k)) out.push({ path: [...path, k], kind: "alt" });
      } else if (v && typeof v === "object") {
        collectFields(v, [...path, k], out);
      }
    }
  }
  return out;
}

function getByPath(obj: unknown, path: Path): unknown {
  return path.reduce<unknown>((acc, k) => (acc == null ? acc : (acc as Record<string | number, unknown>)[k]), obj);
}

function setByPath(obj: unknown, path: Path, value: unknown): unknown {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (Array.isArray(obj)) {
    const copy = [...obj];
    copy[head as number] = setByPath(obj[head as number], rest, value);
    return copy;
  }
  const base = (obj && typeof obj === "object" ? obj : {}) as Record<string, unknown>;
  return { ...base, [head]: setByPath(base[head as string], rest, value) };
}

function entryLabel(path: Path): string {
  return path
    .map((p) => (typeof p === "number" ? `Item ${p + 1}` : humanize(p)))
    .join(" › ");
}

export default function PageImageEditor() {
  const { pageId } = useParams<{ pageId: string }>();
  const router = useRouter();

  const [sections, setSections] = useState<Sections>({});
  const [dirty, setDirty] = useState<Set<string>>(new Set());
  const [pageName, setPageName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!pageId) return;

    async function loadData() {
      const defaultPage = CMS_DATA.find((p) => p.pageId === pageId);
      setPageName(defaultPage?.name || formatLabel(String(pageId)));

      const defaults = (defaultPage?.sections ?? {}) as Sections;
      const fsList = await getSections(String(pageId));
      const fsMap: Sections = {};
      for (const { id, ...rest } of fsList) fsMap[id] = rest;

      const allIds = [...new Set([...Object.keys(defaults), ...Object.keys(fsMap)])];
      const merged: Sections = {};
      for (const id of allIds) {
        merged[id] = mergeDefaults(defaults[id] ?? {}, fsMap[id] ?? {}) as Record<string, unknown>;
      }
      setSections(merged);
      setLoading(false);
    }

    loadData();
  }, [pageId]);

  function updateField(sectionId: string, path: Path, value: unknown) {
    setSections((prev) => ({
      ...prev,
      [sectionId]: setByPath(prev[sectionId], path, value) as Record<string, unknown>,
    }));
    setDirty((prev) => new Set(prev).add(sectionId));
  }

  async function handleSave() {
    setSaving(true);
    let ok = true;
    for (const sectionId of dirty) {
      const success = await saveSection(String(pageId), sectionId, sections[sectionId]);
      if (!success) ok = false;
    }
    if (ok) {
      try {
        await revalidateSeo(String(pageId));
      } catch {
        // Non-fatal.
      }
    }
    setSaving(false);
    if (ok) {
      alert("Images Saved!");
      router.push("/admin/images");
    } else {
      alert("Failed to save some images.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-6 py-10 text-slate-400">
        <Loader2 size={18} className="animate-spin" />
        Loading Page Images…
      </div>
    );
  }

  // Build the render groups: sections that contain at least one image/alt field.
  const groups = Object.entries(sections)
    .map(([sectionId, data]) => ({ sectionId, entries: collectFields(data) }))
    .filter((g) => g.entries.length > 0);

  return (
    <div className="mx-auto max-w-3xl space-y-6 text-white">
      <Link
        href="/admin/images"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition hover:text-white"
      >
        <ChevronLeft size={16} />
        Back to Page Images
      </Link>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#FF6B00]">Page Images</p>
        <h1 className="mt-1 text-3xl font-extrabold">{pageName}</h1>
        <p className="mt-2 text-sm text-slate-500">
          Upload and manage every image on this page — hero and card images. Uploads go to Supabase; the URL is saved to the CMS.
        </p>
      </div>

      {groups.length === 0 ? (
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-6 py-10 text-slate-400">
          <ImageOff size={18} />
          This page has no image fields.
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map(({ sectionId, entries }) => (
            <div key={sectionId} className="space-y-5 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 backdrop-blur-xl">
              <h2 className="text-lg font-bold text-white">{formatLabel(sectionId)}</h2>
              {entries.map(({ path, kind }) => {
                const value = (getByPath(sections[sectionId], path) as string) ?? "";
                const label = entryLabel(path);
                if (kind === "alt") {
                  return (
                    <div key={path.join(".")} className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateField(sectionId, path, e.target.value)}
                        placeholder="Describe the image for screen readers and SEO"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-[#FF6B00]/50 focus:bg-white/[0.07] focus:outline-none transition"
                      />
                    </div>
                  );
                }
                return (
                  <ImageField
                    key={path.join(".")}
                    label={label}
                    value={value}
                    onChange={(url: string) => updateField(sectionId, path, url)}
                  />
                );
              })}
            </div>
          ))}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF8A00] px-4 py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? "Saving Changes…" : "Save Images"}
          </button>
        </div>
      )}
    </div>
  );
}
