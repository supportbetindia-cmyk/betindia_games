import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { CMS_DATA } from "../data";
import home from "../data/home";

/**
 * @typedef {Object} SyncSummary
 * @property {number} created - New documents written.
 * @property {number} skipped - Documents that already existed (left untouched).
 * @property {number} failed  - Documents that errored while writing.
 */

/**
 * @typedef {Object} CmsPage
 * @property {string} pageId
 * @property {string} name
 * @property {string} slug
 * @property {Record<string, Record<string, any>>} sections
 */

/**
 * Create a Firestore document ONLY if it doesn't already exist.
 *
 * Deliberately create-only: an existing document is never touched. A previous
 * version accepted a `force` flag that did a non-merge `setDoc`, which replaced
 * live documents with code defaults and blanked every editor-set field (image
 * URLs saved from the admin were wiped back to ""). Seeding must never be able
 * to destroy content entered in the CMS, so that path has been removed.
 *
 * @param {import("firebase/firestore").DocumentReference} ref
 * @param {Record<string, any>} data
 * @returns {Promise<"created" | "skipped" | "failed">}
 */
async function ensureDoc(ref, data) {
  try {
    const snap = await getDoc(ref);
    if (snap.exists()) return "skipped";
    await setDoc(ref, data);
    return "created";
  } catch (err) {
    console.error(`sync: failed to write ${ref.path}`, err);
    return "failed";
  }
}

/**
 * Build the "create if missing" tasks for one page: its page document plus a
 * document for every section under pages/{pageId}/section/{sectionId}.
 *
 * @param {CmsPage} page
 * @returns {Array<{ ref: import("firebase/firestore").DocumentReference, data: Record<string, any> }>}
 */
function pageTasks(page) {
  // The page document itself holds name/slug and is required for the page to
  // appear in getPages (Firestore hides docs that have only subcollections).
  const tasks = [
    { ref: doc(db, "pages", page.pageId), data: { name: page.name, slug: page.slug } },
  ];

  for (const [sectionId, sectionData] of Object.entries(page.sections ?? {})) {
    tasks.push({
      ref: doc(db, "pages", page.pageId, "section", sectionId),
      data: sectionData,
    });
  }

  return tasks;
}

/**
 * Run a list of ensure-doc tasks in parallel and tally the outcomes.
 *
 * @param {ReturnType<typeof pageTasks>} tasks
 * @returns {Promise<SyncSummary>}
 */
async function runTasks(tasks) {
  const results = await Promise.all(tasks.map((t) => ensureDoc(t.ref, t.data)));
  return results.reduce(
    (summary, status) => {
      summary[status] += 1;
      return summary;
    },
    { created: 0, skipped: 0, failed: 0 }
  );
}

/**
 * Seed Firestore with the default content for every page in data/index.js.
 * Only missing documents are created; existing content is left untouched.
 *
 * @returns {Promise<SyncSummary>}
 */
export async function syncCMS() {
  return runTasks(CMS_DATA.flatMap(pageTasks));
}

/**
 * Seed Firestore with the default Home content from data/home.js into
 * pages/home + pages/home/section/{sectionId}.
 * Only missing documents are created; existing content is left untouched.
 *
 * @returns {Promise<SyncSummary>} Tally of created / skipped / failed documents.
 */
export async function syncHomepage() {
  return runTasks(pageTasks(home));
}
