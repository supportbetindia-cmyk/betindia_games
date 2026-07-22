import type { Metadata } from "next";
import { getPageMeta } from "./cms";

// ─── Site constants ───────────────────────────────────────────────────────────

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.betindia.games";

export const SITE_CONFIG = {
  name: "BetIndia",
  url: SITE_URL,
  description:
    "Get your trusted Online Cricket ID with BetIndia. Play Cricket Exchange, Live Casino, Sports Betting, and Aviator Games securely in India.",
  logo: "/logo/betindialogo.png",
  ogImage: "/og-image.jpg",
  twitterHandle: "@BetIndia",
  locale: "en_IN",
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

// ─── Static page metadata factory ─────────────────────────────────────────────
// Generates canonical + OG + Twitter for any static page.
// Pass `absoluteTitle` to bypass the layout template (e.g. homepage).

export function staticPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  absoluteTitle?: string;
}): Metadata {
  const url = canonicalUrl(path);
  const ogTitle = absoluteTitle ?? `${title} | ${SITE_CONFIG.name}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: ogTitle,
      description,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: path === "/" ? "Trusted Online Cricket ID, Sports Betting, Live Casino, and Aviator Games in India." : description,
      images: [SITE_CONFIG.ogImage],
    },
  };
}

// ─── CMS-aware page metadata ──────────────────────────────────────────────────
// Same as staticPageMetadata, but first looks up the page's CMS-managed SEO
// (meta title / description edited in Admin → SEO Settings, stored on the
// pages/{pageId} document). Any value set there overrides the code default; if
// the document or field is missing, the static defaults are used. A custom meta
// title is treated as the exact, full <title> (it bypasses the "%s | BetIndia"
// template).

export async function pageMetadata({
  pageId,
  title,
  description,
  path,
  noIndex = false,
  absoluteTitle,
}: {
  pageId: string;
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  absoluteTitle?: string;
}): Promise<Metadata> {
  let resolvedDescription = description;
  let resolvedAbsoluteTitle = absoluteTitle;

  try {
    const meta = await getPageMeta(pageId);
    const metaTitle =
      typeof meta?.metaTitle === "string" ? meta.metaTitle.trim() : "";
    const metaDescription =
      typeof meta?.metaDescription === "string" ? meta.metaDescription.trim() : "";

    if (metaTitle) resolvedAbsoluteTitle = metaTitle;
    if (metaDescription) resolvedDescription = metaDescription;
  } catch {
    // Fall back to the static defaults on any read error.
  }

  return staticPageMetadata({
    title,
    description: resolvedDescription,
    path,
    noIndex,
    absoluteTitle: resolvedAbsoluteTitle,
  });
}
