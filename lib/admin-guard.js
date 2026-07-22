// lib/admin-guard.js
// ---------------------------------------------------------------------------
// Server-side helpers that every admin API route uses to answer two questions:
//   1) "Who is calling?"       -> verify the Firebase ID token from the request.
//   2) "What may they do?"     -> load their adminUsers record (role + perms).
//
// This is where access control actually lives. The browser UI hides buttons for
// convenience, but THIS file is what truly stops an unauthorized request.
// ---------------------------------------------------------------------------

import { adminAuth, adminDb } from "./firebase-admin";
import { makePerms, normalizePerms } from "./permissions";

// Firestore collection that stores one document per admin user, keyed by the
// Firebase Auth uid: adminUsers/{uid} = { email, role, perms, disabled, ... }.
export const ADMIN_USERS = "adminUsers";

// Bootstrap list: the email(s) that are ALWAYS treated as superadmin, read from
// env (comma-separated). This solves the chicken-and-egg problem — the very first
// superadmin has no database record yet, so we recognize them by email and
// auto-create their record the first time they load the panel.
const SUPERADMIN_EMAILS = (process.env.SUPERADMIN_EMAILS || "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

function isBootstrapSuperEmail(email) {
  return SUPERADMIN_EMAILS.includes(String(email || "").toLowerCase());
}

// Pull the "Authorization: Bearer <token>" header off the incoming request and
// verify it with Firebase. The browser gets this token from the signed-in user
// (user.getIdToken()). Returns the decoded token ({ uid, email, ... }) or null
// if the header is missing/invalid/expired.
export async function verifyRequest(request) {
  const header = request.headers.get("authorization") || "";
  const match = header.match(/^Bearer (.+)$/i);
  if (!match) {
    console.error("[admin-auth] no Bearer token on request");
    return null;
  }
  try {
    return await adminAuth().verifyIdToken(match[1]);
  } catch (err) {
    // tampered, expired, or wrong-project token — or the Admin SDK credential
    // itself is bad (malformed private key / project mismatch). Log the reason
    // (code + message only, never the token) so production shows the real cause.
    console.error(
      "[admin-auth] verifyIdToken failed:",
      err?.code || err?.errorInfo?.code || "unknown",
      "-",
      err?.message || String(err)
    );
    return null;
  }
}

// Shape a raw Firestore document into the clean user object the app expects.
// normalizePerms() guarantees every permission key exists and strips junk.
function shapeUser(uid, data) {
  return {
    uid,
    email: data.email || "",
    role: data.role === "superadmin" ? "superadmin" : "editor",
    perms: normalizePerms(data.perms),
    disabled: data.disabled === true,
    createdAt: data.createdAt || null,
    createdBy: data.createdBy || null,
  };
}

// Load the caller's admin record, creating/repairing it for bootstrap superadmins.
// Returns the user object, or null when the person is authenticated with Firebase
// but has NOT been granted admin access (no record and not a bootstrap email).
export async function loadAdminUser(decoded) {
  const db = adminDb();
  const ref = db.collection(ADMIN_USERS).doc(decoded.uid);
  const snap = await ref.get();
  const email = String(decoded.email || "").toLowerCase();
  const bootstrap = isBootstrapSuperEmail(email);

  // No record yet.
  if (!snap.exists) {
    if (!bootstrap) return null; // not provisioned -> no access
    // First-ever load for the env-listed superadmin: create their record.
    const record = {
      email,
      role: "superadmin",
      perms: makePerms(true),
      disabled: false,
      createdAt: new Date().toISOString(),
      createdBy: "bootstrap",
    };
    await ref.set(record);
    return shapeUser(decoded.uid, record);
  }

  // Record exists.
  const data = snap.data();
  // Safety net: if a bootstrap email somehow lost its superadmin role (manual
  // edit, bad migration), restore it so you can never lock yourself out.
  if (bootstrap && (data.role !== "superadmin" || data.disabled === true)) {
    await ref.update({ role: "superadmin", perms: makePerms(true), disabled: false });
    data.role = "superadmin";
    data.perms = makePerms(true);
    data.disabled = false;
  }
  return shapeUser(decoded.uid, data);
}

// Convenience used by every route: verify the token AND load the record in one
// step. Returns { user } on success, or { error, status } describing exactly how
// authorization failed so the route can respond with the right HTTP code.
export async function requireAdmin(request) {
  const decoded = await verifyRequest(request);
  if (!decoded) return { error: "Not signed in.", status: 401 };
  const user = await loadAdminUser(decoded);
  if (!user) {
    console.error(
      `[admin-auth] token OK but no admin record for uid=${decoded.uid} email=${decoded.email} ` +
        `(not in adminUsers and not a SUPERADMIN_EMAILS bootstrap email)`
    );
    return { error: "You do not have admin access.", status: 403 };
  }
  if (user.disabled) return { error: "Your access has been disabled.", status: 403 };
  return { user };
}

// Same as requireAdmin, but additionally demands the superadmin role — used by
// the user-management routes so only a superadmin can create/edit/remove people.
export async function requireSuperadmin(request) {
  const result = await requireAdmin(request);
  if (result.error) return result;
  if (result.user.role !== "superadmin") {
    return { error: "Only a superadmin can manage users.", status: 403 };
  }
  return result;
}
