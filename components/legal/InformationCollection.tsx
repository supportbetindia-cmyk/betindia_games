import { User, Monitor, Activity, MessageSquare } from "lucide-react";

const TYPES = [
  {
    icon: User,
    title: "Account Information",
    description: "Name, contact details, account preferences, and registration information.",
    accent: "#FF6B00",
  },
  {
    icon: Monitor,
    title: "Device Information",
    description: "Browser type, device details, operating system, and technical identifiers.",
    accent: "#138808",
  },
  {
    icon: Activity,
    title: "Usage Information",
    description: "Platform activity, navigation patterns, and feature usage.",
    accent: "#FF6B00",
  },
  {
    icon: MessageSquare,
    title: "Communication Information",
    description: "Messages, support requests, and account-related communications.",
    accent: "#138808",
  },
] as const;

export default function InformationCollection() {
  return (
    <section className="relative bg-[#050B18] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Information We{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
              Collect
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
            To provide our services and improve user experience, BetIndia may collect certain information when users interact with the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TYPES.map(({ icon: Icon, title, description, accent }) => (
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
