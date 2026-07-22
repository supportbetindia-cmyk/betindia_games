"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, HelpCircle, ShieldAlert, Award, ArrowRight, Zap, Target, ExternalLink } from "lucide-react";
import Link from "next/link";

interface GameLink {
  name: string;
  href: string;
  accent: string;
}

const MORE_GAMES: GameLink[] = [
  { name: "Andar Bahar", href: "/andar-bahar", accent: "#138808" },
  { name: "Blackjack", href: "/casino", accent: "#FF6B00" },
  { name: "Roulette", href: "/casino", accent: "#138808" },
  { name: "Baccarat", href: "/casino", accent: "#FF6B00" },
  { name: "Dragon Tiger", href: "/casino", accent: "#4EA8FF" },
  { name: "Poker", href: "/casino", accent: "#D4AF37" },
  { name: "Slots", href: "/slots", accent: "#FF6B00" },
  { name: "Aviator", href: "/aviator", accent: "#FF6B00" },
  { name: "Live Casino", href: "/live-casino", accent: "#138808" },
];

export default function TeenPattiGameGuide() {
  const [activeTab, setActiveTab] = useState<"about" | "how-it-works" | "betting">("about");

  return (
    <section id="game-guide" className="relative bg-[#050B18] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Background ambient lighting */}
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#138808]/3 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 h-96 w-96 rounded-full bg-[#D4AF37]/3 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] backdrop-blur-md">
            COMPLETE GAME MANUAL
          </span>
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            Teen Patti <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFF3B0] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #D4AF37, #FFF3B0)', WebkitBackgroundClip: 'text' }}>Guide & Overview</span>
          </div>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            A masterclass on rules, betting setups, and live platform gameplay.
          </p>
        </div>

        {/* Premium Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl bg-black/40 p-1 border border-white/[0.06] backdrop-blur-md">
            {[
              { id: "about", label: "What Is Teen Patti?", icon: BookOpen },
              { id: "how-it-works", label: "How It Works", icon: Target },
              { id: "betting", label: "Betting Options", icon: Award },
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#FF6B00] to-[#E05E00] text-white shadow-lg"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <IconComponent size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="min-h-[380px] bg-[#0E1B30]/30 border border-white/[0.05] rounded-3xl p-6 sm:p-10 backdrop-blur-xl mb-16">
          <AnimatePresence mode="wait">
            {activeTab === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid md:grid-cols-12 gap-8 items-center"
              >
                <div className="md:col-span-7">
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-4">
                    What Is Teen Patti?
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-350 font-medium">
                    Teen Patti, also known as Indian Poker or Flash, is a traditional three-card game played between multiple players. The objective is to build the strongest hand or use smart betting decisions to outperform your opponents.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-350 font-medium mt-4">
                    Today, Teen Patti online recreates the excitement of the traditional game through live dealers, HD streaming, and secure online casino platforms. Players can enjoy fast-paced action, interactive gameplay, and real money betting from the comfort of their home or while on the go.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-350 font-medium mt-4">
                    Whether you prefer casual entertainment or competitive gameplay, Online Teen Patti offers an exciting way to enjoy India's favourite card game from anywhere. With Teen Patti live tables, professional dealers, and secure gameplay, the Teen Patti game delivers an authentic casino experience for both beginners and experienced players.
                  </p>
                </div>
                
                {/* 3D-like concept layout (Dealer suggestions) */}
                <div className="md:col-span-5 relative flex justify-center">
                  <div className="w-full max-w-[280px] aspect-[4/5] rounded-2xl border border-[#D4AF37]/25 bg-black/60 p-4 relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#138808]/15 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Camera spotlight overlay */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-[#D4AF37]/30 blur-[2px]" />
                    
                    <div className="h-full flex flex-col justify-between items-center text-center relative z-10 py-2">
                      <span className="text-[8px] font-black text-slate-500 tracking-wider font-mono">LIVE VIDEO STREAM FEED</span>
                      <div className="w-16 h-16 rounded-full border border-[#D4AF37]/35 bg-[#050B18] flex items-center justify-center text-[#D4AF37]">
                        <Zap size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-white block font-mono">LIVE HD CASINO</span>
                        <span className="text-[9px] text-[#138808] font-bold block mt-0.5">Dealer is Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "how-it-works" && (
              <motion.div
                key="how-it-works"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid md:grid-cols-12 gap-8 items-center"
              >
                <div className="md:col-span-7">
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-4">
                    How Teen Patti Works & Core Rules
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-350 font-medium">
                    Teen Patti begins with every player receiving three face-down cards. Players can choose to:
                  </p>
                  <ul className="mt-4 space-y-2.5 text-xs font-bold text-slate-300 font-mono pl-4 border-l border-[#D4AF37]/35">
                    <li>• Play Blind: Bet without viewing your cards (half-stake rules)</li>
                    <li>• Play Seen: Look at cards before betting (double-stake rules)</li>
                    <li>• Call / Raise: Match the active bet or scale the index</li>
                    <li>• Fold: Escape round and forfeit active Ante stakes</li>
                  </ul>
                  <p className="text-sm leading-relaxed text-slate-350 font-medium mt-5">
                    As betting continues around the table, players decide whether to stay in the game or fold. At the end of the round, the strongest hand wins during the showdown unless only one player remains after everyone else folds.
                  </p>
                </div>
                
                <div className="md:col-span-5 grid grid-cols-2 gap-3 font-mono text-[9px] font-bold">
                  <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                    <span className="text-slate-500 block uppercase">1. Ante Bet</span>
                    <span className="text-white block mt-1">Ante wagers placed</span>
                  </div>
                  <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                    <span className="text-slate-500 block uppercase">2. Distribution</span>
                    <span className="text-white block mt-1">3 cards dealt</span>
                  </div>
                  <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                    <span className="text-slate-500 block uppercase">3. Blind / Seen</span>
                    <span className="text-white block mt-1">Decide card status</span>
                  </div>
                  <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                    <span className="text-slate-500 block uppercase">4. Showdown</span>
                    <span className="text-[#138808] block mt-1">Winner takes Pot</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "betting" && (
              <motion.div
                key="betting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl sm:text-2xl font-black text-white mb-4">
                  Betting Options Overview
                </h3>
                <p className="text-sm leading-relaxed text-slate-350 font-medium mb-6">
                  Teen Patti betting offers multiple styles, allowing players to choose how they want to approach each round. Depending on the Teen Patti live table, available options include:
                </p>

                {/* Betting Table */}
                <div className="overflow-x-auto rounded-xl border border-white/[0.05]">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="bg-black/60 text-slate-400 uppercase tracking-widest text-[9px] border-b border-white/[0.06]">
                        <th className="px-6 py-4 font-bold">Betting Option</th>
                        <th className="px-6 py-4 font-bold">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04] bg-black/20">
                      {[
                        { name: "Blind Bet", desc: "Place bets without viewing your cards." },
                        { name: "Seen Bet", desc: "View your cards before making betting decisions." },
                        { name: "Call", desc: "Match the current bet and stay in the game." },
                        { name: "Raise", desc: "Increase the current bet to apply pressure on opponents." },
                        { name: "Fold", desc: "Exit the current round if you do not wish to continue." },
                      ].map((item, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                          <td className="px-6 py-4 text-white font-bold">{item.name}</td>
                          <td className="px-6 py-4 text-slate-300">{item.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Explore More Casino Games Grid */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0E1B30]/40 p-6 sm:p-10 backdrop-blur-xl">
          <div className="absolute right-0 bottom-0 w-48 h-48 opacity-[0.02] pointer-events-none rounded-tl-full bg-[#138808]" />
          
          <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#138808]" />
            Explore More Casino Games
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {MORE_GAMES.map((game, i) => (
              <Link
                key={i}
                href={game.href}
                className="group relative overflow-hidden rounded-xl border border-white/[0.05] bg-black/40 p-4 transition-all duration-300 hover:border-white/15 hover:-y-1 flex items-center justify-between"
              >
                <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                  {game.name}
                </span>
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 text-slate-500 group-hover:text-white transition-all transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
