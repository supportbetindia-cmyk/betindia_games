import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
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
