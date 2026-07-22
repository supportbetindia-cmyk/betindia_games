import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
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
  sections: BlogSection[];
  relatedSlugs: string[];
  published: boolean;
  featured: boolean;
  order: number;
};

const postsCollection = () => collection(db, "posts");

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
    sections: Array.isArray(data.sections) ? data.sections : [],
    relatedSlugs: Array.isArray(data.relatedSlugs) ? data.relatedSlugs : [],
    published: data.published !== false,
    featured: data.featured === true,
    order: typeof data.order === "number" ? data.order : 0,
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
export async function savePost(post: AdminPost, isNew: boolean): Promise<void> {
  const ref = doc(db, "posts", post.slug);
  const payload = {
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
    sections: post.sections.map(cleanSection).filter((s) => s.heading || s.content),
    relatedSlugs: post.relatedSlugs.map((s) => s.trim()).filter(Boolean),
    published: post.published,
    featured: post.featured,
    order: post.order,
    updatedAt: serverTimestamp(),
    ...(isNew ? { createdAt: serverTimestamp() } : {}),
  };
  // merge so we never clobber createdAt on an update.
  await setDoc(ref, payload, { merge: true });
}

/** Permanently delete a post. */
export async function deletePost(slug: string): Promise<void> {
  await deleteDoc(doc(db, "posts", slug));
}

/** Flip a single boolean flag without rewriting the whole document. */
export async function setPostFlag(
  slug: string,
  flag: "published" | "featured",
  value: boolean
): Promise<void> {
  await updateDoc(doc(db, "posts", slug), { [flag]: value, updatedAt: serverTimestamp() });
}
