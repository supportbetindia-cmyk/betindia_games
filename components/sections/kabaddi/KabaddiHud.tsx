// Small shared "sports-arena HUD" visual primitives for the Kabaddi page — a
// live-pulse badge and targeting-reticle corner brackets used across the hero,
// stat strip, and live-betting panel to keep the broadcast-overlay look
// consistent without repeating the same markup in every section.

export function LiveBadge({ label, color = "#f59e0b" }: { label: string; color?: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]"
      style={{ borderColor: `${color}4d`, background: `${color}1a`, color }}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
          style={{ background: color }}
        />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      </span>
      {label}
    </span>
  );
}

export function HudCorners({ color = "#f59e0b" }: { color?: string }) {
  const base = "pointer-events-none absolute h-4 w-4";
  const style = { borderColor: `${color}80` };
  return (
    <>
      <span className={`${base} left-0 top-0 rounded-tl-lg border-l-2 border-t-2`} style={style} />
      <span className={`${base} right-0 top-0 rounded-tr-lg border-r-2 border-t-2`} style={style} />
      <span className={`${base} bottom-0 left-0 rounded-bl-lg border-b-2 border-l-2`} style={style} />
      <span className={`${base} bottom-0 right-0 rounded-br-lg border-b-2 border-r-2`} style={style} />
    </>
  );
}
