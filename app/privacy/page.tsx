import type { Metadata } from "next";
import PrivacyHero from "@/components/legal/PrivacyHero";
import InformationCollection from "@/components/legal/InformationCollection";
import DataUsage from "@/components/legal/DataUsage";
import CookiesSection from "@/components/legal/CookiesSection";
import SecuritySection from "@/components/legal/SecuritySection";
import UserRights from "@/components/legal/UserRights";
import PrivacyContact from "@/components/legal/PrivacyContact";
import PrivacyChatbot from "@/components/legal/PrivacyChatbot";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how BetIndia collects, uses, stores, and protects user information through our Privacy Policy and data protection practices.",
  robots: { index: false, follow: false },
  alternates: { canonical: canonicalUrl("/privacy-policy") },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="min-h-screen bg-[#050B18] no-center-mobile">
        <PrivacyHero />
        <InformationCollection />
        <DataUsage />
        <CookiesSection />
        <SecuritySection />
        <UserRights />
        <PrivacyContact />
      </main>
      <PrivacyChatbot />
    </>
  );
}
