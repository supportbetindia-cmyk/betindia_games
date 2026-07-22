"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, Eye, Scale, Coins, AlertOctagon, type LucideIcon } from "lucide-react";

interface Strategy {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const STRATEGIES: Strategy[] = [
  {
    title: "Learn Hand Rankings",
    subtitle: "TIPS & STRATEGIES",
    description: "Understanding hand strength helps you make better betting decisions.",
    icon: BookOpen,
    color: "#D4AF37", // Gold
  },
  {
    title: "Start with Smaller Bets",
    subtitle: "TIPS & STRATEGIES",
    description: "New players should begin with comfortable betting limits.",
    icon: Scale,
    color: "#138808", // Green
  },
  {
    title: "Observe the Table",
    subtitle: "TIPS & STRATEGIES",
    description: "Watch betting patterns before making important decisions.",
    icon: Eye,
    color: "#4EA8FF", // Sky Blue
  },
  {
    title: "Stay Disciplined",
    subtitle: "TIPS & STRATEGIES",
    description: "Set personal limits and avoid emotional betting.",
    icon: Brain,
    color: "#FF6B00", // Orange
  },
  {
    title: "Manage Your Bankroll",
    subtitle: "TIPS & STRATEGIES",
    description: "Play within your budget and avoid chasing losses.",
    icon: Coins,
    color: "#138808",
  },
];

const MISTAKES = [
  "Betting without understanding the rules",
  "Playing emotionally",
  "Chasing losses",
  "Ignoring bankroll management",
  "Raising too aggressively",
  "Choosing unreliable casino platforms",
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

export default function TeenPattiStrategies() {
  return (
    <section className="relative bg-[#050B18] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Background soft glows */}
      <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[#FF6B00]/3 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 h-80 w-80 rounded-full bg-[#4EA8FF]/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#FF6B00] backdrop-blur-md">
            STRATEGY & DISCIPLINE
          </span>
          
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            Winning Tips & <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFF3B0] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #D4AF37, #FFF3B0)', WebkitBackgroundClip: 'text' }}>Strategies</span>
          </div>
          
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Although Teen Patti involves chance, responsible gameplay and smart decision-making improve the experience.
          </p>
        </div>

        {/* Strategies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {STRATEGIES.map((strategy, idx) => {
            const IconComponent = strategy.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, borderColor: `${strategy.color}33` }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E1B30]/60 p-5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/[0.02] border"
                      style={{ borderColor: `${strategy.color}22` }}
                    >
                      <IconComponent className="h-5 w-5" style={{ color: strategy.color }} />
                    </div>
                  </div>

                  <h3 className="text-sm font-black text-white group-hover:text-[#FF6B00] transition-colors duration-300">
                    {strategy.title}
                  </h3>
                  
                  <p className="mt-2 text-xs leading-relaxed text-slate-400 group-hover:text-slate-350 transition-colors duration-300">
                    {strategy.description}
                  </p>
                </div>

                <div 
                  className="absolute left-0 top-6 bottom-6 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: strategy.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Common Mistakes to Avoid */}
        <div className="mt-16 rounded-3xl border border-red-500/10 bg-[#0E1B30]/40 p-6 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 opacity-[0.02] pointer-events-none rounded-bl-full bg-red-500" />
          
          <div className="flex items-center gap-2 mb-6">
            <AlertOctagon className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-black text-white uppercase tracking-wider">
              Common Mistakes to Avoid
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {MISTAKES.map((mistake, i) => (
              <div 
                key={i} 
                className="flex items-start gap-3 bg-red-500/[0.02] border border-red-500/[0.05] rounded-2xl p-4 transition-all duration-300 hover:border-red-500/20"
              >
                <span className="text-[10px] font-black text-red-500 font-mono mt-0.5">
                  [0{i + 1}]
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  {mistake}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">
            Responsible gaming creates a safer and more enjoyable experience.
          </p>
        </div>

      </div>
    </section>
  );
}
