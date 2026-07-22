export type TeamInfo = {
  name: string;
  shortname: string;
  img: string;
};

export type Score = {
  r: number;
  w: number;
  o: number;
  inning: string;
};

export type Match = {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  teams: string[];
  teamInfo?: TeamInfo[];
  score?: Score[];
  matchStarted?: boolean;
  matchEnded?: boolean;
};

export async function fetchCurrentMatches(): Promise<Match[]> {
  const res = await fetch("/api/cricket/live", { cache: "no-store" });
  if (!res.ok) throw new Error(`/api/cricket/live responded with ${res.status}`);
  const json: { matches: Match[] } = await res.json();
  return json.matches ?? [];
}

export function isLiveMatch(match: Match): boolean {
  if (
    typeof match.matchStarted === "boolean" &&
    typeof match.matchEnded === "boolean"
  ) {
    return match.matchStarted && !match.matchEnded;
  }
  const s = match.status.toLowerCase();
  return (
    !s.includes("match not started") &&
    !s.includes("won by") &&
    !s.includes("abandoned") &&
    !s.includes("no result")
  );
}

export function formatMatchType(type: string): string {
  const map: Record<string, string> = {
    t20: "T20",
    t20i: "T20I",
    odi: "ODI",
    test: "TEST",
    ipl: "IPL",
  };
  return map[type.toLowerCase()] ?? type.toUpperCase();
}

export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}
