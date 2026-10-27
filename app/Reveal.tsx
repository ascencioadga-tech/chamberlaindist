"use client";

import { useEffect } from "react";

// Adds `.in` to [data-reveal] elements and to .corridor as they scroll into view.
// It also watches for elements added later (a re-render, a language switch, a live edit),
// so nothing can be left hidden.
export default function Reveal() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    const watch = () =>
      document.querySelectorAll("[data-reveal]:not(.in), .corridor:not(.in)").forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
