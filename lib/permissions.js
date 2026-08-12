
export const SECTIONS = [
  { key: "seo",     label: "SEO Settings", paths: ["/admin/seo"] },
  { key: "images",  label: "Page Images",  paths: ["/admin/images"] },
  { key: "blog",    label: "Blog & Posts", paths: ["/admin/blog", "/admin/posts"] },
  { key: "content", label: "Content",      paths: ["/admin/content"] },
  { key: "social",  label: "Social Links", paths: ["/admin/social"] },
];

export const SECTION_KEYS = SECTIONS.map((s) => s.key);


export function makePerms(value) {
  const perms = {};
  for (const key of SECTION_KEYS) perms[key] = Boolean(value);
  return perms;
}


export function normalizePerms(input) {
  const perms = makePerms(false);
  if (input && typeof input === "object") {
    for (const key of SECTION_KEYS) {
      if (input[key] === true) perms[key] = true;
    }
  }
  return perms;
}

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
