import Image from "next/image";
import Link from "next/link";
import { Activity, ShieldCheck, Zap, Headphones } from "lucide-react";

const STATS = [
  { value: "10,000+", label: "Active Players" },
  { value: "500+",    label: "Casino Games"  },
  { value: "50+",     label: "Sports"        },
] as const;

const FEATURES = [
  { icon: Activity,    text: "Live Sports Betting" },
  { icon: ShieldCheck, text: "Premium Casino Games" },
  { icon: Zap,         text: "Instant Withdrawals"  },
  { icon: Headphones,  text: "24/7 Customer Support"},
] as const;

export default function AuthBrandPanel() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">
      {/* Glows */}
      <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-[320px] w-[320px] rounded-full bg-[#FF6B00]/12 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 h-[280px] w-[280px] rounded-full bg-[#138808]/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/40 to-transparent" />

      {/* Logo */}
      <Link href="/" className="relative z-10 inline-block">
        <Image src="/logo/betindialogo.png" alt="BetIndia" width={180} height={54} className="h-auto w-auto" />
      </Link>

      {/* Middle content */}
      <div className="relative z-10 my-10">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white xl:text-4xl">
          India&apos;s Premium
          <br />
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            Sportsbook &amp; Casino
          </span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          Bet on live sports, play premium casino games, and enjoy instant payouts — all in one trusted platform.
        </p>

        {/* Features */}
        <ul className="mt-7 space-y-3.5">
          {FEATURES.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm font-semibold text-slate-300">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-[#138808]">
                <Icon size={14} strokeWidth={2} />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* Stats row */}
      <div className="relative z-10 grid grid-cols-3 gap-3">
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.04] px-3 py-4 text-center"
          >
            <p className="text-lg font-black text-[#FF6B00]">{value}</p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <div className="relative z-10 mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
        <p className="text-[13px] italic leading-relaxed text-slate-400">
          &ldquo;Best sportsbook I&apos;ve used. Instant withdrawals, great odds, and the casino is top-tier.&rdquo;
        </p>
        <p className="mt-2.5 text-[11px] font-bold text-slate-500">— Rahul M., Mumbai</p>
      </div>
    </div>
  );
}
