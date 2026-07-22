"use client";

import { useState } from "react";
import { RefreshCw, Loader2, AlertCircle } from "lucide-react";
import { syncCMS, syncHomepage } from "@/lib/sync-cms";

type Summary = { created: number; skipped: number; failed: number };
type Job = "home" | "all";

export default function SyncCmsButton() {
  const [busy, setBusy] = useState<Job | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(false);

  async function run(job: Job, action: (force: boolean) => Promise<Summary>) {
    if (busy) return;
    setBusy(job);
    setError(null);
    setSummary(null);
    try {
      setSummary(await action(overwrite));
    } catch {
      setError("Sync failed. Check your connection and Firestore rules.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold text-white">CMS Content</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Seed page/section documents from code defaults. Check overwrite option to restore default templates.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => run("home", syncHomepage)}
            disabled={busy !== null}
            className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#FF8A00] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {busy === "home" ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} strokeWidth={2.2} />}
            {busy === "home" ? "Syncing…" : "Sync Homepage"}
          </button>
          <button
            onClick={() => run("all", syncCMS)}
            disabled={busy !== null}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {busy === "all" ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} strokeWidth={2.2} />}
            {busy === "all" ? "Syncing…" : "Sync All Pages"}
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          type="checkbox"
          id="overwrite-defaults"
          checked={overwrite}
          onChange={(e) => setOverwrite(e.target.checked)}
          className="h-4 w-4 rounded border-white/10 bg-white/5 text-[#FF6B00] focus:ring-[#FF6B00] cursor-pointer"
        />
        <label htmlFor="overwrite-defaults" className="text-xs font-semibold text-slate-400 cursor-pointer select-none">
          Overwrite existing content in database with local code defaults (Restore Templates)
        </label>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-300">
          <AlertCircle size={14} className="shrink-0" /> {error}
        </div>
      )}

      {summary && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          <Stat label="Created" value={summary.created} color="#138808" />
          <Stat label="Skipped" value={summary.skipped} color="#FF6B00" />
          <Stat label="Failed" value={summary.failed} color="#ef4444" />
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center">
      <p className="text-2xl font-extrabold" style={{ color }}>{value}</p>
      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
    </div>
  );
}
