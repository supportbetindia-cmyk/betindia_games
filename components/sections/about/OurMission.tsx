import { Target, Eye, Heart } from "lucide-react";

const PILLARS = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To provide every Indian player with a world-class betting and gaming experience — fair, secure, fast, and exciting. We believe everyone deserves access to premium sports betting and casino entertainment with the confidence that their money and data are always protected.",
    accent: "#FF6B00" as const,
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "To become India's most trusted and innovative betting platform — a place where millions of Indians can enjoy sports, casino, and live gaming with total confidence in every single rupee they wager.",
    accent: "#138808" as const,
  },
  {
    icon: Heart,
    title: "Our Values",
    body: "Player-first decisions, radical transparency, relentless innovation, and an unwavering commitment to responsible gaming. Every feature, every policy, and every update starts with the question: does this make things better for our players?",
    accent: "#FF6B00" as const,
  },
] as const;

export default function OurMission() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/6 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
            What Drives Us
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Our{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              Mission &amp; Vision
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            Everything we build starts with a purpose — to make betting better, safer, and more rewarding for every Indian player.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, body, accent }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]"
              style={
                {
                  "--accent": accent,
                } as React.CSSProperties
              }
            >
              {/* Top edge glow */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
              />
              {/* Corner glow */}
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ backgroundColor: `${accent}20` }}
              />

              {/* Icon */}
              <div
                className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: `${accent}18`,
                  borderColor: `${accent}35`,
                  color: accent,
                }}
              >
                <Icon size={24} strokeWidth={1.7} />
              </div>

              <h3 className="mb-3 text-base font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{body}</p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
