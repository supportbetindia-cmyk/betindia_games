"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
} from "lucide-react";
import { getAdminPost, savePost, type AdminPost, type Accent } from "@/lib/blog-admin";
import { BLOG_ICONS } from "@/lib/blog-icons";
import ImageField from "@/app/admin/component/cms/ImageField";
import { revalidateBlog } from "../actions";

type FormState = Omit<AdminPost, "tags" | "relatedSlugs"> & {
  tagsInput: string;
  relatedSlugsInput: string;
};

export default function BlogPostEditor() {
  const { slug } = useParams();
  const router = useRouter();
  const isNew = slug === "new";

  const [form, setForm] = useState<FormState>({
    slug: "",
    title: "",
    category: "",
    accent: "#FF6B00",
    excerpt: "",
    readTime: "",
    publishDate: "",
    tagsInput: "",
    icon: "FileText",
    coverImage: "",
    sections: [],
    relatedSlugsInput: "",
    published: true,
    featured: false,
    order: 0,
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;

    async function loadPost() {
      try {
        const post = await getAdminPost(String(slug));
        if (!post) {
          setError("Post not found.");
          setLoading(false);
          return;
        }

        setForm({
          ...post,
          tagsInput: post.tags.join(", "),
          relatedSlugsInput: post.relatedSlugs.join(", "),
        });
      } catch (err) {
        console.error("Failed to load post", err);
        setError("Error loading post data.");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug, isNew]);

  function handleChange(key: keyof FormState, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // Section helpers
  function handleAddSection() {
    setForm((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        { heading: "", content: "", bullets: [], tip: "", image: "" },
      ],
    }));
  }

  function handleRemoveSection(index: number) {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  }

  function handleSectionChange(index: number, key: string, value: any) {
    setForm((prev) => {
      const updated = [...prev.sections];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, sections: updated };
    });
  }

  function handleMoveSection(index: number, direction: "up" | "down") {
    setForm((prev) => {
      const sections = [...prev.sections];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= sections.length) return prev;

      const temp = sections[index];
      sections[index] = sections[targetIndex];
      sections[targetIndex] = temp;

      return { ...prev, sections };
    });
  }

  // Bullets inside section helpers
  function handleAddBullet(sectionIndex: number) {
    setForm((prev) => {
      const updatedSections = [...prev.sections];
      const section = updatedSections[sectionIndex];
      const bullets = section.bullets ? [...section.bullets, ""] : [""];
      updatedSections[sectionIndex] = { ...section, bullets };
      return { ...prev, sections: updatedSections };
    });
  }

  function handleRemoveBullet(sectionIndex: number, bulletIndex: number) {
    setForm((prev) => {
      const updatedSections = [...prev.sections];
      const section = updatedSections[sectionIndex];
      const bullets = (section.bullets || []).filter((_, i) => i !== bulletIndex);
      updatedSections[sectionIndex] = { ...section, bullets };
      return { ...prev, sections: updatedSections };
    });
  }

  function handleBulletChange(sectionIndex: number, bulletIndex: number, value: string) {
    setForm((prev) => {
      const updatedSections = [...prev.sections];
      const section = updatedSections[sectionIndex];
      const bullets = [...(section.bullets || [])];
      bullets[bulletIndex] = value;
      updatedSections[sectionIndex] = { ...section, bullets };
      return { ...prev, sections: updatedSections };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Form validations
    const cleanSlug = form.slug.trim().toLowerCase();
    if (!cleanSlug) {
      setError("Slug is required.");
      return;
    }
    if (!/^[a-z0-9-_]+$/.test(cleanSlug)) {
      setError("Slug can only contain lowercase letters, numbers, dashes, and underscores.");
      return;
    }
    if (cleanSlug === "new") {
      setError("The slug 'new' is reserved. Please choose a different slug.");
      return;
    }
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    setSaving(true);

    try {
      // Process inputs
      const tags = form.tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const relatedSlugs = form.relatedSlugsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const finalPost: AdminPost = {
        slug: cleanSlug,
        title: form.title.trim(),
        category: form.category.trim(),
        accent: form.accent,
        excerpt: form.excerpt.trim(),
        readTime: form.readTime.trim(),
        publishDate: form.publishDate.trim(),
        icon: form.icon,
        coverImage: form.coverImage.trim(),
        published: form.published,
        featured: form.featured,
        order: Number(form.order) || 0,
        sections: form.sections,
        tags,
        relatedSlugs,
      };

      await savePost(finalPost, isNew);
      await revalidateBlog(cleanSlug);
      alert("Post saved successfully!");
      router.push("/admin/posts");
    } catch (err) {
      console.error("Failed to save post", err);
      setError(err instanceof Error ? err.message : "Failed to save post. Please check console.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-20 text-slate-400">
        <Loader2 size={24} className="animate-spin text-[#FF6B00]" />
        Loading post data…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 text-white pb-20">
      <Link
        href="/admin/posts"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition hover:text-white"
      >
        <ChevronLeft size={16} />
        Back to Articles
      </Link>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00]">
            Blog Manager
          </p>
          <h1 className="mt-1 text-3xl font-extrabold">
            {isNew ? "Create New Article" : `Edit: ${form.title}`}
          </h1>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core Metadata Fields */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 backdrop-blur-xl space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-white/[0.05] pb-3">
            Article Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slug */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Slug (URL Path)
              </label>
              <input
                type="text"
                placeholder="e.g. ipl-betting-guide"
                value={form.slug}
                disabled={!isNew}
                onChange={(e) => handleChange("slug", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {isNew && (
                <p className="text-[10px] text-slate-500 font-medium">
                  Use only lowercase letters, numbers, and dashes. Read-only after creation.
                </p>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Title
              </label>
              <input
                type="text"
                placeholder="Article title"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Category
              </label>
              <input
                type="text"
                placeholder="e.g. Cricket Betting, Casino"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition"
              />
            </div>

            {/* Accent Color */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Accent Theme Color
              </label>
              <select
                value={form.accent}
                onChange={(e) => handleChange("accent", e.target.value as Accent)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition [&>option]:bg-[#030810]"
              >
                <option value="#FF6B00">Orange (#FF6B00)</option>
                <option value="#138808">Green (#138808)</option>
              </select>
            </div>

            {/* Read Time */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Read Time
              </label>
              <input
                type="text"
                placeholder="e.g. 5 min read"
                value={form.readTime}
                onChange={(e) => handleChange("readTime", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition"
              />
            </div>

            {/* Publish Date */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Publish Date
              </label>
              <input
                type="text"
                placeholder="e.g. June 2026"
                value={form.publishDate}
                onChange={(e) => handleChange("publishDate", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition"
              />
            </div>

            {/* Icon */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Icon
              </label>
              <select
                value={form.icon}
                onChange={(e) => handleChange("icon", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition [&>option]:bg-[#030810]"
              >
                {Object.keys(BLOG_ICONS).map((iconName) => (
                  <option key={iconName} value={iconName}>
                    {iconName}
                  </option>
                ))}
              </select>
            </div>

            {/* Order */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Sort Order
              </label>
              <input
                type="number"
                placeholder="0"
                value={form.order}
                onChange={(e) => handleChange("order", parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Excerpt (Summary for SEO)
            </label>
            <textarea
              placeholder="Provide a concise summary of the article..."
              value={form.excerpt}
              onChange={(e) => handleChange("excerpt", e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition resize-y"
            />
          </div>

          {/* Cover Image Upload */}
          <ImageField
            label="Cover Image"
            value={form.coverImage}
            onChange={(url: string) => handleChange("coverImage", url)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tags */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. IPL 2026, Cricket, Betting"
                value={form.tagsInput}
                onChange={(e) => handleChange("tagsInput", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition"
              />
            </div>

            {/* Related Slugs */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Related Article Slugs (Comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. cricket-betting-guide, live-betting-guide"
                value={form.relatedSlugsInput}
                onChange={(e) => handleChange("relatedSlugsInput", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition"
              />
            </div>
          </div>

          {/* Visibility and Featured flags */}
          <div className="flex flex-wrap gap-6 pt-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => handleChange("published", e.target.checked)}
                className="h-4 w-4 rounded border-white/10 bg-white/5 text-[#FF6B00] outline-none transition"
              />
              <div>
                <span className="block text-sm font-semibold text-white">Publish Immediately</span>
                <span className="block text-xs text-slate-500">Uncheck to keep as draft (hidden from site).</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => handleChange("featured", e.target.checked)}
                className="h-4 w-4 rounded border-white/10 bg-white/5 text-[#FF6B00] outline-none transition"
              />
              <div>
                <span className="block text-sm font-semibold text-white">Featured Post</span>
                <span className="block text-xs text-slate-500">Featured posts appear at the top highlight of the blog.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Dynamic Sections list */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-[#FF6B00]" />
                Content Sections ({form.sections.length})
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Add one or more headings and details to construct the body of this blog post.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddSection}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#FF6B00]/30 bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 px-3 py-1.5 text-xs font-bold text-[#FF6B00] transition cursor-pointer"
            >
              <Plus size={14} />
              Add Section
            </button>
          </div>

          {form.sections.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-slate-500 text-sm">
              No sections added yet. Click &quot;Add Section&quot; to begin writing the content.
            </div>
          ) : (
            <div className="space-y-6">
              {form.sections.map((section, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-2.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Section #{index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleMoveSection(index, "up")}
                        disabled={index === 0}
                        className="inline-flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-white/5 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveSection(index, "down")}
                        disabled={index === form.sections.length - 1}
                        className="inline-flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-white/5 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                      >
                        <ArrowDown size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(index)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 cursor-pointer"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Section Heading */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Heading
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. How to get started"
                        value={section.heading}
                        onChange={(e) => handleSectionChange(index, "heading", e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition"
                      />
                    </div>

                    {/* Section Content */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Content (Paragraph Body)
                      </label>
                      <textarea
                        placeholder="Write paragraph content here..."
                        value={section.content}
                        onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                        rows={6}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition resize-y"
                      />
                    </div>

                    {/* Section Tip */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Special Callout/Tip (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Always check the weather forecast before placing a match winner bet."
                        value={section.tip || ""}
                        onChange={(e) => handleSectionChange(index, "tip", e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition"
                      />
                    </div>

                    {/* Section Image Upload */}
                    <ImageField
                      label="Section Image (Optional)"
                      value={section.image || ""}
                      onChange={(url: string) => handleSectionChange(index, "image", url)}
                    />

                    {/* Section Bullets */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Key Bullet Points (Optional)
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddBullet(index)}
                          className="inline-flex items-center gap-1 rounded border border-white/15 bg-white/5 hover:bg-white/10 px-2 py-1 text-[10px] font-bold text-slate-300 transition cursor-pointer"
                        >
                          <Plus size={10} />
                          Add Bullet
                        </button>
                      </div>

                      {(section.bullets || []).length > 0 && (
                        <div className="space-y-2">
                          {(section.bullets || []).map((bullet, bulletIdx) => (
                            <div key={bulletIdx} className="flex gap-2 items-center">
                              <input
                                type="text"
                                placeholder={`Bullet point #${bulletIdx + 1}`}
                                value={bullet}
                                onChange={(e) =>
                                  handleBulletChange(index, bulletIdx, e.target.value)
                                }
                                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white outline-none focus:border-[#FF6B00]/50 transition"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveBullet(index, bulletIdx)}
                                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-red-450 hover:bg-red-500/10 cursor-pointer"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF8A00] px-4 py-3.5 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer shadow-lg shadow-[#FF6B00]/20"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? "Saving Post Data…" : "Save Blog Post"}
          </button>
          <Link
            href="/admin/posts"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-sm font-bold text-slate-300 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
