import { Lock, ShieldCheck, CreditCard, Eye, ServerCog, BadgeCheck, type LucideIcon } from "lucide-react";

type Item = {
  icon: LucideIcon;
  title: string;
  body: string;
  accent: "#FF6B00" | "#138808";
};

const TRUST_ITEMS: Item[] = [
  {
    icon: Lock,
    title: "256-bit SSL Encryption",
    body: "Every data packet between you and BetIndia is encrypted with military-grade SSL — the same standard used by global banks.",
    accent: "#FF6B00",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Regulated",
    body: "BetIndia operates under a valid offshore gaming licence, ensuring all operations meet international compliance standards.",
    accent: "#138808",
  },
  {
    icon: CreditCard,
    title: "Secure Payment Processing",
    body: "All transactions go through PCI-DSS certified payment processors. Your financial details are never stored on our servers.",
    accent: "#FF6B00",
  },
  {
    icon: Eye,
    title: "Provably Fair Games",
    body: "Our casino games use certified RNG technology verified by independent auditors, guaranteeing every outcome is completely random.",
    accent: "#138808",
  },
  {
    icon: ServerCog,
    title: "99.9% Uptime Guarantee",
    body: "Our infrastructure is hosted on enterprise-grade servers with redundant failover systems so you can bet without interruptions.",
    accent: "#FF6B00",
  },
  {
    icon: BadgeCheck,
    title: "KYC Verified Platform",
    body: "Robust identity verification protects our community from fraud and ensures that every player on BetIndia is real and verified.",
    accent: "#138808",
  },
];

export default function TrustSecurity() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#138808]/7 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#FF6B00]/7 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
            Security First
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Your Safety Is Our{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              Priority
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            We invest heavily in security infrastructure so you can focus on what matters — enjoying the game.
          </p>
        </div>

        {/* Banner */}
        <div
          className="mb-10 overflow-hidden rounded-[24px] p-px"
          style={{ background: "linear-gradient(135deg, rgba(19,136,8,0.4) 0%, rgba(255,107,0,0.2) 50%, rgba(19,136,8,0.15) 100%)" }}
        >
          <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#081425]/95 p-7 backdrop-blur-xl md:p-10">
            <div aria-hidden className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-[#138808]/10 blur-2xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-[#FF6B00]/8 blur-2xl" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />

            <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border border-[#138808]/35 bg-[#138808]/15">
                <ShieldCheck size={36} strokeWidth={1.5} className="text-[#138808]" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-white md:text-xl">
                  100% Player Data Protection Guarantee
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                  We have never suffered a data breach. All personal and financial information is stored in encrypted, air-gapped databases accessible only by authorised systems. Your privacy is non-negotiable.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_ITEMS.map(({ icon: Icon, title, body, accent }) => {
            const isOrange = accent === "#FF6B00";
            return (
              <div
                key={title}
                className={[
                  "group relative overflow-hidden rounded-[24px] border border-white/10",
                  "bg-white/[0.04] p-7 backdrop-blur-xl",
                  "transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]",
                  isOrange
                    ? "hover:border-[#FF6B00]/40 hover:shadow-xl hover:shadow-[#FF6B00]/8"
                    : "hover:border-[#138808]/40 hover:shadow-xl hover:shadow-[#138808]/8",
                ].join(" ")}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundColor: `${accent}20` }}
                />

                <div
                  className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `${accent}18`,
                    borderColor: `${accent}35`,
                    color: accent,
                    boxShadow: `0 4px 20px ${accent}18`,
                  }}
                >
                  <Icon size={24} strokeWidth={1.7} />
                </div>

                <h3 className="mb-2 text-base font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{body}</p>

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
