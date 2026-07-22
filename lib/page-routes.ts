// Maps a CMS pageId (the Firestore pages/{pageId} document id) to the public
// route it renders at. Used for on-demand revalidation when content/SEO is
// edited in the admin, so the live page refreshes immediately instead of
// waiting for the ISR `revalidate` window.
//
// Note: some routes differ from their pageId (e.g. about-us → /about).

export const PAGE_ROUTES: Record<string, string> = {
  home: "/",
  casino: "/casino",
  sports: "/sports",
  cricket: "/cricket",
  football: "/football",
  tennis: "/tennis",
  slots: "/slots",
  "table-games": "/table-games",
  promotions: "/promotions",
  "about-us": "/about",
  "responsible-gaming": "/responsible-gaming",
  "contact-us": "/contact",
  "privacy-policy": "/privacy-policy",
  "terms-and-conditions": "/terms-and-conditions",
  "vip-benefits": "/vip",
  badminton: "/badminton",
  volleyball: "/volleyball",
  blog: "/blog",
  live: "/live",
  "live-casino": "/live-casino",
  esports: "/esports",
  "andar-bahar": "/andar-bahar",
  kabaddi: "/kabaddi",
  "teen-patti": "/teen-patti",
  aviator: "/aviator",
};

/** Public route for a pageId, or null if the pageId isn't a known public route. */
export function routeForPage(pageId: string): string | null {
  return PAGE_ROUTES[pageId] ?? null;
}
