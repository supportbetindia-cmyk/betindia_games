"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Trophy, Activity, Navigation } from "lucide-react";

// Client-side animated counter component
function CountUp({ 
  value, 
  duration = 2000, 
  suffix = "", 
  prefix = "",
  liveUpdateInterval = 0,
  liveUpdateRange = [0, 0]
}: { 
  value: number; 
  duration?: number; 
  suffix?: string; 
  prefix?: string;
  liveUpdateInterval?: number;
  liveUpdateRange?: [number, number];
}) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMiliseconds = duration;
    const incrementTime = 30; // 30ms updates
    const totalSteps = Math.ceil(totalMiliseconds / incrementTime);
    const stepValue = (end - start) / totalSteps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const nextCount = start + stepValue * currentStep;
      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(nextCount);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  useEffect(() => {
    if (liveUpdateInterval <= 0) return;

    const liveTimer = setInterval(() => {
      const delta = Math.floor(
        Math.random() * (liveUpdateRange[1] - liveUpdateRange[0] + 1) + liveUpdateRange[0]
      );
      setCount((prev) => Math.max(0, prev + delta));
    }, liveUpdateInterval);

    return () => clearInterval(liveTimer);
  }, [liveUpdateInterval, liveUpdateRange]);

  return (
    <span>
      {prefix}
      {Math.round(count).toLocaleString()}
      {suffix}
    </span>
  );
}

export default function BetIndiaLiveStats() {
  return (
    <section className="relative bg-[#081426] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Background Soft Glows */}
      <div className="absolute left-1/3 bottom-0 h-96 w-96 rounded-full bg-[#4EA8FF]/3 blur-[100px] pointer-events-none" />
      <div className="absolute right-1/3 top-0 h-96 w-96 rounded-full bg-[#FF7A00]/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#FF7A00] backdrop-blur-md">
            SYSTEM TELEMETRY DATABANK
          </span>
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            Live Game <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFB800] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #FF7A00, #FFB800)', WebkitBackgroundClip: 'text' }}>Statistics</span>
          </div>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Real-time flight execution audits. Monitor active traffic profiles and cumulative payout indices.
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Total Players */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E1B30]/60 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#FF7A00]/30">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">TOTAL PILOTS</span>
              <div className="h-8 w-8 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00]">
                <Users size={14} />
              </div>
            </div>
            <div className="mt-4 text-xl sm:text-3xl font-black text-white tracking-tight font-mono">
              <CountUp 
                value={428450} 
                liveUpdateInterval={4000} 
                liveUpdateRange={[2, 8]} 
              />
            </div>
            <p className="mt-2 text-[10px] text-[#FF7A00] font-bold tracking-wide">
              REGISTERED CAPTAINS
            </p>
          </div>

          {/* Card 2: Highest Win */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E1B30]/60 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#4EA8FF]/30">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">HIGHEST PAYOUT</span>
              <div className="h-8 w-8 rounded-lg bg-[#4EA8FF]/10 flex items-center justify-center text-[#4EA8FF]">
                <Trophy size={14} />
              </div>
            </div>
            <div className="mt-4 text-xl sm:text-3xl font-black text-white tracking-tight font-mono">
              <CountUp value={245000} prefix="₹" />
            </div>
            <p className="mt-2 text-[10px] text-[#4EA8FF] font-bold tracking-wide">
              SINGLE MULTIPLIER HIGHEST WIN
            </p>
          </div>

          {/* Card 3: Games Today */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E1B30]/60 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#FF7A00]/30">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">FLIGHTS TODAY</span>
              <div className="h-8 w-8 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00]">
                <Activity size={14} />
              </div>
            </div>
            <div className="mt-4 text-xl sm:text-3xl font-black text-white tracking-tight font-mono">
              <CountUp 
                value={128450} 
                liveUpdateInterval={2500} 
                liveUpdateRange={[1, 3]} 
              />
            </div>
            <p className="mt-2 text-[10px] text-[#FF7A00] font-bold tracking-wide">
              ROUND SEQUENCES
            </p>
          </div>

          {/* Card 4: Current Flights */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E1B30]/60 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#4EA8FF]/30">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">ACTIVE TRAFFIC</span>
              <div className="h-8 w-8 rounded-lg bg-[#4EA8FF]/10 flex items-center justify-center text-[#4EA8FF]">
                <Navigation size={14} className="transform rotate-45" />
              </div>
            </div>
            <div className="mt-4 text-xl sm:text-3xl font-black text-white tracking-tight font-mono">
              <CountUp 
                value={1450} 
                liveUpdateInterval={3000} 
                liveUpdateRange={[-12, 15]} 
              />
            </div>
            <p className="mt-2 text-[10px] text-[#4EA8FF] font-bold tracking-wide flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE RADAR TRACK
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
