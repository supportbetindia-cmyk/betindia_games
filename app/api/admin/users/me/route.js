// app/api/admin/users/me/route.js
// ---------------------------------------------------------------------------
// GET /api/admin/users/me
// The browser calls this right after sign-in to learn who it is and what it may
// do. It returns the caller's role + permissions, which the UI uses to show the
// right sidebar links and guard pages.
// ---------------------------------------------------------------------------

import { NextResponse } from "next/server";
import { isAdminConfigured } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/admin-guard";

// firebase-admin needs the full Node.js runtime (it won't run on the Edge
// runtime), and this response must never be cached — it's per-user.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  // If you haven't added the service-account env vars yet, tell the client so it
  // can fall back to legacy behavior (any signed-in user = full access) instead
  // of locking everyone out mid-migration.
  if (!isAdminConfigured()) {
    return NextResponse.json({ configured: false });
  }

  // Verify the Firebase ID token and load this person's admin record.
  const { user, error, status } = await requireAdmin(request);
  if (error) return NextResponse.json({ configured: true, error }, { status });

  // Success: hand back the clean user object (uid, email, role, perms, ...).
  return NextResponse.json({ configured: true, user });
}
