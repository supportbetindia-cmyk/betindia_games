import { CalendarDays, Clock4, ShieldCheck } from "lucide-react";

const SCHEDULE = [
  { day: "Monday — Sunday", hours: "24 Hours", note: "All day support availability", accent: "#FF6B00" as const },
  { day: "Public Holidays", hours: "24 Hours", note: "No interruptions on holidays", accent: "#138808" as const },
  { day: "Live Chat", hours: "Instant", note: "Connect in under 2 minutes", accent: "#FF6B00" as const },
  { day: "Email Tickets", hours: "< 24 Hours", note: "Full written response guaranteed", accent: "#138808" as const },
];

export default function SupportHours() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B00]" />
            Always Available
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            Support{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              Hours
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            Our support team works hard to assist players and answer inquiries promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Schedule grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SCHEDULE.map(({ day, hours, note, accent }) => {
              const isOrange = accent === "#FF6B00";
              return (
                <div
                  key={day}
                  className={[
                    "group relative overflow-hidden rounded-[20px] border border-white/10",
                    "bg-white/[0.04] p-5 backdrop-blur-xl",
                    "transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]",
                    isOrange
                      ? "hover:border-[#FF6B00]/35 hover:shadow-lg hover:shadow-[#FF6B00]/8"
                      : "hover:border-[#138808]/35 hover:shadow-lg hover:shadow-[#138808]/8",
                  ].join(" ")}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                  />

                  <div className="mb-3 flex items-center gap-2.5">
                    <CalendarDays size={15} strokeWidth={1.8} style={{ color: accent }} />
                    <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">{day}</span>
                  </div>

                  <p className="text-2xl font-black" style={{ color: accent }}>{hours}</p>
                  <p className="mt-1 text-xs text-slate-500">{note}</p>
                </div>
              );
            })}
          </div>

          {/* Info panel */}
          <div
            className="overflow-hidden rounded-[24px] p-px"
            style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.35) 0%, rgba(255,255,255,0.05) 50%, rgba(19,136,8,0.2) 100%)" }}
          >
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#081425]/95 p-7 backdrop-blur-xl md:p-9">
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FF6B00]/8 blur-2xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#138808]/8 blur-2xl" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.025] via-transparent to-transparent" />

              <div className="relative">
                {/* Live badge */}
                <span className="inline-flex items-center gap-2 rounded-full border border-[#138808]/40 bg-[#138808]/12 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#138808]">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#138808] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#138808]" />
                  </span>
                  Support Online
                </span>

                <h3 className="mt-5 text-xl font-extrabold text-white">
                  Round-the-clock assistance, every day of the year.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Support requests are reviewed as quickly as possible based on volume and priority. We prioritise account security issues and time-sensitive betting queries.
                </p>
              </div>

              <div className="relative mt-6 space-y-3">
                {[
                  { icon: Clock4, text: "Average first response: under 2 minutes via live chat" },
                  { icon: ShieldCheck, text: "Account security queries handled with top priority" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-[#FF6B00]/25 bg-[#FF6B00]/10">
                      <Icon size={13} strokeWidth={2} className="text-[#FF6B00]" />
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
