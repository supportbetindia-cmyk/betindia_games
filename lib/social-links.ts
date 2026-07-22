// Social links shown in the footer. Managed from Admin → Social Links and
// stored in Firestore at pages/settings/section/social = { items: [...] }.
// Falls back to these defaults when nothing is saved yet.

export type SocialLink = {
  label: string;
  href: string;
  icon: string; // one of SOCIAL_ICON_OPTIONS
};

// Icon keys the admin can pick from (mapped to brand SVGs in the Footer).
export const SOCIAL_ICON_OPTIONS = [
  "instagram",
  "twitter",
  "x",
  "facebook",
  "youtube",
  "linkedin",
  "telegram",
  "whatsapp",
  "globe",
] as const;

export const DEFAULT_SOCIALS: SocialLink[] = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Twitter / X", href: "#", icon: "x" },
  { label: "Telegram", href: "#", icon: "telegram" },
];
