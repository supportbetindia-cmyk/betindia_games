/**
 * Purge cached renders of the blog listing and/or specific post paths
 * via a standard API route to prevent Next.js Server Action version skew errors on the live site.
 */
export async function revalidateBlog(slug?: string): Promise<void> {
  try {
    await fetch("/api/admin/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    });
  } catch (err) {
    console.error("Failed to revalidate blog paths via API:", err);
  }
}
