import { Mail, Headphones, Clock, type LucideIcon } from "lucide-react";

type InfoCard = {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
  accent: "#FF6B00" | "#138808";
};

const CARDS: InfoCard[] = [
  {
    icon: Mail,
    title: "Email Support",
    value: "support@betindia.com",
    description: "For general questions and account assistance.",
    accent: "#FF6B00",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    value: "24/7 Assistance",
    description: "Our platform is available around the clock.",
    accent: "#138808",
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "Within 24 Hours",
    description: "We aim to respond as quickly as possible.",
    accent: "#FF6B00",
  },
];

export default function ContactInfo() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[#138808]/6 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
            Get In Touch
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Contact{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              Information
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            Multiple ways to reach us — choose what works best for you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {CARDS.map(({ icon: Icon, title, value, description, accent }) => {
            const isOrange = accent === "#FF6B00";
            return (
              <div
                key={title}
                className={[
                  "group relative overflow-hidden rounded-[24px] border border-white/10",
                  "bg-white/[0.04] p-7 backdrop-blur-xl text-center",
                  "transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]",
                  isOrange
                    ? "hover:border-[#FF6B00]/40 hover:shadow-xl hover:shadow-[#FF6B00]/8"
                    : "hover:border-[#138808]/40 hover:shadow-xl hover:shadow-[#138808]/8",
                ].join(" ")}
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
                  className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `${accent}18`,
                    borderColor: `${accent}35`,
                    color: accent,
                    boxShadow: `0 4px 20px ${accent}18`,
                  }}
                >
                  <Icon size={26} strokeWidth={1.7} />
                </div>

                <p className="mb-2 text-sm font-bold uppercase tracking-[0.1em] text-slate-500">{title}</p>
                <p
                  className="mb-2 text-lg font-extrabold"
                  style={{ color: accent }}
                >
                  {value}
                </p>
                <p className="text-sm leading-relaxed text-slate-400">{description}</p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
