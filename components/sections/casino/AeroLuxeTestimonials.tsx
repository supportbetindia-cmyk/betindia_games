"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  review: string;
  avatarColor: string;
  avatarText: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aarav Sharma",
    role: "Elite Club Pilot",
    rating: 5,
    review: "The design is gorgeous. AeroLuxe doesn't look like any other generic casino game. The glassmorphism dashboard and smooth engine trails make it feel like a real aviation HUD. Plus, cash outs are lightning-fast.",
    avatarColor: "bg-gradient-to-br from-[#D4AF37] to-[#AA7C11]",
    avatarText: "AS",
  },
  {
    name: "Rohan Mehta",
    role: "Provably Fair Advocate",
    rating: 5,
    review: "Cryptographic verification is fully integrated. Being able to cross-reference flight hashes directly inside my dashboard creates complete trust. The electric blue details and dark theme are premium.",
    avatarColor: "bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8]",
    avatarText: "RM",
  },
  {
    name: "Priya Kapoor",
    role: "VIP High Roller",
    rating: 5,
    review: "Auto cash out limits are perfectly responsive. The mobile optimization is excellent - playing on my phone feels just as fluid and premium as my Mac. Highly recommend playing responsibly with small budgets first!",
    avatarColor: "bg-gradient-to-br from-[#D4AF37] via-[#FFF3B0] to-[#3B82F6]",
    avatarText: "PK",
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
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  },
};

export default function AeroLuxeTestimonials() {
  return (
    <section className="relative bg-[#0B0B0F] py-24 overflow-hidden border-b border-white/[0.04]">
      {/* Background Soft Glows */}
      <div className="absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-[#D4AF37]/3 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 top-1/4 h-80 w-80 rounded-full bg-[#3B82F6]/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#3B82F6] backdrop-blur-md">
            PILOT CO-SIGNATURES
          </span>
          
          <div className="mt-5 text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl">
            Why Players Love <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFF3B0] bg-clip-text text-transparent" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #D4AF37, #FFF3B0)' }}>AeroLuxe</span>
          </div>
          
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Hear from our elite class of active flight captains who enjoy the high fidelity crash simulation every day.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E0F14]/75 p-6 backdrop-blur-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(item.rating)].map((_, starIdx) => (
                    <Star 
                      key={starIdx} 
                      size={14} 
                      className="text-[#D4AF37] fill-[#D4AF37]" 
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm leading-relaxed text-slate-350 italic">
                  "{item.review}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 mt-8 pt-5 border-t border-white/[0.05]">
                {/* Custom Initials Avatar */}
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-xs font-black text-black shrink-0 ${item.avatarColor}`}>
                  {item.avatarText}
                </div>

                <div className="overflow-hidden">
                  <h4 className="text-sm font-black text-white truncate">{item.name}</h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <ShieldCheck size={11} className="text-[#3B82F6]" />
                    <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">{item.role}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
