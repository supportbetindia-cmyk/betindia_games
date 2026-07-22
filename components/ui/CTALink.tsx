"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { CTA_LINKS, type CTAKey } from "@/lib/cta-links";
import { useTrackCTA } from "@/hooks/use-track-cta";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  ctaKey: CTAKey;
  label?: string;
};

// Tracked Link wrapper — reads href from CTA_LINKS, fires GA4 on click.
// Drop-in replacement for <Link href={CTA_LINKS.xxx}> in client components.
export function CTALink({ ctaKey, label, onClick, children, ...props }: Props) {
  const track = useTrackCTA();

  return (
    <Link
      href={CTA_LINKS[ctaKey]}
      onClick={(e) => {
        track(ctaKey, label ?? (typeof children === "string" ? children : undefined));
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
