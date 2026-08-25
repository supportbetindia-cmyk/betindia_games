import Link from "next/link";

/**
 * Full-bleed portrait hero poster shown on phones only (`md:hidden`).
 *
 * Matches the Sports page mobile hero: a full-width image with an HTML text
 * overlay (eyebrow, title, description, primary button) centered over the top,
 * above a readability gradient. You drop a portrait image per page and the copy
 * sits on top of it.
 *
 * NOTE on the `!` utilities: globals.css sets an *unlayered* `main h1` font-size
 * (clamp) that beats Tailwind's layered `text-[..]` utilities, so the title size
 * and leading MUST use `!` to win. The overlay is centered, which the global
 * mobile `text-align:center` rule already enforces.
 *
 * Renders the same two CTAs as the desktop hero, side by side in one row.
 */
export default function MobileHeroBanner({
  image,
  eyebrow,
  title,
  highlightedTitle,
  description,
  primaryHref,
  primaryLabel = "Start Betting",
  secondaryHref,
  secondaryLabel,
}: {
  image?: string;
  eyebrow?: string;
  title: string;
  highlightedTitle?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="bg-[#050B18] md:hidden">
      <div className="relative flex min-h-[380px] w-full flex-col items-center justify-center overflow-hidden px-4 py-8 sm:min-h-[420px] sm:py-10">
        {/* Full-width background image with tuned focal positioning */}
        {image ? (
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_70%] sm:object-center"
          />
        ) : (
          <div className="absolute inset-0 h-full w-full bg-[#0A1121]" />
        )}

        {/* Readability gradient overlay over image. */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1] bg-gradient-to-b from-[#050B18]/75 via-[#050B18]/40 to-[#050B18]/90"
        />

        {/* Centered text overlay positioned in the center. */}
        <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center px-4 text-center">
          {eyebrow ? (
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B00]!">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="mt-1 text-2xl! font-extrabold leading-tight! tracking-tight text-white sm:text-3xl!">
            {title}
            {highlightedTitle ? (
              <>
                {" "}
                <span className="text-[#FF6B00]!">{highlightedTitle}</span>
              </>
            ) : null}
          </h1>

          {description ? (
            <p className="mt-2 max-w-[90%] text-xs leading-relaxed text-slate-200 sm:text-sm">
              {description}
            </p>
          ) : null}

          {/* Both CTAs side by side, mirroring the desktop hero. */}
          <div className="mt-4 flex flex-row flex-wrap items-center justify-center gap-2.5">
            {primaryHref ? (
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#FF6B00] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:bg-[#FF8A00]"
              >
                {primaryLabel}
                <span aria-hidden>&rarr;</span>
              </Link>
            ) : null}
            {secondaryHref && secondaryLabel ? (
              <a
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-[#FF6B00] hover:bg-white/10"
              >
                {secondaryLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

