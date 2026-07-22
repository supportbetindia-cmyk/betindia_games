// app/api/admin/audit/route.js
// ---------------------------------------------------------------------------
// GET /api/admin/audit -> the most recent admin actions (superadmin only).
// Powers the "Activity log" panel on the Team screen.
// ---------------------------------------------------------------------------

import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { requireSuperadmin } from "@/lib/admin-guard";
import { ADMIN_AUDIT } from "@/lib/admin-audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const gate = await requireSuperadmin(request);
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });

  // Newest first, capped at 50 so the response stays small. `at` is an ISO
  // string, so ordering it descending gives chronological-newest-first.
  const snap = await adminDb()
    .collection(ADMIN_AUDIT)
    .orderBy("at", "desc")
    .limit(50)
    .get();

  const entries = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json({ entries });
}
