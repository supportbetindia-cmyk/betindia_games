// lib/admin-audit.js
// ---------------------------------------------------------------------------
// A tiny append-only audit trail for admin actions: who did what, to whom, when.
// Entries live in the `adminAudit` Firestore collection and are written by the
// server (Admin SDK) only. Reading is exposed through GET /api/admin/audit
// (superadmin-only). The collection is locked to clients in firestore.rules.
// ---------------------------------------------------------------------------

import { adminDb } from "./firebase-admin";

export const ADMIN_AUDIT = "adminAudit";

// Record one action. `actor` is the loaded admin performing it; `action` is a
// short verb string ("create", "invite", "update", "disable", "enable",
// "delete"); `extra` carries context like the target user + a details object.
//
// Wrapped in try/catch on purpose: auditing is best-effort. If writing the log
// ever fails we must NOT fail the real operation the user asked for.
export async function logAudit(actor, action, extra = {}) {
  try {
    await adminDb()
      .collection(ADMIN_AUDIT)
      .add({
        actorUid: actor?.uid || "unknown",
        actorEmail: actor?.email || "unknown",
        action,
        at: new Date().toISOString(), // ISO string sorts chronologically as text
        ...extra, // e.g. { targetUid, targetEmail, details: {...} }
      });
  } catch (err) {
    // Swallow — never block the primary action because logging hiccupped.
    console.error("audit log write failed:", err);
  }
}
