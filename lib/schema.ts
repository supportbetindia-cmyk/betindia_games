import { SITE_CONFIG, SITE_URL } from "./seo";
import type { BlogPost } from "./blog-posts";

// ─── Shared publisher identity ─────────────────────────────────────────────────

const PUBLISHER = {
  "@type": "Organization",
  name: SITE_CONFIG.name,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}${SITE_CONFIG.logo}`,
  },
};

// ─── Global schemas ────────────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}${SITE_CONFIG.logo}`,
      width: 200,
      height: 60,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [] as string[],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_URL,
    description: SITE_CONFIG.description,
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── Article schemas ───────────────────────────────────────────────────────────

export function articleSchema(post: BlogPost, url: string) {
  const isoDate = `${parsePublishDate(post.publishDate)}T00:00:00+05:30`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}${SITE_CONFIG.ogImage}`,
      width: 1200,
      height: 630,
    },
    author: PUBLISHER,
    publisher: PUBLISHER,
    datePublished: isoDate,
    dateModified: isoDate,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "en",
  };
}

// Parses FAQ bullets formatted as "Question text — Answer text"
export function faqSchema(post: BlogPost) {
  const faqSection = post.sections.find(
    (s) =>
      s.heading.toLowerCase().includes("frequently asked") ||
      s.heading.toLowerCase().includes("faq")
  );

  if (!faqSection?.bullets?.length) return null;

  const mainEntity = faqSection.bullets
    .map((bullet) => {
      const sepIdx = bullet.indexOf(" — ");
      if (sepIdx === -1) return null;
      return {
        "@type": "Question",
        name: bullet.slice(0, sepIdx).trim(),
        acceptedAnswer: {
          "@type": "Answer",
          text: bullet.slice(sepIdx + 3).trim(),
        },
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (!mainEntity.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Date helper ──────────────────────────────────────────────────────────────

const MONTH_TO_NUM: Record<string, string> = {
  January: "01", February: "02", March: "03",   April: "04",
  May: "05",     June: "06",     July: "07",    August: "08",
  September: "09", October: "10", November: "11", December: "12",
};

export function parsePublishDate(publishDate: string): string {
  const parts = publishDate.trim().split(" ");
  if (parts.length === 2) {
    const month = MONTH_TO_NUM[parts[0]];
    const year = parts[1];
    if (month && year) return `${year}-${month}-01`;
  }
  return new Date().toISOString().split("T")[0];
}
