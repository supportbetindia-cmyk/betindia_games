"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { getSection, saveSection } from "@/lib/cms";
import { DEFAULT_SOCIALS, SOCIAL_ICON_OPTIONS, type SocialLink } from "@/lib/social-links";
import { revalidateSocial } from "./actions";
import { useToast, ToastHost } from "@/components/admin/Toast";

export default function SocialLinksPage() {
  const [items, setItems] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast, showToast, dismissToast } = useToast();

  useEffect(() => {
    async function load() {
      const data = await getSection("settings", "social");
      const saved = Array.isArray(data?.items) ? (data.items as SocialLink[]) : null;
      setItems(saved && saved.length > 0 ? saved : DEFAULT_SOCIALS);
      setLoading(false);
    }
    load();
  }, []);

  function update(index: number, key: keyof SocialLink, value: string) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, [key]: value } : it)));
  }

  function addItem() {
    setItems((prev) => [...prev, { label: "", href: "", icon: "globe" }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    const cleaned = items
      .map((it) => ({ label: it.label.trim(), href: it.href.trim(), icon: it.icon }))
      .filter((it) => it.label || it.href);
    const success = await saveSection("settings", "social", { items: cleaned });
    if (success) {
      try {
        await revalidateSocial();
      } catch {
        // Non-fatal.
      }
    }
    setSaving(false);
    showToast(
      success ? "success" : "error",
      success
        ? "Social links saved."
        : "Could not save the social links. Please try again."
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-6 py-10 text-slate-400">
        <Loader2 size={18} className="animate-spin" />
        Loading social links…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 text-white">
      <ToastHost toast={toast} onDismiss={dismissToast} />

      <div>
        <h1 className="text-3xl font-extrabold">Social Links</h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage the social media links shown in the website footer. Changes apply across the whole site.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-4 sm:grid-cols-[1fr_1.5fr_auto_auto] sm:items-end backdrop-blur-xl"
          >
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">Label</label>
              <input
                type="text"
                value={item.label}
                onChange={(e) => update(index, "label", e.target.value)}
                placeholder="Instagram"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:border-[#FF6B00]/50 focus:bg-white/[0.07] focus:outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">Link (URL)</label>
              <input
                type="url"
                value={item.href}
                onChange={(e) => update(index, "href", e.target.value)}
                placeholder="https://instagram.com/betindia"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:border-[#FF6B00]/50 focus:bg-white/[0.07] focus:outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">Icon</label>
              <select
                value={item.icon}
                onChange={(e) => update(index, "icon", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-[#FF6B00]/50 focus:bg-white/[0.07] focus:outline-none transition"
              >
                {SOCIAL_ICON_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#050B18] text-white">
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => removeItem(index)}
              aria-label="Remove link"
              className="grid h-10 w-10 place-items-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 transition hover:bg-red-500/20 cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-[#FF6B00]/40 hover:text-white cursor-pointer"
        >
          <Plus size={16} />
          Add Social Link
        </button>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF8A00] px-4 py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
      >
        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
        {saving ? "Saving Changes…" : "Save Social Links"}
      </button>
    </div>
  );
}
