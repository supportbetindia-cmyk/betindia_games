import type { Metadata } from "next";
import TableGamesHero from "@/components/sections/table-games/TableGamesHero";
import PopularTableGames from "@/components/sections/table-games/PopularTableGames";
import GameRules from "@/components/sections/table-games/GameRules";
import WhyPlayTableGames from "@/components/sections/table-games/WhyPlayTableGames";
import TableGamesCTA from "@/components/sections/table-games/TableGamesCTA";
import { pageMetadata } from "@/lib/seo";

import { getPage } from "@/lib/cms";
import TableGames from "@/data/tablegames";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    pageId: "table-games",
    title: "Table Games",
    description:
      "Play premium table games including Blackjack, Roulette, Baccarat, Teen Patti, and Andar Bahar on BetIndia. Live dealers, fast gameplay, and classic casino excitement.",
    path: "/table-games",
  });
}

export const revalidate = 300;

export default async function TableGamesPage() {
  const page = await getPage("table-games");
  const heroContent = page.hero || TableGames.sections.hero;

  return (
    <>
      <main className="min-h-screen bg-[#050B18]">
        <TableGamesHero content={heroContent} />
        <PopularTableGames />
        <GameRules />
        <WhyPlayTableGames />
        <TableGamesCTA content={page.cta} />
      </main>
    </>
  );
}
