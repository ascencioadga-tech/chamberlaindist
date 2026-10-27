"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { EMAIL, FORM_NAME, PHONE, TEL, commodities, inquiry, type Lang } from "./content";

// The floating "Request product" box, after the one on the Suarez page: a button waits in
// the corner and opens a three-step request (products, the load, contact details) that goes
// to the sales desk through Netlify Forms. On this computer nothing is sent; the last step says so.

type Draft = {
  products: string[];
  volume: number | null;
  destination: string;
  when: number | null;
  notes: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  language: Lang;
};

const blank = (lang: Lang): Draft => ({ products: [], volume: null, destination: "", when: null, notes: "", name: "", company: "", email: "", phone: "", language: lang });

const isLocal = () => ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname) || window.location.hostname.endsWith(".localhost");
const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-full border px-3.5 py-2 text-[0.84rem] transition ${
        on ? "border-forest bg-forest text-ivory" : "border-rule bg-paper text-ink/75 hover:border-forest/40 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 text-[0.68rem] font-medium tracking-[0.16em] text-muted uppercase">
        {label}
        {hint && <span className="text-[0.7rem] tracking-normal text-muted/80 normal-case">{hint}</span>}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

const input =
  "w-full rounded-[4px] border border-rule bg-paper px-3.5 py-2.5 text-[0.95rem] text-ink outline-none transition placeholder:text-muted/60 focus:border-forest focus:ring-2 focus:ring-forest/10";

export default function RequestProduct({ lang }: { lang: Lang }) {
  const t = inquiry[lang];
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [step, setStep] = useState(1);
  const [d, setD] = useState<Draft>(() => blank(lang));
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [wasLocal, setWasLocal] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const body = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((x) => ({ ...x, [k]: v }));
  const toggle = (p: string) => set("products", d.products.includes(p) ? d.products.filter((x) => x !== p) : [...d.products, p]);

  // The button arrives once the hero has settled.
  useEffect(() => {
    const id = window.setTimeout(() => setShown(true), 2600);
    return () => clearTimeout(id);
  }, []);

  // Other parts of the page can open it: dispatch "chamberlain:request".
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("chamberlain:request", onOpen);
    return () => window.removeEventListener("chamberlain:request", onOpen);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    launcher.current?.focus();
  }, []);

  // Escape closes; focus moves into the panel; phones can't scroll the page behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const phone = window.matchMedia("(max-width: 639px)").matches;
    if (phone) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      if (phone) document.body.style.overflow = "";
    };
  }, [open, close]);

  useEffect(() => {
    body.current?.scrollTo({ top: 0 });
  }, [step, status]);

  const contactOk = d.name.trim().length > 1 && emailOk(d.email);

  const submit = async () => {
    setTried(true);
    if (!contactOk) return;
    setStatus("sending");
    const fields: Record<string, string> = {
      "form-name": FORM_NAME,
      products: d.products.join(", "),
      volume: d.volume === null ? "" : inquiry.en.volumes[d.volume],
      destination: d.destination.trim(),
      when: d.when === null ? "" : inquiry.en.whens[d.when],
      notes: d.notes.trim(),
      name: d.name.trim(),
      company: d.company.trim(),
      email: d.email.trim(),
      phone: d.phone.trim(),
      language: d.language === "es" ? "Spanish" : "English",
      page: window.location.pathname,
    };
    try {
      if (isLocal()) {
        await new Promise((r) => setTimeout(r, 700));
        setWasLocal(true);
      } else {
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(fields).toString(),
        });
        if (!res.ok) throw new Error(String(res.status));
      }
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  };

  const restart = () => {
    setD(blank(lang));
    setStep(1);
    setTried(false);
    setStatus("idle");
  };

  const first = d.name.trim().split(/\s+/)[0] ?? "";

  return (
    <>
      {/* the launcher */}
      <button
        ref={launcher}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`group fixed right-4 bottom-4 z-40 flex items-center gap-2.5 rounded-full border border-sun/30 bg-forest py-2 pr-5 pl-2 text-sm font-medium text-ivory shadow-[0_18px_40px_-14px_rgba(12,19,16,0.7)] transition-[opacity,transform,background] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:bg-night sm:right-6 sm:bottom-6 ${
          shown && !open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-ivory/12">
          <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-sun/25 [animation-duration:2.8s]" />
          {/* a bunch of grapes: stem, leaf, and the cluster narrowing to a point */}
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2.5v4" />
            <path d="M12 4.5c1.4-1.8 3.9-2.3 5.6-1.4-.9 1.9-3.2 2.7-5.6 1.4z" />
            <circle cx="8.3" cy="9.3" r="2.1" />
            <circle cx="12" cy="9.3" r="2.1" />
            <circle cx="15.7" cy="9.3" r="2.1" />
            <circle cx="10.15" cy="12.9" r="2.1" />
            <circle cx="13.85" cy="12.9" r="2.1" />
            <circle cx="12" cy="16.5" r="2.1" />
            <circle cx="12" cy="20.1" r="1.7" />
          </svg>
        </span>
        <span className="sm:hidden">{t.openShort}</span>
        <span className="hidden sm:inline">{t.open}</span>
      </button>

      {/* phones: the page dims behind the sheet */}
      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-40 bg-night/45 backdrop-blur-[2px] transition-opacity duration-300 sm:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      {/* the panel: a bottom sheet on phones, a card in the corner elsewhere */}
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
        aria-hidden={!open}
        inert={!open}
        className={`fixed z-50 flex flex-col overflow-hidden bg-ivory shadow-[0_40px_90px_-30px_rgba(12,19,16,0.6)] transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.2,0.7,0.2,1)] max-sm:inset-x-0 max-sm:bottom-0 max-sm:max-h-[92svh] max-sm:rounded-t-[14px] sm:right-6 sm:bottom-6 sm:max-h-[min(740px,calc(100svh-48px))] sm:w-[410px] sm:rounded-[6px] sm:border sm:border-rule ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        {/* header */}
        <div className="relative shrink-0 overflow-hidden bg-forest px-6 pt-5 pb-5 text-ivory">
          <Logo className="pointer-events-none absolute -top-2 -right-10 w-48 opacity-[0.08]" />
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-ivory/25 sm:hidden" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-[1.6rem] leading-tight font-medium">{status === "done" ? t.doneTitle : t.title}</p>
              {status !== "done" && <p className="mt-1.5 max-w-[30ch] text-[0.84rem] leading-snug text-ivory/70">{t.intro}</p>}
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={t.close}
              className="-mt-1 -mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ivory/80 transition hover:bg-ivory/10 hover:text-ivory"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {status !== "done" && (
            <div className="relative mt-4 flex items-center justify-between gap-3 border-t border-ivory/15 pt-3.5">
              <span className="text-[0.78rem] text-ivory/60">{t.quick}</span>
              <a href={TEL} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ivory/10 py-1.5 pr-3.5 pl-2.5 text-[0.82rem] whitespace-nowrap transition hover:bg-ivory/20">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
                </svg>
                {PHONE}
              </a>
            </div>
          )}
        </div>

        {/* progress */}
        {status !== "done" && (
          <div className="shrink-0 px-6 pt-4">
            <div className="flex items-center justify-between text-[0.66rem] tracking-[0.18em] text-muted uppercase">
              <span>{t.step(step)}</span>
              <span className="text-forest">{t.steps[step - 1]}</span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {[1, 2, 3].map((n) => (
                <span key={n} className={`h-[3px] rounded-full transition-colors duration-500 ${n <= step ? "bg-sun" : "bg-rule"}`} />
              ))}
            </div>
          </div>
        )}

        {/* body */}
        <div ref={body} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-5 pb-6">
          {status === "done" ? (
            <div>
              <p className="text-[0.95rem] leading-relaxed text-ink/75">{t.doneBody(first)}</p>
              <div className="mt-5 grid gap-2">
                <a href={TEL} className="flex items-baseline justify-between gap-4 rounded-[4px] bg-forest px-4 py-3 text-ivory transition hover:bg-night">
                  <span className="text-[0.66rem] tracking-[0.16em] text-ivory/60 uppercase">{t.call}</span>
                  <span className="text-[0.9rem] tabular-nums">{PHONE}</span>
                </a>
                <a href={`mailto:${EMAIL}`} className="flex min-w-0 items-baseline justify-between gap-4 rounded-[4px] border border-rule px-4 py-3 transition hover:border-forest">
                  <span className="text-[0.66rem] tracking-[0.16em] text-muted uppercase">{t.email}</span>
                  <span className="truncate text-[0.88rem] text-forest">{EMAIL}</span>
                </a>
              </div>
              {wasLocal && <p className="mt-4 rounded-[4px] bg-paper px-3 py-2 text-[0.78rem] text-ink/60">{t.localNote}</p>}
              <button type="button" onClick={restart} className="mt-5 text-[0.88rem] text-forest underline-offset-4 hover:underline">
                {t.another}
              </button>
            </div>
          ) : step === 1 ? (
            <div>
              <p className="text-[0.68rem] font-medium tracking-[0.16em] text-muted uppercase">{t.pick}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {commodities.map((c, i) => (
                  <span key={c.en} {...(i === 0 ? { "data-autofocus": true } : {})}>
                    <Chip on={d.products.includes(c.en)} onClick={() => toggle(c.en)}>
                      {c[lang]}
                    </Chip>
                  </span>
                ))}
                <Chip on={d.products.includes("Other")} onClick={() => toggle("Other")}>
                  {t.other}
                </Chip>
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-6">
              <Field label={t.volume}>
                <div className="flex flex-wrap gap-2">
                  {t.volumes.map((v, i) => (
                    <Chip key={v} on={d.volume === i} onClick={() => set("volume", d.volume === i ? null : i)}>
                      {v}
                    </Chip>
                  ))}
                </div>
              </Field>
              <Field label={t.destination} hint={t.destinationHint}>
                <input data-autofocus value={d.destination} onChange={(e) => set("destination", e.target.value)} className={input} />
              </Field>
              <Field label={t.when}>
                <div className="flex flex-wrap gap-2">
                  {t.whens.map((w, i) => (
                    <Chip key={w} on={d.when === i} onClick={() => set("when", d.when === i ? null : i)}>
                      {w}
                    </Chip>
                  ))}
                </div>
              </Field>
              <Field label={t.notes} hint={t.optional}>
                <textarea rows={3} value={d.notes} onChange={(e) => set("notes", e.target.value)} placeholder={t.notesHint} className={`${input} resize-none`} />
              </Field>
            </div>
          ) : (
            <div className="space-y-5">
              <Field label={`${t.name} *`}>
                <input data-autofocus autoComplete="name" value={d.name} onChange={(e) => set("name", e.target.value)} aria-invalid={tried && d.name.trim().length < 2} className={`${input} ${tried && d.name.trim().length < 2 ? "border-red" : ""}`} />
              </Field>
              <Field label={t.company} hint={t.optional}>
                <input autoComplete="organization" value={d.company} onChange={(e) => set("company", e.target.value)} className={input} />
              </Field>
              <Field label={`${t.email} *`}>
                <input type="email" inputMode="email" autoComplete="email" value={d.email} onChange={(e) => set("email", e.target.value)} aria-invalid={tried && !emailOk(d.email)} className={`${input} ${tried && !emailOk(d.email) ? "border-red" : ""}`} />
              </Field>
              <Field label={t.phone} hint={t.optional}>
                <input type="tel" inputMode="tel" autoComplete="tel" value={d.phone} onChange={(e) => set("phone", e.target.value)} className={input} />
              </Field>
              <Field label={t.replyIn}>
                <div className="flex gap-2">
                  <Chip on={d.language === "en"} onClick={() => set("language", "en")}>
                    {t.english}
                  </Chip>
                  <Chip on={d.language === "es"} onClick={() => set("language", "es")}>
                    {t.spanish}
                  </Chip>
                </div>
              </Field>
              {tried && !contactOk && <p className="text-[0.82rem] text-red">{t.required}</p>}
              {status === "failed" && <p className="text-[0.82rem] text-red">{t.failed}</p>}
            </div>
          )}
        </div>

        {/* footer */}
        {status !== "done" && (
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-rule bg-paper px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="px-1 py-2 text-[0.9rem] text-ink/65 transition hover:text-ink">
                {t.back}
              </button>
            ) : (
              <span />
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && d.products.length === 0}
                className="group inline-flex items-center gap-2.5 rounded-full bg-forest py-3 pr-5 pl-6 text-sm font-medium text-ivory transition hover:bg-night disabled:opacity-40"
              >
                {t.next}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            ) : (
              <button type="button" onClick={submit} disabled={status === "sending"} className="inline-flex items-center gap-2.5 rounded-full bg-forest py-3 pr-6 pl-6 text-sm font-medium text-ivory transition hover:bg-night disabled:opacity-60">
                {status === "sending" ? t.sending : t.send}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
