"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { PATH, PHONE, TEL, copy, type Lang } from "./content";

// Plain "EN / ES": the current language in full strength, the other one quieter.
function LangSwitch({ lang }: { lang: Lang }) {
  const other: Lang = lang === "en" ? "es" : "en";
  return (
    <a
      href={PATH[other]}
      hrefLang={other}
      aria-label={copy[lang].switchTo}
      title={copy[lang].switchTo}
      className="flex items-center gap-1.5 text-[0.72rem] font-medium tracking-[0.16em] uppercase"
    >
      {(["en", "es"] as const).map((l, i) => (
        <span key={l} aria-hidden="true" className="flex items-center gap-1.5">
          {i > 0 && <span className="opacity-30">/</span>}
          <span className={l === lang ? "" : "opacity-45 transition-opacity hover:opacity-100"}>{l}</span>
        </span>
      ))}
    </a>
  );
}

// A formal bar: badge on the left, the sections in small capitals, the office line on the right.
// Over the hero it is its own dark bar with a fine gold hairline; from the first scroll it
// slims down, turns ivory and casts a soft shadow, so the change is felt.
export default function Header({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md transition-[background,color,border-color,box-shadow] duration-500 ${
        solid
          ? "border-rule bg-paper/97 text-ink shadow-[0_10px_30px_-14px_rgba(12,19,16,0.35)]"
          : "border-sun/25 bg-night/80 text-ivory"
      }`}
    >
      <div className={`mx-auto flex max-w-[1400px] transition-[height] duration-500 ${solid ? "h-[3.75rem]" : "h-[4.5rem]"} items-center justify-between gap-8 px-5 sm:px-8`}>
        <a href="#top" className="shrink-0" aria-label={t.backToTop}>
          <Logo className={`w-auto transition-[height] duration-500 ${solid ? "h-8" : "h-10"}`} />
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {t.nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="relative py-1 text-[0.72rem] font-medium tracking-[0.16em] uppercase after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <a href={TEL} className="hidden text-right leading-tight sm:block">
            <span className={`block text-[0.62rem] font-medium tracking-[0.16em] uppercase ${solid ? "text-muted" : "text-ivory/60"}`}>{t.office}</span>
            <span className="block text-[0.92rem] tracking-[0.04em]">{PHONE}</span>
          </a>
          <span className={`hidden h-8 w-px sm:block ${solid ? "bg-rule" : "bg-ivory/15"}`} aria-hidden="true" />
          <LangSwitch lang={lang} />
        </div>
      </div>
    </header>
  );
}
