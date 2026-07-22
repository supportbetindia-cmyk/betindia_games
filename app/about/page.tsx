import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutIntro from "@/components/sections/about/AboutIntro";
import WhatWeOffer from "@/components/sections/about/WhatWeOffer";
import WhyChooseAbout from "@/components/sections/about/WhyChooseAbout";
import AboutCTA from "@/components/sections/about/AboutCTA";
import FAQ from "@/components/sections/FAQ";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import AboutUs, { aboutUsContent } from "@/data/AboutUs";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "about-us",
    title: "About BetIndia",
    description:
      "Learn about BetIndia — India's trusted online sports betting and casino platform. Live sports, casino games, secure payments, and premium gaming for players across India.",
    path: "/about",
  });
}

export const revalidate = 300;

export default async function AboutPage() {
  const page = await getPage("about-us");
  const heroContent = page.hero || aboutUsContent.hero;

  return (
    <>
      <main className="min-h-screen bg-[#050B18] text-white">
        <AboutHero content={heroContent} />
        <AboutIntro />
        <WhatWeOffer />
        <WhyChooseAbout />
        <FAQ content={page.faq} defaultContent={aboutUsContent.faq} />
        <AboutCTA content={page.cta} />
      </main>
    </>
  );
}
