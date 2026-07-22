import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase is used ONLY for image storage. Everything else (Firestore content,
 * Firebase Auth) stays on Firebase. Uploaded images return a public URL that is
 * then saved as a normal text field (imageUrl) in Firestore — so the rest of the
 * app doesn't need to know or care that images live in Supabase.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Name of the Supabase Storage bucket that holds CMS images. */
export const SUPABASE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "images";

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}

let client: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) client = createClient(url as string, anonKey as string);
  return client;
}

/**
 * Upload an image file to Supabase Storage and resolve to its public URL.
 *
 * @param file   The image File (from an <input type="file">).
 * @param folder Sub-folder within the bucket, e.g. "cms" or "blog".
 */
export async function uploadToSupabase(file: File, folder = "cms"): Promise<string> {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error(
      "Supabase storage is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }

  // Unique, readable path: <folder>/<timestamp>-<sanitised-name>
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${folder}/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;

  const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
