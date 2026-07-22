"use client";

import React from "react";
import { ShieldCheck, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function BetIndiaResponsible() {
  return (
    <section className="relative bg-[#050B18] py-16 px-4 overflow-hidden border-b border-white/[0.04]">
      {/* Subtle orange glow orb */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF7A00]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E1B30]/40 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            
            {/* Shield Icon Badge */}
            <div className="h-14 w-14 rounded-2xl bg-[#FF7A00]/10 border border-[#FF7A00]/20 flex items-center justify-center text-[#FF7A00] shrink-0 shadow-[0_0_15px_rgba(255,122,0,0.1)]">
              <ShieldCheck size={28} />
            </div>

            {/* Information details */}
            <div className="flex-1 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4EA8FF] block mb-2 font-mono">
                SAFETY & RISK SECURITY
              </span>
              <h3 className="text-xl font-black text-white">
                Play Responsibly at BetIndia
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                AeroLuxe is intended for entertainment purposes only. Set spending limits, allocate predefined time frames, and never wager capital you cannot afford to lose. If you feel you need assistance, utilize our self-exclusion tools or reach out to our flight support team.
              </p>
              
              {/* Optional Link */}
              <div className="mt-5 flex justify-center md:justify-start">
                <Link 
                  href="/responsible-gaming"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#FF7A00] hover:text-[#FFB800] transition-colors"
                >
                  <HelpCircle size={13} />
                  READ RESPONSIBLE GAMING CHARTER
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
