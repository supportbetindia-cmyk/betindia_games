"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Percent, TrendingUp, Users, Activity } from "lucide-react";

// Client-side counter helper
function AnimatedCount({ 
  value, 
  duration = 2000, 
  isFloat = false, 
  suffix = "", 
  prefix = "",
  liveUpdateInterval = 0,
  liveUpdateRange = [0, 0]
}: { 
  value: number; 
  duration?: number; 
  isFloat?: boolean; 
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

  // Handle live fluctuations (e.g. active players or games counter incrementing)
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
      {isFloat 
        ? count.toFixed(1) 
        : Math.round(count).toLocaleString()
      }
      {suffix}
    </span>
  );
}

export default function AeroLuxeStats() {
  return (
    <section className="relative bg-[#07070A] py-20 overflow-hidden border-b border-white/[0.04]">
      {/* Background Soft Glows */}
      <div className="absolute left-1/3 bottom-0 h-96 w-96 rounded-full bg-[#3B82F6]/3 blur-[100px] pointer-events-none" />
      <div className="absolute right-1/3 top-0 h-96 w-96 rounded-full bg-[#D4AF37]/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: RTP */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E0F14]/75 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Return to Player</span>
              <div className="h-8 w-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <Percent size={14} />
              </div>
            </div>
            <div className="mt-4 text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
              <AnimatedCount value={97.0} isFloat={true} suffix="%" />
            </div>
            <p className="mt-2 text-xs text-[#D4AF37] font-bold tracking-wide">
              PROVABLY FAIR VERIFIED
            </p>
          </div>

          {/* Card 2: Max Multiplier */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E0F14]/75 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#3B82F6]/30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Max Multiplier</span>
              <div className="h-8 w-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                <TrendingUp size={14} />
              </div>
            </div>
            <div className="mt-4 text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
              <AnimatedCount value={10000} suffix="x+" />
            </div>
            <p className="mt-2 text-xs text-[#3B82F6] font-bold tracking-wide">
              UNCAPPED POTENTIAL
            </p>
          </div>

          {/* Card 3: Active Players */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E0F14]/75 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Active Pilots</span>
              <div className="h-8 w-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <Users size={14} />
              </div>
            </div>
            <div className="mt-4 text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
              <AnimatedCount 
                value={14250} 
                liveUpdateInterval={3000} 
                liveUpdateRange={[-18, 22]} 
              />
            </div>
            <p className="mt-2 text-xs text-[#D4AF37] font-bold tracking-wide flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE TELEMETRY
            </p>
          </div>

          {/* Card 4: Games Played Today */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E0F14]/75 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#3B82F6]/30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Flights Today</span>
              <div className="h-8 w-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                <Activity size={14} />
              </div>
            </div>
            <div className="mt-4 text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
              <AnimatedCount 
                value={1284500} 
                liveUpdateInterval={2000} 
                liveUpdateRange={[1, 5]} 
              />
            </div>
            <p className="mt-2 text-xs text-[#3B82F6] font-bold tracking-wide">
              SYSTEM DIAGNOSTICS OK
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
