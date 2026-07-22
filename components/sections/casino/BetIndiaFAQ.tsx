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
    question: "What makes BetIndia's Aviator game unique?",
    answer: "BetIndia's version of the Aviator crash game features a bespoke cockpit hud instrumentation console, displaying real-time speed, altitude metrics, and encrypted cryptographic transparency hashes to guarantee provably fair flights.",
  },
  {
    question: "How do wagers work?",
    answer: "You place wagers prior to departure. As the passenger jet departs from the runway, the multiplier climbs exponentially. You must click the Cash Out button before the jet reaches escape velocity and disappears to secure your winnings.",
  },
  {
    question: "What is the Return to Player (RTP) rating?",
    answer: "AeroLuxe features an optimized theoretical RTP of 97.0%. Each round utilizes seed-hash checks, ensuring outcomes are random and verifiable.",
  },
  {
    question: "Can I configure Auto Cash Out?",
    answer: "Yes, you can automate your operations. Pre-set your desired multiplier limit (e.g. 2.00x) and the control console will execute cash outs automatically the microsecond that limit is achieved.",
  },
  {
    question: "Is mobile flight play lag-free?",
    answer: "Absolutely. The flight path coordinate vector chart is lightweight and optimized for all Android and iOS smartphones, running fluidly directly inside standard mobile browsers.",
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
          ? "border-[#FF7A00]/45 bg-[#0E1B30]/80 shadow-[0_10px_30px_rgba(255,122,0,0.05)]" 
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
            style={{ color: isOpen ? "#FF7A00" : "rgba(255, 255, 255, 0.2)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span 
            className="text-base font-bold transition-colors duration-200 text-white"
            style={{ color: isOpen ? "#FF7A00" : "#FFFFFF" }}
          >
            {item.question}
          </span>
        </div>

        {/* Plus/Minus Indicator */}
        <span 
          className="relative h-8 w-8 shrink-0 rounded-xl border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: isOpen ? "rgba(255, 122, 0, 0.4)" : "rgba(255, 255, 255, 0.08)",
            backgroundColor: isOpen ? "rgba(255, 122, 0, 0.1)" : "rgba(255, 255, 255, 0.02)",
            color: isOpen ? "#FF7A00" : "#94a3b8",
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

export default function BetIndiaFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-[#050B18] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Background soft glow lights */}
      <div className="absolute right-1/4 top-1/4 h-80 w-80 rounded-full bg-[#FF7A00]/3 blur-[100px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-1/4 h-80 w-80 rounded-full bg-[#4EA8FF]/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#FF7A00] backdrop-blur-md">
            FLIGHT DEBRIEFING FAQS
          </span>
          
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            Frequently Asked <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFB800] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #FF7A00, #FFB800)', WebkitBackgroundClip: 'text' }}>Questions</span>
          </div>
          
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Clear responses to common questions regarding seed-hash verifications, payouts, and cockpit systems.
          </p>
        </div>

        {/* FAQs Accordion list */}
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
