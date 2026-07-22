"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, Zap, Headphones, CheckCircle2 } from "lucide-react";

const TRUST = [
  { icon: ShieldCheck, label: "Secure Platform" },
  { icon: Zap,         label: "Fast Withdrawals" },
  { icon: CheckCircle2,label: "Responsible Gaming" },
  { icon: Headphones,  label: "24/7 Support" },
] as const;

export default function SignupForm() {
  const [mobile, setMobile]                         = useState("");
  const [password, setPassword]                     = useState("");
  const [confirmPassword, setConfirmPassword]       = useState("");
  const [showPassword, setShowPassword]             = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mode, setMode]                             = useState<"password" | "otp">("password");

  const passwordsMatch = confirmPassword === "" || password === confirmPassword;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-9">
      {/* Top edge glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#138808]/50 to-transparent" />

      {/* Logo */}
      <div className="mb-7 flex justify-center lg:hidden">
        <Link href="/">
          <Image src="/logo/betindialogo.png" alt="BetIndia" width={160} height={48} className="h-auto w-auto" />
        </Link>
      </div>

      {/* Heading */}
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">Create Your Account</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
          Join thousands of players enjoying premium sports betting and casino games.
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
                  placeholder="Create password"
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

            {/* Confirm Password */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Confirm Password
              </label>
              <div
                className={[
                  "relative flex items-center overflow-hidden rounded-xl border bg-white/5 transition-all duration-200 focus-within:ring-2 focus-within:bg-white/[0.07]",
                  !passwordsMatch
                    ? "border-red-500/50 focus-within:border-red-500/60 focus-within:ring-red-500/15"
                    : "border-white/10 focus-within:border-[#FF6B00]/60 focus-within:ring-[#FF6B00]/15",
                ].join(" ")}
              >
                <span className="flex shrink-0 items-center pl-4 text-slate-500">
                  <Lock size={15} strokeWidth={2} />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full bg-transparent py-3.5 pl-3 pr-12 text-sm text-white placeholder-slate-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-4 text-slate-500 transition hover:text-slate-300"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={15} strokeWidth={2} /> : <Eye size={15} strokeWidth={2} />}
                </button>
              </div>
              {!passwordsMatch && (
                <p className="mt-1.5 text-xs font-medium text-red-400">Passwords do not match</p>
              )}
            </div>

            {/* OTP toggle */}
            <p className="text-right text-xs">
              <button
                type="button"
                onClick={() => setMode("otp")}
                className="font-semibold text-[#FF6B00] transition hover:text-[#FF8A00]"
              >
                Register with OTP instead
              </button>
            </p>
          </>
        ) : (
          <>
            <div className="rounded-xl border border-[#138808]/20 bg-[#138808]/8 px-4 py-3 text-sm text-slate-300">
              An OTP will be sent to your mobile number to verify and create your account.
            </div>
            <p className="text-right text-xs">
              <button
                type="button"
                onClick={() => setMode("password")}
                className="font-semibold text-[#FF6B00] transition hover:text-[#FF8A00]"
              >
                Register with Password instead
              </button>
            </p>
          </>
        )}
      </div>

      {/* Create Account Button */}
      <button
        type="button"
        className="mt-6 w-full rounded-xl bg-[#FF6B00] py-4 text-sm font-bold text-white shadow-lg shadow-[#FF6B00]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/30 active:scale-[0.99]"
      >
        Create Account
      </button>

      {/* Terms */}
      <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="font-semibold text-slate-400 transition hover:text-white">
          Terms &amp; Conditions
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="font-semibold text-slate-400 transition hover:text-white">
          Privacy Policy
        </Link>
        .
      </p>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/[0.08]" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600">OR</span>
        <div className="h-px flex-1 bg-white/[0.08]" />
      </div>

      {/* Sign In */}
      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-[#FF6B00] transition hover:text-[#FF8A00]">
          Sign In
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
