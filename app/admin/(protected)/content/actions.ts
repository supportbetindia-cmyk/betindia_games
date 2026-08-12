"use server";

import { revalidatePath } from "next/cache";
import { routeForPage } from "@/lib/page-routes";

/**
 * Purge the cached render of a page after its content is edited.
 *
 * Public pages are rendered with ISR (`export const revalidate = 300`), so
 * without this a content change sits invisible behind the cached HTML until the
 * window expires. The SEO and Page-Images editors already did this; the Content
 * and Blog-section editors did not, which is why text edits appeared to "not
 * save" even though Firestore had the new value.
 *
 * @returns the path that was revalidated, or null if the pageId has no public route.
 */
export async function revalidateContent(pageId: string): Promise<string | null> {
  const path = routeForPage(pageId);
  if (!path) return null;
  revalidatePath(path);
  return path;
}
