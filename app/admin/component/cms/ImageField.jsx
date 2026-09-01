"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/storage";
import { Trash2 } from "lucide-react";

export default function ImageField({
  label,
  value,
  onChange,
  altText = "",
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
      console.error("Image upload failed:", err);
      setError(err?.message || "Upload failed. Check the console for details.");
    } finally {
      setUploading(false);
    }
  }

  function handleRemoveImage() {
    onChange("");
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="inline-flex items-center gap-1 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/20 transition cursor-pointer"
          >
            <Trash2 size={12} />
            Remove Image
          </button>
        )}
      </div>

      {value && (
        <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <img
            src={value}
            alt={altText || label}
            className="h-40 w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemoveImage}
              className="inline-flex items-center gap-1.5 rounded-xl bg-red-500 hover:bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg transition cursor-pointer"
            >
              <Trash2 size={14} />
              Remove Image
            </button>
          </div>
        </div>
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
