"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Gift, RefreshCw, Crown, Users, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { homeContent } from "@/data/home";

const ICON_MAP: Record<string, LucideIcon> = {
  "Welcome Bonus": Gift,
  "Weekly Cashback": RefreshCw,
  "VIP Rewards": Crown,
  "Refer & Earn": Users,
};

const BADGE_MAP: Record<string, string> = {
  "Welcome Bonus": "NEW PLAYERS",
  "Weekly Cashback": "EVERY WEEK",
  "VIP Rewards": "MEMBERS ONLY",
  "Refer & Earn": "UNLIMITED",
};

const VALUE_MAP: Record<string, string> = {
  "Welcome Bonus": "₹25,000",
  "Weekly Cashback": "Up to 10%",
  "VIP Rewards": "Exclusive",
  "Refer & Earn": "Unlimited",
};

export default function Promotions({ content }: { content?: Partial<typeof homeContent.promotions> | null }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const data = { ...homeContent.promotions, ...(content ?? {}) };
  const title = data.promotionsTitle;
  const subtitle = data.promotionsSubtitle;
  const items = data.promotionsItems && data.promotionsItems.length > 0 ? data.promotionsItems : homeContent.promotions.promotionsItems;

  const promos = items.map((item) => ({
    icon: ICON_MAP[item.title] || Gift,
    badge: BADGE_MAP[item.title] || "SPECIAL",
    value: VALUE_MAP[item.title] || "Rewards",
    title: item.title,
    description: item.description,
  }));

  const syncArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncArrows();
    el.addEventListener("scroll", syncArrows, { passive: true });
    const ro = new ResizeObserver(syncArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncArrows);
      ro.disconnect();
    };
  }, [syncArrows]);

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-promo-card]");
    const gap = 20;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + gap), behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/7 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[280px] w-[280px] -translate-x-1/3 translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[280px] w-[280px] translate-x-1/3 translate-y-1/2 rounded-full bg-[#138808]/6 blur-2xl"
      />

      <div className="relative z-10 mx-auto ">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between gap-4">
          <div className="text-center flex-1 lg:text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B00]" />
              Limited Time Offers
            </span>

            <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
              {title.includes("&") ? (
                <>
                  {title.split("&")[0]}{" "}
                  <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] bg-clip-text text-transparent">
                    &amp; {title.split("&")[1]}
                  </span>
                </>
              ) : (
                title
              )}
            </h2>

            <p className="mx-auto mt-4   text-sm text-slate-400 md:text-base lg:mx-0">
              {subtitle}
            </p>
          </div>

          {/* Desktop arrows */}
         
        </div>

         <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <button
              onClick={() => scroll(-1)}
              disabled={atStart}
              aria-label="Previous promotion"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/60 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/[0.1] hover:text-white disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={atEnd}
              aria-label="Next promotion"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/60 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/[0.1] hover:text-white disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>

        {/* Carousel track wrapper */}
        <div className="relative">
          {/* Edge fades */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#050B18] to-transparent transition-opacity duration-300 sm:w-4"
            style={{ opacity: atStart ? 0 : 1 }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#050B18] to-transparent transition-opacity duration-300 sm:w-8"
            style={{ opacity: atEnd ? 0 : 1 }}
          />

          {/* Scrollable track */}
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {promos.map(({ icon: Icon, badge, value, title: itemTitle, description }) => (
              <div
                key={itemTitle}
                data-promo-card
                className="group relative flex-none snap-start overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#FF6B00]/50 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-[#FF6B00]/10 w-[82%] max-w-sm sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
              >
                {/* Shine sweep */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {/* Top edge glow */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Corner radial glow */}
                <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#FF6B00]/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Badge */}
                <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FF6B00]">
                  {badge}
                </span>

                {/* Icon */}
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] shadow-[0_4px_20px_#FF6B0020] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_4px_28px_#FF6B0035]">
                  <Icon size={24} strokeWidth={1.7} />
                </div>

                {/* Value */}
                <p className="mb-1 bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] bg-clip-text text-2xl font-black tracking-tight text-transparent">
                  {value}
                </p>

                {/* Title */}
                <h3 className="mb-2 text-base font-bold text-white">{itemTitle}</h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-slate-400">{description}</p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
