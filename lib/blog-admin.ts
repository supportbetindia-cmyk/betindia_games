import {
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  runTransaction,
  writeBatch,
  query,
  where,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";
import type { BlogSection } from "./blog-posts";

// Client-side blog CMS layer. Writes go through the Firebase Web SDK as the
// signed-in admin user, so Firestore rules must allow authenticated writes on
// /posts (see firestore.rules). The public blog continues to read the same
// collection via lib/blog-data.ts.

export type Accent = "#FF6B00" | "#138808";

// The fully-editable shape of a post (icon is a registry name string, not a
// component — see lib/blog-icons.ts).
export type AdminPost = {
  slug: string;
  category: string;
  accent: Accent;
  title: string;
  excerpt: string;
  readTime: string;
  publishDate: string;
  tags: string[];
  icon: string;
  coverImage: string;
  coverImageAlt: string;
  sections: BlogSection[];
  relatedSlugs: string[];
  published: boolean;
  featured: boolean;
  order: number;
  metaTitle: string;
  metaDescription: string;
  author: string;
  wordCount: number;
  readingTimeMinutes: number;
  headings: { id: string; text: string; level: 2 | 3 }[];
  publishedAt: string;
  updatedAt: string;
  revision: number;
  trashed: boolean;
};

const postsCollection = () => collection(db, "posts");

function timestampToIso(value: unknown): string {
  if (value && typeof value === "object" && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }
  return typeof value === "string" ? value : "";
}

function fromDoc(id: string, data: DocumentData): AdminPost {
  return {
    slug: typeof data.slug === "string" ? data.slug : id,
    category: data.category ?? "",
    accent: data.accent === "#138808" ? "#138808" : "#FF6B00",
    title: data.title ?? "",
    excerpt: data.excerpt ?? "",
    readTime: data.readTime ?? "",
    publishDate: data.publishDate ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    icon: typeof data.icon === "string" ? data.icon : "FileText",
    coverImage: typeof data.coverImage === "string" ? data.coverImage : "",
    coverImageAlt: typeof data.coverImageAlt === "string" ? data.coverImageAlt : "",
    sections: Array.isArray(data.sections) ? data.sections : [],
    relatedSlugs: Array.isArray(data.relatedSlugs) ? data.relatedSlugs : [],
    published: data.published !== false,
    featured: data.featured === true,
    order: typeof data.order === "number" ? data.order : 0,
    metaTitle: typeof data.metaTitle === "string" ? data.metaTitle : "",
    metaDescription: typeof data.metaDescription === "string" ? data.metaDescription : "",
    author: typeof data.author === "string" ? data.author : "BetIndia Editorial Team",
    wordCount: typeof data.wordCount === "number" ? data.wordCount : 0,
    readingTimeMinutes: typeof data.readingTimeMinutes === "number" ? data.readingTimeMinutes : 0,
    headings: Array.isArray(data.headings) ? data.headings : [],
    publishedAt: timestampToIso(data.publishedAt),
    updatedAt: timestampToIso(data.updatedAt),
    revision: typeof data.revision === "number" ? data.revision : 0,
    trashed: data.trashed === true,
  };
}

// Strip empty optional fields — Firestore rejects `undefined`, and we don't want
// to persist empty `bullets: []` / `tip: ""` noise.
function cleanSection(s: BlogSection): BlogSection {
  const out: BlogSection = { heading: s.heading.trim(), content: s.content.trim() };
  const bullets = (s.bullets ?? []).map((b) => b.trim()).filter(Boolean);
  if (bullets.length) out.bullets = bullets;
  const tip = (s.tip ?? "").trim();
  if (tip) out.tip = tip;
  const image = (s.image ?? "").trim();
  if (image) out.image = image;
  if (s.id) out.id = s.id;
  if (s.headingLevel) out.headingLevel = s.headingLevel;
  const imageAlt = (s.imageAlt ?? "").trim();
  if (imageAlt) out.imageAlt = imageAlt;
  const imageCaption = (s.imageCaption ?? "").trim();
  if (imageCaption) out.imageCaption = imageCaption;
  if (s.imageWidth) out.imageWidth = s.imageWidth;
  return out;
}

/** All posts including drafts, sorted by `order` (admin listing). */
export async function listAdminPosts(): Promise<AdminPost[]> {
  const snap = await getDocs(postsCollection());
  return snap.docs
    .map((d) => fromDoc(d.id, d.data()))
    .sort((a, b) => a.order - b.order);
}

/** Retrieve a single post by slug for the admin (can be unpublished/draft). */
export async function getAdminPost(slug: string): Promise<AdminPost | null> {
  const snap = await getDoc(doc(db, "posts", slug));
  if (!snap.exists()) return null;
  return fromDoc(snap.id, snap.data());
}

/**
 * Create or update a post. The doc id is the slug, so changing a slug creates a
 * new document — the UI keeps the slug read-only when editing.
 */
export async function savePost(post: AdminPost, isNew: boolean): Promise<number> {
  const ref = doc(db, "posts", post.slug);
  const payload: Record<string, unknown> = {
    slug: post.slug,
    category: post.category.trim(),
    accent: post.accent,
    title: post.title.trim(),
    excerpt: post.excerpt.trim(),
    readTime: post.readTime.trim(),
    publishDate: post.publishDate.trim(),
    tags: post.tags.map((t) => t.trim()).filter(Boolean),
    icon: post.icon,
    coverImage: post.coverImage.trim(),
    coverImageAlt: post.coverImageAlt.trim(),
    sections: post.sections.map(cleanSection).filter((s) => s.heading || s.content),
    relatedSlugs: post.relatedSlugs.map((s) => s.trim()).filter(Boolean),
    published: post.published,
    featured: post.featured,
    order: post.order,
    metaTitle: post.metaTitle.trim(),
    metaDescription: post.metaDescription.trim(),
    author: post.author.trim() || "BetIndia Editorial Team",
    wordCount: post.wordCount,
    readingTimeMinutes: post.readingTimeMinutes,
    headings: post.headings,
    trashed: false,
    updatedAt: serverTimestamp(),
    ...(post.publishedAt ? { publishedAt: post.publishedAt } : {}),
  };

  const nextRevision = await runTransaction(db, async (transaction) => {
    const current = await transaction.get(ref);
    if (isNew && current.exists()) {
      throw new Error("A post already uses this web address. Choose a different slug.");
    }
    if (!isNew && !current.exists()) {
      throw new Error("This post no longer exists. Reload the article list before saving.");
    }
    const currentRevision = current.exists() && typeof current.data().revision === "number"
      ? current.data().revision
      : 0;
    if (!isNew && currentRevision !== post.revision) {
      throw new Error("This post was updated in another tab. Your changes were not overwritten—reload and merge them first.");
    }
    const revision = currentRevision + 1;
    transaction.set(
      ref,
      {
        ...payload,
        revision,
        ...(isNew ? { createdAt: serverTimestamp() } : {}),
        ...(post.published && !post.publishedAt ? { publishedAt: serverTimestamp() } : {}),
      },
      { merge: true }
    );
    return revision;
  });

  if (post.featured) await setFeaturedPost(post.slug, true);
  return nextRevision;
}

/** Permanently delete a post. */
export async function deletePost(slug: string): Promise<void> {
  await deleteDoc(doc(db, "posts", slug));
}

/** Move a post to the recoverable trash without deleting its content. */
export async function trashPost(slug: string): Promise<void> {
  await updateDoc(doc(db, "posts", slug), {
    trashed: true,
    published: false,
    featured: false,
    updatedAt: serverTimestamp(),
  });
}

export async function restorePost(slug: string): Promise<void> {
  await updateDoc(doc(db, "posts", slug), {
    trashed: false,
    updatedAt: serverTimestamp(),
  });
}

/** Enforces the single-featured-post invariant in Firestore, not only in UI state. */
export async function setFeaturedPost(slug: string, value: boolean): Promise<void> {
  const batch = writeBatch(db);
  if (value) {
    const existing = await getDocs(query(postsCollection(), where("featured", "==", true)));
    existing.docs.forEach((item) => {
      if (item.id !== slug) batch.update(item.ref, { featured: false, updatedAt: serverTimestamp() });
    });
  }
  batch.update(doc(db, "posts", slug), { featured: value, updatedAt: serverTimestamp() });
  await batch.commit();
}

/** Flip a single boolean flag without rewriting the whole document. */
export async function setPostFlag(
  slug: string,
  flag: "published" | "featured",
  value: boolean
): Promise<void> {
  await updateDoc(doc(db, "posts", slug), { [flag]: value, updatedAt: serverTimestamp() });
}
