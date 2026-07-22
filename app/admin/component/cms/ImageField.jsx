"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/storage";

export default function ImageField({
  label,
  value,
  onChange,
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const url = await uploadImage(file);
      if (!url) throw new Error("Upload returned no URL.");
      onChange(url);
    } catch (err) {
      // Surface the real reason (missing env, RLS policy, wrong bucket, …)
      console.error("Image upload failed:", err);
      setError(err?.message || "Upload failed. Check the console for details.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      {value && (
        <img
          src={value}
          alt={label}
          className="h-40 w-full rounded-xl object-cover border border-white/10 bg-white/5"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="block w-full text-xs text-slate-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/15 transition"
      />

      {uploading && (
        <p className="text-xs font-semibold text-[#FF6B00] animate-pulse">
          Uploading to storage…
        </p>
      )}

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300">
          {error}
        </p>
      )}

      {value && !uploading && !error && (
        <p className="truncate text-[10px] text-slate-600 font-mono" title={value}>
          Path: {value}
        </p>
      )}
    </div>
  );
}
