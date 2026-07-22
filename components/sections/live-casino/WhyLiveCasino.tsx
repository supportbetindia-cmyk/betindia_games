import { Users, Video, Zap, MessageCircle, ShieldCheck, Smartphone, type LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "#FF6B00" | "#138808";
};

const FEATURES: Feature[] = [
  {
    icon: Users,
    title: "Real Dealers",
    description: "Interact with professional, trained live dealers in real time — just like a premium casino floor.",
    accent: "#FF6B00",
  },
  {
    icon: Video,
    title: "Live Streaming",
    description: "High-definition live video streams from premium studios for a fully immersive casino experience.",
    accent: "#138808",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Fast gameplay with immediate outcomes — no delays, no waiting, just seamless casino action.",
    accent: "#FF6B00",
  },
  {
    icon: MessageCircle,
    title: "Interactive Experience",
    description: "Real-time engagement with dealers and players for an authentic casino atmosphere from home.",
    accent: "#138808",
  },
  {
    icon: ShieldCheck,
    title: "Secure Gaming",
    description: "Play with full confidence on our licensed, encrypted platform with bank-grade security standards.",
    accent: "#FF6B00",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Access premium live tables from any device — mobile, tablet, or desktop — anytime, anywhere.",
    accent: "#138808",
  },
];

export default function WhyLiveCasino() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/5 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#138808]/25 bg-[#138808]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#138808]">
            <ShieldCheck size={11} strokeWidth={2} />
            Why BetIndia Live
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Live Casino?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            Experience casino gaming like never before — authentic, interactive, and built for premium players.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, accent }) => {
            const isOrange = accent === "#FF6B00";
            return (
              <div
                key={title}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl",
                  "transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]",
                  isOrange
                    ? "hover:border-[#FF6B00]/40 hover:shadow-2xl hover:shadow-[#FF6B00]/8"
                    : "hover:border-[#138808]/40 hover:shadow-2xl hover:shadow-[#138808]/8",
                ].join(" ")}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundColor: `${accent}1A` }}
                />

                <div
                  className="mb-5 grid place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    width: "3.25rem",
                    height: "3.25rem",
                    background: `${accent}18`,
                    borderColor: `${accent}35`,
                    color: accent,
                    boxShadow: `0 4px 20px ${accent}15`,
                  }}
                >
                  <Icon size={22} strokeWidth={1.7} />
                </div>

                <h3 className="mb-2 text-base font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
