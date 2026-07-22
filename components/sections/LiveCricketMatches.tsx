"use client";

import { useCallback, useEffect, useState } from "react";
import { Calendar, MapPin, RefreshCw, Wifi, WifiOff } from "lucide-react";
import {
  fetchCurrentMatches,
  formatDate,
  formatMatchType,
  isLiveMatch,
  type Match,
} from "@/lib/cricapi";

const REFRESH_MS = 60_000;
const MAX_MATCHES = 9;

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-5 w-12 rounded-lg bg-white/10" />
        <div className="h-5 w-14 rounded-full bg-white/10" />
      </div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="h-12 w-12 rounded-full bg-white/10" />
          <div className="h-3 w-14 rounded bg-white/10" />
        </div>
        <div className="h-4 w-6 rounded bg-white/10" />
        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="h-12 w-12 rounded-full bg-white/10" />
          <div className="h-3 w-14 rounded bg-white/10" />
        </div>
      </div>
      <div className="mb-2 h-3 w-full rounded bg-white/10" />
      <div className="mb-4 h-3 w-2/3 rounded bg-white/10" />
      <div className="mb-3 space-y-1.5">
        <div className="h-3 w-3/4 rounded bg-white/10" />
        <div className="h-3 w-1/2 rounded bg-white/10" />
      </div>
      <div className="h-9 w-full rounded-xl bg-white/10" />
    </div>
  );
}

// ─── Team Avatar ─────────────────────────────────────────────────────────────

function TeamAvatar({ info, name }: { info?: { shortname: string; img: string }; name: string }) {
  const initials = (info?.shortname ?? name).slice(0, 3).toUpperCase();
  return (
    <div className="flex flex-1 flex-col items-center gap-2 text-center">
      {info?.img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={info.img}
          alt={name}
          className="h-12 w-12 rounded-full border border-white/10 object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#FF6B00]/20 bg-[#FF6B00]/10 text-[11px] font-black text-[#FF6B00]">
          {initials}
        </div>
      )}
      <span className="max-w-[72px] truncate text-[11px] font-bold text-white">
        {info?.shortname ?? name}
      </span>
    </div>
  );
}

// ─── Match Card ──────────────────────────────────────────────────────────────

function MatchCard({ match }: { match: Match }) {
  const live = isLiveMatch(match);
  const team1 = match.teams[0] ?? "TBD";
  const team2 = match.teams[1] ?? "TBD";
  const t1Info = match.teamInfo?.find((t) => t.name === team1);
  const t2Info = match.teamInfo?.find((t) => t.name === team2);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B00]/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-[#FF6B00]/10">
      {/* Top edge glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Corner glow */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#FF6B00]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {formatMatchType(match.matchType)}
        </span>
        {live ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-2.5 py-1 text-[10px] font-bold text-[#FF6B00]">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B00] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
            </span>
            LIVE
          </span>
        ) : (
          <span className="rounded-full border border-[#138808]/30 bg-[#138808]/10 px-2.5 py-1 text-[10px] font-bold text-[#138808]">
            UPCOMING
          </span>
        )}
      </div>

      {/* Teams */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <TeamAvatar info={t1Info} name={team1} />
        <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
          vs
        </span>
        <TeamAvatar info={t2Info} name={team2} />
      </div>

      {/* Status */}
      <p className="mb-3 line-clamp-2 flex-1 text-center text-[11px] leading-relaxed text-slate-400">
        {match.status}
      </p>

      {/* Venue + Date */}
      <div className="mb-4 space-y-1.5">
        {match.venue && (
          <div className="flex items-start gap-1.5 text-[11px] text-slate-500">
            <MapPin size={11} className="mt-0.5 shrink-0 text-[#FF6B00]/50" />
            <span className="line-clamp-1">{match.venue}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <Calendar size={11} className="shrink-0 text-[#138808]/50" />
          <span>{formatDate(match.date)}</span>
        </div>
      </div>

      {/* CTA */}
      <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#FF6B00]/30 bg-[#FF6B00]/10 py-2.5 text-sm font-bold text-[#FF6B00] transition-all duration-300 hover:bg-[#FF6B00] hover:text-white hover:shadow-lg hover:shadow-[#FF6B00]/25">
        View Match
      </button>
    </div>
  );
}

// ─── Empty / Error states ─────────────────────────────────────────────────────

function StatusMessage({
  icon: Icon,
  message,
  accent,
}: {
  icon: React.ElementType;
  message: string;
  accent: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] py-20 text-center backdrop-blur-xl">
      <span
        className="grid h-14 w-14 place-items-center rounded-2xl border"
        style={{ background: `${accent}18`, borderColor: `${accent}30`, color: accent }}
      >
        <Icon size={22} strokeWidth={1.7} />
      </span>
      <p className="text-sm font-medium text-slate-400">{message}</p>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function LiveCricketMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const data = await fetchCurrentMatches();
      setMatches(data.slice(0, MAX_MATCHES));
      setError(null);
      setLastUpdated(new Date());
    } catch {
      setError("Unable to load live matches.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(() => load(), REFRESH_MS);
    return () => clearInterval(id);
  }, [load]);

  const liveCount = matches.filter(isLiveMatch).length;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-5 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B00] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
              </span>
              {liveCount > 0 ? `${liveCount} Live Now` : "Cricket"}
            </span>

            <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
              Live Cricket{" "}
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
                Matches
              </span>
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
              Follow live cricket action and upcoming fixtures in real-time.
            </p>
          </div>

          {/* Refresh control */}
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <button
              onClick={() => load(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 backdrop-blur-md transition-all duration-200 hover:border-[#FF6B00]/40 hover:text-[#FF6B00] disabled:opacity-50"
            >
              <RefreshCw
                size={13}
                className={refreshing ? "animate-spin" : ""}
                strokeWidth={2}
              />
              Refresh
            </button>
            {lastUpdated && (
              <span className="text-[11px] text-slate-600">
                Updated {lastUpdated.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>
        </div>

        {/* ─── Loading ────────────────────────────────────────── */}
        {loading && (
          <>
            {/* Mobile skeleton slider */}
            <div className="flex gap-4 overflow-x-auto pb-2 sm:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-[min(300px,85vw)] flex-none snap-start">
                  <SkeletonCard />
                </div>
              ))}
            </div>
            {/* Tablet/Desktop skeleton grid */}
            <div className="hidden sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </>
        )}

        {/* ─── Error ──────────────────────────────────────────── */}
        {!loading && error && (
          <StatusMessage
            icon={WifiOff}
            message={error}
            accent="#FF6B00"
          />
        )}

        {/* ─── Empty ──────────────────────────────────────────── */}
        {!loading && !error && matches.length === 0 && (
          <StatusMessage
            icon={Wifi}
            message="No live matches available right now. Check back soon."
            accent="#138808"
          />
        )}

        {/* ─── Data ───────────────────────────────────────────── */}
        {!loading && !error && matches.length > 0 && (
          <>
            {/* Mobile: horizontal slider */}
            <div className="flex gap-4 overflow-x-auto pb-3 sm:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
              {matches.map((match) => (
                <div key={match.id} className="w-[min(300px,85vw)] flex-none snap-start">
                  <MatchCard match={match} />
                </div>
              ))}
            </div>

            {/* Tablet + Desktop: grid */}
            <div className="hidden sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
