"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Measures a DOM element's height and keeps it up to date via ResizeObserver.
 * Returns [ref, height]. Attach the ref to the element you want to measure —
 * useful for reserving space under a `fixed` element with a spacer.
 */
export function useElementHeight<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => setHeight(el.offsetHeight);
    measure(); // initial measurement

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, height] as const;
}
