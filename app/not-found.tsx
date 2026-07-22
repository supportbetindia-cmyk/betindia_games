import type { Metadata } from "next";
import Link from "next/link";
import { CTA_LINKS } from "@/lib/cta-links";

export const metadata: Metadata = {
  title: "Page Not Found | BetIndia",
  description: "The page you're looking for doesn't exist. Return to BetIndia and explore our sports betting and casino games.",
};

export default function NotFound() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#050B18] px-4 text-center">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/8 blur-3xl" />

        <div className="relative z-10 max-w-md">
          <p className="text-8xl font-black text-[#FF6B00]">404</p>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            The page you're looking for doesn't exist or has been moved. Head back to BetIndia and keep playing.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-[#FF8A00] hover:shadow-lg hover:shadow-[#FF6B00]/25"
            >
              Back to Home
            </Link>
            <Link
              href={CTA_LINKS.sports}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/10"
            >
              Browse Sports
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
