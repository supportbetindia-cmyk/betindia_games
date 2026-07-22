"use client";

import React from "react";
import { ShieldCheck, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function TeenPattiResponsible() {
  return (
    <section className="relative bg-[#050B18] py-16 px-4 overflow-hidden border-b border-white/[0.04]">
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E1B30]/40 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            
            {/* Responsible Gaming Shield Icon */}
            <div className="h-14 w-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.1)] animate-pulse">
              <ShieldCheck size={28} />
            </div>

            <div className="flex-1 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#138808] block mb-2 font-mono">
                SAFETY & RISK POLICY
              </span>
              <h3 className="text-xl font-black text-white">
                Play Responsibly at BetIndia
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Enjoy the Teen Patti game as entertainment. Set personal limits, play within your budget, and make informed decisions to keep your gaming experience enjoyable and responsible.
              </p>

              {/* Bullet checklist */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {[
                  "Set a spending limit.",
                  "Never chase losses.",
                  "Take regular breaks.",
                  "Play for entertainment.",
                  "Gamble only with money you can afford to lose.",
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-300 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
                    {bullet}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center md:justify-start">
                <Link 
                  href="/responsible-gaming"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6B00] hover:text-[#FF8F33] transition-colors"
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
