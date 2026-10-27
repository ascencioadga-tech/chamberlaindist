// The Chamberlain Distributing badge, redrawn as vector from the roadside sign and
// trade-press artwork: a lens-shaped seal, sun rising over green field rows,
// the red CHAMBERLAIN wordmark and an arched "Fresh Fruits & Vegetables".

const LENS = "M8 100 C 26 40, 110 14, 200 14 C 290 14, 374 40, 392 100 C 374 160, 290 186, 200 186 C 110 186, 26 160, 8 100 Z";
const RED = "#d0262d";
const GREEN = "#1f7a3a";
const SUN = "#f2c230";

export default function Logo({ className = "", title = "Chamberlain Distributing, Inc." }: { className?: string; title?: string }) {
  // Field rows fan out from a vanishing point just under the horizon.
  const rows = Array.from({ length: 13 }, (_, i) => {
    const x = -40 + i * 40;
    return `M200 112 L${x} 200 L${x + 22} 200 Z`;
  });
  const rays = Array.from({ length: 15 }, (_, i) => {
    const a = Math.PI + (i + 0.5) * (Math.PI / 15);
    const x1 = 200 + Math.cos(a) * 52;
    const y1 = 112 + Math.sin(a) * 52;
    const x2 = 200 + Math.cos(a) * 118;
    const y2 = 112 + Math.sin(a) * 118;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`;
  });
  return (
    <svg viewBox="0 0 400 200" role="img" aria-label={title} className={className}>
      <defs>
        <clipPath id="cd-lens">
          <path d={LENS} />
        </clipPath>
        <path id="cd-arc" d="M92 70 Q 200 22 308 70" />
      </defs>
      <path d={LENS} fill="#fff" />
      <g clipPath="url(#cd-lens)">
        <g stroke={SUN} strokeWidth="4" strokeLinecap="round" opacity="0.75">
          {rays.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <circle cx="200" cy="112" r="44" fill={SUN} />
        <rect x="0" y="112" width="400" height="90" fill="#fff" />
        <g fill={GREEN}>
          {rows.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <rect x="0" y="112" width="400" height="16" fill="#fff" />
      </g>
      <path d={LENS} fill="none" stroke={GREEN} strokeWidth="9" />
      <path d={LENS} fill="none" stroke="#111" strokeWidth="1.6" transform="translate(200 100) scale(1.025 1.05) translate(-200 -100)" />
      <text fontFamily="var(--font-badge), Arial Black, sans-serif" fontSize="13" letterSpacing="1.4" fill="#111">
        <textPath href="#cd-arc" startOffset="50%" textAnchor="middle">
          FRESH FRUITS &amp; VEGETABLES
        </textPath>
      </text>
      <text
        x="200"
        y="111"
        textAnchor="middle"
        fontFamily="var(--font-badge), Arial Black, sans-serif"
        fontSize="47"
        textLength="318"
        lengthAdjust="spacingAndGlyphs"
        fill={RED}
        stroke="#1a1a1a"
        strokeWidth="1.4"
        paintOrder="stroke"
      >
        CHAMBERLAIN
      </text>
      <text x="200" y="125" textAnchor="middle" fontFamily="var(--font-badge), Arial Black, sans-serif" fontSize="10.5" letterSpacing="7.5" fill="#111">
        DISTRIBUTING INC.
      </text>
    </svg>
  );
}
