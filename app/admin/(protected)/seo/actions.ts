"use server";

import { revalidatePath } from "next/cache";
import { routeForPage } from "@/lib/page-routes";

/**
 * Purge the cached render of a page so freshly-saved SEO (meta title /
 * description) shows on the public site immediately, instead of waiting for the
 * page's ISR `revalidate` window.
 *
 * Called from the admin SEO editor right after the Firestore write succeeds.
 * @returns the path that was revalidated, or null if the pageId has no public route.
 */
export async function revalidateSeo(pageId: string): Promise<string | null> {
  const path = routeForPage(pageId);
  if (!path) return null;
  revalidatePath(path);
  return path;
}
