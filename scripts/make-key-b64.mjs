// One-off helper: prints your FIREBASE_ADMIN_PRIVATE_KEY (from .env.local)
// as a single base64 string to paste into Hostinger. Base64 has no newlines,
// backslashes or quotes, so the host's env-var field cannot corrupt it.
//
// Run:  node scripts/make-key-b64.mjs
// Then copy the printed line into Hostinger → FIREBASE_ADMIN_PRIVATE_KEY.
// This only prints to your terminal; it saves nothing. Delete this file after.

import fs from "node:fs";

const env = fs.readFileSync(".env.local", "utf8");
const m = env.match(/^FIREBASE_ADMIN_PRIVATE_KEY=(.*)$/m);
if (!m) {
  console.error("FIREBASE_ADMIN_PRIVATE_KEY not found in .env.local");
  process.exit(1);
}

// Strip optional surrounding quotes, turn literal \n into real newlines.
let key = m[1].trim().replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");

if (!key.includes("BEGIN PRIVATE KEY")) {
  console.error("That value doesn't look like a PEM private key — aborting.");
  process.exit(1);
}

console.log(Buffer.from(key, "utf8").toString("base64"));
