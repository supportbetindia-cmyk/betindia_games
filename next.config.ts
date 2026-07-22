import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow next/image to load images served from Supabase Storage
    // (https://<project-ref>.supabase.co/storage/v1/object/public/...).
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  // Force the www canonical: permanently redirect the bare apex domain to www,
  // preserving the full path/query. (DNS for www must be configured at the host.)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "betindia.games" }],
        destination: "https://www.betindia.games/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;


