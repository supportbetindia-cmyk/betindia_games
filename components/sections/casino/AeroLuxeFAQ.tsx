"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What is AeroLuxe and how is it unique?",
    answer: "AeroLuxe is a premium aviation-themed multiplayer crash betting game. Unlike copycat casino websites, it features a bespoke luxury dark UI with telemetry diagnostics (altitude, speed, G-Force) and cryptographic Provably Fair security checks built directly into the player console.",
  },
  {
    question: "How do game multipliers scale?",
    answer: "The flight multiplier coefficient begins at 1.00x and scales exponentially as the jet ascends. The flight can end at any microsecond. Cashing out before the aircraft flies away secures your wager multiplied by the exact coefficient displayed at execution.",
  },
  {
    question: "What is the return percentage (RTP)?",
    answer: "AeroLuxe features an elite theoretical Return to Player (RTP) of 97.0%. Each round is generated using blockchain seed hashes, ensuring 100% transparency and provably fair outcomes that cannot be manipulated.",
  },
  {
    question: "Can I place multiple wagers in a single flight?",
    answer: "Yes, the advanced AeroLuxe flight control panel allows you to configure dual independent wagers simultaneously. You can set one bet for auto-cash out (e.g. at 2.00x) while manually managing the second wager for higher altitude multipliers.",
  },
  {
    question: "How does Auto Cash Out work?",
    answer: "Auto Cash Out enables players to pre-define their target multiplier. The system instantly executes a cash out the millisecond the flight altitude reaches the configured threshold, eliminating human latency.",
  },
  {
    question: "Is AeroLuxe fully compatible with smartphones?",
    answer: "Yes, the entire dashboard and vector flight renderer are custom-built for high-performance mobile browsers. It runs natively with zero download requirements on all iOS and Android devices.",
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
          ? "border-[#D4AF37]/45 bg-[#0E0F14]/90 shadow-[0_10px_30px_rgba(212,175,55,0.05)]" 
          : "border-white/[0.06] bg-[#0E0F14]/60 hover:bg-[#0E0F14]/80 hover:border-white/10"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
      >
        <div className="flex items-start gap-4">
          <span 
            className="text-sm font-black tabular-nums transition-colors duration-200 mt-0.5"
            style={{ color: isOpen ? "#D4AF37" : "rgba(255, 255, 255, 0.25)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span 
            className="text-base font-bold transition-colors duration-200 text-white"
            style={{ color: isOpen ? "#D4AF37" : "#FFFFFF" }}
          >
            {item.question}
          </span>
        </div>

        {/* Dynamic Plus/Minus with gold-neon highlights */}
        <span 
          className="relative h-8 w-8 shrink-0 rounded-xl border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: isOpen ? "rgba(212, 175, 55, 0.4)" : "rgba(255, 255, 255, 0.08)",
            backgroundColor: isOpen ? "rgba(212, 175, 55, 0.1)" : "rgba(255, 255, 255, 0.02)",
            color: isOpen ? "#D4AF37" : "#94a3b8",
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
              <p className="text-sm leading-relaxed text-slate-400">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AeroLuxeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-[#0B0B0F] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Background Soft Glows */}
      <div className="absolute right-1/4 top-1/4 h-80 w-80 rounded-full bg-[#3B82F6]/3 blur-[100px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-1/4 h-80 w-80 rounded-full bg-[#D4AF37]/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#3B82F6] backdrop-blur-md">
            COMMON CONCERNS & TELEMETRY
          </span>
          
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            Frequently Asked <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFF3B0] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #D4AF37, #FFF3B0)' }}>Questions</span>
          </div>
          
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Everything you need to know about flight safety, odds computation, and transaction clearances.
          </p>
        </div>

        {/* FAQ Accordion List */}
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
