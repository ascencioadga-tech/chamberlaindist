"use client";

// Opens the floating "Request product" box from inside the page.
export default function RequestButton({ label, lead }: { label: string; lead: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("chamberlain:request"))}
        className="group inline-flex items-center gap-3 rounded-full bg-forest py-3 pr-5 pl-6 text-[0.9rem] font-medium text-ivory transition hover:bg-night"
      >
        {label}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <p className="max-w-[22rem] text-[0.84rem] leading-snug text-muted">{lead}</p>
    </div>
  );
}
