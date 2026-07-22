"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coins, Navigation, TrendingUp, Landmark, type LucideIcon } from "lucide-react";

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  accentColor: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Choose Bet Amount",
    subtitle: "MANUAL & AUTO CONTROLS",
    description: "Enter your wagering stakes. Configure optional Auto Bet limits or set Auto Cash Out targets (e.g. 2.00x) in the console.",
    icon: Coins,
    accentColor: "#FF7A00", // Orange
  },
  {
    number: "02",
    title: "Plane Starts Flying",
    subtitle: "RUNWAY DEPARTURE",
    description: "The countdown disengages and the jet takes off from the runway. Engine diagnostics light up as velocity increases.",
    icon: Navigation,
    accentColor: "#4EA8FF", // Sky Blue
  },
  {
    number: "03",
    title: "Multiplier Keeps Growing",
    subtitle: "ALTITUDE ASCENT",
    description: "Watch the multiplier coordinate climb continuously. The higher the altitude, the higher your potential payout.",
    icon: TrendingUp,
    accentColor: "#FF7A00",
  },
  {
    number: "04",
    title: "Cash Out Before Away",
    subtitle: "MISSION ACCOMPLISHED",
    description: "Hit the Cash Out button before the jet reaches escape velocity and disappears. Lock in your earnings instantly.",
    icon: Landmark,
    accentColor: "#4EA8FF",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  },
};

export default function BetIndiaHowToPlay() {
  return (
    <section id="how-to-play" className="relative bg-[#081426] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Background Soft Glows */}
      <div className="absolute left-1/4 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[#4EA8FF]/3 blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[#FF7A00]/3 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#FF7A00] backdrop-blur-md">
            FLIGHT PRE-DEPARTURE TRAINING
          </span>
          
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            Runway Timeline: <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFB800] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #FF7A00, #FFB800)', WebkitBackgroundClip: 'text' }}>How To Play</span>
          </div>
          
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Familiarize yourself with the dashboard procedure. Learn how to pilot your way to premium returns.
          </p>
        </div>

        {/* Steps Timeline Area */}
        <div className="relative">
          
          {/* Glowing dashed Runway Line for Desktop */}
          <div className="absolute top-[48px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#FF7A00]/20 via-[#4EA8FF]/30 to-[#FF7A00]/20 hidden lg:block pointer-events-none">
            <motion.div 
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 -translate-y-1/2 w-24 h-[3px] bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent"
            />
          </div>

          {/* Steps Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
          >
            {STEPS.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="flex flex-col items-center text-center lg:items-start lg:text-left group"
                >
                  {/* Step Badge & Icon */}
                  <div className="relative flex items-center justify-center mb-6">
                    {/* Ring Glow */}
                    <div 
                      className="absolute inset-[-4px] rounded-2xl blur-sm opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                      style={{ backgroundColor: step.accentColor }}
                    />
                    
                    {/* Icon Containment */}
                    <div 
                      className="relative h-16 w-16 rounded-2xl border flex items-center justify-center backdrop-blur-xl"
                      style={{ 
                        backgroundColor: "rgba(10, 20, 40, 0.9)", 
                        borderColor: `${step.accentColor}33` 
                      }}
                    >
                      <IconComponent className="h-6 w-6" style={{ color: step.accentColor }} />
                    </div>

                    {/* Numeric indicator badge */}
                    <span 
                      className="absolute -top-3 -right-3 text-[10px] font-black tracking-wider px-2 py-0.5 rounded-full border bg-black"
                      style={{ 
                        color: step.accentColor, 
                        borderColor: `${step.accentColor}33` 
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Telemetry labels */}
                  <span className="text-[10px] font-black tracking-[0.18em] text-slate-500 block mb-2 font-mono">
                    {step.subtitle}
                  </span>
                  
                  <h3 className="text-xl font-black text-white group-hover:text-[#FF7A00] transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="mt-3 text-sm leading-relaxed text-slate-450 group-hover:text-slate-355 transition-colors duration-300">
                    {step.description}
                  </p>

                  {/* Flow Arrow for Mobile */}
                  {idx < 3 && (
                    <div className="my-6 lg:hidden flex justify-center text-slate-700 font-bold">
                      <span>↓</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
