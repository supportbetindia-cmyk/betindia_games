"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, AlertTriangle, Cpu, Navigation, Gauge } from "lucide-react";

interface Telemetry {
  speed: number;
  altitude: number;
  pitch: number;
  cabinPressure: string;
}

export default function BetIndiaMultiplierPanel() {
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [gameState, setGameState] = useState<"countdown" | "flying" | "crashed">("countdown");
  const [countdown, setCountdown] = useState<number>(5);
  const [telemetry, setTelemetry] = useState<Telemetry>({ speed: 0, altitude: 0, pitch: 0, cabinPressure: "1.0 ATM" });
  
  const crashPointRef = useRef<number>(1.0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    runCycle();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const runCycle = () => {
    setGameState("countdown");
    setCountdown(5);
    setMultiplier(1.0);
    setTelemetry({ speed: 0, altitude: 0, pitch: 0, cabinPressure: "1.0 ATM" });

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
    const rand = Math.random();
    if (rand < 0.15) {
      crashPointRef.current = 1.01 + Math.random() * 0.1;
    } else if (rand < 0.7) {
      crashPointRef.current = 1.2 + Math.random() * 2.5;
    } else if (rand < 0.93) {
      crashPointRef.current = 4.0 + Math.random() * 7.0;
    } else {
      crashPointRef.current = 12.0 + Math.random() * 25.0;
    }

    setGameState("flying");
    startTimeRef.current = Date.now();
    runFlightAnimation();
  };

  const runFlightAnimation = () => {
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const currentMult = parseFloat(Math.exp(0.16 * elapsed).toFixed(2));

    if (currentMult >= crashPointRef.current) {
      setMultiplier(crashPointRef.current);
      setGameState("crashed");
      setTimeout(runCycle, 4000);
    } else {
      setMultiplier(currentMult);
      setTelemetry({
        speed: Math.round(300 + currentMult * 180),
        altitude: Math.round(currentMult * 1250),
        pitch: Math.min(45, Math.round(currentMult * 8)),
        cabinPressure: (Math.max(0.7, 1.0 - currentMult * 0.02)).toFixed(2) + " ATM"
      });
      animationRef.current = requestAnimationFrame(runFlightAnimation);
    }
  };

  // Dimensions for HUD flight path
  const width = 600;
  const height = 300;
  const progressPercent = Math.min(((multiplier - 1) / (Math.max(crashPointRef.current, 5) - 1)) * 100, 100);
  
  const planeX = (progressPercent / 100) * (width - 80) + 40;
  const planeY = height - ((progressPercent / 100) * (height - 80)) - 40;
  const pathD = `M 40,${height - 40} Q ${width * 0.45},${height - 40} ${planeX},${planeY}`;

  return (
    <section className="relative bg-[#081426] py-20 px-4 overflow-hidden border-b border-white/[0.04]">
      {/* Background Orbs */}
      <div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-[#FF7A00]/5 blur-[100px] pointer-events-none" />
      <div className="absolute left-10 top-10 h-96 w-96 rounded-full bg-[#4EA8FF]/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#FF7A00] backdrop-blur-md">
            REAL-TIME FLIGHT DIALS
          </span>
          <div className="mt-4 text-2xl font-extrabold text-white tracking-tight sm:text-3xl md:text-4xl">
            Flight Cockpit <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFB800] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #FF7A00, #FFB800)', WebkitBackgroundClip: 'text' }}>Control Center</span>
          </div>
        </div>

        {/* Dashboard Control Panel Body */}
        <div className="relative rounded-3xl border border-white/[0.08] bg-[#0A162B] p-5 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          
          {/* Neon warning lamp strip */}
          <div className="absolute top-0 inset-x-16 h-[2px] bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent shadow-[0_0_15px_#FF7A00]" />
          
          {/* Main Instrumentation Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Vertical Telemetry Gauges (Speedometer, Altimeter) */}
            <div className="lg:col-span-3 flex flex-col justify-between gap-4 border-r border-white/[0.06] pr-0 lg:pr-6">
              
              {/* Speedometer Gauge Dial */}
              <div className="bg-[#050B18]/60 border border-white/5 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest font-mono">VELOCITY GAUGER</span>
                <div className="flex items-end justify-between mt-3 font-mono">
                  <div className="text-xl font-black text-white">{telemetry.speed} <span className="text-[10px] text-slate-400">KT</span></div>
                  <div className="h-10 w-2.5 bg-slate-800 rounded-sm overflow-hidden flex flex-col justify-end">
                    <motion.div 
                      className="bg-[#FF7A00] shadow-[0_0_8px_#FF7A00]" 
                      style={{ height: `${Math.min(100, (telemetry.speed / 800) * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 top-0 w-1 bg-[#FF7A00]/20 pointer-events-none" />
              </div>

              {/* Altitude Dial */}
              <div className="bg-[#050B18]/60 border border-white/5 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest font-mono">ALTITUDE SENSOR</span>
                <div className="flex items-end justify-between mt-3 font-mono">
                  <div className="text-xl font-black text-white">{telemetry.altitude} <span className="text-[10px] text-slate-400">FT</span></div>
                  <div className="h-10 w-2.5 bg-slate-800 rounded-sm overflow-hidden flex flex-col justify-end">
                    <motion.div 
                      className="bg-[#4EA8FF] shadow-[0_0_8px_#4EA8FF]" 
                      style={{ height: `${Math.min(100, (telemetry.altitude / 6000) * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 top-0 w-1 bg-[#4EA8FF]/20 pointer-events-none" />
              </div>

              {/* Pitch Angle Indicator */}
              <div className="bg-[#050B18]/60 border border-white/5 rounded-2xl p-4 font-mono text-[9px] text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>PITCH:</span>
                  <span className="text-white font-bold">{telemetry.pitch}° UP</span>
                </div>
                <div className="flex justify-between">
                  <span>CABIN TEMP:</span>
                  <span className="text-white font-bold">21°C</span>
                </div>
                <div className="flex justify-between">
                  <span>CABIN PRES:</span>
                  <span className="text-white font-bold">{telemetry.cabinPressure}</span>
                </div>
              </div>

            </div>

            {/* Middle Column: Central Flight Vector Renderer */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-[#050B18] rounded-2xl border border-white/[0.06] p-4 min-h-[300px] relative overflow-hidden">
              
              {/* Telemetry crosshair grid overlay */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              {/* Animate Overlays */}
              <AnimatePresence mode="wait">
                {gameState === "countdown" && (
                  <motion.div 
                    key="countdown"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-[#050B18]/90 z-20"
                  >
                    <p className="text-[9px] font-black text-slate-500 tracking-[0.25em] mb-1.5 font-mono">COCKPIT INITIATING</p>
                    <div className="text-3xl font-black text-white">
                      NEXT DEPARTURE: <span className="text-[#FF7A00]">{countdown}s</span>
                    </div>
                    <div className="w-32 h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                      <motion.div 
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="h-full bg-[#FF7A00] shadow-[0_0_8px_#FF7A00]"
                      />
                    </div>
                  </motion.div>
                )}

                {gameState === "crashed" && (
                  <motion.div 
                    key="crashed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/20 backdrop-blur-[2px] z-20"
                  >
                    <div className="bg-[#FF7A00]/10 border border-[#FF7A00]/30 px-3.5 py-1 rounded-lg text-[9px] font-black text-[#FF7A00] tracking-widest uppercase mb-1.5 font-mono flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,122,0,0.15)]">
                      <AlertTriangle size={11} /> CONNECTION LOST
                    </div>
                    <p className="text-3xl font-black text-red-500 tracking-wider uppercase drop-shadow-[0_0_12px_rgba(239,68,68,0.25)]">FLEW AWAY!</p>
                    <p className="text-slate-400 font-bold mt-1 text-xs">Crashed Altitude: <span className="text-white font-black font-mono">{multiplier.toFixed(2)}x</span></p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Telemetry Header */}
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <span className="text-[8px] font-black tracking-[0.18em] text-slate-500 block leading-none font-mono">COEFFICIENT ALTITUDE</span>
                  <span className="text-4xl font-black text-white mt-1.5 block font-mono tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    {multiplier.toFixed(2)}x
                  </span>
                </div>
                
                {/* Active Indicator Lamp */}
                <div className="flex items-center gap-2 bg-black/40 border border-white/5 rounded-full px-3 py-1.5 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className={`absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75 ${gameState === "flying" ? "animate-ping" : ""}`} />
                    <span className={`relative inline-flex h-2 w-2 rounded-full ${gameState === "flying" ? "bg-[#FF7A00]" : "bg-slate-500"}`} />
                  </span>
                  <span className="text-[8px] font-black tracking-wider text-slate-350 uppercase font-mono">FLIGHT ENGINE</span>
                </div>
              </div>

              {/* SVG Curve Flight Path & Plane Renderer */}
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                {gameState === "flying" && (
                  <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`}>
                    {/* Horizon HUD guidance bar lines */}
                    <path d={`M 40,${height - 40} L ${width - 40},${height - 40}`} stroke="rgba(255,255,255,0.02)" strokeWidth="1.5" />
                    <path d={`M 40,150 L ${width - 40},150`} stroke="rgba(255,255,255,0.01)" strokeWidth="1" strokeDasharray="3,3" />
                    
                    {/* Vector Path */}
                    <motion.path
                      d={pathD}
                      fill="none"
                      stroke="url(#multiplier-trail)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.15 }}
                    />
                    {/* Flight Gradient filling area */}
                    <path 
                      d={`${pathD} L ${planeX},${height - 40} L 40,${height - 40} Z`}
                      fill="url(#multiplier-fill)"
                    />
                    
                    <defs>
                      <linearGradient id="multiplier-trail" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4EA8FF" />
                        <stop offset="100%" stopColor="#FF7A00" />
                      </linearGradient>
                      <linearGradient id="multiplier-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#4EA8FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}

                {/* Jet Icon at Tip of curve */}
                {gameState === "flying" && (
                  <div
                    className="absolute z-10"
                    style={{
                      left: `${(planeX / width) * 100}%`,
                      top: `${(planeY / height) * 100}%`,
                      transform: "translate(-50%, -50%) rotate(-15deg)"
                    }}
                  >
                    <div className="relative">
                      {/* Engine Exhaust Glow trail */}
                      <div className="absolute -left-3 top-[2px] w-2.5 h-1.5 rounded-full bg-[#FF7A00]/80 blur-[1px] animate-ping" />
                      <Plane size={20} className="text-[#FF7A00]" fill="#FF7A00" />
                    </div>
                  </div>
                )}
              </div>

              {/* Cockpit Status Bar Footer */}
              <div className="relative z-10 flex justify-between items-center text-[7px] sm:text-[8px] text-slate-500 font-bold uppercase tracking-widest border-t border-white/[0.04] pt-2 font-mono">
                <span>SYSTEM DIAGNOSTICS: AUTO</span>
                <span className="text-[#4EA8FF]">PROVABLY CRYPTOGRAPHIC</span>
              </div>

            </div>

            {/* Right Column: Dial Meters & Control Options */}
            <div className="lg:col-span-3 flex flex-col justify-between gap-4 border-l border-white/[0.06] pl-0 lg:pl-6">
              
              {/* Flight Progress meter */}
              <div className="bg-[#050B18]/60 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[8px] font-black text-slate-500 uppercase tracking-widest font-mono">
                  <span>Flight Progress</span>
                  <span className="text-white font-bold">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full mt-3 overflow-hidden relative border border-white/5">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#4EA8FF] to-[#FF7A00]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Orange Warning Indicators list */}
              <div className="bg-[#050B18]/60 border border-white/5 rounded-2xl p-4 font-mono text-[8px] text-slate-400 space-y-2.5">
                <span className="font-black text-slate-500 uppercase tracking-widest block border-b border-white/[0.04] pb-1">COCKPIT STATUS CHECK</span>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A00] animate-pulse" />
                  <span>THRUST PROFILE: ENGINE ARMED</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>AUTO-CASH FLIGHT TRIGGERS: OK</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>SEED SELECTION: ENCRYPTED</span>
                </div>
              </div>

              {/* Diagnostic Button */}
              <div className="flex gap-2">
                <div className="flex-1 rounded-xl bg-white/[0.02] border border-white/5 p-3 flex flex-col justify-between items-center text-center">
                  <Gauge size={14} className="text-[#4EA8FF] mb-1" />
                  <span className="text-[7px] font-black text-slate-500 uppercase tracking-wider block">G-FORCE</span>
                  <span className="text-xs font-black text-white mt-1">{(1.0 + multiplier * 0.35).toFixed(1)}G</span>
                </div>
                <div className="flex-1 rounded-xl bg-white/[0.02] border border-white/5 p-3 flex flex-col justify-between items-center text-center">
                  <Cpu size={14} className="text-[#FF7A00] mb-1" />
                  <span className="text-[7px] font-black text-slate-500 uppercase tracking-wider block">CPU CORE</span>
                  <span className="text-xs font-black text-white mt-1">45°C</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
