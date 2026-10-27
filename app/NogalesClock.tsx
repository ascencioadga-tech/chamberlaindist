"use client";

import { useEffect, useState } from "react";
import type { Lang } from "./content";

// The time in Nogales right now (Arizona keeps Mountain Standard Time all year),
// beside a softly pulsing dot. Rendered only in the browser so it is never stale.
export default function NogalesClock({ lang, label }: { lang: Lang; label: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", { timeZone: "America/Phoenix", hour: "numeric", minute: "2-digit" }).format(now)
    : "—";
  const day = now ? new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", { timeZone: "America/Phoenix", weekday: "long" }).format(now) : "";

  return (
    <p className="flex items-center gap-3 text-[0.8rem] text-muted">
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span className="absolute inset-0 animate-ping rounded-full bg-sun/60 [animation-duration:2.4s]" />
        <span className="relative h-2.5 w-2.5 rounded-full bg-sun" />
      </span>
      <span>
        {label} · <span className="text-ink tabular-nums">{time}</span>
        {day && <span className="capitalize"> · {day}</span>}
      </span>
    </p>
  );
}
