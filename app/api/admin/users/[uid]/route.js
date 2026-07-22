// app/api/admin/users/[uid]/route.js
// ---------------------------------------------------------------------------
// PATCH  /api/admin/users/:uid  -> change role / permissions / disabled state
// DELETE /api/admin/users/:uid  -> remove the login and the admin record
// Both are superadmin-only and both refuse to let a superadmin lock themselves
// out (you cannot demote, disable, or delete your own account here).
// ---------------------------------------------------------------------------

import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { requireSuperadmin, ADMIN_USERS } from "@/lib/admin-guard";
import { normalizePerms, makePerms } from "@/lib/permissions";
import { logAudit } from "@/lib/admin-audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---- PATCH: edit an existing admin --------------------------------------
export async function PATCH(request, { params }) {
  const gate = await requireSuperadmin(request);
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });

  const { uid } = await params; // Next 16: route params are async
  const ref = adminDb().collection(ADMIN_USERS).doc(uid);
  const snap = await ref.get();
  if (!snap.exists) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Prevent self-lockout: you may not demote/disable your OWN account here.
  const editingSelf = uid === gate.user.uid;
  if (editingSelf && (body.role === "editor" || body.disabled === true)) {
    return NextResponse.json(
      { error: "You cannot demote or disable your own account." },
      { status: 400 }
    );
  }

  // Build only the fields that were actually provided (a partial update).
  const updates = { updatedAt: new Date().toISOString() };

  if (body.role === "superadmin" || body.role === "editor") {
    updates.role = body.role;
    // A superadmin always has all perms; an editor keeps whatever perms are sent
    // (or, if none sent, we recompute below from the existing/updated perms).
    if (body.role === "superadmin") updates.perms = makePerms(true);
  }

  if (body.perms && updates.role !== "superadmin") {
    // Only apply per-section perms for editors; superadmins are always full.
    const effectiveRole = updates.role || snap.data().role;
    updates.perms = effectiveRole === "superadmin" ? makePerms(true) : normalizePerms(body.perms);
  }

  if (typeof body.disabled === "boolean") {
    updates.disabled = body.disabled;
    // Also flip the Firebase Auth account so a disabled user truly cannot sign in
    // (not just hidden in the UI).
    await adminAuth().updateUser(uid, { disabled: body.disabled });
  }

  await ref.update(updates);
  const fresh = (await ref.get()).data();

  // Log the change. Pick the most specific verb for a disable/enable toggle.
  const action =
    typeof updates.disabled === "boolean"
      ? updates.disabled
        ? "disable"
        : "enable"
      : "update";
  await logAudit(gate.user, action, {
    targetUid: uid,
    targetEmail: fresh.email || "",
    details: updates,
  });

  return NextResponse.json({
    user: {
      uid,
      email: fresh.email || "",
      role: fresh.role,
      perms: normalizePerms(fresh.perms),
      disabled: fresh.disabled === true,
    },
  });
}

// ---- DELETE: remove an admin completely ----------------------------------
export async function DELETE(request, { params }) {
  const gate = await requireSuperadmin(request);
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });

  const { uid } = await params;

  // Never let a superadmin delete themselves.
  if (uid === gate.user.uid) {
    return NextResponse.json({ error: "You cannot delete your own account." }, { status: 400 });
  }

  // Capture the email BEFORE deleting, so the audit entry is meaningful.
  const existing = await adminDb().collection(ADMIN_USERS).doc(uid).get();
  const targetEmail = existing.exists ? existing.data().email || "" : "";

  // Delete the login first, then the record. If the Auth user is already gone
  // (auth/user-not-found), ignore it and still clean up the Firestore record.
  try {
    await adminAuth().deleteUser(uid);
  } catch (err) {
    if (!err || err.code !== "auth/user-not-found") {
      return NextResponse.json({ error: err?.message || "Could not delete user." }, { status: 400 });
    }
  }
  await adminDb().collection(ADMIN_USERS).doc(uid).delete();

  await logAudit(gate.user, "delete", { targetUid: uid, targetEmail });

  return NextResponse.json({ ok: true });
}
