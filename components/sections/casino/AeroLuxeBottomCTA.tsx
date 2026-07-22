"use client";

import React from "react";
import { Plane, Sparkles, Flame } from "lucide-react";
import Link from "next/link";
import { CTA_LINKS } from "@/lib/cta-links";

export default function AeroLuxeBottomCTA() {
  return (
    <section className="relative bg-[#07070A] py-28 px-4 overflow-hidden text-center border-b border-white/[0.04]">
      {/* Background Orbs & Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3B82F6]/5 blur-[100px]" />

      {/* Large Glowing Airplane Silhouette in Background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none">
        <svg 
          width="800" 
          height="800" 
          viewBox="0 0 100 100" 
          className="text-[#D4AF37] animate-[spin-slow_120s_linear_infinite]"
        >
          {/* Detailed aircraft outline */}
          <path 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            d="M 50,5 L 53,30 L 95,50 L 53,53 L 52,85 L 68,93 L 50,90 L 32,93 L 48,85 L 47,53 L 5,50 L 47,30 Z" 
          />
          {/* Outer circle rings */}
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2,2" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.05" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        
        {/* Sparkle badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#D4AF37] mb-6 backdrop-blur-md">
          <Flame size={12} className="fill-[#D4AF37]" />
          LIMITED-TIME VIP PACKAGE
        </div>

        {/* Big Heading */}
        <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
          Ready for <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(212,175,55,0.2)]" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #D4AF37, #FFF3B0, #D4AF37)', WebkitBackgroundClip: 'text' }}>Takeoff?</span>
        </div>

        {/* Subdescription */}
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300">
          Enlist as an AeroLuxe pilot today. Secure your luxury flight lounge seat, configure your bankroll diagnostics, and claim your exclusive registration bonus packages.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={CTA_LINKS.signup}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] px-8 py-4 text-base font-black text-black shadow-lg shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/45 transition-all duration-300 hover:scale-[1.02] sm:w-auto"
          >
            PLAY NOW
          </Link>
          
          <Link
            href={CTA_LINKS.signup}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-8 py-4 text-base font-black text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#3B82F6]/55 hover:bg-white/[0.06] sm:w-auto"
          >
            <Sparkles size={16} className="text-[#3B82F6]" />
            CLAIM 200% BONUS
          </Link>
        </div>

        <p className="mt-8 text-[10px] font-black text-slate-650 uppercase tracking-[0.18em]">
          18+ Only • Play Responsibly • Verification Seeds Available
        </p>

      </div>
    </section>
  );
}
