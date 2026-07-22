import { NextResponse } from "next/server";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { nameFromIcon } from "@/lib/blog-icons";

export const dynamic = "force-dynamic";

const FEATURED_SLUG = "ipl-betting-guide";

export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("key");
  const secret = process.env.BLOG_SEED_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "BLOG_SEED_SECRET is not set in the environment." },
      { status: 500 }
    );
  }
  if (key !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const seeded: string[] = [];

    await Promise.all(
      BLOG_POSTS.map((post, index) =>
        setDoc(doc(db, "posts", post.slug), {
          slug: post.slug,
          category: post.category,
          accent: post.accent,
          title: post.title,
          excerpt: post.excerpt,
          readTime: post.readTime,
          publishDate: post.publishDate,
          tags: post.tags,
          icon: nameFromIcon(post.icon),
          sections: post.sections,
          relatedSlugs: post.relatedSlugs,
          published: true,
          featured: post.slug === FEATURED_SLUG,
          order: index,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }).then(() => {
          seeded.push(post.slug);
        })
      )
    );

    return NextResponse.json({ ok: true, count: seeded.length, slugs: seeded });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Seed failed — is Firestore created and are writes allowed?",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
