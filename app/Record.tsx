"use client";

import { useEffect, useRef, useState } from "react";
import type { Chapter, Lang } from "./content";

// The whole section holds on screen while the page scrolls through the years: each year
// takes STEP_VH of scrolling, and 2025 gets an extra step before the page moves on.
const STEP_VH = 11;

// One column of a rolling year: the digits 0–9 stacked, slid to the one showing.
function Digit({ d, delay }: { d: number; delay: number }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden align-top">
      <span
        className="flex flex-col transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.2,1)]"
        style={{ transform: `translateY(-${d * 10}%)`, transitionDelay: `${delay}ms` }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="block h-[1em] leading-none">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

// His record, driven by the scroll: the section holds still on screen while the page
// moves through the decades. The year rolls over digit by digit, the decade drifts behind
// it, the chapter slides in beside it, and the timeline fills. Clicking a year scrolls to it.
export default function Record({ chapters, lang, head }: { chapters: Chapter[]; lang: Lang; head: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const n = chapters.length;
  const steps = n + 1; // the last year holds for two steps
  const active = Math.min(n - 1, Math.floor(progress * steps));
  const fill = Math.min(1, (progress * steps) / (n - 1));

  useEffect(() => {
    const on = () => {
      const el = track.current;
      if (!el) return;
      const run = el.offsetHeight - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, -el.getBoundingClientRect().top / Math.max(1, run))));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const run = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + ((i + 0.5) / steps) * run;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const year = chapters[active].year;
  const decade = `${year.slice(0, 3)}0s`;

  return (
    // the track the page scrolls through; the screen-high section inside it stays put
    <div ref={track} className="relative" style={{ height: `calc(100svh + ${steps * STEP_VH}vh)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
       <div className="relative mx-auto w-full max-w-[1400px] px-5 pt-16 sm:px-8">
        {head}
        <div className="relative mt-6 py-6">
        {/* the decade, very large and faint, drifting as the years pass */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 font-display text-[10rem] leading-none font-medium whitespace-nowrap text-ivory/[0.035] transition-transform duration-[1200ms] ease-out select-none sm:text-[15rem]"
          style={{ transform: `translate(${-progress * 22}%, -50%)` }}
        >
          {decade}
        </span>

        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* the rolling year */}
          <div className="font-display text-[4.5rem] leading-none font-medium tracking-[-0.02em] text-ivory sm:text-[6rem] lg:text-[7rem]" aria-label={year}>
            {year.split("").map((ch, i) => (
              <Digit key={i} d={Number(ch)} delay={i * 70} />
            ))}
            <span className="mt-5 block h-px w-14 bg-sun" aria-hidden="true" />
          </div>

          {/* the chapter: all stacked in one cell so the panel never changes height */}
          <div className="grid" aria-live="polite">
            {chapters.map((c, i) => (
              <div
                key={c.year}
                aria-hidden={i !== active}
                className={`col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                  i === active ? "translate-x-0 opacity-100" : i < active ? "pointer-events-none -translate-x-6 opacity-0" : "pointer-events-none translate-x-6 opacity-0"
                }`}
              >
                <h3 className="font-display text-[1.6rem] leading-[1.12] font-medium text-ivory sm:text-[1.95rem]">{c.title[lang]}</h3>
                <p className="mt-4 max-w-[36rem] text-[0.96rem] leading-[1.7] text-ivory/70">{c.body[lang]}</p>
                {c.quote && (
                  <blockquote className="mt-5 max-w-[36rem] border-l border-sun/70 pl-4 [@media(max-height:760px)]:hidden">
                    <p className="font-display text-[1.2rem] leading-snug text-ivory italic">“{c.quote[0][lang]}”</p>
                    <footer className="label mt-1.5 text-[0.6rem] text-ivory/50">{c.quote[1][lang]}</footer>
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* the timeline, filling with the scroll */}
        <ol className="relative mt-10 flex justify-between border-t border-ivory/15 pt-4">
          <span aria-hidden="true" className="absolute -top-px left-0 h-px bg-sun" style={{ width: `${fill * 100}%` }} />
          {chapters.map((c, i) => (
            <li key={c.year} className="relative">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active}
                className={`text-[0.7rem] font-medium tracking-[0.14em] transition-colors sm:text-[0.76rem] ${
                  i === active ? "text-sun" : i < active ? "text-ivory/70 hover:text-ivory" : "text-ivory/40 hover:text-ivory/80"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute -top-[1.32rem] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full transition-all duration-500 ${
                    i === active ? "scale-150 bg-sun" : i < active ? "bg-sun" : "bg-ivory/25"
                  }`}
                />
                {c.year}
              </button>
            </li>
          ))}
        </ol>
      </div>
       </div>
      </div>
    </div>
  );
}
