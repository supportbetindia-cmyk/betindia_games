import { doc, getDoc, type DocumentData } from "firebase/firestore";
import { db } from "./firebase";

export type PageHeroContent = {
  pageId: string;
  path: string;
  name: string;
  eyebrow: string;
  title: string;
  highlightedTitle: string;
  description: string;
  imageUrl: string;
  /** Portrait image used by the mobile hero poster (falls back to imageUrl). */
  imageUrlMobile?: string;
  imageAlt: string;
};

export type PageContentFallback = Omit<PageHeroContent, "pageId">;

function asString(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function fromDoc(
  pageId: string,
  fallback: PageContentFallback,
  data: DocumentData | undefined
): PageHeroContent {
  return {
    pageId,
    path: fallback.path,
    name: fallback.name,
    eyebrow: asString(data?.eyebrow, fallback.eyebrow),
    title: asString(data?.title, fallback.title),
    highlightedTitle: asString(data?.highlightedTitle, fallback.highlightedTitle),
    description: asString(data?.description, fallback.description),
    imageUrl: asString(data?.imageUrl, fallback.imageUrl),
    imageUrlMobile: asString(data?.imageUrlMobile, fallback.imageUrlMobile ?? ""),
    imageAlt: asString(data?.imageAlt, fallback.imageAlt),
  };
}

export async function getPageContent(
  pageId: string,
  fallback: PageContentFallback
): Promise<PageHeroContent> {
  try {
    const snap = await getDoc(doc(db, "pageContent", pageId));
    return fromDoc(pageId, fallback, snap.exists() ? snap.data() : undefined);
  } catch (err) {
    console.error(`page-content.getPageContent: failed to read ${pageId}`, err);
    return fromDoc(pageId, fallback, undefined);
  }
}
