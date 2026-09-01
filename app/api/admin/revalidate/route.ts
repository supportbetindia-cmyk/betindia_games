import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminConfigured } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (isAdminConfigured()) {
      const result = await requireAdmin(request);
      if (result.error) return NextResponse.json({ error: result.error }, { status: result.status });
      const adminUser = result.user as { perms?: Record<string, boolean> } | undefined;
      if (!adminUser?.perms?.blog) {
        return NextResponse.json({ error: "Blog permission required." }, { status: 403 });
      }
    }
    const body = await request.json().catch(() => ({}));
    const slug = body.slug;

    revalidatePath("/blog");
    if (slug && typeof slug === "string") {
      revalidatePath(`/blog/${slug}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Revalidation API failed:", err);
    return NextResponse.json(
      { error: "Revalidation failed", detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
