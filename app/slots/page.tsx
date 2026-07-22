import type { Metadata } from "next";
import SlotsHero from "@/components/sections/slots/SlotsHero";
import PopularSlots from "@/components/sections/slots/PopularSlots";
import JackpotSlots from "@/components/sections/slots/JackpotSlots";
import SlotsCTA from "@/components/sections/slots/SlotsCTA";
import FAQ from "@/components/sections/FAQ";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/cms";
import slots, { slotsContent } from "@/data/slots";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "slots",
    title: "Online Slot Games India",
    description:
      "Play classic slots, video slots, progressive jackpot slots, and bonus buy games on BetIndia. 500+ slot games with free spins, bonus features, and mobile-friendly gameplay.",
    path: "/slots",
  });
}

export const revalidate = 300;

function CenteredSeoSection({ title, text }: { title: string; text: string }) {
  return (
    <section className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
          {title.includes("BetIndia") ? (
            <>
              Why Players Choose{" "}
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
                BetIndia Slots
              </span>
            </>
          ) : title.includes("India") ? (
            <>
              Online Slot Games{" "}
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
                India
              </span>
            </>
          ) : (
            title
          )}
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-slate-300 whitespace-pre-line sm:text-base">
          {text}
        </p>
      </div>
    </section>
  );
}

export default async function SlotsPage() {
  const page = await getPage("slots");
  const heroContent = page.hero || slotsContent.hero;
  const intro = { ...slotsContent.intro, ...(page.intro ?? {}) };
  const whyChoose = { ...slotsContent.whyChoose, ...(page.whyChoose ?? {}) };

  return (
    <>
      <main>
        <SlotsHero content={heroContent} />
        <CenteredSeoSection title={intro.title} text={intro.text} />
        <PopularSlots />
        <JackpotSlots />
        <CenteredSeoSection title={whyChoose.title} text={whyChoose.text} />
        <FAQ content={page.faq} defaultContent={slotsContent.faq} />
        <SlotsCTA content={page.cta} />
      </main>
    </>
  );
}
