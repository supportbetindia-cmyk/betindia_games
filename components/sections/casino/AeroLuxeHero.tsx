"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Zap, Shield, HelpCircle, Trophy, Users, Award, Play } from "lucide-react";
import Link from "next/link";
import { CTA_LINKS } from "@/lib/cta-links";

// Type definitions for telemetry
interface Telemetry {
  speed: number;
  altitude: number;
  fuel: number;
  gForce: string;
}

export default function AeroLuxeHero() {
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [gameState, setGameState] = useState<"countdown" | "flying" | "crashed">("countdown");
  const [countdown, setCountdown] = useState<number>(5);
  const [history, setHistory] = useState<number[]>([1.45, 8.24, 1.12, 34.60, 2.05, 12.80]);
  const [telemetry, setTelemetry] = useState<Telemetry>({ speed: 0, altitude: 0, fuel: 100, gForce: "1.0G" });
  
  const crashPointRef = useRef<number>(1.0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Cycle simulation
  useEffect(() => {
    runCycle();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const runCycle = () => {
    // 1. Countdown state
    setGameState("countdown");
    setCountdown(5);
    setMultiplier(1.0);
    setTelemetry({ speed: 0, altitude: 0, fuel: 100, gForce: "1.0G" });

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          startFlight();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startFlight = () => {
    // Generate a random crash point with high-end distribution
    const rand = Math.random();
    if (rand < 0.1) {
      crashPointRef.current = 1.01 + Math.random() * 0.08; // Early crash
    } else if (rand < 0.6) {
      crashPointRef.current = 1.1 + Math.random() * 2.0; // Low-mid multiplier
    } else if (rand < 0.9) {
      crashPointRef.current = 3.0 + Math.random() * 8.0; // High-mid multiplier
    } else {
      crashPointRef.current = 11.0 + Math.random() * 88.0; // Massive premium multiplier
    }

    setGameState("flying");
    startTimeRef.current = Date.now();
    runFlightAnimation();
  };

  const runFlightAnimation = () => {
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    // Multiplier rises exponentially: mult = e^(0.15 * t)
    const currentMult = parseFloat(Math.exp(0.18 * elapsed).toFixed(2));

    if (currentMult >= crashPointRef.current) {
      setMultiplier(crashPointRef.current);
      setGameState("crashed");
      setHistory((prev) => [crashPointRef.current, ...prev.slice(0, 5)]);
      
      // Keep in crashed state for 4 seconds then restart
      setTimeout(() => {
        runCycle();
      }, 4000);
    } else {
      setMultiplier(currentMult);
      
      // Update telemetry based on multiplier
      setTelemetry({
        speed: Math.round(280 + currentMult * 220),
        altitude: Math.round(currentMult * 1450),
        fuel: Math.max(0, Math.round(100 - elapsed * 2.5)),
        gForce: (1.0 + (currentMult * 0.4)).toFixed(1) + "G",
      });

      animationRef.current = requestAnimationFrame(runFlightAnimation);
    }
  };

  // SVG dimensions for the flying graph
  const width = 500;
  const height = 240;
  const progressPercent = Math.min(((multiplier - 1) / (Math.max(crashPointRef.current, 5) - 1)) * 100, 100);
  
  // Calculate SVG curve coordinates
  const planeX = (progressPercent / 100) * (width - 60) + 30;
  const planeY = height - ((progressPercent / 100) * (height - 70)) - 30;
  const pathD = `M 30,${height - 30} Q ${width * 0.4},${height - 30} ${planeX},${planeY}`;

  return (
    <div className="relative w-full overflow-hidden bg-[#07070A] py-16 lg:py-24 border-b border-white/[0.04]">
      {/* Luxury Cinematic Aviation Background */}
      <div className="absolute inset-0 z-0">
        {/* Sky Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#0D111A] to-[#07070A]" />
        
        {/* Soft Glowing Gold and Blue Orbs */}
        <div className="absolute -left-20 top-20 h-[500px] w-[500px] rounded-full bg-[#3B82F6]/7 blur-[120px] pointer-events-none" />
        <div className="absolute -right-20 bottom-10 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

        {/* Moving Clouds with Soft Opacity */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[10%] top-[25%] h-24 w-80 rounded-full bg-slate-400 blur-3xl animate-float-slow" />
          <div className="absolute right-[20%] top-[40%] h-32 w-96 rounded-full bg-slate-400 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute left-[35%] bottom-[15%] h-20 w-72 rounded-full bg-slate-400 blur-3xl animate-float-fast" style={{ animationDelay: "1s" }} />
        </div>

        {/* Futuristic Grid Texture */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }}
        />

        {/* Speed lines running diagonally */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent rotate-[-15deg] animate-[shimmer_3s_infinite]" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-2/3 left-1/4 w-48 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent rotate-[-15deg] animate-[shimmer_4s_infinite]" />
          <div className="absolute top-1/3 right-1/4 w-40 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent rotate-[-15deg] animate-[shimmer_3.5s_infinite]" style={{ animationDelay: "1.5s" }} />
        </div>
      </div>

      {/* Floating Betting Chips - Subtle Decoration */}
      <div className="absolute right-[12%] top-[15%] pointer-events-none z-10 hidden xl:block">
        <motion.div 
          animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/40 shadow-[0_0_20px_rgba(212,175,55,0.15)] backdrop-blur-md"
        >
          <div className="absolute inset-1 rounded-full border border-dashed border-[#D4AF37]/20" />
          <span className="text-[10px] font-black text-[#D4AF37]">₹1K</span>
        </motion.div>
      </div>
      <div className="absolute left-[8%] bottom-[20%] pointer-events-none z-10 hidden xl:block">
        <motion.div 
          animate={{ y: [0, 10, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#3B82F6]/30 bg-black/40 shadow-[0_0_20px_rgba(59,130,246,0.15)] backdrop-blur-md"
        >
          <div className="absolute inset-1 rounded-full border border-dashed border-[#3B82F6]/20" />
          <span className="text-[10px] font-black text-[#3B82F6]">₹5K</span>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Heading & Copy (Glassmorphism Card) */}
          <div className="flex flex-col items-center text-center lg:col-span-5 lg:items-start lg:text-left">
            
            {/* Premium Gold Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.05)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
              </span>
              Ultra-Luxury Flight Casino
            </div>

            {/* Custom Heading (Workaround for force-white h1 rule) */}
            <div 
              role="heading" 
              aria-level={1}
              className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[48px]"
            >
              Take Off into <br />
              <span 
                className="bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(212,175,55,0.15)]"
                style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #D4AF37, #FFF3B0, #D4AF37)', WebkitBackgroundClip: 'text' }}
              >
                AeroLuxe
              </span>
            </div>

            <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-300 max-w-lg">
              Experience the pinnacle of high-stakes aviation crash gaming. Place your bets, monitor real-time diagnostics, and secure your multiplier before the jet reaches escape velocity. 
            </p>

            <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-lg">
              Designed with bespoke glassmorphism aesthetics and Apple-level spacing, delivering the ultimate luxury entertainment for discerning players.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href={CTA_LINKS.signup}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] px-8 py-4 text-sm font-black text-black shadow-lg shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play size={14} fill="currentColor" />
                PLAY NOW
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-bold text-slate-200 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#3B82F6]/55 hover:bg-white/[0.06] active:scale-[0.98]"
              >
                LEARN RULES
              </a>
            </div>

            {/* Floating Live Stats Badges */}
            <div className="mt-10 grid grid-cols-2 gap-4 w-full max-w-md pt-6 border-t border-white/[0.06]">
              <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-3 backdrop-blur-sm">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
                  <Users size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">LIVE PILOTS</div>
                  <div className="text-sm font-black text-white">14,250+</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-3 backdrop-blur-sm">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Award size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">MAX MULTIPLIER</div>
                  <div className="text-sm font-black text-[#D4AF37]">10,000x+</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Multiplier Simulator */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-xl rounded-3xl border border-white/[0.08] bg-[#0C0D12]/80 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              
              {/* Thin top accent glow */}
              <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent" />
              
              {/* Live Status Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className={`absolute inline-flex h-full w-full rounded-full bg-[#3B82F6] opacity-75 ${gameState === "flying" ? "animate-ping" : ""}`} />
                    <span className={`relative inline-flex h-2 w-2 rounded-full ${gameState === "flying" ? "bg-[#3B82F6]" : "bg-slate-500"}`} />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Bespoke Flight Telemetry</span>
                </div>

                {/* Recent Multipliers List */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-[260px]">
                  {history.map((val, idx) => (
                    <span
                      key={idx}
                      className={`rounded px-2 py-0.5 text-[9px] font-black shrink-0 border ${
                        val >= 10.0
                          ? "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20"
                          : val >= 2.0
                          ? "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20"
                          : "bg-white/[0.03] text-slate-400 border-white/5"
                      }`}
                    >
                      {val.toFixed(2)}x
                    </span>
                  ))}
                </div>
              </div>

              {/* Main Flight Display Screen */}
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#06070B] h-[240px] flex flex-col justify-between p-4">
                
                {/* Rotating Radar Rings in Background */}
                <div className="absolute right-[10%] bottom-[10%] w-48 h-48 border border-[#3B82F6]/5 rounded-full pointer-events-none flex items-center justify-center">
                  <div className="w-36 h-36 border border-dashed border-[#3B82F6]/10 rounded-full animate-[spin_12s_linear_infinite]" />
                  <div className="absolute w-24 h-24 border border-[#3B82F6]/15 rounded-full" />
                </div>

                {/* State Overlays */}
                <AnimatePresence mode="wait">
                  {gameState === "countdown" && (
                    <motion.div 
                      key="countdown"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-[#06070B]/95 z-20"
                    >
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.25em] mb-2">PRE-FLIGHT COUNTDOWN</p>
                      <div className="text-xl font-extrabold text-white tabular-nums">
                        NEXT FLIGHT IN: <span className="text-[#D4AF37]">{countdown}s</span>
                      </div>
                      <div className="w-24 h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                        <motion.div 
                          initial={{ width: "100%" }}
                          animate={{ width: "0%" }}
                          transition={{ duration: 5, ease: "linear" }}
                          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11]"
                        />
                      </div>
                    </motion.div>
                  )}

                  {gameState === "crashed" && (
                    <motion.div 
                      key="crashed"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-[#2B0B0B]/10 backdrop-blur-[3px] z-20"
                    >
                      <div className="text-[#D4AF37] border border-[#D4AF37]/30 bg-black/80 px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase mb-2">
                        FLIGHT COMPLETED
                      </div>
                      <p className="text-3xl font-extrabold text-red-500 uppercase tracking-widest drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">FLEW AWAY!</p>
                      <p className="text-slate-350 font-bold mt-1 text-sm">Escaped Altitude: <span className="text-white font-black">{multiplier.toFixed(2)}x</span></p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Telemetry HUD display */}
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <span className="text-[8px] uppercase font-bold tracking-[0.18em] text-slate-500 block leading-none">FLIGHT ALTITUDE</span>
                    <span className="text-3xl font-black text-white tracking-tight mt-1 block font-mono">
                      {multiplier.toFixed(2)}x
                    </span>
                  </div>

                  {/* Realtime Engine Diagnostics */}
                  <div className="text-right font-mono text-[9px] text-slate-405 space-y-0.5 bg-black/40 p-2 rounded-xl border border-white/5 backdrop-blur-md">
                    <div>SPEED: <span className="text-white font-bold">{telemetry.speed} KT</span></div>
                    <div>HEIGHT: <span className="text-white font-bold">{telemetry.altitude} FT</span></div>
                    <div>G-FORCE: <span className="text-white font-bold">{telemetry.gForce}</span></div>
                    <div className="flex items-center gap-1 mt-1 justify-end">
                      <span>FUEL:</span>
                      <div className="w-10 h-1.5 bg-slate-800 rounded-sm overflow-hidden flex">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-400" 
                          style={{ width: `${telemetry.fuel}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Curved SVG Flight path with pulsing airplane */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  {gameState === "flying" && (
                    <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`}>
                      {/* Grid lines inside flight area */}
                      <path d={`M 30,${height - 30} L ${width - 30},${height - 30}`} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      
                      <motion.path
                        d={pathD}
                        fill="none"
                        stroke="url(#gradient-path)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.1 }}
                      />
                      
                      <path
                        d={`${pathD} L ${planeX},${height - 30} L 30,${height - 30} Z`}
                        fill="url(#gradient-fill)"
                      />
                      
                      <defs>
                        <linearGradient id="gradient-path" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#D4AF37" />
                        </linearGradient>
                        <linearGradient id="gradient-fill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.12" />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}

                  {/* Pulsing Airplane Icon with trails */}
                  {gameState === "flying" && (
                    <div
                      className="absolute z-10"
                      style={{
                        left: `${(planeX / width) * 100}%`,
                        top: `${(planeY / height) * 100}%`,
                        transform: "translate(-50%, -50%) rotate(-15deg)"
                      }}
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Dual Glowing engine trails */}
                        <div className="absolute -left-3 top-[-2px] w-2.5 h-1.5 rounded-full bg-blue-500/70 blur-[1px] animate-ping" />
                        <div className="absolute -left-3 top-[4px] w-2.5 h-1.5 rounded-full bg-amber-500/70 blur-[1px] animate-ping" />

                        {/* Airplane silhouette */}
                        <Plane size={22} className="text-[#D4AF37]" fill="#D4AF37" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative z-10 flex justify-between items-center text-[8px] text-slate-500 font-bold uppercase tracking-widest border-t border-white/[0.04] pt-2">
                  <span>SYSTEM STATUS: {gameState === "flying" ? "FLYING" : "CALIBRATING"}</span>
                  <span className="text-[#3B82F6]">PROVABLY FAIR CERTIFIED</span>
                </div>
              </div>

              {/* Decorative Controller Panel */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Betting Capital</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-black text-white">₹1,000</span>
                    <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded">AUTO</span>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Auto Cash Out</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-black text-[#3B82F6]">2.00x</span>
                    <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded">ON</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
