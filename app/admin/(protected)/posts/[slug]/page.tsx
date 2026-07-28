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
  Wand2,
  FileText as FileTextIcon,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Link2 as LinkIcon,
  ExternalLink,
} from "lucide-react";
import { getAdminPost, savePost, type AdminPost, type Accent } from "@/lib/blog-admin";
import { BLOG_ICONS } from "@/lib/blog-icons";
import ImageField from "@/app/admin/component/cms/ImageField";
import { parseRawArticleText, SAMPLE_PASTE_TEXT, type ParsedArticleResult } from "@/lib/blog-parser";
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

  // Auto-detect parser state
  const [showParser, setShowParser] = useState(isNew);
  const [rawText, setRawText] = useState("");
  const [parsedResult, setParsedResult] = useState<ParsedArticleResult | null>(null);
  const [parserNotice, setParserNotice] = useState<string | null>(null);

  // Link Modal state
  const [linkModal, setLinkModal] = useState<{
    isOpen: boolean;
    targetField: "excerpt" | "content" | "tip" | "bullet";
    sectionIndex?: number;
    bulletIndex?: number;
    text: string;
    url: string;
  }>({
    isOpen: false,
    targetField: "content",
    text: "",
    url: "",
  });

  function openLinkModal(
    targetField: "excerpt" | "content" | "tip" | "bullet",
    sectionIndex?: number,
    bulletIndex?: number
  ) {
    setLinkModal({
      isOpen: true,
      targetField,
      sectionIndex,
      bulletIndex,
      text: "",
      url: "",
    });
  }

  function handleInsertLink() {
    if (!linkModal.url.trim()) return;
    const label = linkModal.text.trim() || linkModal.url.trim();
    const linkMarkdown = `[${label}](${linkModal.url.trim()})`;
    const { targetField, sectionIndex, bulletIndex } = linkModal;

    if (targetField === "excerpt") {
      setForm((prev) => ({
        ...prev,
        excerpt: prev.excerpt ? `${prev.excerpt} ${linkMarkdown}` : linkMarkdown,
      }));
    } else if (targetField === "content" && sectionIndex !== undefined) {
      setForm((prev) => {
        const updated = [...prev.sections];
        const currentContent = updated[sectionIndex].content || "";
        updated[sectionIndex] = {
          ...updated[sectionIndex],
          content: currentContent ? `${currentContent} ${linkMarkdown}` : linkMarkdown,
        };
        return { ...prev, sections: updated };
      });
    } else if (targetField === "tip" && sectionIndex !== undefined) {
      setForm((prev) => {
        const updated = [...prev.sections];
        const currentTip = updated[sectionIndex].tip || "";
        updated[sectionIndex] = {
          ...updated[sectionIndex],
          tip: currentTip ? `${currentTip} ${linkMarkdown}` : linkMarkdown,
        };
        return { ...prev, sections: updated };
      });
    } else if (
      targetField === "bullet" &&
      sectionIndex !== undefined &&
      bulletIndex !== undefined
    ) {
      setForm((prev) => {
        const updated = [...prev.sections];
        const bullets = [...(updated[sectionIndex].bullets || [])];
        const currentBullet = bullets[bulletIndex] || "";
        bullets[bulletIndex] = currentBullet ? `${currentBullet} ${linkMarkdown}` : linkMarkdown;
        updated[sectionIndex] = { ...updated[sectionIndex], bullets };
        return { ...prev, sections: updated };
      });
    }

    setLinkModal((prev) => ({ ...prev, isOpen: false }));
  }

  function handleAutoDetect() {
    if (!rawText.trim()) return;
    const result = parseRawArticleText(rawText);
    setParsedResult(result);
  }

  function handleLoadSample() {
    setRawText(SAMPLE_PASTE_TEXT);
    const result = parseRawArticleText(SAMPLE_PASTE_TEXT);
    setParsedResult(result);
  }

  function handleApplyParsedResult() {
    if (!parsedResult) return;

    setForm((prev) => ({
      ...prev,
      title: parsedResult.title || prev.title,
      slug: isNew && parsedResult.slug ? parsedResult.slug : prev.slug,
      category: parsedResult.category || prev.category,
      excerpt: parsedResult.excerpt || prev.excerpt,
      readTime: parsedResult.readTime || prev.readTime,
      tagsInput: parsedResult.tags.length > 0 ? parsedResult.tags.join(", ") : prev.tagsInput,
      sections: parsedResult.sections.length > 0 ? parsedResult.sections : prev.sections,
    }));

    setParserNotice(`Successfully auto-detected and populated Title, Slug, Category, Excerpt, Read Time, Tags, and ${parsedResult.sections.length} Sections!`);
    setTimeout(() => setParserNotice(null), 8000);
  }

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

      {/* Auto-Detect Parser Banner/Tool */}
      <div className="rounded-2xl border border-[#FF6B00]/30 bg-gradient-to-br from-[#FF6B00]/10 via-[#FF6B00]/5 to-transparent p-6 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#FF6B00]/40 bg-[#FF6B00]/20 text-[#FF6B00]">
              <Wand2 size={20} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                Auto-Detect Headings & Content Importer
                <span className="rounded-full bg-[#FF6B00]/20 border border-[#FF6B00]/40 px-2.5 py-0.5 text-[10px] font-bold text-[#FF6B00]">
                  AI Smart Parser
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Paste any raw article text with mixed headings, paragraphs, and FAQs. It automatically detects title, headings, paragraphs, excerpt, tags, and read time.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowParser(!showParser)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-300 transition cursor-pointer"
          >
            {showParser ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showParser ? "Hide Parser" : "Paste Raw Content"}
          </button>
        </div>

        {parserNotice && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs font-bold text-emerald-300 animate-in fade-in">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            {parserNotice}
          </div>
        )}

        {showParser && (
          <div className="space-y-4 pt-2 border-t border-white/[0.08]">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Paste Article Content Below:
                </label>
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#FF6B00]/40 bg-[#FF6B00]/15 hover:bg-[#FF6B00]/25 px-2.5 py-1 text-[11px] font-bold text-[#FF6B00] transition cursor-pointer"
                >
                  <Sparkles size={12} />
                  Load Sample (Live Casino Aviator)
                </button>
              </div>

              <textarea
                placeholder="Paste full article text here (e.g. Title, What Is..., Why Players..., How to Play..., FAQs)..."
                value={rawText}
                onChange={(e) => {
                  setRawText(e.target.value);
                  if (e.target.value.trim()) {
                    setParsedResult(parseRawArticleText(e.target.value));
                  } else {
                    setParsedResult(null);
                  }
                }}
                rows={8}
                className="w-full rounded-xl border border-white/15 bg-[#030810]/80 p-4 text-xs font-mono leading-relaxed text-slate-200 outline-none focus:border-[#FF6B00] transition resize-y"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleAutoDetect}
                disabled={!rawText.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs font-bold text-white transition disabled:opacity-40 cursor-pointer"
              >
                <Wand2 size={14} className="text-[#FF6B00]" />
                Auto-Detect Headings & Content
              </button>

              {parsedResult && parsedResult.sections.length > 0 && (
                <button
                  type="button"
                  onClick={handleApplyParsedResult}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF8A00] px-5 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-[#FF6B00]/20 transition cursor-pointer"
                >
                  <CheckCircle2 size={14} />
                  Apply Auto-Detected Content ({parsedResult.sections.length} Sections)
                </button>
              )}
            </div>

            {/* Parsed Result Preview */}
            {parsedResult && (
              <div className="rounded-xl border border-white/10 bg-[#030810]/60 p-4 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-bold uppercase tracking-wider text-[#FF6B00]">
                    Detection Summary
                  </span>
                  <span className="text-slate-400">
                    {parsedResult.sections.length} Sections Found • {parsedResult.readTime}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="block text-slate-500 font-medium">Title:</span>
                    <span className="font-bold text-white">{parsedResult.title || "None detected"}</span>
                  </div>

                  <div>
                    <span className="block text-slate-500 font-medium">Slug:</span>
                    <span className="font-mono text-emerald-400">{parsedResult.slug || "None"}</span>
                  </div>

                  <div>
                    <span className="block text-slate-500 font-medium">Category:</span>
                    <span className="font-semibold text-slate-300">{parsedResult.category}</span>
                  </div>

                  <div>
                    <span className="block text-slate-500 font-medium">Tags:</span>
                    <span className="text-slate-300">{parsedResult.tags.join(", ") || "None"}</span>
                  </div>
                </div>

                <div>
                  <span className="block text-slate-500 font-medium mb-1">Detected Headings ({parsedResult.sections.length}):</span>
                  <div className="max-h-48 overflow-y-auto space-y-1.5 rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
                    {parsedResult.sections.map((sec, idx) => (
                      <div key={idx} className="flex items-start justify-between gap-2 text-[11px] border-b border-white/[0.03] pb-1 last:border-0">
                        <span className="font-bold text-slate-200">
                          {sec.heading}
                        </span>
                        <span className="shrink-0 text-[10px] text-slate-500 font-mono">
                          {sec.content.split(/\n\n+/).filter(Boolean).length} para(s)
                          {sec.bullets ? `, ${sec.bullets.length} bullets` : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

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
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Excerpt (Summary for SEO)
              </label>
              <button
                type="button"
                onClick={() => openLinkModal("excerpt")}
                className="inline-flex items-center gap-1 rounded border border-[#FF6B00]/40 bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 px-2 py-0.5 text-[10px] font-bold text-[#FF6B00] transition cursor-pointer"
              >
                <LinkIcon size={11} />
                Add Link
              </button>
            </div>
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
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Content (Paragraph Body)
                        </label>
                        <button
                          type="button"
                          onClick={() => openLinkModal("content", index)}
                          className="inline-flex items-center gap-1 rounded border border-[#FF6B00]/40 bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 px-2 py-0.5 text-[10px] font-bold text-[#FF6B00] transition cursor-pointer"
                        >
                          <LinkIcon size={11} />
                          Add Link
                        </button>
                      </div>
                      <textarea
                        placeholder="Write paragraph content here... (Tip: use [Link Text](URL) to format links)"
                        value={section.content}
                        onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                        rows={6}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition resize-y"
                      />
                    </div>

                    {/* Section Tip */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Special Callout/Tip (Optional)
                        </label>
                        <button
                          type="button"
                          onClick={() => openLinkModal("tip", index)}
                          className="inline-flex items-center gap-1 rounded border border-[#FF6B00]/40 bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 px-2 py-0.5 text-[10px] font-bold text-[#FF6B00] transition cursor-pointer"
                        >
                          <LinkIcon size={11} />
                          Add Link
                        </button>
                      </div>
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
                                onClick={() => openLinkModal("bullet", index, bulletIdx)}
                                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] hover:bg-[#FF6B00]/20 cursor-pointer"
                                title="Add Link"
                              >
                                <LinkIcon size={12} />
                              </button>
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

      {/* Hyperlink Insertion Modal */}
      {linkModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#070F22] p-6 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 font-bold text-base">
                <LinkIcon size={18} className="text-[#FF6B00]" />
                Insert Hyperlink
              </div>
              <button
                type="button"
                onClick={() => setLinkModal((prev) => ({ ...prev, isOpen: false }))}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Link Text / Anchor Text
                </label>
                <input
                  type="text"
                  placeholder="e.g. Play Aviator Online or BetIndia"
                  value={linkModal.text}
                  onChange={(e) => setLinkModal((prev) => ({ ...prev, text: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Target URL (Internal Path or External Link)
                </label>
                <input
                  type="text"
                  placeholder="e.g. /casino or https://betindia.com"
                  value={linkModal.url}
                  onChange={(e) => setLinkModal((prev) => ({ ...prev, url: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50"
                />
              </div>

              <div className="space-y-1.5">
                <span className="block text-[11px] font-semibold text-slate-400">Quick URL Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: "Casino Games", url: "/casino" },
                    { label: "Cricket Betting", url: "/cricket" },
                    { label: "Blog Main", url: "/blog" },
                    { label: "BetIndia Site", url: "https://betindia.com" },
                  ].map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setLinkModal((prev) => ({ ...prev, url: preset.url }))}
                      className="rounded-lg border border-white/10 bg-white/5 hover:bg-[#FF6B00]/20 px-2 py-1 text-[11px] font-semibold text-slate-300 transition"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleInsertLink}
                disabled={!linkModal.url.trim()}
                className="flex-1 rounded-xl bg-[#FF6B00] hover:bg-[#FF8A00] px-4 py-2.5 text-xs font-bold text-white transition disabled:opacity-50 cursor-pointer"
              >
                Insert Link into Content
              </button>
              <button
                type="button"
                onClick={() => setLinkModal((prev) => ({ ...prev, isOpen: false }))}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
