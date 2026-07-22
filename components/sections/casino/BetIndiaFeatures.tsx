"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plane, Rocket, Landmark, ShieldCheck, Smartphone, Zap, type LucideIcon } from "lucide-react";

interface FeatureCard {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  shadowColor: string;
}

const FEATURES: FeatureCard[] = [
  {
    title: "Instant Betting",
    description: "Submit wagers in milliseconds. Secure dual simultaneous cockpit bets before the hangar doors close.",
    icon: Plane,
    color: "#FF7A00", // Orange
    shadowColor: "rgba(255, 122, 0, 0.15)",
  },
  {
    title: "Fast Multipliers",
    description: "Launch into escalating curves. Coefficients scale upward instantly with real-time HUD telemetry updates.",
    icon: Rocket,
    color: "#4EA8FF", // Sky Blue
    shadowColor: "rgba(78, 168, 255, 0.15)",
  },
  {
    title: "Instant Cashout",
    description: "Retreat and collect wagers immediately. Real-time payouts post directly to your dashboard wallet.",
    icon: Landmark,
    color: "#FF7A00",
    shadowColor: "rgba(255, 122, 0, 0.15)",
  },
  {
    title: "Secure Gameplay",
    description: "Each flight is encrypted. Verify transparency seed hashes on the blockchain ledger anytime.",
    icon: ShieldCheck,
    color: "#4EA8FF",
    shadowColor: "rgba(78, 168, 255, 0.15)",
  },
  {
    title: "Mobile Friendly",
    description: "Take the cockpit control panel on the go. Zero lag rendering optimized for Android and iOS systems.",
    icon: Smartphone,
    color: "#FF7A00",
    shadowColor: "rgba(255, 122, 0, 0.15)",
  },
  {
    title: "Lightning Fast Results",
    description: "Quick 10-second flight frequencies keep the gaming action rolling with no lag or delays.",
    icon: Zap,
    color: "#4EA8FF",
    shadowColor: "rgba(78, 168, 255, 0.15)",
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

export default function BetIndiaFeatures() {
  return (
    <section className="relative bg-[#050B18] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Background Soft Glows */}
      <div className="absolute right-0 top-1/4 h-[350px] w-[350px] rounded-full bg-[#FF7A00]/3 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 h-[350px] w-[350px] rounded-full bg-[#4EA8FF]/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#FF7A00] backdrop-blur-md">
            FLIGHT FEATURES
          </span>
          
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            Premium Game <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFB800] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #FF7A00, #FFB800)', WebkitBackgroundClip: 'text' }}>Features</span>
          </div>
          
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            BetIndia's bespoke Aviator iteration provides robust tools for strategic flight success.
          </p>
        </div>

        {/* Features Cards Grid */}
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
                  y: -6, 
                  borderColor: `${feature.color}33`,
                  boxShadow: `0 15px 30px ${feature.shadowColor}`
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E1B30]/60 p-6 backdrop-blur-xl transition-all duration-300"
              >
                {/* Subtle top-left light flare */}
                <div className="pointer-events-none absolute -left-16 -top-16 h-32 w-32 rounded-full bg-white/[0.01] blur-xl group-hover:bg-white/[0.03] transition-all duration-500" />
                
                {/* Glowing bottom accent line */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-white/20 transition-all duration-500" />

                {/* Icon Badge */}
                <div 
                  className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.02] border transition-all duration-300 group-hover:bg-white/[0.04]"
                  style={{ borderColor: `${feature.color}22` }}
                >
                  <IconComponent className="h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ color: feature.color }} />
                </div>

                <h3 className="mt-5 text-lg font-black text-white group-hover:text-[#FF7A00] transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400 group-hover:text-slate-350 transition-colors duration-300">
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
