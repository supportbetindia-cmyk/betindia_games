// lib/permissions.js
// ---------------------------------------------------------------------------
// The single source of truth for "what areas of the admin exist" and the tiny
// helper functions that decide whether a given user may touch a given area.
//
// This file contains NO secrets and NO server-only code, so it is safe to import
// from BOTH the browser (React components) and the server (API routes). Keeping
// the permission list in one place means the sidebar, the page guards, the Team
// screen, and the API all agree on the exact same set of keys.
// ---------------------------------------------------------------------------

// Every grantable section of the admin.
//   key   -> the short id we store in the database (adminUsers.perms[key] = true)
//   label -> what the human sees in the UI
//   paths -> the /admin/... routes that this permission unlocks. Used to map the
//            current URL back to a permission (for the per-page guard) and to
//            filter the sidebar links.
export const SECTIONS = [
  { key: "seo",     label: "SEO Settings", paths: ["/admin/seo"] },
  { key: "images",  label: "Page Images",  paths: ["/admin/images"] },
  { key: "blog",    label: "Blog & Posts", paths: ["/admin/blog", "/admin/posts"] },
  { key: "content", label: "Content",      paths: ["/admin/content"] },
  { key: "social",  label: "Social Links", paths: ["/admin/social"] },
];

// Just the keys, e.g. ["seo","images","blog","content","social"].
// Handy for looping and for validating input coming from the network.
export const SECTION_KEYS = SECTIONS.map((s) => s.key);

// Build a permissions object with every section set to the same value.
//   makePerms(true)  -> { seo:true,  images:true,  ... }  (a superadmin)
//   makePerms(false) -> { seo:false, images:false, ... }  (a brand-new editor)
export function makePerms(value) {
  const perms = {};
  for (const key of SECTION_KEYS) perms[key] = Boolean(value);
  return perms;
}

// Take whatever came from the DB / network and return a clean, complete perms
// object. This guarantees every key exists (defaults to false) and drops any
// unknown keys someone might try to inject — never trust raw input.
export function normalizePerms(input) {
  const perms = makePerms(false);
  if (input && typeof input === "object") {
    for (const key of SECTION_KEYS) {
      if (input[key] === true) perms[key] = true;
    }
  }
  return perms;
}

// The core permission check used everywhere.
//   user  -> the loaded admin record: { role, perms, disabled }
//   key   -> a section key like "seo"
// Rules: a disabled user can do nothing; a superadmin can do everything; an
// editor can only do the sections explicitly granted to them.
export function can(user, key) {
  if (!user || user.disabled) return false;
  if (user.role === "superadmin") return true;
  return Boolean(user.perms && user.perms[key] === true);
}

// Only superadmins may open the Team screen and manage other people.
export function canManageUsers(user) {
  return Boolean(user && !user.disabled && user.role === "superadmin");
}

// Given the current URL (e.g. "/admin/seo/cricket"), find which section it
// belongs to. Returns the section key ("seo") or null if the path isn't gated
// (e.g. the dashboard, which everyone signed-in may see). We match on a path
// prefix so nested routes like "/admin/seo/cricket" resolve to "seo".
export function sectionForPath(pathname) {
  if (!pathname) return null;
  for (const section of SECTIONS) {
    for (const base of section.paths) {
      if (pathname === base || pathname.startsWith(base + "/")) {
        return section.key;
      }
    }
  }
  return null;
}
