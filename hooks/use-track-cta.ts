"use client";

import { useCallback } from "react";
import type { CTAKey } from "@/lib/cta-links";

// Extend Window with GA4 gtag for future integration
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params: Record<string, string>) => void;
  }
}

export function useTrackCTA() {
  return useCallback((key: CTAKey, label?: string) => {
    if (typeof window === "undefined") return;

    // Google Analytics 4 — fires when gtag is loaded
    if (typeof window.gtag === "function") {
      window.gtag("event", "cta_click", {
        cta_key:   key,
        cta_label: label ?? key,
      });
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`[CTA] ${key}${label ? ` — "${label}"` : ""}`);
    }
  }, []);
}
