"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardSpec {
  value: string;
  suit: "♠" | "♥" | "♦" | "♣";
  color: "red" | "black";
}

interface Ranking {
  name: string;
  subtitle: string;
  explanation: string;
  cards: CardSpec[];
  accentColor: string;
  borderColor: string;
}

const RANKINGS: Ranking[] = [
  {
    name: "Trail (Trio)",
    subtitle: "THREE OF A KIND",
    explanation: "Three cards of the same rank",
    cards: [
      { value: "A", suit: "♠", color: "black" },
      { value: "A", suit: "♥", color: "red" },
      { value: "A", suit: "♦", color: "red" },
    ],
    accentColor: "#D4AF37", // Gold
    borderColor: "rgba(212, 175, 55, 0.25)",
  },
  {
    name: "Pure Sequence",
    subtitle: "STRAIGHT FLUSH",
    explanation: "Three consecutive cards of the same suit",
    cards: [
      { value: "A", suit: "♥", color: "red" },
      { value: "K", suit: "♥", color: "red" },
      { value: "Q", suit: "♥", color: "red" },
    ],
    accentColor: "#138808", // Emerald Green
    borderColor: "rgba(19, 136, 8, 0.25)",
  },
  {
    name: "Sequence",
    subtitle: "RUN / STRAIGHT",
    explanation: "Three consecutive cards of different suits",
    cards: [
      { value: "A", suit: "♠", color: "black" },
      { value: "K", suit: "♥", color: "red" },
      { value: "Q", suit: "♦", color: "red" },
    ],
    accentColor: "#FF6B00", // Orange
    borderColor: "rgba(255, 107, 0, 0.25)",
  },
  {
    name: "Color",
    subtitle: "FLUSH",
    explanation: "Three cards of the same suit",
    cards: [
      { value: "A", suit: "♦", color: "red" },
      { value: "10", suit: "♦", color: "red" },
      { value: "5", suit: "♦", color: "red" },
    ],
    accentColor: "#4EA8FF", // Sky Blue
    borderColor: "rgba(78, 168, 255, 0.25)",
  },
  {
    name: "Pair",
    subtitle: "TWO OF A KIND",
    explanation: "Two cards of the same rank",
    cards: [
      { value: "A", suit: "♠", color: "black" },
      { value: "A", suit: "♥", color: "red" },
      { value: "K", suit: "♦", color: "red" },
    ],
    accentColor: "#D4AF37",
    borderColor: "rgba(212, 175, 55, 0.25)",
  },
  {
    name: "High Card",
    subtitle: "SINGLE VALUE",
    explanation: "Highest individual card wins",
    cards: [
      { value: "A", suit: "♠", color: "black" },
      { value: "J", suit: "♥", color: "red" },
      { value: "4", suit: "♦", color: "red" },
    ],
    accentColor: "#138808",
    borderColor: "rgba(19, 136, 8, 0.25)",
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

export default function TeenPattiRankings() {
  return (
    <section className="relative bg-[#050B18] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Background Soft Glows */}
      <div className="absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-[#138808]/3 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 top-1/4 h-80 w-80 rounded-full bg-[#D4AF37]/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] backdrop-blur-md">
            CARD EVALUATION CODES
          </span>
          
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            Teen Patti <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFF3B0] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #D4AF37, #FFF3B0)', WebkitBackgroundClip: 'text' }}>Hand Rankings</span>
          </div>
          
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Familiarize yourself with the relative hierarchy. Learn which layouts beat your opponents at the table show.
          </p>
        </div>

        {/* Hand Rankings Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {RANKINGS.map((ranking, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, borderColor: ranking.accentColor }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E1B30]/60 p-6 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 3D overlapping layout of the card hands */}
                <div className="flex gap-1.5 justify-center py-4 bg-black/40 rounded-xl mb-5 border border-white/5 relative overflow-hidden">
                  
                  {/* Subtle card felt glow background */}
                  <div 
                    className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{ backgroundColor: ranking.accentColor }}
                  />

                  {ranking.cards.map((card, cardIdx) => (
                    <motion.div
                      key={cardIdx}
                      whileHover={{ y: -4 }}
                      className="w-10 h-15 sm:w-11 sm:h-16 rounded-md bg-white border border-white shadow-lg flex flex-col justify-between p-1.5 transform rotate-[-2deg] shrink-0 select-none cursor-default"
                    >
                      <span className={`text-[9px] font-black leading-none ${card.color === "red" ? "text-red-500" : "text-slate-900"}`}>
                        {card.value}
                      </span>
                      <div className={`text-center text-sm font-black leading-none ${card.color === "red" ? "text-red-500" : "text-slate-900"}`}>
                        {card.suit}
                      </div>
                      <span className={`text-right text-[9px] font-black leading-none ${card.color === "red" ? "text-red-500" : "text-slate-900"}`}>
                        {card.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Subtitle Evaluation */}
                <span className="text-[9px] font-black tracking-widest text-slate-500 block mb-1 font-mono">
                  {ranking.subtitle}
                </span>

                {/* Title */}
                <h3 
                  className="text-lg font-black text-white transition-colors duration-300"
                  style={{ color: "#FFFFFF" }}
                  // Ensure hover color works dynamically
                >
                  {ranking.name}
                </h3>
                
                {/* Explanation */}
                <p className="mt-3 text-xs leading-relaxed text-slate-400 font-medium">
                  {ranking.explanation}
                </p>
              </div>

              {/* Accent footer line on hover */}
              <div 
                className="absolute inset-x-0 bottom-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: ranking.accentColor }}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
