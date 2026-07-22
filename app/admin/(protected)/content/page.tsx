"use client";

import ContentTree from "@/components/admin/ContentTree";

export default function ContentPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Content</h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage website pages and the sections inside each page.
        </p>
      </div>

      <ContentTree />
    </div>
  );
}
