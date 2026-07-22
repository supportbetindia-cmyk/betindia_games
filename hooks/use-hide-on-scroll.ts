"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** When true, force the element visible (e.g. while a mobile menu is open). */
  disabled?: boolean;
  /** Called once each time the element transitions to hidden. */
  onHide?: () => void;
  /** Scroll delta (px) to ignore so slow scrolls still accumulate direction. */
  threshold?: number;
  /** Always stay visible at or above this scrollY (px). */
  topOffset?: number;
};

/**
 * Returns whether a sticky/fixed bar should be visible based on scroll
 * direction: hide when scrolling down, show when scrolling up, and always show
 * near the top of the page. Pure behavior — no DOM styling here.
 */
export function useHideOnScroll({
  disabled = false,
  onHide,
  threshold = 4,
  topOffset = 10,
}: Options = {}) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Keep the latest disabled/onHide in refs so the scroll listener is subscribed
  // once and never needs re-attaching when these change between renders.
  const disabledRef = useRef(disabled);
  const onHideRef = useRef(onHide);
  useEffect(() => {
    disabledRef.current = disabled;
    onHideRef.current = onHide;
  }, [disabled, onHide]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      // Disabled (e.g. menu open) -> pin visible and just track position.
      if (disabledRef.current) {
        setVisible(true);
        lastScrollY.current = y;
        return;
      }

      // Ignore sub-threshold jitter WITHOUT moving the anchor, so slow scrolls
      // still accumulate into a real direction change.
      if (Math.abs(y - lastScrollY.current) < threshold) return;

      if (y <= topOffset) {
        setVisible(true);
      } else if (y > lastScrollY.current) {
        setVisible(false);
        onHideRef.current?.();
      } else {
        setVisible(true);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, topOffset]);

  return visible;
}
