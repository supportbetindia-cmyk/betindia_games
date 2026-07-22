import { Cookie, Zap, Settings, BarChart2 } from "lucide-react";

const COOKIE_TYPES = [
  {
    icon: Cookie,
    title: "Essential Cookies",
    description: "Required for core website functionality.",
    accent: "#FF6B00",
  },
  {
    icon: Zap,
    title: "Performance Cookies",
    description: "Help analyze platform performance and improve services.",
    accent: "#138808",
  },
  {
    icon: Settings,
    title: "Preference Cookies",
    description: "Remember settings and user preferences.",
    accent: "#FF6B00",
  },
  {
    icon: BarChart2,
    title: "Analytics Cookies",
    description: "Provide insights into platform usage patterns.",
    accent: "#138808",
  },
] as const;

export default function CookiesSection() {
  return (
    <section className="relative bg-[#050B18] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-3xl" />

      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Cookies &amp; Tracking{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
            Cookies help improve website functionality, remember preferences, and enhance overall user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {COOKIE_TYPES.map(({ icon: Icon, title, description, accent }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
            >
              <div
                className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border"
                style={{ background: `${accent}15`, borderColor: `${accent}30`, color: accent }}
              >
                <Icon size={18} strokeWidth={1.7} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-7 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-sm leading-relaxed text-slate-500">
          Users may manage cookie preferences through browser settings.
        </p>
      </div>
    </section>
  );
}
