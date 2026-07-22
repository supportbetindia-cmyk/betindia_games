"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Coins, ShieldCheck, Cpu, Smartphone, Lock, type LucideIcon } from "lucide-react";

interface FeatureCard {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  shadowColor: string;
}

const FEATURES: FeatureCard[] = [
  {
    title: "Real-Time Multipliers",
    description: "Watch the multiplier coefficient scale exponentially in real-time, matching microsecond server updates.",
    icon: Zap,
    gradient: "from-[#D4AF37] to-[#FFF3B0]",
    shadowColor: "rgba(212, 175, 55, 0.15)",
  },
  {
    title: "Instant Cash Out",
    description: "Take control of your stakes instantly. Real-time executions ensure zero-latency payout approvals.",
    icon: Coins,
    gradient: "from-[#3B82F6] to-[#60A5FA]",
    shadowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    title: "Provably Fair",
    description: "Complete transparency. Verify every flight multiplier via public cryptographic blockchain seeds.",
    icon: ShieldCheck,
    gradient: "from-[#D4AF37] to-[#FFF3B0]",
    shadowColor: "rgba(212, 175, 55, 0.15)",
  },
  {
    title: "Fast Gameplay",
    description: "Continuous 10-second gaming action. Minimal downtime means you are always in the zone.",
    icon: Cpu,
    gradient: "from-[#3B82F6] to-[#60A5FA]",
    shadowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    title: "Mobile Optimized",
    description: "Enjoy zero-lag mobile responsiveness designed for premium smartphone screen space.",
    icon: Smartphone,
    gradient: "from-[#D4AF37] to-[#FFF3B0]",
    shadowColor: "rgba(212, 175, 55, 0.15)",
  },
  {
    title: "Secure Transactions",
    description: "High-grade financial encryptions protect all withdrawal channels and deposit routes.",
    icon: Lock,
    gradient: "from-[#3B82F6] to-[#60A5FA]",
    shadowColor: "rgba(59, 130, 246, 0.15)",
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
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  },
};

export default function AeroLuxeFeatures() {
  return (
    <section className="relative bg-[#07070A] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Background Glow Elements */}
      <div className="absolute right-0 top-1/4 h-[350px] w-[350px] rounded-full bg-[#D4AF37]/3 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 h-[350px] w-[350px] rounded-full bg-[#3B82F6]/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#3B82F6] backdrop-blur-md">
            PREMIUM FLIGHT ATTRIBUTES
          </span>
          
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            Revolutionary Casino <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFF3B0] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #D4AF37, #FFF3B0)' }}>Features</span>
          </div>
          
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            AeroLuxe sets the luxury gold standard for multiplayer crash gambling. Designed for high fidelity execution and unmatched trust.
          </p>
        </div>

        {/* Feature Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature, i) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ 
                  y: -8, 
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: `0 15px 30px ${feature.shadowColor}`
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E0F14]/75 p-6 backdrop-blur-xl transition-all duration-300"
              >
                {/* Subtle light leak gradient top-left */}
                <div className="pointer-events-none absolute -left-16 -top-16 h-32 w-32 rounded-full bg-white/[0.01] blur-xl group-hover:bg-white/[0.03] transition-all duration-500" />
                
                {/* Glowing bottom gradient accent line */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/30 transition-all duration-500" />

                {/* Premium Icon Badge */}
                <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.02] border border-white/5 text-slate-350 transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/[0.04]">
                  <IconComponent className="h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 text-[#D4AF37]" style={{ color: feature.gradient.includes("#D4AF37") ? "#D4AF37" : "#3B82F6" }} />
                </div>

                <h3 className="mt-5 text-lg font-black text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
