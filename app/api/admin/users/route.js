

import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { requireSuperadmin, ADMIN_USERS } from "@/lib/admin-guard";
import { adminDb } from "@/lib/firebase-admin";
import { normalizePerms } from "@/lib/permissions";
import { logAudit } from "@/lib/admin-audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---- GET: list all admins ------------------------------------------------
export async function GET(request) {
  // Only a superadmin may see the team list.
  const gate = await requireSuperadmin(request);
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });

  // Read every document in adminUsers and shape it for the UI.
  const snap = await adminDb().collection(ADMIN_USERS).get();
  const users = snap.docs.map((doc) => {
    const d = doc.data();
    return {
      uid: doc.id,
      email: d.email || "",
      role: d.role === "superadmin" ? "superadmin" : "editor",
      perms: normalizePerms(d.perms),
      disabled: d.disabled === true,
      createdAt: d.createdAt || null,
      createdBy: d.createdBy || null,
    };
  });

  // Newest first (createdAt is an ISO string, so string compare works).
  users.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  return NextResponse.json({ users });
}

// ---- POST: create a login and grant access -------------------------------
export async function POST(request) {
  const gate = await requireSuperadmin(request);
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });

  // Parse and validate the request body.
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  // "invite" mode: don't take a password from the form. We create the account
  // with a random throwaway password and the browser then triggers Firebase's
  // "reset password" email so the person sets their own. The throwaway is never
  // shown to anyone.
  const invite = body.invite === true;
  const password = invite ? randomBytes(24).toString("base64url") : String(body.password || "");
  const role = body.role === "superadmin" ? "superadmin" : "editor";
  // Superadmins implicitly have every permission; editors get exactly what was
  // ticked. normalizePerms strips anything unexpected.
  const perms = role === "superadmin" ? normalizePerms({ seo: true, images: true, blog: true, content: true, social: true }) : normalizePerms(body.perms);

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  // Only validate the password length in "temp password" mode; invite mode uses
  // a generated one that's always long enough.
  if (!invite && password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  const auth = adminAuth();

  let userRecord;
  try {
    userRecord = await auth.createUser({ email, password, emailVerified: false, disabled: false });
  } catch (err) {
    if (err && err.code === "auth/email-already-exists") {
      userRecord = await auth.getUserByEmail(email);
    } else {
      return NextResponse.json(
        { error: err?.message || "Could not create the login." },
        { status: 400 }
      );
    }
  }

  // Write (or overwrite) their admin record with the granted role + permissions.
  const record = {
    email,
    role,
    perms,
    disabled: false,
    createdAt: new Date().toISOString(),
    createdBy: gate.user.email, // who granted access — useful for an audit trail
  };
  await adminDb().collection(ADMIN_USERS).doc(userRecord.uid).set(record);

  // Record the action in the audit trail.
  await logAudit(gate.user, invite ? "invite" : "create", {
    targetUid: userRecord.uid,
    targetEmail: email,
    details: { role, perms },
  });

  // `invited` tells the browser to fire off Firebase's password-reset email so
  // the new person can set their own password.
  return NextResponse.json(
    { user: { uid: userRecord.uid, ...record }, invited: invite },
    { status: 201 }
  );
}
