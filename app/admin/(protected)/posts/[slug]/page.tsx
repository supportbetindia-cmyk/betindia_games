"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
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
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Link2 as LinkIcon,
  ExternalLink,
  Settings2,
  Eye,
  Cloud,
} from "lucide-react";
import { getAdminPost, savePost, type AdminPost, type Accent } from "@/lib/blog-admin";
import { BLOG_ICONS } from "@/lib/blog-icons";
import ImageField from "@/app/admin/component/cms/ImageField";
import {
  parseRawArticleText,
  htmlToArticleText,
  countMarkdownLinks,
  SAMPLE_PASTE_TEXT,
  type ParsedArticleResult,
} from "@/lib/blog-parser";
import { revalidateBlog } from "../actions";
import { useToast, ToastHost } from "@/components/admin/Toast";
import RichTextEditor from "@/components/admin/blog/RichTextEditor";
import {
  deriveBlogMetrics,
  excerptFromSections,
  normalizeSectionsWithHeadings,
} from "@/lib/blog-content";

type FormState = Omit<AdminPost, "tags" | "relatedSlugs"> & {
  tagsInput: string;
  relatedSlugsInput: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

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
    coverImageAlt: "",
    sections: [],
    relatedSlugsInput: "",
    published: false,
    featured: false,
    order: 0,
    metaTitle: "",
    metaDescription: "",
    author: "BetIndia Editorial Team",
    wordCount: 0,
    readingTimeMinutes: 1,
    headings: [],
    publishedAt: "",
    updatedAt: "",
    revision: 0,
    trashed: false,
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [createdSlug, setCreatedSlug] = useState("");
  const [saveStatus, setSaveStatus] = useState<"saved" | "unsaved" | "local" | "saving">("saved");
  const [recoveryNotice, setRecoveryNotice] = useState<string | null>(null);
  const [pendingRecovery, setPendingRecovery] = useState<FormState | null>(null);
  const lastServerSnapshot = useRef("");
  const localSaveReady = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const { toast, showToast, dismissToast } = useToast();

  // Per-section collapsed state, index-aligned with form.sections. Collapsed
  // sections render as a compact summary row so long posts don't force scrolling.
  const [collapsedSections, setCollapsedSections] = useState<boolean[]>([]);

  // Expert-only fields (slug, icon, order, ...) hide behind this toggle so the
  // default form stays simple. Everything in there gets a sensible default.
  const [showAdvanced, setShowAdvanced] = useState(false);
  // Once someone edits the slug by hand, stop auto-deriving it from the title.
  const [slugEdited, setSlugEdited] = useState(false);

  const derived = useMemo(() => {
    const normalized = normalizeSectionsWithHeadings(form.sections);
    const metrics = deriveBlogMetrics(form.title, normalized.sections);
    return { ...metrics, headings: normalized.headings };
  }, [form.sections, form.title]);

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

  // Total markdown links the parser found — surfaced in the Detection Summary
  // so it's obvious the links survived the paste.
  // Headings are counted too — a link can legitimately sit in a heading, and
  // leaving them out made the summary report "None found" on articles that
  // clearly had links.
  const parsedLinkCount = parsedResult
    ? parsedResult.sections.reduce(
        (n, s) =>
          n +
          countMarkdownLinks(s.heading) +
          countMarkdownLinks(s.content) +
          (s.bullets || []).reduce((m, b) => m + countMarkdownLinks(b), 0),
        0
      )
    : 0;

  const allSectionsCollapsed =
    form.sections.length > 0 && form.sections.every((_, i) => collapsedSections[i]);

  // If the clipboard carries rich HTML (Google Docs, Word, a web page), convert
  // it to structured text so headings become "#" lines and links become
  // [Label](URL) — a plain textarea paste would silently drop every link.
  function richPasteToText(e: React.ClipboardEvent<HTMLTextAreaElement>): string | null {
    const html = e.clipboardData.getData("text/html");
    if (!html) return null;
    return htmlToArticleText(html) || null;
  }

  function insertAtSelection(el: HTMLTextAreaElement, current: string, insert: string) {
    return current.slice(0, el.selectionStart) + insert + current.slice(el.selectionEnd);
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

    if (parsedResult.sections.length > 0) {
      setCollapsedSections(parsedResult.sections.map(() => true));
    }

    setParserNotice(
      `Applied Title, Slug, Category, Excerpt, Read Time, Tags and ${parsedResult.sections.length} Sections` +
        (parsedLinkCount > 0 ? ` — ${parsedLinkCount} link${parsedLinkCount > 1 ? "s" : ""} preserved!` : "!")
    );
    setTimeout(() => setParserNotice(null), 8000);
  }

  useEffect(() => {
    const draftKey = `betindia:blog-draft:${String(slug)}`;
    if (isNew) {
      try {
        const raw = localStorage.getItem(draftKey);
        const draft = raw ? JSON.parse(raw) : null;
        if (draft?.form) {
          queueMicrotask(() => {
            setForm(draft.form as FormState);
            setRecoveryNotice("Recovered your unsaved new article from this browser.");
            setSaveStatus("local");
          });
        }
      } catch {
        localStorage.removeItem(draftKey);
      }
      localSaveReady.current = true;
      return;
    }

    async function loadPost() {
      try {
        const post = await getAdminPost(String(slug));
        if (!post) {
          setError("Post not found.");
          setLoading(false);
          return;
        }

        const serverForm: FormState = {
          ...post,
          tagsInput: post.tags.join(", "),
          relatedSlugsInput: post.relatedSlugs.join(", "),
        };
        setForm(serverForm);
        lastServerSnapshot.current = JSON.stringify(serverForm);
        try {
          const raw = localStorage.getItem(draftKey);
          const draft = raw ? JSON.parse(raw) : null;
          if (draft?.form && draft.baseRevision === post.revision && JSON.stringify(draft.form) !== lastServerSnapshot.current) {
            setPendingRecovery(draft.form as FormState);
            setRecoveryNotice("A newer local recovery copy is available from this browser.");
          }
        } catch {
          localStorage.removeItem(draftKey);
        }
        localSaveReady.current = true;
        // Start compact: existing sections open on demand.
        setCollapsedSections(post.sections.map(() => true));
      } catch (err) {
        console.error("Failed to load post", err);
        setError("Error loading post data.");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug, isNew]);

  useEffect(() => {
    if (loading || !localSaveReady.current) return;
    const snapshot = JSON.stringify(form);
    if (snapshot === lastServerSnapshot.current) {
      setSaveStatus("saved");
      return;
    }
    setSaveStatus("unsaved");
    const timer = window.setTimeout(() => {
      localStorage.setItem(
        `betindia:blog-draft:${String(slug)}`,
        JSON.stringify({ form, savedAt: new Date().toISOString(), baseRevision: form.revision })
      );
      setSaveStatus("local");
    }, 700);
    return () => window.clearTimeout(timer);
  }, [form, loading, slug]);

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // Section helpers
  function handleAddSection() {
    setForm((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          heading: "",
          headingLevel: 2,
          content: "",
          bullets: [],
          tip: "",
          image: "",
          imageAlt: "",
          imageCaption: "",
          imageWidth: "full",
        },
      ],
    }));
    setCollapsedSections((prev) => [...prev, false]);
  }

  function handleRemoveSection(index: number) {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
    setCollapsedSections((prev) => prev.filter((_, i) => i !== index));
  }

  function toggleSectionCollapsed(index: number) {
    setCollapsedSections((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }

  function handleSectionChange<K extends keyof AdminPost["sections"][number]>(
    index: number,
    key: K,
    value: AdminPost["sections"][number][K]
  ) {
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
    setCollapsedSections((prev) => {
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
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

  async function handleSubmit(e: React.SyntheticEvent, publishIntent = form.published) {
    e.preventDefault();
    setError(null);

    // Form validations — title first, since the slug auto-derives from it.
    if (!form.title.trim()) {
      setError("Please add a Title before saving.");
      return;
    }
    const cleanSlug = (form.slug.trim() || slugify(form.title)).toLowerCase();
    if (!cleanSlug) {
      setError("Could not build a web address from this title — set one under Advanced Settings.");
      return;
    }
    if (!/^[a-z0-9-_]+$/.test(cleanSlug)) {
      setError("The web address (slug) can only contain lowercase letters, numbers, and dashes — fix it under Advanced Settings.");
      return;
    }
    if (cleanSlug === "new") {
      setError("The web address 'new' is reserved. Please choose a different one under Advanced Settings.");
      return;
    }

    setSaving(true);
    setSaveStatus("saving");

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

      const normalized = normalizeSectionsWithHeadings(form.sections);
      const metrics = deriveBlogMetrics(form.title, normalized.sections);
      const now = new Date().toISOString();

      // Anything left blank gets a sensible default, while manual SEO and read
      // time overrides remain respected.
      const finalPost: AdminPost = {
        slug: cleanSlug,
        title: form.title.trim(),
        category: form.category.trim() || "General",
        accent: form.accent,
        excerpt:
          form.excerpt.trim() || excerptFromSections(normalized.sections),
        readTime: form.readTime.trim() || metrics.readTime,
        publishDate:
          form.publishDate.trim() ||
          new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        icon: form.icon,
        coverImage: form.coverImage.trim(),
        coverImageAlt: form.coverImageAlt.trim() || form.title.trim(),
        published: publishIntent,
        featured: form.featured,
        order: Number(form.order) || 0,
        sections: normalized.sections,
        tags,
        relatedSlugs,
        metaTitle: form.metaTitle.trim(),
        metaDescription: form.metaDescription.trim(),
        author: form.author.trim() || "BetIndia Editorial Team",
        wordCount: metrics.wordCount,
        readingTimeMinutes: metrics.readingTimeMinutes,
        headings: normalized.headings,
        publishedAt: form.publishedAt || (publishIntent ? now : ""),
        updatedAt: now,
        revision: form.revision,
        trashed: false,
      };

      const revision = await savePost(finalPost, isNew && !createdSlug);
      await revalidateBlog(cleanSlug);
      const savedForm: FormState = {
        ...finalPost,
        revision,
        tagsInput: tags.join(", "),
        relatedSlugsInput: relatedSlugs.join(", "),
      };
      lastServerSnapshot.current = JSON.stringify(savedForm);
      setForm(savedForm);
      localStorage.removeItem(`betindia:blog-draft:${String(slug)}`);
      setSaveStatus("saved");
      showToast(
        "success",
        publishIntent ? "Post saved and published." : "Post saved as a draft."
      );
      if (isNew && !createdSlug) {
        setCreatedSlug(cleanSlug);
        router.replace(`/admin/posts/${cleanSlug}`);
      }
    } catch (err) {
      console.error("Failed to save post", err);
      const message =
        err instanceof Error ? err.message : "Could not save the post. Please try again.";
      setError(message);
      showToast("error", message);
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

  const activeSlug = createdSlug || (!isNew ? String(slug) : form.slug);

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
            {isNew && !createdSlug ? "Create New Article" : `Edit: ${form.title}`}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {activeSlug && (
            <Link
              href={`/admin/post-preview/${activeSlug}`}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <Eye size={15} />
              Preview
            </Link>
          )}
          <span className={`rounded-full border px-3 py-1 text-xs font-bold ${form.published ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-white/10 bg-white/5 text-slate-400"}`}>
            {form.published ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">
          {error}
        </div>
      )}

      {recoveryNotice && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-200">
          <Cloud size={16} className="shrink-0" />
          <span className="min-w-0 flex-1 font-semibold">{recoveryNotice}</span>
          {pendingRecovery && (
            <button
              type="button"
              onClick={() => {
                setForm(pendingRecovery);
                setPendingRecovery(null);
                setRecoveryNotice("Recovered local changes. Review and save when ready.");
                setSaveStatus("local");
              }}
              className="rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-bold text-white"
            >
              Restore changes
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (pendingRecovery) localStorage.removeItem(`betindia:blog-draft:${String(slug)}`);
              setPendingRecovery(null);
              setRecoveryNotice(null);
            }}
            className="rounded-lg border border-sky-400/30 px-3 py-1.5 text-xs font-bold"
          >
            Dismiss
          </button>
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
              <h2 className="text-base font-extrabold text-white">
                Paste Your Article — Everything Fills In Automatically
              </h2>
              <p className="text-xs text-slate-400">
                Copy your article from Google Docs, Word, or anywhere else and paste it below. The title, headings, paragraphs, and links are picked up for you — then press the orange button.
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
                onPaste={(e) => {
                  const converted = richPasteToText(e);
                  if (!converted) return;
                  e.preventDefault();
                  const next = insertAtSelection(e.currentTarget, rawText, converted);
                  setRawText(next);
                  setParsedResult(next.trim() ? parseRawArticleText(next) : null);
                }}
                rows={8}
                className="w-full rounded-xl border border-white/15 bg-[#030810]/80 p-4 text-xs font-mono leading-relaxed text-slate-200 outline-none focus:border-[#FF6B00] transition resize-y"
              />
              <p className="text-[11px] text-slate-500">
                Tip: paste straight from Google Docs, Word, or a webpage — headings and hyperlinks are preserved automatically as [Link Text](URL).
              </p>
            </div>

            {parsedResult && parsedResult.sections.length > 0 && (
              <button
                type="button"
                onClick={handleApplyParsedResult}
                className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF8A00] px-5 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-[#FF6B00]/20 transition cursor-pointer"
              >
                <CheckCircle2 size={14} />
                Use This Article ({parsedResult.sections.length} sections
                {parsedLinkCount > 0 ? `, ${parsedLinkCount} links` : ""})
              </button>
            )}

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

                  <div>
                    <span className="block text-slate-500 font-medium">Links Detected:</span>
                    <span className={parsedLinkCount > 0 ? "font-bold text-emerald-400" : "text-slate-300"}>
                      {parsedLinkCount > 0
                        ? `${parsedLinkCount} link${parsedLinkCount > 1 ? "s" : ""} preserved as [Text](URL)`
                        : "None found"}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="block text-slate-500 font-medium mb-1">Detected Headings ({parsedResult.sections.length}):</span>
                  <div className="max-h-48 overflow-y-auto space-y-1.5 rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
                    {parsedResult.sections.map((sec, idx) => {
                      const sectionLinks =
                        countMarkdownLinks(sec.content) +
                        (sec.bullets || []).reduce((n, b) => n + countMarkdownLinks(b), 0);
                      return (
                        <div key={idx} className="flex items-start justify-between gap-2 text-[11px] border-b border-white/[0.03] pb-1 last:border-0">
                          <span className="font-bold text-slate-200">
                            {sec.heading}
                          </span>
                          <span className="shrink-0 text-[10px] text-slate-500 font-mono">
                            {sec.content.split(/\n\n+/).filter(Boolean).length} para(s)
                            {sec.bullets ? `, ${sec.bullets.length} bullets` : ""}
                            {sectionLinks > 0 && (
                              <span className="text-emerald-400">{`, ${sectionLinks} link${sectionLinks > 1 ? "s" : ""}`}</span>
                            )}
                          </span>
                        </div>
                      );
                    })}
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
            Article Basics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title (slug auto-derives from it for new posts) */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Title
              </label>
              <input
                type="text"
                placeholder="Article title"
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    title,
                    slug: isNew && !slugEdited ? slugify(title) : prev.slug,
                  }));
                }}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition"
              />
              {isNew && form.slug && (
                <p className="text-[10px] text-slate-500 font-medium">
                  Will publish at <span className="font-mono text-slate-400">/blog/{form.slug}</span> — change it under Advanced Settings.
                </p>
              )}
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
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Short Summary (Optional — auto-written from the first paragraph if left empty)
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
            altText={form.coverImageAlt || form.title}
            onChange={(url: string) => handleChange("coverImage", url)}
          />
          {form.coverImage && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Cover image alt text</label>
              <input
                type="text"
                value={form.coverImageAlt}
                onChange={(e) => handleChange("coverImageAlt", e.target.value)}
                placeholder="Describe the image for screen readers"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50"
              />
            </div>
          )}

          {/* Visibility and Featured flags */}
          <div className="flex flex-wrap gap-6 pt-3">
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

          {/* Advanced settings — optional; everything here has an auto default */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 cursor-pointer"
            >
              <span className="flex items-center gap-2 text-sm font-bold text-slate-300">
                <Settings2 size={15} className="text-slate-500" />
                Advanced Settings
                <span className="text-[10px] font-medium text-slate-500">
                  (optional — filled in automatically if you skip them)
                </span>
              </span>
              {showAdvanced ? (
                <ChevronUp size={14} className="text-slate-500" />
              ) : (
                <ChevronDown size={14} className="text-slate-500" />
              )}
            </button>

            {showAdvanced && (
              <div className="grid grid-cols-1 gap-6 border-t border-white/[0.04] p-4 md:grid-cols-2">
                {/* Slug */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Web Address (Slug)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ipl-betting-guide"
                    value={form.slug}
                    disabled={!isNew}
                    onChange={(e) => {
                      setSlugEdited(true);
                      handleChange("slug", e.target.value);
                    }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <p className="text-[10px] text-slate-500 font-medium">
                    {isNew
                      ? "Auto-created from the title. Lowercase letters, numbers, and dashes only."
                      : "The web address can't change after the post is created."}
                  </p>
                </div>

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

                {/* Read Time */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Read Time (auto-calculated if empty)
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
                    Publish Date (auto-set to this month if empty)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. June 2026"
                    value={form.publishDate}
                    onChange={(e) => handleChange("publishDate", e.target.value)}
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
            )}
          </div>
        </div>

        {/* Per-post SEO overrides. Empty values continue to use the generated defaults. */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 backdrop-blur-xl space-y-5">
          <div className="border-b border-white/[0.05] pb-3">
            <h2 className="text-lg font-bold text-white">SEO &amp; Author</h2>
            <p className="mt-1 text-xs text-slate-500">Leave SEO fields empty to use the article title and excerpt automatically.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Meta title</label>
              <input
                type="text"
                maxLength={70}
                value={form.metaTitle}
                onChange={(e) => handleChange("metaTitle", e.target.value)}
                placeholder={`${form.title || "Article title"} | BetIndia`}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50"
              />
              <p className="text-[10px] text-slate-500">{form.metaTitle.length}/70</p>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => handleChange("author", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Meta description</label>
            <textarea
              maxLength={170}
              rows={3}
              value={form.metaDescription}
              onChange={(e) => handleChange("metaDescription", e.target.value)}
              placeholder={form.excerpt || "Generated from the article excerpt"}
              className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B00]/50"
            />
            <p className="text-[10px] text-slate-500">{form.metaDescription.length}/170</p>
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
                Add H2/H3 sections, then format paragraphs with the sticky toolbar. {derived.wordCount} words · {derived.readTime}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {form.sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => setCollapsedSections(form.sections.map(() => !allSectionsCollapsed))}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-300 transition cursor-pointer"
                >
                  {allSectionsCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                  {allSectionsCollapsed ? "Expand All" : "Collapse All"}
                </button>
              )}
              <button
                type="button"
                onClick={handleAddSection}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#FF6B00]/30 bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 px-3 py-1.5 text-xs font-bold text-[#FF6B00] transition cursor-pointer"
              >
                <Plus size={14} />
                Add Section
              </button>
            </div>
          </div>

          {form.sections.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-slate-500 text-sm">
              No sections added yet. Click &quot;Add Section&quot; to begin writing the content.
            </div>
          ) : (
            <div className="space-y-6">
              {form.sections.map((section, index) => {
                const isCollapsed = collapsedSections[index] === true;
                const sectionLinks =
                  countMarkdownLinks(section.content) +
                  (section.content.match(/<a\s[^>]*href=/gi) || []).length +
                  countMarkdownLinks(section.tip || "") +
                  (section.bullets || []).reduce((n, b) => n + countMarkdownLinks(b), 0);
                const paraCount = section.content.includes("<p")
                  ? (section.content.match(/<p(?:\s|>)/gi) || []).length
                  : (section.content || "").split(/\n\n+/).filter(Boolean).length;
                return (
                <div
                  key={index}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-4"
                >
                  <div className={`flex items-center justify-between gap-3 ${isCollapsed ? "" : "border-b border-white/[0.04] pb-2.5"}`}>
                    <button
                      type="button"
                      onClick={() => toggleSectionCollapsed(index)}
                      className="flex min-w-0 flex-1 items-center gap-2.5 text-left cursor-pointer"
                      title={isCollapsed ? "Expand section" : "Collapse section"}
                    >
                      {isCollapsed ? (
                        <ChevronDown size={14} className="shrink-0 text-slate-500" />
                      ) : (
                        <ChevronUp size={14} className="shrink-0 text-slate-500" />
                      )}
                      <span className="shrink-0 text-xs font-bold text-slate-400 uppercase tracking-wide">
                        #{index + 1}
                      </span>
                      <span className="truncate text-sm font-bold text-white">
                        {section.heading || <span className="font-medium italic text-slate-500">Untitled section</span>}
                      </span>
                      <span className="hidden shrink-0 font-mono text-[10px] text-slate-500 sm:block">
                        {paraCount} para{section.bullets?.length ? ` · ${section.bullets.length} bullets` : ""}
                        {sectionLinks > 0 && <span className="text-emerald-400">{` · ${sectionLinks} link${sectionLinks > 1 ? "s" : ""}`}</span>}
                      </span>
                    </button>
                    <div className="flex shrink-0 items-center gap-2">
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

                  {!isCollapsed && (
                  <div className="grid grid-cols-1 gap-4">
                    {/* Section Heading */}
                    <div className="grid gap-3 md:grid-cols-[110px_1fr]">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Level
                        </label>
                        <select
                          value={section.headingLevel || 2}
                          onChange={(e) => handleSectionChange(index, "headingLevel", Number(e.target.value) as 2 | 3 | 4)}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#FF6B00]/50 [&>option]:bg-[#030810]"
                        >
                          <option value={2}>H2</option>
                          <option value={3}>H3</option>
                          <option value={4}>H4</option>
                        </select>
                      </div>
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
                    </div>

                    {/* Section Content */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Rich content
                      </label>
                      <RichTextEditor
                        label={`Content for ${section.heading || `section ${index + 1}`}`}
                        value={section.content}
                        onChange={(html) => handleSectionChange(index, "content", html)}
                      />
                    </div>

                    {/* Section Tip */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Tip / Highlight Box (Optional)
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
                      altText={section.imageAlt || section.heading}
                      onChange={(url: string) => handleSectionChange(index, "image", url)}
                    />
                    {section.image && (
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Image alt text</label>
                          <input
                            type="text"
                            value={section.imageAlt || ""}
                            onChange={(e) => handleSectionChange(index, "imageAlt", e.target.value)}
                            placeholder="Describe this image"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-[#FF6B00]/50"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Display width</label>
                          <select
                            value={section.imageWidth || "full"}
                            onChange={(e) => handleSectionChange(index, "imageWidth", e.target.value as "small" | "medium" | "large" | "full")}
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-[#FF6B00]/50 [&>option]:bg-[#030810]"
                          >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="full">Full width</option>
                          </select>
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Image caption</label>
                          <input
                            type="text"
                            value={section.imageCaption || ""}
                            onChange={(e) => handleSectionChange(index, "imageCaption", e.target.value)}
                            placeholder="Optional caption shown below the image"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-[#FF6B00]/50"
                          />
                        </div>
                      </div>
                    )}

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
                  )}
                </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sticky save bar — always visible, no scrolling to the bottom needed */}
        <div className="sticky bottom-4 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#070F22]/95 px-4 py-3 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <span className="hidden min-w-0 flex-1 truncate text-xs font-medium text-slate-400 sm:block">
            {error ? (
              <span className="font-semibold text-red-300">{error}</span>
            ) : (
              <span className="inline-flex items-center gap-2">
                {saveStatus === "saving" && <Loader2 size={12} className="animate-spin text-[#FF6B00]" />}
                {saveStatus === "saved" ? "All changes saved" : saveStatus === "local" ? "Recovery copy saved locally" : saveStatus === "saving" ? "Saving to Firestore…" : "Unsaved changes"}
                <span className="text-slate-600">·</span>
                {derived.wordCount} words · {derived.readTime} · {derived.headings.length} TOC entries
              </span>
            )}
          </span>
          <Link
            href="/admin/posts"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-5 py-2.5 text-sm font-bold text-slate-300 transition"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={(e) => void handleSubmit(e, false)}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {form.published ? "Unpublish" : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={(e) => void handleSubmit(e, true)}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF8A00] px-6 py-2.5 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer shadow-lg shadow-[#FF6B00]/20"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <ExternalLink size={16} />}
            {form.published ? "Update Published" : "Publish"}
          </button>
        </div>
      </form>

      <ToastHost toast={toast} onDismiss={dismissToast} />

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
