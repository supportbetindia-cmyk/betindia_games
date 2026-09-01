"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Loader2 } from "lucide-react";
import { getAdminPost, type AdminPost } from "@/lib/blog-admin";
import { legacyTextToHtml, normalizeSectionsWithHeadings } from "@/lib/blog-content";
import { sanitizeEditorHtml } from "@/components/admin/blog/RichTextEditor";

export default function AdminPostPreview() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<AdminPost | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminPost(String(slug))
      .then((value) => value ? setPost(value) : setError("Post not found."))
      .catch(() => setError("Could not load this preview."));
  }, [slug]);

  if (error) return <div className="mx-auto max-w-4xl py-20 text-center text-red-300">{error}</div>;
  if (!post) return <div className="flex items-center justify-center gap-2 py-20 text-slate-400"><Loader2 className="animate-spin" size={18} /> Loading preview…</div>;

  const normalized = normalizeSectionsWithHeadings(post.sections);
  return (
    <main className="mx-auto max-w-6xl pb-20 text-white">
      <div className="sticky top-0 z-20 mb-8 flex items-center justify-between border-b border-white/10 bg-[#050B18]/95 py-4 backdrop-blur-xl">
        <Link href={`/admin/posts/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white">
          <ArrowLeft size={15} /> Back to editor
        </Link>
        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
          Private preview · {post.published ? "Published" : "Draft"}
        </span>
      </div>

      <header className="mx-auto max-w-4xl border-b border-white/10 pb-10">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: post.accent }}>{post.category}</p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight">{post.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">{post.excerpt}</p>
        <p className="mt-5 flex items-center gap-2 text-xs text-slate-500"><Clock size={12} /> {post.readTime}</p>
      </header>

      {post.coverImage && (
        <figure className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt={post.coverImageAlt || post.title} className="aspect-video w-full object-cover" />
        </figure>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_270px]">
        <article className="min-w-0 space-y-10">
          {normalized.sections.map((section) => {
            const Heading = (`h${section.headingLevel || 2}`) as "h2" | "h3" | "h4";
            const width = { small: "max-w-sm", medium: "max-w-xl", large: "max-w-3xl", full: "max-w-none" }[section.imageWidth || "full"];
            return (
              <section key={section.id} className="space-y-4">
                <Heading id={section.id} className="scroll-mt-24 text-2xl font-extrabold">{section.heading}</Heading>
                <div
                  className="blog-rich-content"
                  style={{ "--blog-accent": post.accent } as React.CSSProperties}
                  dangerouslySetInnerHTML={{ __html: sanitizeEditorHtml(legacyTextToHtml(section.content)) }}
                />
                {section.image && (
                  <figure className={`mx-auto overflow-hidden rounded-2xl border border-white/10 ${width}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={section.image} alt={section.imageAlt || section.heading} className="w-full" />
                    {section.imageCaption && <figcaption className="p-2 text-center text-xs text-slate-500">{section.imageCaption}</figcaption>}
                  </figure>
                )}
                {!!section.bullets?.length && <ul className="list-disc space-y-2 pl-6 text-sm text-slate-300">{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
                {section.tip && <blockquote className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">{section.tip}</blockquote>}
              </section>
            );
          })}
        </article>
        <aside>
          <nav className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">On this page</p>
            <ol className="space-y-2">
              {normalized.headings.map((heading) => (
                <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
                  <a href={`#${heading.id}`} className="text-xs text-slate-400 hover:text-[#FF6B00]">{heading.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </div>
    </main>
  );
}
