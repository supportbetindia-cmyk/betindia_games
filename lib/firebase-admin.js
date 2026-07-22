// lib/firebase-admin.js
// ---------------------------------------------------------------------------
// Server-only Firebase Admin SDK setup. The Admin SDK runs with FULL project
// privileges (it can create users, set passwords, bypass security rules), so it
// must NEVER be imported into a browser bundle. We only import it from API route
// handlers, which run on the server.
//
// It authenticates with a "service account" — a special key you generate in the
// Firebase console (Project Settings -> Service Accounts -> Generate new private
// key). We read that key from environment variables (NOT NEXT_PUBLIC_*, so it
// stays secret and server-side).
// ---------------------------------------------------------------------------

import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Read the three env vars that make up a service account and turn them into a
// credential object. Returns null if any are missing, so the rest of the app can
// degrade gracefully ("user management isn't configured yet") instead of crashing.
function buildCredential() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) return null;

  // A private key contains real newlines. When you paste it into a .env file it
  // usually gets stored with the two characters backslash-n ("\n") instead of an
  // actual line break. This turns those back into real newlines so the SDK can
  // parse the key. (If your host already stores real newlines this is a no-op.)
  privateKey = privateKey.replace(/\\n/g, "\n");

  return cert({ projectId, clientEmail, privateKey });
}

// We memoize the initialized app in a module-level variable so we only build it
// once per server process. `undefined` = "not tried yet", `null` = "tried and
// not configured", an app object = "ready".
let cachedApp;

function getAdminApp() {
  if (cachedApp !== undefined) return cachedApp;

  const credential = buildCredential();
  if (!credential) {
    cachedApp = null; // env not set — treat Admin SDK as unavailable
    return cachedApp;
  }

  // getApps() prevents "app already exists" errors during Next.js hot reload:
  // reuse the existing instance if one is already running, otherwise create it.
  cachedApp = getApps().length ? getApps()[0] : initializeApp({ credential });
  return cachedApp;
}

// True when the service-account env vars are present. API routes call this first
// and return a clear error instead of throwing if you haven't added the key yet.
export function isAdminConfigured() {
  return getAdminApp() !== null;
}

// The Admin Auth service — create/update/disable/delete login accounts, and
// verify the ID tokens the browser sends us. Throws a clear error if unconfigured.
export function adminAuth() {
  const app = getAdminApp();
  if (!app) {
    throw new Error(
      "Firebase Admin is not configured. Set FIREBASE_ADMIN_PROJECT_ID, " +
        "FIREBASE_ADMIN_CLIENT_EMAIL and FIREBASE_ADMIN_PRIVATE_KEY."
    );
  }
  return getAuth(app);
}

// The Admin Firestore service — reads/writes documents bypassing security rules
// (safe, because this only runs on the server after we've verified the caller).
export function adminDb() {
  const app = getAdminApp();
  if (!app) {
    throw new Error("Firebase Admin is not configured (see firebase-admin.js).");
  }
  return getFirestore(app);
}
