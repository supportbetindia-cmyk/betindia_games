import { uploadToSupabase } from "./supabase";

// CMS image uploads go to Supabase Storage (images only). The returned public
// URL is saved as a text field in Firestore by the caller, so the rest of the
// CMS continues to run on Firebase.
export async function uploadImage(file: File): Promise<string> {
  return uploadToSupabase(file, "cms");
}
