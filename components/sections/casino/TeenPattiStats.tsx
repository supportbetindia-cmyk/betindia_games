"use client";

import React, { useState, useEffect } from "react";
import { Users, Activity, Play, Trophy } from "lucide-react";

function Counter({ 
  value, 
  duration = 2000, 
  prefix = "", 
  suffix = "",
  liveUpdateInterval = 0,
  liveUpdateRange = [0, 0]
}: { 
  value: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string;
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

export default function TeenPattiStats() {
  return (
    <section className="relative bg-[#050B18] py-20 overflow-hidden border-b border-white/[0.04]">
      {/* Background Soft Glows */}
      <div className="absolute left-1/3 bottom-0 h-96 w-96 rounded-full bg-[#138808]/3 blur-[100px] pointer-events-none" />
      <div className="absolute right-1/3 top-0 h-96 w-96 rounded-full bg-[#D4AF37]/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Grid layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Stat 1: Live Players */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E1B30]/60 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/30">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">Active Players</span>
              <div className="h-8 w-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <Users size={14} />
              </div>
            </div>
            <div className="mt-4 text-xl sm:text-3xl font-black text-white tracking-tight font-mono">
              <Counter 
                value={18420} 
                liveUpdateInterval={3000} 
                liveUpdateRange={[-15, 20]} 
              />
            </div>
            <p className="mt-2 text-[10px] text-[#D4AF37] font-bold tracking-wide flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#138808] animate-pulse" />
              LIVE TELEMETRY
            </p>
          </div>

          {/* Stat 2: Active Tables */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E1B30]/60 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#138808]/30">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">Active Tables</span>
              <div className="h-8 w-8 rounded-lg bg-[#138808]/10 flex items-center justify-center text-[#138808]">
                <Play size={14} fill="currentColor" />
              </div>
            </div>
            <div className="mt-4 text-xl sm:text-3xl font-black text-white tracking-tight font-mono">
              <Counter 
                value={142} 
                liveUpdateInterval={5000} 
                liveUpdateRange={[-2, 3]} 
              />
            </div>
            <p className="mt-2 text-[10px] text-[#138808] font-bold tracking-wide">
              LOBBY RUNTIME OK
            </p>
          </div>

          {/* Stat 3: Games Played Today */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E1B30]/60 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/30">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">Rounds Today</span>
              <div className="h-8 w-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <Activity size={14} />
              </div>
            </div>
            <div className="mt-4 text-xl sm:text-3xl font-black text-white tracking-tight font-mono">
              <Counter 
                value={842500} 
                liveUpdateInterval={2000} 
                liveUpdateRange={[2, 6]} 
              />
            </div>
            <p className="mt-2 text-[10px] text-[#D4AF37] font-bold tracking-wide">
              SYSTEM SEED GENERATOR
            </p>
          </div>

          {/* Stat 4: Highest Winning Pot */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E1B30]/60 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#138808]/30">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">Peak Win Pot</span>
              <div className="h-8 w-8 rounded-lg bg-[#138808]/10 flex items-center justify-center text-[#138808]">
                <Trophy size={14} />
              </div>
            </div>
            <div className="mt-4 text-xl sm:text-3xl font-black text-white tracking-tight font-mono">
              <Counter value={4500000} prefix="₹" />
            </div>
            <p className="mt-2 text-[10px] text-[#138808] font-bold tracking-wide">
              LATEST POT CLEARANCE
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
