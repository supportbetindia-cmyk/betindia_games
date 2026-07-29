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
      <div className="relative overflow-hidden">
        {/* The image (16:9 aspect ratio). If a page hasn't set one yet, show a 16:9 placeholder
            so the overlay text still has something to sit on. */}
        {image ? (
          <img src={image} alt="" className="block aspect-[16/9] w-full object-cover" />
        ) : (
          <div className="aspect-[16/9] w-full bg-[#0A1121]" />
        )}

        {/* Readability gradient over the top area where the text sits. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 z-[1] h-1/2 bg-gradient-to-b from-[#050B18]/85 via-[#050B18]/40 to-transparent"
        />

        {/* Centered text overlay. */}
        <div className="absolute inset-x-0 top-10 z-10 flex flex-col items-center px-5 pt-6 text-center">
          {eyebrow ? (
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B00]!">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="mt-1 text-2xl! font-extrabold leading-tight! tracking-tight text-white">
            {title}
            {highlightedTitle ? (
              <>
                {" "}
                <span className="text-[#FF6B00]!">{highlightedTitle}</span>
              </>
            ) : null}
          </h1>

          {description ? (
            <p className="mt-2 max-w-[80%] text-xs leading-snug text-slate-200">
              {description}
            </p>
          ) : null}

          {/* Both CTAs side by side, mirroring the desktop hero. */}
          <div className="mt-3 flex flex-row flex-wrap items-center justify-center gap-2">
            {primaryHref ? (
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#FF6B00] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:bg-[#FF8A00]"
              >
                {primaryLabel}
                <span aria-hidden>&rarr;</span>
              </Link>
            ) : null}
            {secondaryHref && secondaryLabel ? (
              <a
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-[#FF6B00] hover:bg-white/10"
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

