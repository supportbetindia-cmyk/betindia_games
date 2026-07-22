"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { homeContent } from "@/data/home";

// ─── Types ────────────────────────────────────────────────────────────────────

export type faq = {
  question: string;
  answer: string;
};

// ─── Accordion item ───────────────────────────────────────────────────────────

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: faq;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl border transition-all duration-300",
        isOpen
          ? "border-[#FF6B00]/40 bg-white/[0.07] shadow-lg shadow-[#FF6B00]/8"
          : "border-white/10 bg-white/[0.04] backdrop-blur-xl hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]",
      ].join(" ")}
    >
      {/* Left accent bar */}
      <div
        className="pointer-events-none absolute bottom-4 left-0 top-4 w-[3px] rounded-r-full bg-[#FF6B00] transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0 }}
      />

      {/* Top edge glow when open */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0 }}
      />

      {/* Question row */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        {/* Number + Question */}
        <div className="flex items-start gap-4">
          <span
            className="mt-0.5 shrink-0 text-sm font-black tabular-nums transition-colors duration-200"
            style={{ color: isOpen ? "#FF6B00" : "rgba(255,255,255,0.2)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-[15px] font-bold leading-snug transition-colors duration-200"
            style={{ color: isOpen ? "#FF6B00" : "white" }}
          >
            {item.question}
          </span>
        </div>

        {/* Plus / Minus icon */}
        <span
          className="relative ml-2 grid h-8 w-8 shrink-0 place-items-center rounded-xl border transition-all duration-300"
          style={
            isOpen
              ? {
                  borderColor: "rgba(255,107,0,0.4)",
                  background: "rgba(255,107,0,0.12)",
                  color: "#FF6B00",
                }
              : {
                  borderColor: "rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#94a3b8",
                }
          }
        >
          <Plus
            size={15}
            strokeWidth={2.5}
            className={`absolute transition-all duration-300 ${
              isOpen ? "scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
            }`}
          />
          <Minus
            size={15}
            strokeWidth={2.5}
            className={`absolute transition-all duration-300 ${
              isOpen ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-90 opacity-0"
            }`}
          />
        </span>
      </button>

      {/* Answer — grid-rows height animation */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="px-6 pb-5 pl-[3.75rem] text-sm leading-relaxed text-slate-400">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export interface FAQContent {
  badge?: string;
  heading?: string;
  subtitle?: string;
  items?: faq[];
}

export default function FAQ({
  content,
  defaultContent = homeContent.faq,
}: {
  content?: FAQContent;
  defaultContent?: FAQContent;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  // Per-field fallback to the defaults so the section renders identically even
  // when content is missing or only partially set.
  const data = { ...defaultContent, ...(content ?? {}) };
  const faqItems: faq[] =
    data.items && data.items.length > 0 ? data.items : (defaultContent.items ?? []);
  const heading = data.heading ?? "";

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[320px] w-[320px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
            {data.badge}
          </span>

          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            {heading.endsWith("Questions") ? (
              <>
                {heading.slice(0, -9)}{" "}
                <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
                  Questions
                </span>
              </>
            ) : (
              heading
            )}
          </h2>

          
        </div>

        {/* Accordion — centered, max 900px */}
        <div className="mx-auto max-w-[900px] space-y-3">
          {faqItems.map((item, i) => (
            <AccordionItem
              key={item.question}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
