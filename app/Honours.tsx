"use client";

import { useEffect, useRef, useState } from "react";
import { copy, type Bi, type Lang } from "./content";
import { SwipeHint, useNudge } from "./Swipe";

const STEP_MS = 4500;

// His experiences as a row of small cards under his name. It stays in the left column,
// fades out before the portrait, and steps one card at a time (paused while hovered).
export default function Honours({ items, lang }: { items: [Bi, Bi, string?][]; lang: Lang }) {
  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useNudge(track);

  const cardWidth = () => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + 12 : 240;
  };

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    if (dir === 1 && end) el.scrollTo({ left: 0, behavior: "smooth" });
    else el.scrollBy({ left: dir * cardWidth(), behavior: "smooth" });
  };

  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), STEP_MS);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      className="w-full lg:w-[calc(46vw-max(2rem,(100vw-1400px)/2+2rem))]"
    >
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pr-16 [mask-image:linear-gradient(to_right,black_72%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map(([role, org, url]) => {
          const body = (
            <>
              <h3 className="pr-5 font-display text-[1.22rem] leading-[1.15] font-medium text-ivory">{role[lang]}</h3>
              <p className="mt-2 text-[0.8rem] leading-snug text-ivory/65 transition-colors group-hover:text-ivory/90">{org[lang]}</p>
              {url && (
                <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true" className="absolute top-4 right-4 text-ivory/45 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sun">
                  <path d="M3 9L9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              )}
            </>
          );
          const card = "group relative block w-[14.5rem] shrink-0 snap-start rounded-[2px] border border-ivory/15 bg-ivory/[0.04] px-5 pt-5 pb-5 backdrop-blur-[2px]";
          return url ? (
            <a key={role.en + org.en} href={url} target="_blank" rel="noopener noreferrer" className={`${card} transition-colors hover:border-ivory/40 hover:bg-ivory/[0.07]`}>
              {body}
            </a>
          ) : (
            <article key={role.en + org.en} className={card}>
              {body}
            </article>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <SwipeHint label={copy[lang].swipe} dark />
        <span className="flex-1 lg:hidden" />
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => go(dir)}
            aria-label={dir === 1 ? (lang === "es" ? "Siguiente" : "Next") : lang === "es" ? "Anterior" : "Previous"}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition hover:border-ivory/60 hover:text-ivory"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true" className={dir === -1 ? "rotate-180" : ""}>
              <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
