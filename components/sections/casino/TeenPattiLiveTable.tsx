"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Play, RefreshCw, Star, Users } from "lucide-react";

interface Card {
  value: string;
  suit: "♠" | "♥" | "♦" | "♣";
  color: "red" | "black";
}

const DECK: Card[] = [
  { value: "A", suit: "♠", color: "black" },
  { value: "A", suit: "♥", color: "red" },
  { value: "A", suit: "♦", color: "red" },
  { value: "K", suit: "♠", color: "black" },
  { value: "Q", suit: "♠", color: "black" },
  { value: "J", suit: "♠", color: "black" },
  { value: "10", suit: "♦", color: "red" },
  { value: "9", suit: "♣", color: "black" },
  { value: "8", suit: "♥", color: "red" },
  { value: "K", suit: "♥", color: "red" },
  { value: "Q", suit: "♥", color: "red" },
  { value: "J", suit: "♥", color: "red" },
];

export default function TeenPattiLiveTable() {
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [isDealing, setIsDealing] = useState(false);
  const [gameResult, setGameResult] = useState<string>("");
  const [potSize, setPotSize] = useState(25000);
  const [betAmount, setBetAmount] = useState(1000);
  const [hasDealt, setHasDealt] = useState(false);

  const dealHand = () => {
    if (isDealing) return;
    setIsDealing(true);
    setPlayerCards([]);
    setDealerCards([]);
    setGameResult("");

    // Simulate drawing random cards
    const shuffled = [...DECK].sort(() => Math.random() - 0.5);
    
    // Simulate staggered dealing
    setTimeout(() => {
      setPlayerCards([shuffled[0], shuffled[1], shuffled[2]]);
    }, 600);

    setTimeout(() => {
      setDealerCards([shuffled[3], shuffled[4], shuffled[5]]);
    }, 1200);

    setTimeout(() => {
      setIsDealing(false);
      setHasDealt(true);
      setPotSize((prev) => prev + betAmount * 2);
      
      // Determine a fun, luxury result
      const winOptions = [
        "Congratulations! You win with a PURE SEQUENCE!",
        "You win! Pair of Aces beats Dealer High Card.",
        "Dealer folds. You win the Pot!",
        "Wow! You hit a TRAIL of Aces! Big Win!",
      ];
      setGameResult(winOptions[Math.floor(Math.random() * winOptions.length)]);
    }, 1800);
  };

  const resetTable = () => {
    setPlayerCards([]);
    setDealerCards([]);
    setGameResult("");
    setPotSize(25000);
    setHasDealt(false);
  };

  return (
    <section className="relative bg-[#050B18] py-20 px-4 overflow-hidden border-b border-white/[0.04]">
      {/* Glow background elements */}
      <div className="absolute left-10 top-10 h-96 w-96 rounded-full bg-[#138808]/5 blur-[100px] pointer-events-none" />
      <div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#138808]/30 bg-[#138808]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#138808] backdrop-blur-md">
            INTERACTIVE LOUNGE SIMULATOR
          </span>
          <div className="mt-4 text-2xl font-extrabold text-white tracking-tight sm:text-3xl md:text-4xl">
            Live Dealer <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFF3B0] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #D4AF37, #FFF3B0)', WebkitBackgroundClip: 'text' }}>Table Simulator</span>
          </div>
        </div>

        {/* Casino Table Felt Area */}
        <div className="relative w-full rounded-[60px] md:rounded-[100px] border-8 border-[#3d2716] bg-gradient-to-b from-[#0e5c33] via-[#094c28] to-[#043319] p-6 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Subtle patterns inside green felt */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] bg-[size:16px_16px] pointer-events-none" />
          
          {/* Inner Golden border overlay */}
          <div className="absolute inset-4 rounded-[40px] md:rounded-[80px] border border-[#D4AF37]/15 pointer-events-none" />

          {/* Table Layout */}
          <div className="relative z-10 flex flex-col justify-between items-center min-h-[420px]">
            
            {/* 1. Dealer Spot (Top) */}
            <div className="flex flex-col items-center">
              {/* Dealer Avatar */}
              <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37]/35 bg-black/60 flex items-center justify-center relative overflow-hidden shadow-lg">
                <div className="absolute inset-0.5 rounded-full border border-dashed border-[#D4AF37]/20 animate-spin" style={{ animationDuration: "20s" }} />
                <span className="text-[9px] font-black text-[#D4AF37] font-mono">DEALER</span>
              </div>
              
              {/* Dealer Cards */}
              <div className="flex gap-2.5 mt-4 min-h-[80px] items-center">
                {dealerCards.length > 0 ? (
                  dealerCards.map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.2, y: -80, opacity: 0, rotateY: 180 }}
                      animate={{ scale: 1, y: 0, opacity: 1, rotateY: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.15 }}
                      className="w-12 h-18 sm:w-14 sm:h-20 rounded-lg bg-white border border-white shadow-xl flex flex-col justify-between p-1.5 cursor-default select-none"
                    >
                      <span className={`text-[11px] sm:text-xs font-black leading-none ${card.color === "red" ? "text-red-500" : "text-slate-900"}`}>
                        {card.value} {card.suit}
                      </span>
                      <div className={`text-center text-lg sm:text-xl font-black ${card.color === "red" ? "text-red-500" : "text-slate-900"}`}>
                        {card.suit}
                      </div>
                      <span className={`text-right text-[11px] sm:text-xs font-black leading-none ${card.color === "red" ? "text-red-500" : "text-slate-900"}`}>
                        {card.value} {card.suit}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  // Empty layout boxes
                  [1, 2, 3].map((v) => (
                    <div key={v} className="w-12 h-18 sm:w-14 sm:h-20 border border-white/10 rounded-lg bg-black/20" />
                  ))
                )}
              </div>
            </div>

            {/* 2. Pot Area (Center) */}
            <div className="my-6 flex flex-col items-center">
              
              {/* Pot Size Counter */}
              <div className="bg-[#050B18]/70 border border-[#D4AF37]/25 rounded-2xl px-5 py-2 text-center backdrop-blur-xl shadow-lg shadow-black/40">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block font-mono">Current Pot</span>
                <span className="text-sm font-black text-[#D4AF37] font-mono mt-0.5 block">
                  ₹{potSize.toLocaleString()}
                </span>
              </div>

              {/* Animated Poker Chips stacks in center */}
              <div className="flex gap-1.5 mt-3">
                {[...Array(Math.min(5, Math.ceil(potSize / 10000)))].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    className="w-7 h-7 rounded-full border border-dashed border-[#D4AF37]/50 bg-gradient-to-br from-[#D4AF37] to-[#AA7C11] shadow-lg flex items-center justify-center text-[7px] font-black text-black font-mono shrink-0 select-none"
                  >
                    C
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 3. Player Spot (Bottom) */}
            <div className="flex flex-col items-center">
              
              {/* Player Cards */}
              <div className="flex gap-2.5 mb-4 min-h-[80px] items-center">
                {playerCards.length > 0 ? (
                  playerCards.map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.2, y: 80, opacity: 0, rotateY: 180 }}
                      animate={{ scale: 1, y: 0, opacity: 1, rotateY: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.15 }}
                      className="w-12 h-18 sm:w-14 sm:h-20 rounded-lg bg-white border border-white shadow-xl flex flex-col justify-between p-1.5 cursor-default select-none"
                    >
                      <span className={`text-[11px] sm:text-xs font-black leading-none ${card.color === "red" ? "text-red-500" : "text-slate-900"}`}>
                        {card.value} {card.suit}
                      </span>
                      <div className={`text-center text-lg sm:text-xl font-black ${card.color === "red" ? "text-red-500" : "text-slate-900"}`}>
                        {card.suit}
                      </div>
                      <span className={`text-right text-[11px] sm:text-xs font-black leading-none ${card.color === "red" ? "text-red-500" : "text-slate-900"}`}>
                        {card.value} {card.suit}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  [1, 2, 3].map((v) => (
                    <div key={v} className="w-12 h-18 sm:w-14 sm:h-20 border border-white/10 rounded-lg bg-black/20" />
                  ))
                )}
              </div>

              {/* Player Info */}
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#138808]" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest font-mono">YOUR HAND</span>
              </div>
            </div>

          </div>

          {/* Glowing Spot overlays around the table */}
          <div className="absolute left-[8%] top-[45%] w-10 h-10 border border-[#4EA8FF]/10 bg-[#4EA8FF]/5 rounded-full flex items-center justify-center text-[7px] font-black text-[#4EA8FF] select-none font-mono">
            P2
          </div>
          <div className="absolute right-[8%] top-[45%] w-10 h-10 border border-[#4EA8FF]/10 bg-[#4EA8FF]/5 rounded-full flex items-center justify-center text-[7px] font-black text-[#4EA8FF] select-none font-mono">
            P3
          </div>

        </div>

        {/* Dynamic Game results and Betting Console */}
        <div className="mt-8 bg-[#0E1B30]/60 border border-white/[0.06] rounded-2xl p-5 backdrop-blur-xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            {isDealing ? (
              <span className="text-sm font-bold text-slate-400 animate-pulse">Dealer is shuffling & dealing cards...</span>
            ) : gameResult ? (
              <div className="animate-fade-in">
                <span className="text-xs font-black text-[#138808] uppercase tracking-wider block font-mono">ROUND OUTCOME</span>
                <span className="text-base font-extrabold text-white mt-0.5 block">{gameResult}</span>
              </div>
            ) : (
              <span>Place your bet amounts and click **DEAL HAND** to initiate table simulation.</span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 shrink-0">
            {hasDealt ? (
              <button 
                onClick={resetTable}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-xs px-5 py-3.5 transition"
              >
                <RefreshCw size={13} />
                RESET TABLE
              </button>
            ) : (
              <button 
                disabled={isDealing}
                onClick={dealHand}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#E05E00] hover:shadow-lg hover:shadow-[#FF6B00]/20 text-white font-black text-xs px-6 py-3.5 transition disabled:opacity-40"
              >
                <Play size={13} fill="currentColor" />
                DEAL HAND
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
