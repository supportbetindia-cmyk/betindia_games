import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, Tag, ArrowLeft, ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";
import { getPostBySlug, getRelatedPosts, getAllSlugs } from "@/lib/blog-data";
import { CTA_LINKS } from "@/lib/cta-links";
import { SITE_CONFIG, canonicalUrl } from "@/lib/seo";
import { articleSchema, faqSchema, breadcrumbSchema, parsePublishDate } from "@/lib/schema";
import { isRichBlogContent, normalizeSectionsWithHeadings, type BlogHeading } from "@/lib/blog-content";
import { sanitizeBlogHtml } from "@/lib/blog-html";


export const revalidate = 300;
export const dynamicParams = true;


export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}



export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  const url = canonicalUrl(`/blog/${slug}`);
  const legacyDate = `${parsePublishDate(post.publishDate)}T00:00:00+05:30`;
  const publishedTime = post.publishedAt || legacyDate;
  const modifiedTime = post.updatedAt || publishedTime;
  const resolvedTitle = post.metaTitle?.trim() || post.title;
  const resolvedDescription = post.metaDescription?.trim() || post.excerpt;
  const shareImage = post.coverImage || SITE_CONFIG.ogImage;
  const ogTitle = post.metaTitle?.trim() || `${post.title} | BetIndia`;

  return {
    title: post.metaTitle?.trim() ? { absolute: resolvedTitle } : resolvedTitle,
    description: resolvedDescription,
    keywords: post.tags,
    authors: [{ name: post.author || SITE_CONFIG.name }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: ogTitle,
      description: resolvedDescription,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      images: [{ url: shareImage, width: 1200, height: 630, alt: post.coverImageAlt || ogTitle }],
      publishedTime,
      modifiedTime,
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: resolvedDescription,
      images: [shareImage],
      creator: SITE_CONFIG.twitterHandle,
      site: SITE_CONFIG.twitterHandle,
    },
  };
}



function FormattedText({ text, accent }: { text: string; accent?: string }) {
  if (!text) return null;

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s<]+)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    if (match[1] && match[2]) {
      const label = match[1];
      const url = match[2];
      const isSafe = /^(?:https?:\/\/|mailto:|tel:|\/|#)/i.test(url);
      if (!isSafe) {
        parts.push(label);
        lastIndex = matchIndex + match[0].length;
        continue;
      }
      const isInternal = url.startsWith("/") || url.startsWith("#");

      if (isInternal) {
        parts.push(
          <Link
            key={matchIndex}
            href={url}
            className="font-bold underline decoration-[#FF6B00]/40 underline-offset-4 transition hover:decoration-[#FF6B00]"
            style={{ color: accent || "#FF6B00" }}
          >
            {label}
          </Link>
        );
      } else {
        parts.push(
          <a
            key={matchIndex}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline decoration-[#FF6B00]/40 underline-offset-4 transition hover:decoration-[#FF6B00]"
            style={{ color: accent || "#FF6B00" }}
          >
            {label}
          </a>
        );
      }
    } else if (match[3]) {
      const url = match[3];
      parts.push(
        <a
          key={matchIndex}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline decoration-[#FF6B00]/40 underline-offset-4 transition hover:decoration-[#FF6B00]"
          style={{ color: accent || "#FF6B00" }}
        >
          {url}
        </a>
      );
    }

    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts}</>;
}

function ArticleHero({
  category,
  accent,
  title,
  excerpt,
  readTime,
  publishDate,
  tags,
}: {
  category: string;
  accent: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishDate: string;
  tags: string[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 pb-12 pt-16 sm:px-6 md:pt-20 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{ background: `${accent}18` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-20 h-[400px] w-[400px] rounded-full bg-[#138808]/12 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors duration-200 hover:text-white"
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          Back to Blog
        </Link>

        {/* Category badge */}
        <div className="mb-4 flex items-center gap-3">
          <span
            className="inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider"
            style={{ borderColor: `${accent}40`, background: `${accent}12`, color: accent }}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.6rem]">
          {title}
        </h1>

        {/* Excerpt */}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
          <FormattedText text={excerpt} accent={accent} />
        </p>

        {/* Meta row */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-[12px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <Clock size={12} className="shrink-0" style={{ color: accent }} />
            {readTime}
          </span>
          <span className="h-3.5 w-px bg-white/10" />
          <span className="flex items-center gap-1.5">
            <Calendar size={12} className="shrink-0 text-[#138808]/80" />
            {publishDate}
          </span>
        </div>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-slate-500"
            >
              <Tag size={9} className="shrink-0" />
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}

// ─── Featured Image Placeholder ──────────────────────────────────────────────

function ArticleFeaturedImage({
  category,
  accent,
  Icon,
  image,
  imageAlt,
}: {
  category: string;
  accent: string;
  Icon: React.ElementType;
  image?: string;
  imageAlt?: string;
}) {
  // A real cover image replaces the generated placeholder when one is set.
  if (image) {
    return (
      <section className="bg-[#050B18] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.07]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={imageAlt || category} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#050B18] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* 16:9 container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.07]">

          {/* ── Base ──────────────────────────────────────────────── */}
          <div className="absolute inset-0 bg-[#030810]" />

          {/* ── Orange glow — top-left ────────────────────────────── */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 75% 65% at 15% 20%, rgba(255,107,0,0.22) 0%, rgba(255,107,0,0.07) 50%, transparent 72%)",
            }}
          />

          {/* ── Green glow — bottom-right ─────────────────────────── */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 60% at 85% 82%, rgba(19,136,8,0.19) 0%, rgba(19,136,8,0.06) 48%, transparent 72%)",
            }}
          />

          {/* ── Soft centre ambient ───────────────────────────────── */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(255,107,0,0.05) 0%, transparent 100%)",
            }}
          />

          {/* ── Grid overlay ─────────────────────────────────────── */}
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full opacity-[0.032]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="fi-grid"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 48 0 L 0 0 0 48"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fi-grid)" />
          </svg>

          {/* ── Diagonal gradient wash ────────────────────────────── */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(138deg, rgba(255,107,0,0.055) 0%, transparent 38%, rgba(19,136,8,0.045) 100%)",
            }}
          />

          {/* ── Corner accent — top-left ──────────────────────────── */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-24 w-24"
            style={{
              background: `linear-gradient(135deg, ${accent}1a 0%, transparent 65%)`,
            }}
          />

          {/* ── Corner accent — bottom-right ─────────────────────── */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 h-24 w-24"
            style={{
              background:
                "linear-gradient(315deg, rgba(19,136,8,0.12) 0%, transparent 65%)",
            }}
          />

          {/* ── Centre content ────────────────────────────────────── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">

            {/* Icon with glow ring */}
            <div className="relative">
              <div
                className="absolute -inset-2 rounded-2xl blur-xl"
                style={{ background: `${accent}20` }}
              />
              <div
                className="relative grid h-[60px] w-[60px] place-items-center rounded-2xl border"
                style={{
                  background: `${accent}12`,
                  borderColor: `${accent}2e`,
                  color: accent,
                }}
              >
                <Icon size={26} strokeWidth={1.5} />
              </div>
            </div>

            {/* Category pill */}
            <span
              className="inline-flex items-center rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em]"
              style={{
                borderColor: `${accent}38`,
                background: `${accent}0d`,
                color: accent,
              }}
            >
              {category}
            </span>

            {/* BetIndia wordmark */}
            <div className="flex flex-col items-center gap-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-slate-700">
                Bet
                <span style={{ color: `${accent}88` }}>India</span>
              </p>
            </div>
          </div>

          {/* ── Inset border overlay ──────────────────────────────── */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Section Renderer ─────────────────────────────────────────────────────────

function ArticleSection({
  id,
  heading,
  headingLevel,
  content,
  bullets,
  tip,
  image,
  imageAlt,
  imageCaption,
  imageWidth,
  accent,
}: {
  id?: string;
  heading: string;
  headingLevel?: 2 | 3 | 4;
  content: string;
  bullets?: string[];
  tip?: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageWidth?: "small" | "medium" | "large" | "full";
  accent: string;
}) {
  const paragraphs = (content || "").split(/\n\n+/).filter(Boolean);
  const HeadingTag = (`h${headingLevel || 2}`) as "h2" | "h3" | "h4";
  const richContent = isRichBlogContent(content);
  const imageWidthClass = {
    small: "max-w-sm",
    medium: "max-w-xl",
    large: "max-w-3xl",
    full: "max-w-none",
  }[imageWidth || "full"];

  return (
    <div className="group space-y-4">
      <HeadingTag id={id} className="scroll-mt-28 text-lg font-extrabold leading-snug tracking-tight text-white md:text-xl">
        {heading}
      </HeadingTag>

      {richContent ? (
        <div
          className="blog-rich-content"
          style={{ "--blog-accent": accent } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(content) }}
        />
      ) : (
        <div className="space-y-3">
          {paragraphs.map((para, pIdx) => (
            <p key={pIdx} className="text-sm leading-[1.9] text-slate-400 md:text-[0.9375rem] md:leading-[1.9]">
              <FormattedText text={para} accent={accent} />
            </p>
          ))}
        </div>
      )}

      {image && (
        <figure className={`mx-auto overflow-hidden rounded-2xl border border-white/[0.07] ${imageWidthClass}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt || heading} className="w-full object-cover" loading="lazy" />
          {imageCaption && (
            <figcaption className="border-t border-white/[0.07] bg-white/[0.03] px-4 py-2 text-center text-xs text-slate-500">
              {imageCaption}
            </figcaption>
          )}
        </figure>
      )}

      {bullets && bullets.length > 0 && (
        <ul className="space-y-2.5 pl-1">
          {bullets.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
              <CheckCircle2
                size={15}
                className="mt-0.5 shrink-0"
                style={{ color: accent }}
                strokeWidth={2}
              />
              <span className="leading-[1.75]">
                <FormattedText text={item} accent={accent} />
              </span>
            </li>
          ))}
        </ul>
      )}

      {tip && (
        <div
          className="flex gap-3 rounded-2xl border p-4"
          style={{
            borderColor: `${accent}30`,
            background: `${accent}0a`,
          }}
        >
          <Lightbulb
            size={16}
            className="mt-0.5 shrink-0"
            style={{ color: accent }}
            strokeWidth={2}
          />
          <p className="text-sm leading-relaxed text-slate-300">
            <span className="font-bold" style={{ color: accent }}>
              Pro tip:{" "}
            </span>
            <FormattedText text={tip} accent={accent} />
          </p>
        </div>
      )}
    </div>
  );
}

function ArticleTableOfContents({ headings }: { headings: BlogHeading[] }) {
  if (!headings.length) return null;
  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">On this page</p>
      <ol className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
            <a href={`#${heading.id}`} className="block text-xs leading-relaxed text-slate-400 transition hover:text-[#FF6B00]">
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── Related Card ─────────────────────────────────────────────────────────────

function RelatedCard({
  slug,
  category,
  accent,
  title,
  excerpt,
  readTime,
}: {
  slug: string;
  category: string;
  accent: string;
  title: string;
  excerpt: string;
  readTime: string;
}) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07]"
      style={
        {
          "--hover-border": `${accent}40`,
        } as React.CSSProperties
      }
    >
      <span
        className="inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
        style={{ borderColor: `${accent}40`, background: `${accent}12`, color: accent }}
      >
        {category}
      </span>
      <p className="text-sm font-bold leading-snug text-white transition-colors duration-200 group-hover:text-white/90">
        {title}
      </p>
      <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">{excerpt}</p>
      <div className="flex items-center justify-between border-t border-white/[0.06] pt-2.5">
        <span className="flex items-center gap-1 text-[11px] text-slate-600">
          <Clock size={10} className="shrink-0" />
          {readTime}
        </span>
        <span className="flex items-center gap-1 text-xs font-bold transition-all duration-200 group-hover:gap-2" style={{ color: accent }}>
          Read
          <ArrowRight size={12} strokeWidth={2.5} />
        </span>
      </div>
    </Link>
  );
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────

function ArticleCTA() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/10 blur-3xl"
      />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#FF6B00]">
          Ready to start?
        </span>
        <h2 className="mt-6 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
          Put Your Knowledge{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            To Work
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
          Join BetIndia and apply everything you have just learned. Live cricket betting, casino games, and exclusive welcome bonuses are waiting.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={CTA_LINKS.signup}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/30 sm:w-auto"
          >
            Create Free Account
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
          <Link
            href={CTA_LINKS.promotions}
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-[#FF6B00]/40 hover:bg-white/10 sm:w-auto"
          >
            View Promotions
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
          {["No deposit fee", "Instant withdrawals", "Secure payments", "24/7 support"].map(
            (item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-[#138808]" />
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const normalized = normalizeSectionsWithHeadings(post.sections);
  const renderedPost = { ...post, sections: normalized.sections, headings: normalized.headings };

  const related = await getRelatedPosts(renderedPost.relatedSlugs);
  const Icon = renderedPost.icon;

  const postUrl = canonicalUrl(`/blog/${renderedPost.slug}`);
  const articleLd = articleSchema(renderedPost, postUrl);
  const faqLd = faqSchema(renderedPost);
  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", url: canonicalUrl("/") },
    { name: "Blog", url: canonicalUrl("/blog") },
    { name: renderedPost.title, url: postUrl },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <main className="min-h-screen bg-[#050B18] no-center-mobile">
        <ArticleHero
          category={renderedPost.category}
          accent={renderedPost.accent}
          title={renderedPost.title}
          excerpt={renderedPost.excerpt}
          readTime={renderedPost.readTime}
          publishDate={renderedPost.publishDate}
          tags={renderedPost.tags}
        />

        <ArticleFeaturedImage
          category={renderedPost.category}
          accent={renderedPost.accent}
          Icon={Icon}
          image={renderedPost.coverImage}
          imageAlt={renderedPost.coverImageAlt}
        />

        {/* ── Body + Sidebar ─────────────────────────────────────────────── */}
        <div className="relative bg-[#050B18] px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1156px]">
            <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">

              {/* ── Article content ──────────────────────────────────────── */}
              <article className="min-w-0 flex-1">
                {/* Icon banner */}
                <div
                  className="mb-10 flex items-center gap-5 rounded-2xl border p-5"
                  style={{
                    borderColor: `${renderedPost.accent}25`,
                    background: `${renderedPost.accent}08`,
                  }}
                >
                  <div
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border"
                    style={{
                      background: `${renderedPost.accent}18`,
                      borderColor: `${renderedPost.accent}35`,
                      color: renderedPost.accent,
                    }}
                  >
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{renderedPost.category} Guide</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {renderedPost.readTime} · Updated {renderedPost.publishDate}
                    </p>
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-10">
                  {renderedPost.sections.map((section, i) => (
                    <div key={i}>
                      <ArticleSection
                        id={section.id}
                        heading={section.heading}
                        headingLevel={section.headingLevel}
                        content={section.content}
                        bullets={section.bullets}
                        tip={section.tip}
                        image={section.image}
                        imageAlt={section.imageAlt}
                        imageCaption={section.imageCaption}
                        imageWidth={section.imageWidth}
                        accent={renderedPost.accent}
                      />
                      {i < renderedPost.sections.length - 1 && (
                        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Internal links */}
                <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                    Continue Reading
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/blog/${r.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-[#FF6B00]/40 hover:text-[#FF6B00]"
                      >
                        {r.title}
                        <ArrowRight size={13} strokeWidth={2.5} />
                      </Link>
                    ))}
                  </div>
                </div>
              </article>

              {/* ── Sidebar ──────────────────────────────────────────────── */}
              <aside className="w-full shrink-0 lg:w-[320px]">
                <div className="space-y-6 lg:sticky lg:top-[120px] lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
                  <ArticleTableOfContents headings={normalized.headings} />
                  {/* Related articles */}
                  {related.length > 0 && (
                    <div>
                      <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                        Related Articles
                      </p>
                      <div className="space-y-3">
                        {related.map((r) => (
                          <RelatedCard
                            key={r.slug}
                            slug={r.slug}
                            category={r.category}
                            accent={r.accent}
                            title={r.title}
                            excerpt={r.excerpt}
                            readTime={r.readTime}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Signup CTA card */}
                  <div className="relative overflow-hidden rounded-2xl border border-[#FF6B00]/25 bg-[#FF6B00]/08 p-6">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#FF6B00]/15 blur-2xl"
                    />
                    <div className="relative z-10">
                      <p className="text-base font-extrabold leading-snug text-white">
                        Ready to place your first bet?
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-slate-400">
                        Join BetIndia and claim your welcome bonus. Live cricket markets are open right now.
                      </p>
                      <Link
                        href={CTA_LINKS.signup}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#FF8A00] hover:shadow-lg hover:shadow-[#FF6B00]/25"
                      >
                        Sign Up Free
                        <ArrowRight size={14} strokeWidth={2.5} />
                      </Link>
                      <Link
                        href={CTA_LINKS.promotions}
                        className="mt-2.5 flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-white/20 hover:text-white"
                      >
                        See Promotions
                      </Link>
                    </div>
                  </div>

                  {/* Responsible gaming note */}
                  <p className="text-center text-[11px] leading-relaxed text-slate-700">
                    Bet responsibly.{" "}
                    <Link href="/responsible-gaming" className="text-slate-500 underline underline-offset-2 hover:text-slate-400">
                      Learn about our tools
                    </Link>{" "}
                    to keep gaming safe and enjoyable.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>

        <ArticleCTA />
      </main>
    </>
  );
}
