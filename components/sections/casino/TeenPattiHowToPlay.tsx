"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Grid, MousePointerClick, Wallet, Layers, EyeOff, Trophy, type LucideIcon } from "lucide-react";

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Create Bet India Account",
    subtitle: "STEP 1",
    description: "Sign up and create your secure Bet India account in seconds.",
    icon: UserPlus,
    color: "#D4AF37", // Gold
  },
  {
    number: "02",
    title: "Visit Live Casino Section",
    subtitle: "STEP 2",
    description: "Navigate to the Live Casino lounge from the home dashboard.",
    icon: Grid,
    color: "#138808", // Green
  },
  {
    number: "03",
    title: "Choose a Teen Patti Table",
    subtitle: "STEP 3",
    description: "Pick from the premium live dealer tables that fit your limits.",
    icon: MousePointerClick,
    color: "#D4AF37",
  },
  {
    number: "04",
    title: "Select Betting Amount",
    subtitle: "STEP 4",
    description: "Choose your preferred betting chips and place your Ante wager.",
    icon: Wallet,
    color: "#138808",
  },
  {
    number: "05",
    title: "Receive Your Cards",
    subtitle: "STEP 5",
    description: "The live dealer distributes 3 cards face-down to your station.",
    icon: Layers,
    color: "#D4AF37",
  },
  {
    number: "06",
    title: "Make Betting Choice",
    subtitle: "STEP 6",
    description: "Decide whether to play blind, seen, raise, call, or fold.",
    icon: EyeOff,
    color: "#138808",
  },
  {
    number: "07",
    title: "Determine Showdown",
    subtitle: "STEP 7",
    description: "Continue betting rounds until the showdown reveals the winning hand.",
    icon: Trophy,
    color: "#D4AF37",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  },
};

export default function TeenPattiHowToPlay() {
  return (
    <section id="how-to-play" className="relative bg-[#050B18] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Background Soft Glows */}
      <div className="absolute left-1/4 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[#138808]/3 blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[#D4AF37]/3 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] backdrop-blur-md">
            PILOT INSTRUCTIONS
          </span>
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            Casino Journey: <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFF3B0] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #D4AF37, #FFF3B0)', WebkitBackgroundClip: 'text' }}>How To Play</span>
          </div>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Follow these seven steps to get dealt into live real money Teen Patti rounds on Bet India.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          
          {/* Connector dashed line */}
          <div className="absolute top-[48px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#D4AF37]/10 via-[#138808]/20 to-[#D4AF37]/10 hidden lg:block pointer-events-none">
            <motion.div 
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 -translate-y-1/2 w-28 h-[2px] bg-[#D4AF37]"
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 relative z-10"
          >
            {STEPS.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="flex flex-col items-center text-center lg:items-start lg:text-left group bg-[#0E1B30]/40 border border-white/[0.05] rounded-2xl p-4 backdrop-blur-md"
                >
                  {/* Step Icon Badge */}
                  <div className="relative flex items-center justify-center mb-4">
                    <div 
                      className="absolute inset-[-4px] rounded-2xl blur-sm opacity-10 group-hover:opacity-30 transition-opacity duration-300"
                      style={{ backgroundColor: step.color }}
                    />
                    <div 
                      className="relative h-12 w-12 rounded-xl border flex items-center justify-center backdrop-blur-xl bg-[#050B18]"
                      style={{ borderColor: `${step.color}25` }}
                    >
                      <IconComponent className="h-5 w-5" style={{ color: step.color }} />
                    </div>

                    <span 
                      className="absolute -top-2 -right-2 text-[8px] font-black tracking-wider px-1.5 py-0.5 rounded-full border bg-black font-mono"
                      style={{ 
                        color: step.color, 
                        borderColor: `${step.color}25` 
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Descriptions */}
                  <span className="text-[8px] font-black tracking-[0.18em] text-slate-500 block mb-1 font-mono">
                    {step.subtitle}
                  </span>
                  
                  <h4 className="text-xs font-black text-white group-hover:text-[#FF6B00] transition-colors duration-300 leading-tight">
                    {step.title}
                  </h4>
                  
                  <p className="mt-2 text-[10px] leading-relaxed text-slate-400 group-hover:text-slate-350 transition-colors duration-300">
                    {step.description}
                  </p>

                  {idx < 6 && (
                    <div className="my-4 lg:hidden flex justify-center text-slate-700 font-bold">
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
