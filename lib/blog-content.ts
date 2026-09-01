import type { BlogSection } from "./blog-posts";

export type BlogHeading = { id: string; text: string; level: 2 | 3 };

const RICH_TAG_RE = /<(?:p|h[1-4]|strong|b|em|i|u|s|strike|a|blockquote|hr|pre|code|ul|ol|li|table|thead|tbody|tr|th|td|figure|figcaption|img)\b/i;

export function isRichBlogContent(value: string): boolean {
  return RICH_TAG_RE.test(value || "");
}

export function stripBlogMarkup(value: string): string {
  return (value || "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function slugifyAnchor(value: string): string {
  const slug = stripBlogMarkup(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return slug || "section";
}

function uniqueId(preferred: string, used: Set<string>): string {
  const base = slugifyAnchor(preferred);
  let candidate = base;
  let suffix = 2;
  while (used.has(candidate)) candidate = `${base}-${suffix++}`;
  used.add(candidate);
  return candidate;
}

/**
 * Adds stable IDs to section headings and rich-text H2/H3 elements. Existing
 * valid IDs are retained, so editing surrounding copy cannot break old links.
 */
export function normalizeSectionsWithHeadings(input: BlogSection[]): {
  sections: BlogSection[];
  headings: BlogHeading[];
} {
  const used = new Set<string>();
  const headings: BlogHeading[] = [];

  const sections = input.map((section) => {
    const level: 2 | 3 | 4 = section.headingLevel === 3 || section.headingLevel === 4
      ? section.headingLevel
      : 2;
    const sectionId = uniqueId(section.id || section.heading || "section", used);
    if (section.heading && (level === 2 || level === 3)) {
      headings.push({ id: sectionId, text: stripBlogMarkup(section.heading), level });
    }

    const content = (section.content || "").replace(
      /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
      (full, rawLevel: string, rawAttrs: string, inner: string) => {
        const text = stripBlogMarkup(inner);
        if (!text) return full;
        const idMatch = rawAttrs.match(/\sid=["']([a-zA-Z0-9_-]+)["']/i);
        const id = uniqueId(idMatch?.[1] || text, used);
        const attrs = rawAttrs.replace(/\s+id=["'][^"']*["']/gi, "");
        const headingLevel = Number(rawLevel) as 2 | 3;
        headings.push({ id, text, level: headingLevel });
        return `<h${rawLevel}${attrs} id="${id}">${inner}</h${rawLevel}>`;
      }
    );

    return { ...section, id: sectionId, headingLevel: level, content };
  });

  return { sections, headings };
}

export function deriveBlogMetrics(title: string, sections: BlogSection[]) {
  const text = [
    title,
    ...sections.flatMap((section) => [
      section.heading,
      stripBlogMarkup(section.content),
      ...(section.bullets || []).map(stripBlogMarkup),
      stripBlogMarkup(section.tip || ""),
      section.imageCaption || "",
    ]),
  ].join(" ");
  const wordCount = (text.match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu) || []).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
  return { wordCount, readingTimeMinutes, readTime: `${readingTimeMinutes} min read` };
}

export function excerptFromSections(sections: BlogSection[], maxLength = 160): string {
  const source = sections
    .map((section) => stripBlogMarkup(section.content))
    .find(Boolean) || "";
  if (source.length <= maxLength) return source;
  return `${source.slice(0, maxLength - 1).trimEnd()}…`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Converts legacy textarea content to editor HTML without changing storage. */
export function legacyTextToHtml(value: string): string {
  if (!value) return "<p><br></p>";
  if (isRichBlogContent(value)) return value;
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => {
      const safe = escapeHtml(paragraph.trim())
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+|#[^)]+)\)/g, '<a href="$2">$1</a>')
        .replace(/\n/g, "<br>");
      return safe ? `<p>${safe}</p>` : "";
    })
    .filter(Boolean)
    .join("");
}
