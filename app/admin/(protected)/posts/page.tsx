"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Newspaper,
  Plus,
  Search,
  Pencil,
  Trash2,
  Globe,
  Loader2,
  FileText,
  Star,
  Check,
  X,
  ChevronRight,
} from "lucide-react";
import { listAdminPosts, deletePost, setPostFlag, type AdminPost } from "@/lib/blog-admin";
import { revalidateBlog } from "./actions";
import { useToast, ToastHost } from "@/components/admin/Toast";

export default function BlogPostsListing() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const { toast, showToast, dismissToast } = useToast();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await listAdminPosts();
        setPosts(data);
      } catch (err) {
        console.error("Failed to load posts", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  async function handleTogglePublished(slug: string, currentValue: boolean) {
    try {
      const newValue = !currentValue;
      await setPostFlag(slug, "published", newValue);
      setPosts((prev) =>
        prev.map((p) => (p.slug === slug ? { ...p, published: newValue } : p))
      );
      await revalidateBlog(slug);
      showToast("success", newValue ? "Post is now live." : "Post moved to drafts.");
    } catch (err) {
      console.error("Failed to toggle published", err);
      showToast("error", "Could not update the post status. Please try again.");
    }
  }

  async function handleToggleFeatured(slug: string, currentValue: boolean) {
    try {
      const newValue = !currentValue;
      // If we are marking this post as featured, set all other posts as NOT featured
      // since there should only be one featured post.
      await setPostFlag(slug, "featured", newValue);
      if (newValue) {
        // Optimistically update other posts to false, and this one to true
        setPosts((prev) =>
          prev.map((p) =>
            p.slug === slug
              ? { ...p, featured: true }
              : p.featured
              ? { ...p, featured: false }
              : p
          )
        );
      } else {
        setPosts((prev) =>
          prev.map((p) => (p.slug === slug ? { ...p, featured: false } : p))
        );
      }
      await revalidateBlog(slug);
      showToast(
        "success",
        newValue ? "Post set as the featured article." : "Post is no longer featured."
      );
    } catch (err) {
      console.error("Failed to toggle featured", err);
      showToast("error", "Could not update the featured article. Please try again.");
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Are you sure you want to permanently delete this blog post? This action cannot be undone.")) {
      return;
    }
    setDeletingSlug(slug);
    try {
      await deletePost(slug);
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
      await revalidateBlog(slug);
      showToast("success", "Post deleted.");
    } catch (err) {
      console.error("Failed to delete post", err);
      showToast("error", "Could not delete the post. Please try again.");
    } finally {
      setDeletingSlug(null);
    }
  }

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <ToastHost toast={toast} onDismiss={dismissToast} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Newspaper className="text-[#FF6B00]" size={28} />
            Blog Articles
          </h1>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Manage your blog posts, toggling publication status and creating new ones.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF8A00] px-4 py-2.5 text-sm font-bold text-white transition cursor-pointer"
        >
          <Plus size={16} />
          Create New Post
        </Link>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2">
        <Search size={18} className="text-slate-500 shrink-0" />
        <input
          type="text"
          placeholder="Search articles by title, slug, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-xs font-semibold text-slate-500 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-3 py-20 text-slate-400">
          <Loader2 size={24} className="animate-spin text-[#FF6B00]" />
          Loading articles…
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] py-16 text-center text-slate-400 backdrop-blur-xl">
          <FileText size={40} className="mx-auto text-slate-600 mb-3" />
          {search ? "No articles match your search." : "No blog posts found. Create one to get started!"}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-4">Title &amp; Slug</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4 text-center">Featured</th>
                  <th className="px-5 py-4 text-center">Status</th>
                  <th className="px-5 py-4 text-center">Order</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {filteredPosts.map((post) => (
                  <tr key={post.slug} className="hover:bg-white/[0.02] transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-10 w-16 shrink-0 rounded-md object-cover border border-white/10"
                          />
                        ) : (
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-500">
                            <FileText size={18} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <span className="block font-bold text-white truncate max-w-sm">
                            {post.title}
                          </span>
                          <span className="block text-xs text-slate-500 truncate font-mono mt-0.5">
                            {post.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-semibold">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(post.slug, post.featured)}
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border transition ${
                          post.featured
                            ? "border-[#FF6B00]/40 bg-[#FF6B00]/10 text-[#FF6B00]"
                            : "border-white/10 text-slate-600 hover:text-slate-400"
                        }`}
                        title={post.featured ? "Featured Post" : "Mark as Featured"}
                      >
                        <Star size={14} className={post.featured ? "fill-[#FF6B00]" : ""} />
                      </button>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => handleTogglePublished(post.slug, post.published)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition ${
                          post.published
                            ? "bg-[#138808]/15 text-[#138808] border border-[#138808]/20"
                            : "bg-slate-800 text-slate-400 border border-white/5"
                        }`}
                      >
                        {post.published ? (
                          <>
                            <Globe size={11} />
                            Published
                          </>
                        ) : (
                          <>
                            <FileText size={11} />
                            Draft
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-center font-semibold text-white">
                      {post.order}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/posts/${post.slug}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white transition"
                          title="Edit Post"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          disabled={deletingSlug === post.slug}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition cursor-pointer"
                          title="Delete Post"
                        >
                          {deletingSlug === post.slug ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
