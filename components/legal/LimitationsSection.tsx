import { WifiOff, Puzzle, UserCog, Settings } from "lucide-react";

const LIMITATIONS = [
  {
    icon: WifiOff,
    title: "Service Availability",
    description: "Temporary interruptions may occur due to scheduled maintenance or technical issues.",
    accent: "#FF6B00",
  },
  {
    icon: Puzzle,
    title: "Third-Party Services",
    description: "Certain platform features may rely on external providers.",
    accent: "#138808",
  },
  {
    icon: UserCog,
    title: "User Responsibility",
    description: "Users remain responsible for decisions made while using the platform.",
    accent: "#FF6B00",
  },
  {
    icon: Settings,
    title: "Policy Enforcement",
    description: "BetIndia reserves the right to modify, suspend, or discontinue services when necessary.",
    accent: "#138808",
  },
] as const;

export default function LimitationsSection() {
  return (
    <section className="relative bg-[#050B18] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-3xl" />

      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Limitations &amp;{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Liability
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
            BetIndia provides services on an ongoing basis but cannot guarantee uninterrupted platform availability at all times.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {LIMITATIONS.map(({ icon: Icon, title, description, accent }) => (
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
      </div>
    </section>
  );
}
