import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllSlugs } from "@/lib/blog-data";

const SITEMAP_LAST_MOD = new Date("2026-07-06T06:51:38.000Z");

const STATIC_ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/",                    priority: 1.0,  changeFrequency: "weekly" },
  { path: "/sports",              priority: 0.8,  changeFrequency: "daily"  },
  { path: "/casino",              priority: 0.8,  changeFrequency: "weekly" },
  { path: "/promotions",          priority: 0.8,  changeFrequency: "weekly" },
  { path: "/vip",                 priority: 0.8,  changeFrequency: "monthly"},
  { path: "/betindia.apk",        priority: 0.8,  changeFrequency: "monthly"},
  { path: "/live",                priority: 0.8,  changeFrequency: "always" },
  { path: "/cricket",             priority: 0.8,  changeFrequency: "daily"  },
  { path: "/football",            priority: 0.8,  changeFrequency: "daily"  },
  { path: "/tennis",              priority: 0.8,  changeFrequency: "daily"  },
  { path: "/badminton",           priority: 0.8,  changeFrequency: "daily"  },
  { path: "/volleyball",          priority: 0.8,  changeFrequency: "daily"  },
  { path: "/kabaddi",             priority: 0.8,  changeFrequency: "daily"  },
  { path: "/aviator",             priority: 0.8,  changeFrequency: "weekly" },
  { path: "/esports",             priority: 0.8,  changeFrequency: "daily"  },
  { path: "/andar-bahar",         priority: 0.8,  changeFrequency: "weekly" },
  { path: "/teen-patti",          priority: 0.8,  changeFrequency: "weekly" },
  { path: "/live-casino",         priority: 0.8,  changeFrequency: "weekly" },
  { path: "/slots",               priority: 0.8,  changeFrequency: "weekly" },
  { path: "/table-games",         priority: 0.8,  changeFrequency: "weekly" },
  { path: "/blog",                priority: 0.8,  changeFrequency: "weekly" },
  { path: "/responsible-gaming",  priority: 0.8,  changeFrequency: "monthly"},
  { path: "/about",               priority: 0.8,  changeFrequency: "monthly"},
  { path: "/contact",             priority: 0.8,  changeFrequency: "monthly"},
  { path: "/privacy-policy",      priority: 0.8,  changeFrequency: "yearly" },
  { path: "/terms-and-conditions",priority: 0.8,  changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: SITEMAP_LAST_MOD,
    changeFrequency,
    priority,
  }));

  const slugs = await getAllSlugs();
  const blogEntries = slugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...blogEntries];
}
