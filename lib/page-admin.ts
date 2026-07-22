import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";
import type { PageHeroContent } from "./page-content";

export type EditablePageContent = PageHeroContent & {
  updatedAt?: unknown;
};

const pagesCollection = () => collection(db, "pageContent");

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function fromDoc(id: string, data: DocumentData): EditablePageContent {
  return {
    pageId: id,
    path: asString(data.path),
    name: asString(data.name) || id,
    eyebrow: asString(data.eyebrow),
    title: asString(data.title),
    highlightedTitle: asString(data.highlightedTitle),
    description: asString(data.description),
    imageUrl: asString(data.imageUrl),
    imageUrlMobile: asString(data.imageUrlMobile),
    imageAlt: asString(data.imageAlt),
    updatedAt: data.updatedAt,
  };
}

export async function listEditablePages(): Promise<EditablePageContent[]> {
  const snap = await getDocs(pagesCollection());
  return snap.docs
    .map((d) => fromDoc(d.id, d.data()))
    .sort((a, b) => a.path.localeCompare(b.path));
}

export async function savePageContent(page: EditablePageContent): Promise<void> {
  await setDoc(
    doc(db, "pageContent", page.pageId),
    {
      pageId: page.pageId,
      path: page.path,
      name: page.name,
      eyebrow: page.eyebrow.trim(),
      title: page.title.trim(),
      highlightedTitle: page.highlightedTitle.trim(),
      description: page.description.trim(),
      imageUrl: page.imageUrl.trim(),
      imageUrlMobile: (page.imageUrlMobile ?? "").trim(),
      imageAlt: page.imageAlt.trim(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
