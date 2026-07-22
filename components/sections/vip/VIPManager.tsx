import Link from "next/link";
import { CheckCircle2, MessageCircle, Phone, Mail, Users, Clock } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import { vipBenefitsContent } from "@/data/VIPBenefits";

const CHANNELS = [
  { icon: MessageCircle, label: "Live Chat", sub: "Avg. reply < 2 min", accent: "#FF6B00" },
  { icon: Phone, label: "Phone", sub: "Direct VIP line", accent: "#138808" },
  { icon: Mail, label: "Email", sub: "Priority inbox", accent: "#FF6B00" },
] as const;

export default function VIPManager() {
  const data = vipBenefitsContent.manager;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl border border-[#FF6B00]/30 bg-gradient-to-br from-[#FF6B00]/20 to-[#138808]/10">
                    <Users size={28} className="text-[#FF6B00]" strokeWidth={1.5} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-[#050B18] bg-[#138808]" />
                </div>
                <div>
                  <p className="text-base font-black text-white">Your VIP Manager</p>
                  <p className="text-xs font-semibold text-[#138808]">● Available Now</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">Dedicated to your account</p>
                </div>
              </div>

              <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#138808]/20 bg-[#138808]/8 px-4 py-3">
                <Clock size={16} className="shrink-0 text-[#138808]" strokeWidth={2} />
                <div>
                  <p className="text-xs font-bold text-white">Priority Response Times</p>
                  <p className="text-[11px] text-slate-400">Dedicated support available around the clock</p>
                </div>
              </div>

              <div className="mb-5 space-y-2">
                {CHANNELS.map(({ icon: Icon, label, sub, accent }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-8 w-8 place-items-center rounded-lg border"
                        style={{ background: `${accent}15`, borderColor: `${accent}30`, color: accent }}
                      >
                        <Icon size={14} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{label}</p>
                        <p className="text-[10px] text-slate-500">{sub}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-[#FF8A00]"
              >
                Contact VIP Team
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">
              <Users size={11} strokeWidth={2} />
              Dedicated Service
            </span>

            <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
              Your Dedicated{" "}
              <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
                VIP Manager
              </span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400 md:text-base">{data.intro}</p>

            <ul className="mt-7 w-full space-y-4 text-left">
              {data.features.map(({ title, description }) => (
                <li key={title} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#FF6B00]" strokeWidth={2} />
                    <div>
                      <p className="text-sm font-bold text-white">{title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">{description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
