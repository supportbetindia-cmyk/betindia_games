import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

/**
 * CMS data service.
 *
 * Single source of truth for reading and writing page content in Firestore.
 * Shared by both the admin panel and the public website so no component talks
 * to Firestore directly.
 *
 * Firestore structure (unchanged):
 *   pages/{pageId}                       → { name, slug, ... }
 *   pages/{pageId}/section/{sectionId}   → { ...arbitrary fields }
 *
 * Every function handles its own errors and returns a safe fallback
 * (`[]` or `null` / `false`) instead of throwing, so callers never need
 * try/catch around them.
 */

/**
 * List all website pages.
 * @returns {Promise<Array<{id: string} & Record<string, any>>>}
 *   Page documents (id + fields), or `[]` on error.
 */
export async function getPages() {
  if (!isFirebaseConfigured()) return [];
  try {
    const snapshot = await getDocs(collection(db, "pages"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("cms.getPages failed:", err);
    return [];
  }
}

/**
 * List all sections of a page (the `section` subcollection).
 * @param {string} pageId - Parent page document id.
 * @returns {Promise<Array<{id: string} & Record<string, any>>>}
 *   Section documents (id + fields), or `[]` on error / missing `pageId`.
 */
export async function getSections(pageId) {
  if (!pageId || !isFirebaseConfigured()) return [];
  try {
    const snapshot = await getDocs(collection(db, "pages", pageId, "section"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error(`cms.getSections failed for "${pageId}":`, err);
    return [];
  }
}

/**
 * Read a single section document.
 *
 * Returns a loosely-typed object so both the admin editor and the website
 * (which each expect their own field shape) can consume it without casting.
 * @param {string} pageId - Parent page document id.
 * @param {string} sectionId - Section document id.
 * @returns {Promise<any>}
 *   The section's fields, or `null` if it doesn't exist / on error / bad args.
 */

export async function getSection(pageId, sectionId) {
  if (!pageId || !sectionId || !isFirebaseConfigured()) return null;
  try {
    const snap = await getDoc(doc(db, "pages", pageId, "section", sectionId));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.error(`cms.getSection failed for "${pageId}/${sectionId}":`, err);
    return null;
  }
}

/**
 * Create or update a section. Uses a merge write, so fields not present in
 * `data` are preserved rather than wiped.
 * @param {string} pageId - Parent page document id.
 * @param {string} sectionId - Section document id.
 * @param {Record<string, any>} data - Fields to write.
 * @returns {Promise<boolean>} `true` on success, `false` on error / bad args.
 */
export async function saveSection(pageId, sectionId, data) {
  if (!pageId || !sectionId || !isFirebaseConfigured()) return false;
  try {
    await setDoc(
      doc(db, "pages", pageId, "section", sectionId),
      data ?? {},
      { merge: true }
    );
    return true;
  } catch (err) {
    console.error(`cms.saveSection failed for "${pageId}/${sectionId}":`, err);
    return false;
  }
}

/**
 * Read every section of a page at once, keyed by section id.
 *
 * Convenience over calling {@link getSection} per component: fetches the whole
 * `pages/{pageId}/section` subcollection in a single query (reusing
 * {@link getSections}) and reshapes it into
 * `{ [sectionId]: { ...fields } }`.
 *
 * A single subcollection read is one network round-trip, so it's faster than a
 * `Promise.all` fan-out of per-section reads — hence no `Promise.all` here;
 * the appropriate batching is the one query Firestore already does.
 *
 * @param {string} pageId - Parent page document id.
 * @returns {Promise<Record<string, any>>} Sections keyed by id — e.g.
 *   `{ hero: {...}, footer: {...} }` — or `{}` on error / missing `pageId`.
 */
export async function getPage(pageId) {
  if (!pageId) return {};
  try {
    const sections = await getSections(pageId);
    /** @type {Record<string, any>} */
    const page = {};
    for (const { id, ...fields } of sections) {
      page[id] = fields;
    }
    return page;
  } catch (err) {
    console.error(`cms.getPage failed for "${pageId}":`, err);
    return {};
  }
}

/**
 * Fetch page-level document fields (e.g. metaTitle, metaDescription)
 * @param {string} pageId
 * @returns {Promise<Record<string, any>|null>}
 */
export async function getPageMeta(pageId) {
  if (!pageId || !isFirebaseConfigured()) return null;
  try {
    const snap = await getDoc(doc(db, "pages", pageId));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.error(`cms.getPageMeta failed for "${pageId}":`, err);
    return null;
  }
}

/**
 * Save page-level document fields (merge write)
 * @param {string} pageId
 * @param {Record<string, any>} data
 * @returns {Promise<boolean>}
 */
export async function savePageMeta(pageId, data) {
  if (!pageId || !isFirebaseConfigured()) return false;
  try {
    await setDoc(doc(db, "pages", pageId), data ?? {}, { merge: true });
    return true;
  } catch (err) {
    console.error(`cms.savePageMeta failed for "${pageId}":`, err);
    return false;
  }
}

