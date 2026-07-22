import type { Metadata } from "next";
import TermsHero from "@/components/legal/TermsHero";
import AcceptanceTerms from "@/components/legal/AcceptanceTerms";
import EligibilitySection from "@/components/legal/EligibilitySection";
import AccountsSection from "@/components/legal/AccountsSection";
import DepositsWithdrawals from "@/components/legal/DepositsWithdrawals";
import ResponsibleGamingTerms from "@/components/legal/ResponsibleGamingTerms";
import LimitationsSection from "@/components/legal/LimitationsSection";
import TermsContact from "@/components/legal/TermsContact";
import { pageMetadata } from "@/lib/seo";

import { getPage } from "@/lib/cms";
import TermsAndConditions from "@/data/terms-and-conditions";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "terms-and-conditions",
    title: "Terms & Conditions",
    description:
      "Read BetIndia's Terms & Conditions covering eligibility, accounts, deposits, withdrawals, responsible gaming, platform usage, and user responsibilities.",
    path: "/terms-and-conditions",
  });
}

export const revalidate = 300;

export default async function TermsAndConditionsPage() {
  const page = await getPage("terms-and-conditions");
  const heroContent = page.hero || TermsAndConditions.sections.hero;

  return (
    <>
      <main className="min-h-screen bg-[#050B18]">
        <TermsHero content={heroContent} />
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
