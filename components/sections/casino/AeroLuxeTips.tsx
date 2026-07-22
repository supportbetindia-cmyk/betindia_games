"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, Compass, AlertTriangle, Scale, type LucideIcon } from "lucide-react";

interface Tip {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const TIPS: Tip[] = [
  {
    title: "Manage Bankroll",
    subtitle: "FINANCIAL DISCIPLINE",
    description: "Determine a strict session budget beforehand. Divide your capital into smaller units and never bet more than 2-5% of your total balance on a single flight.",
    icon: Wallet,
    color: "#D4AF37", // Gold
  },
  {
    title: "Cash Out Wisely",
    subtitle: "STRATEGIC HARVESTING",
    description: "Set reasonable cash out goals. While chasing 10x+ heights is thrilling, consistent collections between 1.5x and 2.5x build more sustainable long-term portfolios.",
    icon: Compass,
    color: "#3B82F6", // Electric Blue
  },
  {
    title: "Don't Chase Losses",
    subtitle: "EMOTIONAL CALIBRATION",
    description: "Never increase your wagers impulsively after a crash to 'make it back'. Flights are independent event sequences. Stick strictly to your predefined pre-flight strategy.",
    icon: AlertTriangle,
    color: "#D4AF37",
  },
  {
    title: "Play Responsibly",
    subtitle: "LIMIT SEGREGATION",
    description: "Treat AeroLuxe as entertainment, not a job. Take scheduled flight breaks. Use our built-in cooling-off limits to keep your gaming healthy and enjoyable.",
    icon: Scale,
    color: "#3B82F6",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  },
};

export default function AeroLuxeTips() {
  return (
    <section className="relative bg-[#07070A] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Background Soft Glows */}
      <div className="absolute left-1/4 top-1/3 h-80 w-80 rounded-full bg-[#3B82F6]/3 blur-[100px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-[#D4AF37]/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] backdrop-blur-md">
            FLIGHT SCHOOL & TACTICS
          </span>
          
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            Strategic Winning <span className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #3B82F6, #60A5FA)' }}>Tips</span>
          </div>
          
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            AeroLuxe is a game of probability and discipline. Leverage these elite guidelines to maximize your dashboard longevity.
          </p>
        </div>

        {/* Tips Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TIPS.map((tip, idx) => {
            const IconComponent = tip.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, borderColor: `${tip.color}33` }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E0F14]/75 p-6 backdrop-blur-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between"
              >
                <div>
                  {/* Step Header: Icon & Subtitle */}
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/[0.02] border"
                      style={{ borderColor: `${tip.color}22` }}
                    >
                      <IconComponent className="h-5 w-5" style={{ color: tip.color }} />
                    </div>
                    <span className="text-[9px] font-black tracking-wider text-slate-500 font-mono">
                      {tip.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                    {tip.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-slate-450 group-hover:text-slate-350 transition-colors duration-300">
                    {tip.description}
                  </p>
                </div>

                {/* Left accent bar on hover */}
                <div 
                  className="absolute left-0 top-6 bottom-6 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: tip.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
