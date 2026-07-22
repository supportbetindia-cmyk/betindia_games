import type { Metadata } from "next";
import TermsHero from "@/components/legal/TermsHero";
import AcceptanceTerms from "@/components/legal/AcceptanceTerms";
import EligibilitySection from "@/components/legal/EligibilitySection";
import AccountsSection from "@/components/legal/AccountsSection";
import DepositsWithdrawals from "@/components/legal/DepositsWithdrawals";
import ResponsibleGamingTerms from "@/components/legal/ResponsibleGamingTerms";
import LimitationsSection from "@/components/legal/LimitationsSection";
import TermsContact from "@/components/legal/TermsContact";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read BetIndia's Terms & Conditions covering eligibility, accounts, deposits, withdrawals, responsible gaming, platform usage, and user responsibilities.",
  robots: { index: false, follow: false },
  alternates: { canonical: canonicalUrl("/terms-and-conditions") },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <main className="min-h-screen bg-[#050B18]">
        <TermsHero />
        <AcceptanceTerms />
        <EligibilitySection />
        <AccountsSection />
        <DepositsWithdrawals />
        <ResponsibleGamingTerms />
        <LimitationsSection />
        <TermsContact />
      </main>
    </>
  );
}
