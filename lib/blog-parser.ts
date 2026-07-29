import type { BlogSection } from "./blog-posts";

export type ParsedArticleResult = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  sections: BlogSection[];
};

/**
 * Auto-detects and converts HTML links, markdown links, and raw URLs (https://, http://, www.)
 * into standard markdown link format [Label](URL).
 */
export function convertUrlsToMarkdown(text: string): string {
  if (!text) return "";
  // Convert HTML anchor tags <a href="url">text</a> to markdown [text](url)
  let result = text.replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, "[$2]($1)");

  // Convert raw standalone URLs (https://, http://, www.) into [url](url) without touching existing markdown links
  const markdownOrUrlRegex = /\[([^\]]+)\]\(([^)]+)\)|((?:https?:\/\/|www\.)[^\s<]+)/gi;

  return result.replace(markdownOrUrlRegex, (match, mdLabel, mdUrl, rawUrl) => {
    if (mdLabel && mdUrl) {
      return match;
    }
    if (rawUrl) {
      let cleanUrl = rawUrl;
      let trailingPunct = "";
      if (/[.,;!?]$/.test(cleanUrl)) {
        trailingPunct = cleanUrl.slice(-1);
        cleanUrl = cleanUrl.slice(0, -1);
      }
      const href = cleanUrl.toLowerCase().startsWith("www.") ? `https://${cleanUrl}` : cleanUrl;
      return `[${cleanUrl}](${href})${trailingPunct}`;
    }
    return match;
  });
}

/** Counts [Label](URL) markdown links in a piece of text. */
export function countMarkdownLinks(text: string): number {
  if (!text) return 0;
  return (text.match(/\[[^\]]+\]\([^)]+\)/g) || []).length;
}

const SKIP_TAGS = new Set(["style", "script", "head", "meta", "title", "noscript", "img", "svg"]);

function inlineText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return (node.textContent || "").replace(/\s+/g, " ");
  if (node.nodeType !== Node.ELEMENT_NODE) return "";
  const el = node as HTMLElement;
  const tag = el.tagName.toLowerCase();
  if (SKIP_TAGS.has(tag)) return "";
  if (tag === "br") return "\n";
  const inner = Array.from(el.childNodes).map(inlineText).join("");
  if (tag === "a") {
    const href = (el.getAttribute("href") || "").trim();
    const label = inner.replace(/\s+/g, " ").trim();
    // Skip in-page anchors (footnotes, TOC jumps) — keep just their text.
    if (!href || href.startsWith("#")) return inner;
    return label ? `[${label}](${href})` : href;
  }
  return inner;
}

function serializeBlocks(el: Element, out: string[]): void {
  Array.from(el.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const t = (node.textContent || "").replace(/\s+/g, " ").trim();
      if (t) out.push(t);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const child = node as HTMLElement;
    const tag = child.tagName.toLowerCase();
    if (SKIP_TAGS.has(tag)) return;

    const headingMatch = tag.match(/^h([1-6])$/);
    if (headingMatch) {
      const t = inlineText(child).trim();
      if (t) out.push("#".repeat(Number(headingMatch[1])) + " " + t);
      return;
    }
    if (tag === "ul" || tag === "ol") {
      const items: string[] = [];
      Array.from(child.children).forEach((li) => {
        if (li.tagName.toLowerCase() !== "li") return;
        const t = inlineText(li).trim();
        if (t) items.push("- " + t);
      });
      if (items.length) out.push(items.join("\n"));
      return;
    }
    if (tag === "p") {
      const t = inlineText(child).trim();
      if (t) out.push(t);
      return;
    }
    // Containers (div, section, td, blockquote, Google Docs <b> wrappers, ...):
    // recurse when they hold block children, otherwise treat as one paragraph.
    if (child.querySelector("p, h1, h2, h3, h4, h5, h6, ul, ol, div, table, blockquote")) {
      serializeBlocks(child, out);
    } else {
      const t = inlineText(child).trim();
      if (t) out.push(t);
    }
  });
}

/**
 * Converts pasted rich-text HTML (Google Docs, Word, web pages) into plain
 * article text that keeps its structure: <h1-6> become # headings, <a> tags
 * become [Label](URL) markdown links, and <li> items become "- " bullets.
 * Without this, pasting into a textarea silently drops every link.
 */
export function htmlToArticleText(html: string): string {
  if (!html || typeof DOMParser === "undefined") return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  const out: string[] = [];
  serializeBlocks(doc.body, out);
  return out.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
}

/**
 * Auto-detects headings, paragraphs, title, excerpt, and FAQs from raw pasted text.
 */
export function parseRawArticleText(rawText: string): ParsedArticleResult {
  // Convert any HTML anchor tags, raw URLs (http/https/www), or markdown links
  const textWithMarkdownLinks = convertUrlsToMarkdown(rawText);
  const trimmed = textWithMarkdownLinks.trim();
  if (!trimmed) {
    return {
      title: "",
      slug: "",
      category: "Casino",
      excerpt: "",
      readTime: "3 min read",
      tags: ["Casino", "Gaming"],
      sections: [],
    };
  }

  // Normalize line breaks and split into non-empty blocks
  const blocks = trimmed
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  if (blocks.length === 0) {
    return {
      title: "",
      slug: "",
      category: "Casino",
      excerpt: "",
      readTime: "3 min read",
      tags: [],
      sections: [],
    };
  }

  // We process blocks or line-by-line if blocks contain embedded headings
  const lines: string[] = [];
  blocks.forEach((block) => {
    const blockLines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    lines.push(...blockLines);
  });

  // Helper to determine if a line is a Heading
  function isHeading(line: string, index: number): boolean {
    // Markdown headers (# Heading, ## Heading)
    if (/^#{1,6}\s+/.test(line)) return true;

    // Bold headings (**Heading**)
    if (/^\*\*[^*]+\*\*$/.test(line)) return true;

    // Numbered headings (1. Heading, 1.1 Heading)
    if (/^\d+(\.\d+)*\.\s+[A-Z]/.test(line) && line.length < 90) return true;

    // Line ends with a question mark (e.g. "What Is Live Casino India?", "What is live casino india?")
    if (line.endsWith("?") && line.length < 110) return true;

    // Known section titles or standalone keywords
    const lower = line.toLowerCase();
    const headingKeywords = [
      "conclusion",
      "frequently asked questions",
      "faq",
      "faqs",
      "overview",
      "summary",
      "final thoughts",
      "key takeaways",
      "table of contents",
      "how to play",
      "why choose",
      "benefits of",
    ];
    if (headingKeywords.some((k) => lower === k || lower.startsWith(k + ":") || lower.startsWith(k + " "))) {
      return true;
    }

    // Short line without sentence punctuation (., !, ;)
    const endsWithPunct = /[.!;]$/.test(line);
    if (line.length <= 85 && !endsWithPunct && /^[A-Z0-9]/.test(line)) {
      const wordCount = line.split(/\s+/).length;
      if (wordCount <= 14) {
        return true;
      }
    }

    return false;
  }

  // Clean heading text (remove markdown #, **, numbering prefixes)
  function cleanHeading(line: string): string {
    return line
      .replace(/^#{1,6}\s+/, "")
      .replace(/^\*\*(.*)\*\*$/, "$1")
      .replace(/^\d+(\.\d+)*\.\s+/, "")
      .trim();
  }

  let title = "";
  let introParagraphs: string[] = [];
  const rawSections: { heading: string; paragraphs: string[]; bullets: string[] }[] = [];

  let currentHeading = "";
  let currentParagraphs: string[] = [];
  let currentBullets: string[] = [];

  lines.forEach((line, idx) => {
    // Check if line is bullet point
    const bulletMatch = line.match(/^[-*•]\s+(.*)$/) || line.match(/^\d+\)\s+(.*)$/);
    if (bulletMatch && currentHeading) {
      currentBullets.push(bulletMatch[1].trim());
      return;
    }

    if (isHeading(line, idx)) {
      const cleanH = cleanHeading(line);

      if (!title && idx === 0) {
        // First line is Title
        title = cleanH;
        return;
      }

      // If we already had a section running, store it
      if (currentHeading) {
        rawSections.push({
          heading: currentHeading,
          paragraphs: currentParagraphs,
          bullets: currentBullets,
        });
        currentParagraphs = [];
        currentBullets = [];
      } else if (currentParagraphs.length > 0) {
        introParagraphs = [...currentParagraphs];
        currentParagraphs = [];
      }

      currentHeading = cleanH;
    } else {
      // It's a paragraph line
      if (!title && idx === 0 && line.length < 120) {
        title = line;
      } else {
        currentParagraphs.push(line);
      }
    }
  });

  // Push final section
  if (currentHeading) {
    rawSections.push({
      heading: currentHeading,
      paragraphs: currentParagraphs,
      bullets: currentBullets,
    });
  } else if (currentParagraphs.length > 0) {
    introParagraphs.push(...currentParagraphs);
  }

  // Build final sections
  const sections: BlogSection[] = [];

  if (introParagraphs.length > 0) {
    sections.push({
      heading: "Overview",
      content: introParagraphs.join("\n\n"),
    });
  }

  rawSections.forEach((sec) => {
    sections.push({
      heading: sec.heading,
      content: sec.paragraphs.join("\n\n"),
      ...(sec.bullets.length > 0 ? { bullets: sec.bullets } : {}),
    });
  });

  // Slug generation
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  // Category auto-detection
  let category = "Live Casino";
  const titleLower = title.toLowerCase();
  if (titleLower.includes("cricket") || titleLower.includes("ipl")) {
    category = "Cricket Betting";
  } else if (titleLower.includes("aviator") || titleLower.includes("crash")) {
    category = "Casino";
  } else if (titleLower.includes("poker") || titleLower.includes("teen patti")) {
    category = "Live Casino";
  }

  // Tags auto-detection
  const tagsSet = new Set<string>();
  if (titleLower.includes("aviator")) tagsSet.add("Aviator");
  if (titleLower.includes("casino")) tagsSet.add("Live Casino");
  if (titleLower.includes("online")) tagsSet.add("Online Gaming");
  if (titleLower.includes("real-time") || titleLower.includes("real time")) tagsSet.add("Real Time");
  if (titleLower.includes("india")) tagsSet.add("India");
  if (tagsSet.size === 0) tagsSet.add("Casino");

  // Excerpt auto-generation
  let excerpt = "";
  const firstContent = introParagraphs.join(" ") || (sections[0] ? sections[0].content : "");
  if (firstContent) {
    excerpt = firstContent.slice(0, 160).trim();
    if (firstContent.length > 160) excerpt += "...";
  }

  // Read time calculation
  const totalWords = trimmed.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(totalWords / 200));
  const readTime = `${minutes} min read`;

  return {
    title,
    slug,
    category,
    excerpt,
    readTime,
    tags: Array.from(tagsSet),
    sections,
  };
}

export const SAMPLE_PASTE_TEXT = `Live Casino India: Play Aviator Online for Real-Time Gaming Excitement
Live casino gaming has captured the attention of players who want more than static digital games. The combination of real dealers, instant decisions, and social energy creates an experience that feels closer to a physical casino. Across the country, live casino india continues to grow as mobile internet improves and players seek authentic, real-time casino experiences from home.
One title that has stood out in this wave is the Live Aviator Game. Its fast rounds, rising multiplier, and simple cash-out decision have made it a favourite for both new and experienced players. Platforms such as BetIndia bring these options together in one place, offering a clean way to explore live tables and crash-style games without unnecessary complexity.
What Is Live Casino India?
Live casino india refers to online platforms that stream real casino tables hosted by professional dealers. Instead of random-number generators alone, you watch actual cards being dealt or wheels being spun in high-definition video.
Live dealers run the games in real time. You place bets through the interface, and results appear on screen as they happen. Most platforms also optimise the experience for mobile devices, so you can join a table from a phone or tablet with a stable internet.
Compared with traditional online casino games, live versions add human interaction, visual transparency, and a stronger sense of presence. The result is a more engaging form of casino entertainment that many players prefer once they try it.
Why Players Love Playing Live Casino Games
Several features explain the lasting appeal of live casino games. Real interaction with dealers and other players creates a social atmosphere that pure software games rarely match. HD streaming lets you see every detail clearly, while professional dealers keep the pace smooth and professional.
Gameplay often feels faster because there is no waiting for complex animations. Mobile compatibility means you can switch devices without losing access. Secure gaming standards, including encrypted connections and regulated environments, further increase confidence. Together these elements deliver a modern, convenient gaming experience that fits busy lifestyles.
What Is the Live Aviator Game?
The Live Aviator Game is a popular crash-style title. A virtual plane takes off and a multiplier begins rising from 1x upward. Players place bets before or at the start of the round and must cash out before the plane flies away. The longer you wait, the higher the potential multiplier and the greater the risk of losing the stake if the plane disappears first.
Its popularity comes from the perfect balance of risk and reward, transparent real-time action, and extremely simple rules. No complicated paylines or bonus rounds exist. Beginners can understand the core idea within one or two rounds, which makes the Live Aviator Game an accessible entry point into live casino games and multiplayer casino games.
How to Play Aviator Online
Understand the Game Rules
Place your stake before the round begins. Watch the multiplier climb and cash out at any moment. If you cash out successfully, you receive your stake multiplied by the displayed figure. If the plane flies away first, that bet is lost. Many versions allow two independent bets in the same round.
Start With Small Bets
Begin with modest amounts while you learn the rhythm. Small stakes reduce pressure and help you observe how quickly the multiplier can change. Once comfortable, you can adjust sizes according to your budget.
Watch Previous Rounds
Most interfaces show a history of recent crash points. Reviewing these results gives a feel for short-term patterns, although every round remains independent. Use the information as context rather than a prediction tool.
Use Auto Cash-Out Carefully
Auto cash-out lets you set a target multiplier in advance. It removes emotional hesitation when the number climbs. Set realistic targets and review them regularly so the feature supports your plan instead of working against it.
Set a Budget Before Playing
Decide the maximum amount you are willing to spend in a session and stick to it. Separate this bankroll from everyday funds. Clear limits protect both your enjoyment and your finances.
Avoid Chasing Losses
After a losing round it is tempting to increase stakes to recover quickly. This approach usually leads to larger losses. Pause, reset, and return only when you can follow your original plan.
Play Responsibly
Treat the Live Aviator Game as entertainment. Take breaks, never play when tired or upset, and stop immediately if the session stops feeling fun. Responsible habits keep online gaming sustainable.
Benefits of Playing Live Aviator Game
The Live Aviator Game offers quick rounds that often last under a minute, delivering constant real-time excitement. The interactive multiplayer element lets you see other players’ bets and cash-outs, adding a social layer. It runs smoothly on mobile devices, features an easy learning curve, and suits beginners who want fast results without complex rules. These qualities make Play Aviator Online sessions easy to fit into short free moments.
Popular Live Casino Games Available
Beyond the Live Aviator Game, most live casino india platforms offer classic live table games. Blackjack provides strategic decisions against the dealer. Roulette delivers simple red-black or number bets with clear visuals. Baccarat appeals to players who prefer low-complexity, high-pace action. Regional favourites such as Teen Patti and Dragon Tiger attract local audiences, while live poker variants add deeper skill elements.
The Live Aviator Game complements these options by offering a completely different rhythm: short, high-intensity rounds that contrast with the longer flow of traditional live dealer casino tables.
Tips to Improve Your Live Casino Experience
Manage your bankroll by setting both session and daily limits. Take time to understand the specific rules of each game before committing real money. Avoid emotional decisions after wins or losses. Play only on a stable internet connection to prevent disconnections at critical moments. Explore table limits so you never sit at stakes outside your comfort zone. Practise responsible gaming by scheduling breaks and knowing when to stop. Finally, choose trusted platforms that prioritise secure gaming and clear terms.
Why BetIndia Stands Out
BetIndia brings together a wide selection of live casino games, including the Live Aviator Game and popular live table options. The interface is designed for easy navigation, whether you play on desktop or mobile. Smooth performance, modern design, and a focus on reliable customer experience help players move quickly between games. Competitive gaming options and straightforward layout make it practical for both newcomers exploring live casino india and regular players seeking a dependable online casino platform.
Responsible Gaming Matters
Set clear spending limits before you start and treat them as non-negotiable. Take regular breaks to stay fresh. Never chase losses, accept that variance is part of every game. Play purely for entertainment and stop as soon as the activity stops feeling enjoyable. Knowing when to walk away is the most important skill any player can develop.
Conclusion
Live casino india continues to attract players because it combines real-time gameplay, professional dealers, and convenient mobile access. Many users choose to Play Aviator Online precisely for its fast-paced, easy-to-learn style that delivers instant excitement. The Live Aviator Game sits comfortably alongside classic live table games, giving players variety within a single session.
Platforms like BetIndia offer a user-friendly environment for exploring these experiences. Whether you prefer crash-style action or traditional live dealer tables, a thoughtful approach and responsible habits will always improve the overall gaming experience.
Ready to explore? Visit BetIndia to discover its live casino offerings and see how the Live Aviator Game and other real-time titles can fit your style of play.
Frequently Asked Questions
What is live casino india?
Live casino india describes online platforms that stream real casino tables with professional dealers in real time. Players watch HD video of cards, wheels, or other equipment and place bets through a digital interface. The format combines the atmosphere of a physical casino with the convenience of playing from home or on mobile, making it one of the fastest-growing segments of online gaming.
How does the Live Aviator Game work?
In the Live Aviator Game a virtual plane takes off and a multiplier begins rising. You place one or two bets and must cash out before the plane flies away. Successful cash-outs pay your stake multiplied by the current figure. If the plane disappears first, the bet is lost. Rounds are short, transparent, and independent of previous results.
Is it easy to play Aviator Online for beginners?
Yes. Playing Aviator Online requires almost no prior knowledge. The only decision is when to cash out. Most platforms show recent results and offer auto cash-out tools. Starting with small stakes and watching a few rounds first helps new players grasp the timing and risk quickly without pressure.
What makes live casino games different from regular online casino games?
Live casino games feature real human dealers and actual physical equipment streamed in high definition. Regular online casino games usually rely solely on random-number generators and animated graphics. The live format adds social interaction, visual transparency, and a stronger sense of presence that many players find more engaging.
Can I play live casino games on mobile devices?
Most modern platforms optimise live casino games and the Live Aviator Game for mobile browsers and apps. As long as you have a stable internet connection, you can join tables, place bets, and cash out from a smartphone or tablet with the same functionality available on desktop.
What should beginners know before trying live casino games?
Beginners should learn the basic rules of any game they join, set a strict budget, and start with the lowest available stakes. Practise responsible habits from the first session, take breaks, avoid chasing losses, and treat the activity as entertainment. Choosing a reputable platform with clear limits and secure gaming features also helps.
Why is the Live Aviator Game becoming popular among online players?
The Live Aviator Game offers fast rounds, simple rules, and a clear risk-reward decision that appeals to a wide audience. Its multiplayer visibility, mobile-friendly design, and instant results create repeated excitement in short sessions. These qualities have helped it become one of the most played crash games across online casino platforms.`;
