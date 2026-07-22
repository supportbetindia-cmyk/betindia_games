import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";
import type { BlogPost } from "@/lib/blog-posts";

export default function FeaturedArticle({ post }: { post: BlogPost }) {
  const Icon = post.icon;
  const accent = post.accent;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `${accent}12` }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-8 flex items-center gap-3">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{ borderColor: `${accent}4d`, background: `${accent}1a`, color: accent }}
          >
            <Star size={11} strokeWidth={2.5} />
            Featured Article
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* Card */}
        <Link
          href={`/blog/${post.slug}`}
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:shadow-2xl lg:flex-row"
        >
          {/* Top edge glow */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          />

          {/* Left — Image / Visual */}
          <div className="relative h-56 overflow-hidden bg-[#081425] lg:h-auto lg:w-[44%] lg:shrink-0">
            {/* Gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${accent}28 0%, #081425 55%, #050B18 100%)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 40% 50%, ${accent}30 0%, transparent 65%)`,
              }}
            />
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle, ${accent}45 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
              }}
            />
            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative z-10 grid h-24 w-24 place-items-center rounded-3xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: `${accent}18`,
                  borderColor: `${accent}35`,
                  color: accent,
                  boxShadow: `0 0 48px ${accent}25`,
                }}
              >
                <Icon size={40} strokeWidth={1.4} />
              </div>
            </div>
            {/* Featured badge */}
            <div
              className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
              style={{ borderColor: `${accent}66`, background: `${accent}26`, color: accent }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: accent }} />
              Featured
            </div>
            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#081425]/80 to-transparent lg:hidden" />
          </div>

          {/* Right — Content */}
          <div className="flex flex-1 flex-col justify-center gap-5 p-7 md:p-10">
            {/* Category + read time */}
            <div className="flex items-center gap-3">
              <span
                className="inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{ borderColor: `${accent}40`, background: `${accent}12`, color: accent }}
              >
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Clock size={11} className="shrink-0" />
                {post.readTime}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-extrabold leading-snug tracking-tight text-white transition-colors duration-200 group-hover:text-white/90 md:text-2xl lg:text-3xl">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">
                {post.excerpt}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-slate-500"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div>
              <span
                className="inline-flex items-center gap-2 text-base font-bold transition-all duration-200 group-hover:gap-3"
                style={{ color: accent }}
              >
                Read Article
                <ArrowRight size={17} strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
