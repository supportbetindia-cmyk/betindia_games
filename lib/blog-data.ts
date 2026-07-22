import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { iconFromName } from "./blog-icons";
import type { BlogPost, BlogSection } from "./blog-posts";

// ─── Stored shape ────────────────────────────────────────────────────────────
// What lives in Firestore: identical to `BlogPost` except `icon` is a string
// name (see lib/blog-icons.ts) plus a few admin/sort fields.

type PostDoc = {
  slug: string;
  category: string;
  accent: BlogPost["accent"];
  title: string;
  excerpt: string;
  readTime: string;
  publishDate: string;
  tags?: string[];
  icon?: string;
  coverImage?: string;
  sections?: BlogSection[];
  relatedSlugs?: string[];
  published?: boolean;
  featured?: boolean;
  order?: number;
};

// Map a Firestore document into the `BlogPost` shape the UI already expects
// (resolving the icon name back into a Lucide component).
function toPost(data: PostDoc): BlogPost {
  return {
    slug: data.slug,
    category: data.category,
    accent: data.accent,
    title: data.title,
    excerpt: data.excerpt,
    readTime: data.readTime,
    publishDate: data.publishDate,
    tags: data.tags ?? [],
    icon: iconFromName(data.icon),
    coverImage: data.coverImage,
    sections: data.sections ?? [],
    relatedSlugs: data.relatedSlugs ?? [],
  };
}

const isPublished = (d: PostDoc) => d.published !== false;

const postsCollection = () => collection(db, "posts");

// Reads are wrapped so an unreachable/unconfigured Firestore degrades to an
// empty blog instead of crashing the build or returning a 500. Failures are
// logged for diagnosis.
function onReadError<T>(fn: string, err: unknown, fallback: T): T {
  console.error(`blog-data.${fn}: failed to read from Firestore`, err);
  return fallback;
}

// ─── Reads ───────────────────────────────────────────────────────────────────
// Posts are queried by `order` only (a single-field index, created
// automatically) and filtered by `published` in code, so no composite index is
// required. The dataset is small, so reading all and filtering is cheap.

/** All published posts, ordered for the listing grid. */
export async function getAllPosts(): Promise<BlogPost[]> {
  if (!isFirebaseConfigured()) return [];
  try {
    const snap = await getDocs(query(postsCollection(), orderBy("order")));
    return snap.docs
      .map((d) => d.data() as PostDoc)
      .filter(isPublished)
      .map(toPost);
  } catch (err) {
    return onReadError("getAllPosts", err, []);
  }
}

/** Slugs of all published posts (for generateStaticParams / sitemap). */
export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}

/** A single published post by slug, or null (unpublished / missing / error → null). */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isFirebaseConfigured()) return null;
  try {
    const snap = await getDoc(doc(db, "posts", slug));
    if (!snap.exists()) return null;
    const data = snap.data() as PostDoc;
    if (!isPublished(data)) return null;
    return toPost(data);
  } catch (err) {
    return onReadError("getPostBySlug", err, null);
  }
}

/** Resolve a list of related slugs to their published posts, order preserved. */
export async function getRelatedPosts(slugs: string[]): Promise<BlogPost[]> {
  const posts = await Promise.all(slugs.map((s) => getPostBySlug(s)));
  return posts.filter((p): p is BlogPost => p !== null);
}

/** The post flagged `featured` (a single-field equality query — no composite
 *  index needed), falling back to the first post in the listing. */
export async function getFeaturedPost(): Promise<BlogPost | null> {
  if (!isFirebaseConfigured()) return null;
  try {
    const snap = await getDocs(
      query(postsCollection(), where("featured", "==", true), limit(1))
    );
    const featured = snap.docs.map((d) => d.data() as PostDoc).find(isPublished);
    if (featured) return toPost(featured);
  } catch (err) {
    onReadError("getFeaturedPost", err, null);
  }

  const posts = await getAllPosts();
  return posts[0] ?? null;
}
