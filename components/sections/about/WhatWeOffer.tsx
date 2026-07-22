import Link from "next/link";
import { aboutUsContent } from "@/data/AboutUs";

export default function WhatWeOffer() {
  const data = aboutUsContent.whatWeOffer;

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
          What We{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            Offer
          </span>
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {data.intro}
        </p>
        <p className="mx-auto mt-6 text-sm font-semibold text-slate-300 sm:text-base">{data.listLabel}</p>

        <ul className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {data.items.map(({ label, href }) => (
            <li key={label}>
              {href ? (
                <Link
                  href={href}
                  className="block rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-center text-xs font-semibold text-slate-300 transition-colors hover:border-[#FF6B00]/30 hover:text-white"
                >
                  {label}
                </Link>
              ) : (
                <span className="block rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-center text-xs font-semibold text-slate-300">
                  {label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
