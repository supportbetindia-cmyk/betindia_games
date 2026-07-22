import type { Metadata } from "next";
import { Poppins, Geist_Mono, Hedvig_Letters_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_CONFIG, SITE_URL } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | BetIndia",
    default: "BetIndia – Trusted Online Cricket ID & Casino Platform",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "sports betting india",
    "cricket betting",
    "IPL betting",
    "live casino india",
    "online casino india",
    "casino bonus india",
    "teen patti online",
    "aviator game",
    "betindia",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_URL }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_URL,
    siteName: SITE_CONFIG.name,
    title: "BetIndia – Trusted Online Cricket ID & Casino Platform",
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "BetIndia – Trusted Online Cricket ID & Casino Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BetIndia – Trusted Online Cricket ID & Casino Platform",
    description: "Trusted Online Cricket ID, Sports Betting, Live Casino, and Aviator Games in India.",
    images: [SITE_CONFIG.ogImage],
    creator: SITE_CONFIG.twitterHandle,
    site: SITE_CONFIG.twitterHandle,
  },
  verification: {
    google: "icUDRvrJyB5q9QNqfxYfFEqyyIqVA9BybExhDOQ4OGE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} h-full overflow-x-clip antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <Header/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        {children}

        <Footer/>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3CMQL9XS8C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3CMQL9XS8C');
          `}
        </Script>
      </body>
    </html>
  );
}
  