import {
  Trophy,
  BarChart2,
  Zap,
  Gem,
  Users,
  FileText,
  type LucideIcon,
} from "lucide-react";

// ─── Icon registry ──────────────────────────────────────────────────────────
// Firestore can only store serializable data, so a post's icon is persisted as
// a string name (e.g. "Trophy"). This registry maps those names back to the
// Lucide components at render time, and back again for seeding.

export const BLOG_ICONS: Record<string, LucideIcon> = {
  Trophy,
  BarChart2,
  Zap,
  Gem,
  Users,
  FileText,
};

const FALLBACK_NAME = "FileText";

/** Resolve a stored icon name to its Lucide component (falls back to FileText). */
export function iconFromName(name: string | undefined): LucideIcon {
  return (name && BLOG_ICONS[name]) || BLOG_ICONS[FALLBACK_NAME];
}

/** Resolve a Lucide component back to its registry name (used when seeding). */
export function nameFromIcon(icon: LucideIcon): string {
  const entry = Object.entries(BLOG_ICONS).find(([, comp]) => comp === icon);
  return entry ? entry[0] : FALLBACK_NAME;
}
