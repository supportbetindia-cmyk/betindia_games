import { CalendarCheck, ClipboardList, Scale, UserX } from "lucide-react";

const REQUIREMENTS = [
  {
    icon: CalendarCheck,
    title: "Minimum Age Requirement",
    description: "Users must meet the minimum legal age requirement applicable in their jurisdiction.",
    accent: "#FF6B00",
  },
  {
    icon: ClipboardList,
    title: "Accurate Information",
    description: "Registration details must be accurate and up to date.",
    accent: "#138808",
  },
  {
    icon: Scale,
    title: "Personal Responsibility",
    description: "Users are responsible for ensuring compliance with local laws and regulations.",
    accent: "#FF6B00",
  },
  {
    icon: UserX,
    title: "Single Account Policy",
    description: "Each user should maintain only one active account unless otherwise authorized.",
    accent: "#138808",
  },
] as const;

export default function EligibilitySection() {
  return (
    <section className="relative bg-[#050B18] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/5 blur-3xl" />

      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Eligibility{" "}
            <span className="bg-gradient-to-r from-[#138808] via-[#22c55e] to-[#138808] bg-clip-text text-transparent">
              Requirements
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
            Users must satisfy all applicable requirements before accessing platform services.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {REQUIREMENTS.map(({ icon: Icon, title, description, accent }) => (
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
