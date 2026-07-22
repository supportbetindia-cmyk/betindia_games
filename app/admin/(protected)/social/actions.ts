"use server";

import { revalidatePath } from "next/cache";

/**
 * The footer (with its social links) appears on every page, so refresh the
 * whole layout tree after the links are edited.
 */
export async function revalidateSocial(): Promise<void> {
  revalidatePath("/", "layout");
}
