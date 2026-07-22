"use client";

import Image from "next/image";
import { Trophy, Zap, TrendingUp } from "lucide-react";

type HeroImageProps = {
  imageUrl?: string;
  imageAlt?: string;
};

export default function HeroImage({ imageUrl = "", imageAlt = "BetIndia sports betting and casino" }: HeroImageProps) {
  const customImage = imageUrl.trim();

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#081425] shadow-2xl shadow-black/40 backdrop-blur-md">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-[#FF6B00]/10 via-transparent to-[#138808]/10"
      />
      <div className="relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/3]">
        {customImage ? (
          <div
            aria-label={imageAlt}
            role="img"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${customImage})` }}
          />
        ) : (
          <Placeholder />
        )}
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#081425] via-[#0B1F3A] to-[#050B18]">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FF6B00]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#138808]/20 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <div className="grid h-24 w-24 place-items-center rounded-3xl border border-[#FF6B00]/30 bg-[#FF6B00]/10 shadow-xl shadow-[#FF6B00]/20">
          <Trophy size={44} className="text-[#FF6B00]" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <Image
            src="/logo/betindialogo.png"
            alt="BetIndia"
            width={160}
            height={48}
            priority
            loading="eager"
            className="h-auto w-auto"
          />
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            India&apos;s #1 Sportsbook
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full border border-[#138808]/30 bg-[#138808]/10 px-4 py-2">
            <TrendingUp size={13} className="text-[#138808]" />
            <span className="text-xs font-bold uppercase tracking-wide text-[#138808]">Live Betting</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-4 py-2">
            <Zap size={13} className="text-[#FF6B00]" />
            <span className="text-xs font-bold uppercase tracking-wide text-[#FF6B00]">Instant Play</span>
          </div>
        </div>
      </div>
    </div>
  );
}
