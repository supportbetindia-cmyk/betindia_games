"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, Navigation, ShieldCheck, Trophy, type LucideIcon } from "lucide-react";

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  accentColor: string;
  bgColor: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Choose Bet",
    subtitle: "SET YOUR FLIGHT CAPTIAL",
    description: "Enter your wagering limits. Set dual concurrent wagers or configure Auto Cash Out limits for tactical automation.",
    icon: Wallet,
    accentColor: "#D4AF37", // Gold
    bgColor: "rgba(212, 175, 55, 0.05)",
  },
  {
    number: "02",
    title: "Watch Take Off",
    subtitle: "MULTIPLIERS ESCALATE",
    description: "The luxury stealth jet launches. As the aircraft gains speed and altitude, the payout coefficient climbs.",
    icon: Navigation,
    accentColor: "#3B82F6", // Electric Blue
    bgColor: "rgba(59, 130, 246, 0.05)",
  },
  {
    number: "03",
    title: "Cash Out Anytime",
    subtitle: "BEAT ESCAPE VELOCITY",
    description: "Discipline is key. Cash out before the engines ignite escape velocity and the plane flies away into space.",
    icon: ShieldCheck,
    accentColor: "#D4AF37",
    bgColor: "rgba(212, 175, 55, 0.05)",
  },
  {
    number: "04",
    title: "Win Rewards",
    subtitle: "COLLECT ASSETS",
    description: "Secure your multiplied winnings instantly. Your funds are deposited straight to your dashboard portfolio.",
    icon: Trophy,
    accentColor: "#3B82F6",
    bgColor: "rgba(59, 130, 246, 0.05)",
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

export default function AeroLuxeHowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-[#0B0B0F] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Cinematic Radial Backgrounds */}
      <div className="absolute left-1/4 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[#3B82F6]/3 blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[#D4AF37]/3 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] backdrop-blur-md">
            FLIGHT PREPARATION PROTOCOL
          </span>
          
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            How AeroLuxe <span className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #3B82F6, #60A5FA)' }}>Works</span>
          </div>
          
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Launch from the tarmac to multi-fold rewards in seconds. Master these four basic flight stages.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          
          {/* Glowing Vector Connection Line for Desktop */}
          <div className="absolute top-[48px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#D4AF37]/20 via-[#3B82F6]/30 to-[#D4AF37]/20 hidden lg:block pointer-events-none">
            {/* Animated neon light pulse travelling along the line */}
            <motion.div 
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 -translate-y-1/2 w-20 h-[3px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent"
            />
          </div>

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
                    {/* Glowing Accent Ring */}
                    <div 
                      className="absolute inset-[-4px] rounded-2xl blur-sm opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                      style={{ backgroundColor: step.accentColor }}
                    />
                    
                    {/* Icon container */}
                    <div 
                      className="relative h-16 w-16 rounded-2xl border flex items-center justify-center backdrop-blur-xl"
                      style={{ 
                        backgroundColor: "rgba(10, 10, 15, 0.9)", 
                        borderColor: `${step.accentColor}33` 
                      }}
                    >
                      <IconComponent className="h-7 w-7" style={{ color: step.accentColor }} />
                    </div>

                    {/* Step Numeric Indicator */}
                    <span 
                      className="absolute -top-3 -right-3 text-[11px] font-black tracking-wider px-2 py-0.5 rounded-full border bg-black"
                      style={{ 
                        color: step.accentColor, 
                        borderColor: `${step.accentColor}33` 
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Text Contents */}
                  <span className="text-[10px] font-black tracking-[0.18em] text-slate-550 block mb-2 font-mono">
                    {step.subtitle}
                  </span>
                  
                  <h3 className="text-xl font-black text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="mt-3 text-sm leading-relaxed text-slate-400 group-hover:text-slate-350 transition-colors duration-300">
                    {step.description}
                  </p>

                  {/* Flow Arrow for Mobile/Tablet */}
                  {idx < 3 && (
                    <div className="my-6 lg:hidden flex justify-center text-slate-700">
                      <span className="text-2xl">↓</span>
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
