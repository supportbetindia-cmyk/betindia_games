"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, Zap, Headphones, CheckCircle2 } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";

const TRUST = [
  { icon: ShieldCheck, label: "Secure Platform" },
  { icon: Zap,         label: "Fast Withdrawals" },
  { icon: CheckCircle2,label: "Responsible Gaming" },
  { icon: Headphones,  label: "24/7 Support" },
] as const;

export default function LoginForm() {
  const [mobile, setMobile]             = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode]                 = useState<"password" | "otp">("password");

  return (
    <div className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-9">
      {/* Top edge glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/50 to-transparent" />

      {/* Logo */}
      <div className="mb-7 flex justify-center lg:hidden">
        <Link href="/">
          <Image src="/logo/betindialogo.png" alt="BetIndia" width={160} height={48} className="h-auto w-auto" />
        </Link>
      </div>

      {/* Heading */}
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">Welcome Back</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
          Sign in to continue betting, playing, and winning.
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {/* Mobile Number */}
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Mobile Number
          </label>
          <div className="relative flex items-center overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-200 focus-within:border-[#FF6B00]/60 focus-within:ring-2 focus-within:ring-[#FF6B00]/15 focus-within:bg-white/[0.07]">
            <span className="flex h-full shrink-0 select-none items-center border-r border-white/10 px-4 text-sm font-bold text-slate-400">
              +91
            </span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter mobile number"
              className="w-full bg-transparent py-3.5 pl-4 pr-4 text-sm text-white placeholder-slate-600 outline-none"
            />
          </div>
        </div>

        {mode === "password" ? (
          <>
            {/* Password */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Password
              </label>
              <div className="relative flex items-center overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-200 focus-within:border-[#FF6B00]/60 focus-within:ring-2 focus-within:ring-[#FF6B00]/15 focus-within:bg-white/[0.07]">
                <span className="flex shrink-0 items-center pl-4 text-slate-500">
                  <Lock size={15} strokeWidth={2} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-transparent py-3.5 pl-3 pr-12 text-sm text-white placeholder-slate-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 text-slate-500 transition hover:text-slate-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={15} strokeWidth={2} /> : <Eye size={15} strokeWidth={2} />}
                </button>
              </div>
            </div>

            {/* OTP toggle */}
            <p className="text-right text-xs">
              <button
                type="button"
                onClick={() => setMode("otp")}
                className="font-semibold text-[#FF6B00] transition hover:text-[#FF8A00]"
              >
                Login with OTP instead
              </button>
            </p>
          </>
        ) : (
          <>
            {/* OTP hint */}
            <div className="rounded-xl border border-[#138808]/20 bg-[#138808]/8 px-4 py-3 text-sm text-slate-300">
              An OTP will be sent to your mobile number when you continue.
            </div>
            <p className="text-right text-xs">
              <button
                type="button"
                onClick={() => setMode("password")}
                className="font-semibold text-[#FF6B00] transition hover:text-[#FF8A00]"
              >
                Login with Password instead
              </button>
            </p>
          </>
        )}
      </div>

      {/* Continue Button */}
      <button
        type="button"
        className="mt-6 w-full rounded-xl bg-[#FF6B00] py-4 text-sm font-bold text-white shadow-lg shadow-[#FF6B00]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/30 active:scale-[0.99]"
      >
        Continue
      </button>

      {/* Forgot password */}
      <div className="mt-4 text-center">
        <Link href="/forgot-password" className="text-xs font-semibold text-slate-500 transition hover:text-slate-300">
          Forgot Password?
        </Link>
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/[0.08]" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600">OR</span>
        <div className="h-px flex-1 bg-white/[0.08]" />
      </div>

      {/* Create Account */}
      <p className="text-center text-sm text-slate-400">
        Don&apos;t have an account?{" "}
        <Link href={CTA_LINKS.signup} className="font-bold text-[#FF6B00] transition hover:text-[#FF8A00]">
          Create Account
        </Link>
      </p>

      {/* Trust strip */}
      <div className="mt-8 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-6">
        {TRUST.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
            <Icon size={12} className="shrink-0 text-[#138808]" strokeWidth={2} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
