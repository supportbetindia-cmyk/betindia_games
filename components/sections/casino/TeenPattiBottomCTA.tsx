"use client";

import React from "react";
import { Sparkles, Flame } from "lucide-react";
import Link from "next/link";
import { CTA_LINKS } from "@/lib/cta-links";

export default function TeenPattiBottomCTA({ content }: { content?: { title?: string; description?: string; primaryCta?: string; secondaryCta?: string } | null }) {
  const data = {
    title: "Ready to Play Teen Patti Online?",
    description: "Whether you're exploring Teen Patti online India for the first time or you're an experienced player looking for Teen Patti real money action, Bet India offers everything you need to enjoy a premium Teen Patti casino experience. Play Teen Patti online with professional Teen Patti live dealer tables, exciting Teen Patti live action, flexible Teen Patti betting options, secure gameplay, and seamless access across desktop and mobile devices. Whether you enjoy Online Teen Patti for casual entertainment or competitive Teen Patti betting, Bet India provides a secure platform with professional live dealers, smooth gameplay, and flexible betting options for players across India.",
    primaryCta: "Play Teen Patti Now",
    secondaryCta: "EXPLORE LIVE CASINO",
    ...content
  };

  const spaceIdx = data.title.lastIndexOf(" ");
  const mainTitle = spaceIdx !== -1 ? data.title.substring(0, spaceIdx) : data.title;
  const highlightedWord = spaceIdx !== -1 ? data.title.substring(spaceIdx + 1) : "";

  return (
    <section className="relative bg-[#050B18] py-28 px-4 overflow-hidden text-center border-b border-white/[0.04]">
      {/* Background Gradients: Gold Glowing Casino Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 via-[#0A162B]/50 to-[#050B18] z-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/5 blur-[100px]" />

      {/* Floating poker chips and cards in background silhouette */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none z-0">
        <svg 
          width="750" 
          height="750" 
          viewBox="0 0 100 100" 
          className="text-[#D4AF37] animate-[spin-slow_150s_linear_infinite]"
        >
          {/* Card suits ring */}
          <path 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.3" 
            d="M 50,2 L 53,20 L 70,10 L 60,25 L 85,20 L 65,30 L 98,50 L 65,70 L 85,80 L 60,75 L 70,90 L 53,80 L 50,98 L 47,80 L 30,90 L 40,75 L 15,80 L 35,70 L 2,50 L 35,30 L 15,20 L 40,25 L 30,10 L 47,20 Z" 
          />
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.08" strokeDasharray="2,2" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        
        {/* Glow badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#D4AF37] mb-6 backdrop-blur-md">
          <Flame size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
          EXCLUSIVE VIP CLUB BONUSES
        </div>

        {/* Large Heading */}
        <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
          {mainTitle}{" "}
          {highlightedWord && (
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(212,175,55,0.2)]" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #D4AF37, #FFF3B0, #D4AF37)', WebkitBackgroundClip: 'text' }}>
              {highlightedWord}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-355 whitespace-pre-line">
          {data.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={CTA_LINKS.signup}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#E05E00] px-8 py-4 text-base font-black text-white shadow-lg shadow-[#FF6B00]/25 hover:shadow-[#FF6B00]/45 transition-all duration-300 hover:scale-[1.02] sm:w-auto"
          >
            {data.primaryCta}
          </Link>
          
          <Link
            href={CTA_LINKS.signup}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-8 py-4 text-base font-black text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#D4AF37]/55 hover:bg-white/5 sm:w-auto"
          >
            <Sparkles size={16} className="text-[#138808]" />
            {data.secondaryCta}
          </Link>
        </div>

        <p className="mt-8 text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] font-mono">
          18+ Only • Play Responsibly • Licensed Card Room Gaming
        </p>

      </div>
    </section>
  );
}
