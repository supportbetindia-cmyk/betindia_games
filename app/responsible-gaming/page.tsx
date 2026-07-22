import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import ResponsibleGaming, { responsibleGamingContent } from "@/data/responsible-gaming";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "responsible-gaming",
    title: "Responsible Gaming",
    description:
      "BetIndia's commitment to responsible gaming. Understand safe betting practices, warning signs, player protection tools, and how to seek support.",
    path: "/responsible-gaming",
  });
}

export const revalidate = 300;

export default async function ResponsibleGamingPage() {
  const page = await getPage("responsible-gaming");
  const layout = { ...responsibleGamingContent.layout, ...(page.layout ?? {}) };
  const intro = page.hero?.description || layout.intro || responsibleGamingContent.hero.description;
  const sections =
    page.sections && page.sections.length > 0 ? page.sections : responsibleGamingContent.sections;

  return (
    <LegalLayout
      badge={layout.badge}
      title={layout.title}
      accentTitle={layout.accentTitle}
      lastUpdated={layout.lastUpdated}
      preparedBy={layout.preparedBy}
      intro={intro}
      sections={sections}
      relatedLinks={layout.relatedLinks}
      footerNote={layout.footerNote}
    />
  );
}
