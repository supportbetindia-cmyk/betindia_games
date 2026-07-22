"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, Wallet, PhoneCall, Smartphone, Star, type LucideIcon } from "lucide-react";

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  glowColor: string;
}

const BENEFITS: Benefit[] = [
  {
    title: "Secure Platform",
    description: "Advanced security helps protect your account and transactions.",
    icon: ShieldCheck,
    color: "#D4AF37", // Gold
    glowColor: "rgba(212, 175, 55, 0.15)",
  },
  {
    title: "Live Teen Patti Experience",
    description: "Professional live dealers and real-time gameplay.",
    icon: HeartHandshake,
    color: "#138808", // Emerald Green
    glowColor: "rgba(19, 136, 8, 0.15)",
  },
  {
    title: "Fast Withdrawals",
    description: "Eligible winnings can be processed through a convenient withdrawal system.",
    icon: Wallet,
    color: "#FF6B00", // Orange
    glowColor: "rgba(255, 107, 0, 0.15)",
  },
  {
    title: "24/7 Customer Support",
    description: "Dedicated assistance whenever you need help.",
    icon: PhoneCall,
    color: "#4EA8FF", // Sky Blue
    glowColor: "rgba(78, 168, 255, 0.15)",
  },
  {
    title: "Mobile Gaming",
    description: "Play smoothly across smartphones, tablets, and desktop devices.",
    icon: Smartphone,
    color: "#FF6B00",
    glowColor: "rgba(255, 107, 0, 0.15)",
  },
  {
    title: "Flexible Betting Limits",
    description: "Suitable for both casual players and experienced players.",
    icon: Star,
    color: "#D4AF37",
    glowColor: "rgba(212, 175, 55, 0.15)",
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

export default function TeenPattiWhyUs() {
  return (
    <section className="relative bg-[#050B18] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Background Soft Glows */}
      <div className="absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-[#FF6B00]/3 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 top-1/4 h-80 w-80 rounded-full bg-[#4EA8FF]/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#138808]/30 bg-[#138808]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#138808] backdrop-blur-md">
            PLATFORM CREDENTIALS
          </span>
          
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            Why Players Choose <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFF3B0] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #D4AF37, #FFF3B0)', WebkitBackgroundClip: 'text' }}>BetIndia</span>
          </div>
          
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            A premium infrastructure constructed around safety, transparency, and player satisfaction.
          </p>
        </div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {BENEFITS.map((benefit, idx) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, borderColor: `${benefit.color}33`, boxShadow: `0 15px 30px ${benefit.glowColor}` }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E1B30]/60 p-6 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Floating Icon Badge */}
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                    className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.02] border transition-all duration-300 group-hover:bg-white/[0.04] mb-6"
                    style={{ borderColor: `${benefit.color}22` }}
                  >
                    <IconComponent className="h-5 w-5" style={{ color: benefit.color }} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-white group-hover:text-[#FF6B00] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-slate-450 group-hover:text-slate-350 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>

                <div 
                  className="absolute right-0 bottom-0 w-8 h-8 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-300 rounded-tl-full"
                  style={{ backgroundColor: benefit.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
