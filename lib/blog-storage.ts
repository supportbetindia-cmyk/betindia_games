import { uploadToSupabase } from "./supabase";

// Blog CMS image uploads go to Supabase Storage (images only). The returned
// public URL is persisted on the post/section in Firestore.

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

/** Upload a blog image file and resolve to its public URL. */
export async function uploadBlogImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image is larger than 5 MB.");
  }
  return uploadToSupabase(file, "blog");
}
