"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react";
import { CTA_LINKS } from "@/lib/cta-links";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";
import { useElementHeight } from "@/hooks/use-element-height";

const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "Sports",      href: "/sports" },
  { label: "Casino",      href: "/casino" },
  { label: "Promotions",  href: "/promotions" },
  { label: "VIP",         href: "/vip" },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Header is `fixed`, so measure its height and reserve the same space with a
  // spacer below (see the spacer div in the markup).
  const [headerRef, headerH] = useElementHeight<HTMLElement>();

  // Hide on scroll down / show on scroll up. Stays pinned while the mobile menu
  // is open, and closes the menu when the bar hides.
  const visible = useHideOnScroll({
    disabled: menuOpen,
    onHide: () => setMenuOpen(false),
  });

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Spacer reserving the fixed header's height so content starts below it. */}
      <div aria-hidden style={{ height: headerH }} />
      <header
        ref={headerRef}
        className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050B18]/95 backdrop-blur-xl"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 300ms ease-in-out",
        }}
      >
        {/* Top row: Logo + Desktop Nav + Mobile Green Hamburger button */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
            <img
              src="/logo/betindialogo.png"
              alt="BetIndia"
              width={160}
              height={45}
              className="h-9 w-auto sm:h-11"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={[
                  "relative text-sm font-semibold transition-colors duration-200",
                  isActive(href)
                    ? "text-[#FF6B00]"
                    : "text-slate-300 hover:text-white",
                ].join(" ")}
              >
                {label}
                {/* Active underline */}
                <span
                  className={[
                    "absolute -bottom-1 left-0 h-px w-full rounded-full bg-[#FF6B00] transition-opacity duration-200",
                    isActive(href) ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center gap-2.5 md:flex">
            <Link
              href={CTA_LINKS.login}
              className="rounded-lg bg-[#FF6B00] px-5 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-[#FF6B00]/20 transition-all duration-200 hover:bg-[#FF8A00]"
            >
              Login
            </Link>
            <Link
              href={CTA_LINKS.signup}
              className="rounded-lg bg-[#138808] px-5 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-[#138808]/20 transition-all duration-200 hover:bg-[#16A30A]"
            >
              Register
            </Link>
            <a
              href="/betindia.apk"
              download
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:border-[#FF6B00] hover:text-[#FF6B00]"
            >
              Download
            </a>
          </div>

          {/* Mobile Menu Toggle Button (Green Button matching reference layout) */}
          <button
            className="grid h-10 w-10 place-items-center rounded-lg bg-[#138808] text-white shadow-md shadow-[#138808]/25 transition-transform active:scale-95 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} strokeWidth={2.5} /> : <span className="text-xl leading-none font-bold">☰</span>}
          </button>
        </div>

        {/* Mobile Sub-bar: Always-visible LOGIN (Orange) & DOWNLOAD (Green) Buttons */}
        <div className="border-t border-white/[0.08] px-4 py-2.5 md:hidden">
          <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
            <Link
              href={CTA_LINKS.login}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center rounded-lg bg-[#FF6B00] py-2.5 text-center text-sm font-extrabold uppercase tracking-wider text-white shadow-md shadow-[#FF6B00]/20 transition-all active:scale-[0.98]"
            >
              LOGIN
            </Link>
            <a
              href="/betindia.apk"
              download
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center rounded-lg bg-[#138808] py-2.5 text-center text-sm font-extrabold uppercase tracking-wider text-white shadow-md shadow-[#138808]/20 transition-all active:scale-[0.98]"
            >
              DOWNLOAD
            </a>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#050B18] px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1.5">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-200",
                    isActive(href)
                      ? "bg-[#FF6B00]/10 text-[#FF6B00]"
                      : "text-slate-300 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  {label}
                </Link>
              ))}
              <div className="mt-2 border-t border-white/10 pt-3">
                <Link
                  href={CTA_LINKS.signup}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center rounded-lg bg-[#138808] py-2.5 text-center text-sm font-extrabold uppercase tracking-wider text-white shadow-md shadow-[#138808]/20 transition-all active:scale-[0.98]"
                >
                  REGISTER NOW
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
