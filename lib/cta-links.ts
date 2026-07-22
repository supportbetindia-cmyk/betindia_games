// ─── CTA Link Registry ────────────────────────────────────────────────────────
// Single source of truth for all affiliate / CTA destination URLs.
// Changing a value here updates every CTA across the site.

export const CTA_LINKS = {
  signup:     "https://www.betindia.bet/",
  sports:     "/sports",
  casino:     "/casino",
  vip:        "/vip",
  promotions: "/promotions",
} as const;

export type CTAKey = keyof typeof CTA_LINKS;
