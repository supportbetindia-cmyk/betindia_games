import { contactUsContent } from "@/data/ContactUs";
import {
  User,
  Trophy,
  Zap,
  Gamepad2,
  Tv,
  CreditCard,
  Gift,
  Settings,
  Heart,
  FileCheck,
  HelpCircle,
} from "lucide-react";

function getServiceIcon(item: string) {
  switch (item) {
    case "Account Support":
      return <User className="text-[#FF6B00] group-hover:text-white transition-colors duration-300" size={22} />;
    case "Sports Betting Assistance":
      return <Trophy className="text-[#FF6B00] group-hover:text-white transition-colors duration-300" size={22} />;
    case "Live Betting Support":
      return <Zap className="text-[#FF6B00] group-hover:text-white transition-colors duration-300" size={22} />;
    case "Online Casino Support":
      return <Gamepad2 className="text-[#FF6B00] group-hover:text-white transition-colors duration-300" size={22} />;
    case "Live Casino Games":
      return <Tv className="text-[#FF6B00] group-hover:text-white transition-colors duration-300" size={22} />;
    case "Deposits & Withdrawals":
      return <CreditCard className="text-[#FF6B00] group-hover:text-white transition-colors duration-300" size={22} />;
    case "Promotions & Bonuses":
      return <Gift className="text-[#FF6B00] group-hover:text-white transition-colors duration-300" size={22} />;
    case "Technical Support":
      return <Settings className="text-[#FF6B00] group-hover:text-white transition-colors duration-300" size={22} />;
    case "Responsible Gaming":
      return <Heart className="text-[#FF6B00] group-hover:text-white transition-colors duration-300" size={22} />;
    case "Account Verification":
      return <FileCheck className="text-[#FF6B00] group-hover:text-white transition-colors duration-300" size={22} />;
    default:
      return <HelpCircle className="text-[#FF6B00] group-hover:text-white transition-colors duration-300" size={22} />;
  }
}

export default function CustomerSupportServices() {
  const data = contactUsContent.supportServices;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/4 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
            What We Do
          </span>
          <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">
            Customer Support{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-400">{data.intro}</p>
          <p className="mx-auto mt-8 text-sm font-bold uppercase tracking-wider text-slate-300">{data.listLabel}</p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {data.items.map((item) => (
            <div
              key={item}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B00]/40 hover:bg-[#FF6B00]/10"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/5 transition-all duration-300 group-hover:bg-[#FF6B00] group-hover:scale-110">
                {getServiceIcon(item)}
              </div>
              <p className="mt-4 text-xs font-bold tracking-wide text-slate-300 group-hover:text-white transition-colors duration-200">
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-500 font-medium italic">
            "{data.outro}"
          </p>
        </div>
      </div>
    </section>
  );
}
