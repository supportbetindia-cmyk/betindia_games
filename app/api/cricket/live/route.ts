import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RawMatch = {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT?: string;
  teams: string[];
  teamInfo?: { name: string; shortname: string; img: string }[];
  score?: { r: number; w: number; o: number; inning: string }[];
  matchStarted?: boolean;
  matchEnded?: boolean;
};

export async function GET() {
  const apiKey = process.env.CRICKET_API_KEY;

  console.log("[CricAPI] CRICKET_API_KEY configured:", !!apiKey);

  if (!apiKey) {
    console.error("[CricAPI] CRICKET_API_KEY is missing from environment");
    return NextResponse.json(
      { error: "CRICKET_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const url = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`;

  let raw: Response;
  try {
    raw = await fetch(url, { cache: "no-store" });
  } catch (err) {
    console.error("[CricAPI] Network error:", err);
    return NextResponse.json(
      { error: "Failed to reach CricAPI" },
      { status: 502 }
    );
  }

  if (!raw.ok) {
    console.error("[CricAPI] HTTP error:", raw.status, raw.statusText);
    return NextResponse.json(
      { error: `CricAPI returned HTTP ${raw.status}` },
      { status: 502 }
    );
  }

  const json = await raw.json();
  console.log(
    "[CricAPI] Response status:", json.status,
    "| Total matches:", json.data?.length ?? 0
  );

  if (json.status !== "success") {
    console.error("[CricAPI] Non-success response:", json);
    return NextResponse.json(
      { error: "CricAPI returned a non-success response" },
      { status: 502 }
    );
  }

  const matches = (json.data ?? []).map((m: RawMatch) => ({
    id: m.id,
    name: m.name,
    matchType: m.matchType,
    status: m.status,
    venue: m.venue,
    date: m.date,
    teams: m.teams,
    teamInfo: m.teamInfo,
    score: m.score,
    matchStarted: m.matchStarted,
    matchEnded: m.matchEnded,
  }));

  return NextResponse.json({ matches });
}
