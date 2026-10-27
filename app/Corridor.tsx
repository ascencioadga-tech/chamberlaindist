import { copy, markets, regions, type Lang } from "./content";

// A schematic of the corridor, not a map: the growing regions of Mexico on the
// left run into Nogales, and the loads built there fan out to the markets on the right.
const W = 1000;
const H = 440;
const HUB = { x: 470, y: H / 2 };

export default function Corridor({ lang }: { lang: Lang }) {
  const t = copy[lang].corridor;
  const left = regions.map((name, i) => ({ name, x: 120, y: H - 70 - i * ((H - 140) / (regions.length - 1)) }));
  const right = markets.map((m, i) => ({ name: m[lang], x: 860, y: 34 + i * ((H - 68) / (markets.length - 1)) }));
  const inPath = (p: { x: number; y: number }) => `M${p.x} ${p.y} C ${p.x + 190} ${p.y}, ${HUB.x - 190} ${HUB.y}, ${HUB.x} ${HUB.y}`;
  const outPath = (p: { x: number; y: number }) => `M${HUB.x} ${HUB.y} C ${HUB.x + 200} ${HUB.y}, ${p.x - 200} ${p.y}, ${p.x} ${p.y}`;

  return (
    <div className="corridor overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full min-w-[640px]" role="img" aria-label={t.aria(regions.join(", "), right.map((p) => p.name).join(", "))}>
        {/* the border, a dashed vertical just south of the hub */}
        <line x1={HUB.x - 46} y1="10" x2={HUB.x - 46} y2={H - 10} stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 6" />
        <text x={HUB.x - 54} y={H - 14} textAnchor="end" className="fill-current font-mono text-[10px] uppercase tracking-[0.18em]" opacity="0.5">
          {t.mx}
        </text>
        <text x={HUB.x - 38} y={H - 14} className="fill-current font-mono text-[10px] uppercase tracking-[0.18em]" opacity="0.5">
          {t.us}
        </text>

        {left.map((p, i) => (
          <g key={p.name}>
            <path d={inPath(p)} pathLength={1} className="draw" fill="none" stroke="#16382a" strokeOpacity="0.9" strokeWidth="1.7" style={{ "--d": `${i * 120}ms` } as React.CSSProperties} />
            {/* hidden until its run starts, so it never waits in the corner */}
            <circle r="3.5" fill="#c99a2e" opacity="0">
              <set attributeName="opacity" to="1" begin={`${1.6 + i * 0.5}s`} />
              <animateMotion dur={`${5 + i * 0.7}s`} begin={`${1.6 + i * 0.5}s`} repeatCount="indefinite" path={inPath(p)} />
            </circle>
            <g className="node" style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
              <circle cx={p.x} cy={p.y} r="4.5" fill="#16382a" />
              <text x={p.x - 14} y={p.y + 7} textAnchor="end" className="fill-current font-display text-[22px]">
                {p.name}
              </text>
            </g>
          </g>
        ))}

        {right.map((p, i) => (
          <g key={p.name}>
            <path d={outPath(p)} pathLength={1} className="draw" fill="none" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" style={{ "--d": `${700 + i * 70}ms` } as React.CSSProperties} />
            <circle r="2.5" fill="var(--color-red)" opacity="0">
              <set attributeName="opacity" to="1" begin={`${2.4 + i * 0.35}s`} />
              <animateMotion dur={`${4.5 + (i % 4) * 0.8}s`} begin={`${2.4 + i * 0.35}s`} repeatCount="indefinite" path={outPath(p)} />
            </circle>
            <g className="node" style={{ "--d": `${900 + i * 70}ms` } as React.CSSProperties}>
              <circle cx={p.x} cy={p.y} r="3" fill="currentColor" />
              <text x={p.x + 14} y={p.y + 5} className="fill-current font-sans text-[15px]">
                {p.name}
              </text>
            </g>
          </g>
        ))}

        {/* the hub */}
        <g className="node" style={{ "--d": "500ms" } as React.CSSProperties}>
          <circle cx={HUB.x} cy={HUB.y} r="26" fill="none" stroke="var(--color-red)" strokeOpacity="0.35" />
          <circle cx={HUB.x} cy={HUB.y} r="9" fill="var(--color-red)" />
          <text x={HUB.x} y={HUB.y - 40} textAnchor="middle" className="fill-current font-display text-[30px]">
            Nogales
          </text>
          <text x={HUB.x} y={HUB.y + 52} textAnchor="middle" className="fill-current font-mono text-[10px] uppercase tracking-[0.18em]" opacity="0.6">
            2731 N. Donna Ave.
          </text>
        </g>
      </svg>
    </div>
  );
}
