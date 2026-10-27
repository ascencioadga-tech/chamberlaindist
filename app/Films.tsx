"use client";

import { useRef, useState } from "react";
import { copy, type Film, type Lang } from "./content";
import { SwipeHint, useNudge } from "./Swipe";

function Play({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6 4.2v11.6L15.6 10z" fill="currentColor" />
    </svg>
  );
}

function Arrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true" className={flip ? "rotate-180" : ""}>
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// The On camera section: a main screen beside the heading, and every interview in a
// carousel below. Choosing a card puts that interview on the screen in place (no pop-up);
// YouTube only loads, and the video only plays, when the screen's play button is pressed.
// The YouTube player's own button takes it full screen.
export default function Films({ films, lang, head }: { films: Film[]; lang: Lang; head: React.ReactNode }) {
  const t = copy[lang].camera;
  const [current, setCurrent] = useState(films[0]);
  const [playing, setPlaying] = useState(false);
  const track = useRef<HTMLUListElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  useNudge(track);

  const choose = (f: Film) => {
    setCurrent(f);
    setPlaying(false);
    const r = screen.current?.getBoundingClientRect();
    if (r && (r.top < 80 || r.bottom > window.innerHeight)) screen.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Arrows move one card; at either end they wrap around.
  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const by = card.offsetWidth + 28;
    if (dir === 1 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir === -1 && el.scrollLeft <= 4) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * by, behavior: "smooth" });
  };

  return (
    <>
      {/* video and text as two level columns: same top edge, same bottom edge */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-stretch lg:gap-14">
        <div ref={screen} data-reveal className="order-2 lg:order-1">
          <div className="relative aspect-video overflow-hidden rounded-[2px] bg-night">
            {playing ? (
              <iframe
                key={current.id}
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0${current.start ? `&start=${current.start}` : ""}`}
                title={current.title[lang]}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`${t.play}: ${current.title[lang]}`}
                className="group absolute inset-0 block"
              >
                <img key={current.thumb} src={`/thumbs/${current.thumb}.jpg`} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
                <span className="absolute inset-0 bg-gradient-to-t from-night/45 via-transparent to-transparent" />
                <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/70 bg-night/30 text-ivory backdrop-blur-sm transition group-hover:scale-105 group-hover:border-ivory group-hover:bg-ivory group-hover:text-night">
                  <Play size={18} />
                </span>
                <span className="absolute right-3 bottom-3 rounded-[2px] bg-night/70 px-1.5 py-0.5 text-[0.7rem] tracking-[0.04em] text-ivory">{current.length}</span>
              </button>
            )}
          </div>
          {/* on phones the caption stays under the video */}
          <div className="mt-4 lg:hidden">
            <p className="label text-[0.6rem] text-muted">
              {current.outlet} · {current.date[lang]}
            </p>
            <p className="mt-2 font-display text-[1.3rem] leading-[1.2] font-medium text-ink">{current.title[lang]}</p>
          </div>
        </div>

        <div className="order-1 flex flex-col lg:order-2">
          <p data-reveal className="label text-muted">
            {t.label}
          </p>
          <div className="mt-5">{head}</div>

          {/* what is on the screen, set level with the foot of the video */}
          <div data-reveal className="mt-auto hidden border-t border-rule pt-5 lg:block">
            <p className="label text-[0.6rem] text-sun">{t.now}</p>
            <p className="label mt-3 text-[0.6rem] text-muted">
              {current.outlet} · {current.date[lang]}
            </p>
            <p className="mt-1.5 font-display text-[1.3rem] leading-[1.2] font-medium text-ink">{current.title[lang]}</p>
          </div>
        </div>
      </div>

      <div className="mt-14 flex items-end justify-between gap-6 border-b border-rule pb-3">
        <p className="label text-muted">
          {t.listing} <span className="mx-2 text-muted/50">·</span> {t.more(films.length)}
        </p>
        <div className="flex gap-2">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => step(dir)}
              aria-label={dir === 1 ? t.next : t.prev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink/70 transition hover:border-ink/50 hover:text-ink"
            >
              <Arrow flip={dir === -1} />
            </button>
          ))}
        </div>
      </div>

      {/* one row that runs off the right edge of the page; it only moves when asked */}
      <ul
        ref={track}
        className="mt-8 mr-[calc(50%-50vw)] flex snap-x snap-mandatory gap-7 overflow-x-auto pr-8 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {films.map((f) => {
          const on = f.id === current.id;
          return (
            <li key={f.id} className="w-[72vw] shrink-0 snap-start sm:w-[19rem]">
              <button type="button" onClick={() => choose(f)} aria-pressed={on} className="group block w-full text-left">
                <span className={`relative block overflow-hidden rounded-[2px] bg-night transition ${on ? "outline outline-1 outline-offset-4 outline-sun" : ""}`}>
                  <img
                    src={`/thumbs/${f.thumb}.jpg`}
                    alt=""
                    loading="lazy"
                    className={`aspect-video w-full object-cover transition duration-700 group-hover:scale-[1.03] ${on ? "opacity-60" : "opacity-95 group-hover:opacity-100"}`}
                  />
                  <span className="absolute right-3 bottom-3 rounded-[2px] bg-night/70 px-1.5 py-0.5 text-[0.68rem] tracking-[0.04em] text-ivory">{f.length}</span>
                  {on && (
                    <span className="absolute top-3 left-3 rounded-[2px] bg-night/75 px-2 py-1 text-[0.58rem] font-medium tracking-[0.16em] text-ivory uppercase">{t.now}</span>
                  )}
                </span>
                <span className="label mt-4 block text-[0.6rem] text-muted">
                  {f.outlet} · {f.date[lang]}
                </span>
                <span className="mt-2 block font-display text-[1.15rem] leading-[1.2] font-medium text-ink transition-colors group-hover:text-ink/70">
                  {f.title[lang]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-5">
        <SwipeHint label={copy[lang].swipe} />
      </div>
    </>
  );
}
