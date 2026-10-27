"use client";

import { useEffect, type RefObject } from "react";

// Phones only: makes a sideways carousel obviously swipeable. The first time it comes
// into view the row slides a little to the side and back; under it, a "swipe" label
// with an arrow that keeps nudging.

const PHONE = "(max-width: 1023px)";

export function useNudge(track: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = track.current;
    if (!el || !matchMedia(PHONE).matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || el.scrollLeft > 4) return;
        io.disconnect();
        setTimeout(() => {
          el.scrollTo({ left: 90, behavior: "smooth" });
          setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 650);
        }, 500);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [track]);
}

export function SwipeHint({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-[0.62rem] font-medium tracking-[0.18em] uppercase lg:hidden ${dark ? "text-ivory/60" : "text-muted"}`}>
      {label}
      <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden="true" className="swipe-hint">
        <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </p>
  );
}
