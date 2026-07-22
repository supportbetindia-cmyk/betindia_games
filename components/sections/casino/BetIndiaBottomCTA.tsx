"use client";

import React from "react";
import { Plane, Sparkles } from "lucide-react";
import Link from "next/link";
import { CTA_LINKS } from "@/lib/cta-links";

export default function BetIndiaBottomCTA({ content }: { content?: { title?: string; description?: string; primaryCta?: string; secondaryCta?: string } | null }) {
  const data = {
    title: "Ready For Takeoff?",
    description: "Open your cockpit wagers. Climb into higher multipliers and secure your cashouts before escape velocity.",
    primaryCta: "PLAY NOW",
    secondaryCta: "CLAIM BONUS",
    ...content
  };

  const spaceIdx = data.title.lastIndexOf(" ");
  const mainTitle = spaceIdx !== -1 ? data.title.substring(0, spaceIdx) : data.title;
  const highlightedWord = spaceIdx !== -1 ? data.title.substring(spaceIdx + 1) : "";

  return (
    <section className="relative bg-[#050B18] py-28 px-4 overflow-hidden text-center border-b border-white/[0.04]">
      
      {/* Background Gradients: Orange Glowing Sky */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FF7A00]/15 via-[#0A162B]/50 to-[#050B18] z-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF7A00]/10 blur-[130px]" />
      
      {/* Glowing Airport Runway Lights effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden pointer-events-none z-10 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Central runway path */}
          <path d="M 50,0 L 50,100" stroke="#FF7A00" strokeWidth="0.8" strokeDasharray="3,3" />
          <path d="M 45,0 L 25,100" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          <path d="M 55,0 L 75,100" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          
          {/* Side navigation lights */}
          <circle cx="35" cy="50" r="0.8" fill="#FF7A00" className="animate-pulse" />
          <circle cx="65" cy="50" r="0.8" fill="#FF7A00" className="animate-pulse" />
          <circle cx="28" cy="80" r="1.5" fill="#4EA8FF" />
          <circle cx="72" cy="80" r="1.5" fill="#4EA8FF" />
        </svg>
      </div>

      {/* Silhouette of Flying Aircraft */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none z-0">
        <svg 
          width="700" 
          height="700" 
          viewBox="0 0 100 100" 
          className="text-[#FF7A00]"
        >
          <path 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.4" 
            d="M 50,5 L 53,30 L 95,50 L 53,53 L 52,85 L 68,93 L 50,90 L 32,93 L 48,85 L 47,53 L 5,50 L 47,30 Z" 
          />
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.08" strokeDasharray="3,3" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        
        {/* Glow badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#FF7A00] mb-6 backdrop-blur-md">
          <Plane size={12} className="transform rotate-45" />
          BETINDIA SYSTEM STATUS: CLEAR
        </div>

        {/* Large Heading */}
        <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
          {mainTitle}{" "}
          {highlightedWord && (
            <span className="bg-gradient-to-r from-[#FF7A00] via-[#FFB800] to-[#FF7A00] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(255,122,0,0.2)]" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #FF7A00, #FFB800, #FF7A00)', WebkitBackgroundClip: 'text' }}>
              {highlightedWord}
            </span>
          )}
        </div>

        {/* Subdescription */}
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300 whitespace-pre-line">
          {data.description}
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={CTA_LINKS.signup}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E05E00] px-8 py-4 text-base font-black text-white shadow-lg shadow-[#FF7A00]/25 hover:shadow-[#FF7A00]/45 transition-all duration-300 hover:scale-[1.02] sm:w-auto"
          >
            {data.primaryCta}
          </Link>
          
          <Link
            href={CTA_LINKS.signup}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-8 py-4 text-base font-black text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FF7A00]/55 hover:bg-white/5 sm:w-auto"
          >
            <Sparkles size={16} className="text-[#4EA8FF]" />
            {data.secondaryCta}
          </Link>
        </div>

        <p className="mt-8 text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] font-mono">
          18+ Only • Play Responsibly • Licensed Casino Operations
        </p>

      </div>
    </section>
  );
}
