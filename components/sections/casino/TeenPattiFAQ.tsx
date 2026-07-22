"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What is Teen Patti?",
    answer: "Teen Patti is a traditional Indian three-card game where players compete to build the strongest hand or use strategic betting to win.",
  },
  {
    question: "Can I play Teen Patti online in India?",
    answer: "Yes. Bet India allows players to play Teen Patti online India through secure Teen Patti live tables featuring professional dealers, mobile compatibility, and flexible betting options.",
  },
  {
    question: "Is Teen Patti suitable for beginners?",
    answer: "Yes. The straightforward rules make it easy for beginners to learn.",
  },
  {
    question: "What is live Teen Patti?",
    answer: "Live Teen Patti features professional Teen Patti live dealer hosts who deal real cards through HD video streaming, creating an authentic casino experience that closely resembles playing at a physical casino.",
  },
  {
    question: "Can I play Teen Patti on mobile?",
    answer: "Yes. Teen Patti is fully optimized for smartphones, tablets, and desktop devices.",
  },
  {
    question: "What are the highest-ranking hands?",
    answer: "Trail (Three of a Kind) is the strongest hand, followed by Pure Sequence, Sequence, Color, Pair, and High Card.",
  },
  {
    question: "Is Teen Patti a real money game?",
    answer: "Yes. Eligible players can enjoy real money Teen Patti games on Bet India.",
  },
  {
    question: "How can I improve my Teen Patti experience?",
    answer: "Learn the rules, understand hand rankings, manage your bankroll responsibly, and always play on a trusted platform.",
  },
];

function AccordionItem({ 
  item, 
  index, 
  isOpen, 
  onToggle 
}: { 
  item: FAQItem; 
  index: number; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <div 
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen 
          ? "border-[#FF6B00]/45 bg-[#0E1B30]/80 shadow-[0_10px_30px_rgba(255,107,0,0.05)]" 
          : "border-white/[0.06] bg-[#0E1B30]/40 hover:bg-[#0E1B30]/60 hover:border-white/10"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
      >
        <div className="flex items-start gap-4">
          <span 
            className="text-sm font-black tabular-nums transition-colors duration-200 mt-0.5"
            style={{ color: isOpen ? "#FF6B00" : "rgba(255, 255, 255, 0.2)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span 
            className="text-base font-bold transition-colors duration-200 text-white"
            style={{ color: isOpen ? "#FF6B00" : "#FFFFFF" }}
          >
            {item.question}
          </span>
        </div>

        {/* Plus/Minus Indicator */}
        <span 
          className="relative h-8 w-8 shrink-0 rounded-xl border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: isOpen ? "rgba(255, 107, 0, 0.4)" : "rgba(255, 255, 255, 0.08)",
            backgroundColor: isOpen ? "rgba(255, 107, 0, 0.1)" : "rgba(255, 255, 255, 0.02)",
            color: isOpen ? "#FF6B00" : "#94a3b8",
          }}
        >
          {isOpen ? <Minus size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 pl-[3.75rem] border-t border-white/[0.03] pt-4">
              <p className="text-sm leading-relaxed text-slate-400 font-medium">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TeenPattiFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-[#050B18] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Background Soft Glows */}
      <div className="absolute right-1/4 top-1/4 h-80 w-80 rounded-full bg-[#FF6B00]/3 blur-[100px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-1/4 h-80 w-80 rounded-full bg-[#4EA8FF]/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#FF6B00] backdrop-blur-md">
            FREQUENTLY ASKED QUESTIONS
          </span>
          
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            Frequently Asked <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF8F33] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #FF6B00, #FF8F33)', WebkitBackgroundClip: 'text' }}>Questions</span>
          </div>
          
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Find answers to common questions about Teen Patti rules, limits, mobile support, and payouts.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {FAQS.map((item, idx) => (
            <AccordionItem
              key={idx}
              item={item}
              index={idx}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
