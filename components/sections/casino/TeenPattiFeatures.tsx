"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, HelpCircle, Heart, Smartphone, Coins, ShieldCheck, Landmark, Users, Clock } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: any;
  color: string;
  shadowColor: string;
}

const WHY_PLAY: Feature[] = [
  {
    title: "Fast-Paced Gameplay",
    description: "Every round offers quick action, keeping the excitement going throughout your session.",
    icon: Zap,
    color: "#FF6B00", // Orange
    shadowColor: "rgba(255, 107, 0, 0.15)",
  },
  {
    title: "Easy to Learn",
    description: "Simple rules make Teen Patti beginner-friendly while still offering depth for experienced players.",
    icon: HelpCircle,
    color: "#D4AF37", // Gold
    shadowColor: "rgba(212, 175, 55, 0.15)",
  },
  {
    title: "Authentic Live Experience",
    description: "Enjoy real cards, professional dealers, and HD live streaming for an immersive casino atmosphere.",
    icon: Heart,
    color: "#138808", // Green
    shadowColor: "rgba(19, 136, 8, 0.15)",
  },
  {
    title: "Mobile Friendly",
    description: "Play Teen Patti anytime using your smartphone, tablet, or desktop.",
    icon: Smartphone,
    color: "#4EA8FF", // Sky Blue
    shadowColor: "rgba(78, 168, 255, 0.15)",
  },
  {
    title: "Real Money Excitement",
    description: "Experience live casino action while playing on a secure platform with flexible betting options.",
    icon: Coins,
    color: "#FF6B00",
    shadowColor: "rgba(255, 107, 0, 0.15)",
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
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  },
};

export default function TeenPattiFeatures() {
  return (
    <section className="relative bg-[#050B18] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Background Soft Glows */}
      <div className="absolute right-0 top-1/4 h-[350px] w-[350px] rounded-full bg-[#138808]/3 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 h-[350px] w-[350px] rounded-full bg-[#FF6B00]/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#FF6B00] backdrop-blur-md">
            WHY PLAY TEEN PATTI ONLINE
          </span>
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            Why Play <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #FF6B00, #138808)', WebkitBackgroundClip: 'text' }}>Teen Patti Online?</span>
          </div>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Teen Patti online India continues to attract millions of players because it combines traditional card gameplay with modern live casino technology. Whether you're looking for Teen Patti real money games or simply want to play Teen Patti online, every round offers fast action, strategic decisions, and an immersive casino experience.
          </p>
        </div>

        {/* Features Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {WHY_PLAY.map((feature, i) => {
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
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E1B30]/60 p-5 backdrop-blur-xl transition-all duration-300"
              >
                {/* Diagonal glass reflection leak overlay */}
                <div className="pointer-events-none absolute -left-16 -top-16 h-32 w-32 rounded-full bg-white/[0.01] blur-xl group-hover:bg-white/[0.03] transition-all duration-500" />
                
                {/* Glowing bottom line */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-white/20 transition-all duration-500" />

                {/* Icon Container */}
                <div 
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.02] border transition-all duration-300 group-hover:bg-white/[0.04]"
                  style={{ borderColor: `${feature.color}22` }}
                >
                  <IconComponent className="h-4 w-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" style={{ color: feature.color }} />
                </div>

                <h3 className="mt-4 text-sm font-black text-white group-hover:text-[#FF6B00] transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="mt-2 text-xs leading-relaxed text-slate-400 group-hover:text-slate-350 transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trusted by Thousands Dashboard Ribbon */}
        <div className="mt-16 rounded-3xl border border-white/[0.06] bg-[#0E1B30]/40 p-6 backdrop-blur-xl">
          <div className="text-center sm:text-left mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] block mb-1 font-mono">★★★★★ TRUSTED BY THOUSANDS</span>
            <h3 className="text-lg font-black text-white">Platform Safeguards & Performance</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-2 bg-black/20 border border-white/5 rounded-xl p-3">
              <ShieldCheck className="h-4 w-4 text-[#138808] shrink-0" />
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 border border-white/5 rounded-xl p-3">
              <Coins className="h-4 w-4 text-[#D4AF37] shrink-0" />
              <span>Flexible Limits</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 border border-white/5 rounded-xl p-3">
              <Users className="h-4 w-4 text-[#FF6B00] shrink-0" />
              <span>Live TP Tables</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 border border-white/5 rounded-xl p-3">
              <Smartphone className="h-4 w-4 text-[#4EA8FF] shrink-0" />
              <span>Mobile Friendly</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 border border-white/5 rounded-xl p-3">
              <Landmark className="h-4 w-4 text-[#138808] shrink-0" />
              <span>Fast Withdrawals</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 border border-white/5 rounded-xl p-3">
              <Clock className="h-4 w-4 text-[#D4AF37] shrink-0" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
