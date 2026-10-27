import { copy, markets, regions, type Lang } from "./content";

// A schematic of the corridor, not a map. Wide screens read it left to right: the growing
// regions of Mexico run into Nogales and the loads fan out to the markets. Phones read it
// top to bottom along one spine: the regions branch in, the border, Nogales, then the
// markets branch out. Both are drawn from the same pieces below.

type Pt = { name: string; x: number; y: number };
type Text = { x: number; y: number; anchor?: "start" | "middle" | "end" };
type Layout = {
  w: number;
  h: number;
  hub: { x: number; y: number };
  left: Pt[];
  right: Pt[];
  inPath: (p: Pt) => string;
  outPath: (p: Pt) => string;
  border: [number, number, number, number];
  mx: Text;
  us: Text;
  regionLabel: (p: Pt) => Text;
  regionSize: number;
  marketLabel: (p: Pt) => Text;
  marketSize: number;
  hubLabel: Text;
  hubSize: number;
  address: Text;
};

const GREEN = "#16382a";
const GOLD = "#c99a2e";

function Diagram({ L, label, mx, us, className }: { L: Layout; label: string; mx: string; us: string; className: string }) {
  const { hub } = L;
  return (
    <svg viewBox={`0 0 ${L.w} ${L.h}`} className={className} role="img" aria-label={label}>
      {/* the border */}
      <line x1={L.border[0]} y1={L.border[1]} x2={L.border[2]} y2={L.border[3]} stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 6" />
      <text x={L.mx.x} y={L.mx.y} textAnchor={L.mx.anchor} className="fill-current font-mono text-[10px] uppercase tracking-[0.18em]" opacity="0.5">
        {mx}
      </text>
      <text x={L.us.x} y={L.us.y} textAnchor={L.us.anchor} className="fill-current font-mono text-[10px] uppercase tracking-[0.18em]" opacity="0.5">
        {us}
      </text>

      {L.left.map((p, i) => {
        const t = L.regionLabel(p);
        return (
          <g key={p.name}>
            <path d={L.inPath(p)} pathLength={1} className="draw" fill="none" stroke={GREEN} strokeOpacity="0.9" strokeWidth="1.7" style={{ "--d": `${i * 120}ms` } as React.CSSProperties} />
            {/* hidden until its run starts, so it never waits in the corner */}
            <circle r="3.5" fill={GOLD} opacity="0">
              <set attributeName="opacity" to="1" begin={`${1.6 + i * 0.5}s`} />
              <animateMotion dur={`${5 + i * 0.7}s`} begin={`${1.6 + i * 0.5}s`} repeatCount="indefinite" path={L.inPath(p)} />
            </circle>
            <g className="node" style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
              <circle cx={p.x} cy={p.y} r="4.5" fill={GREEN} />
              <text x={t.x} y={t.y} textAnchor={t.anchor} className="fill-current font-display" style={{ fontSize: L.regionSize }}>
                {p.name}
              </text>
            </g>
          </g>
        );
      })}

      {L.right.map((p, i) => {
        const t = L.marketLabel(p);
        return (
          <g key={p.name}>
            <path d={L.outPath(p)} pathLength={1} className="draw" fill="none" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" style={{ "--d": `${700 + i * 70}ms` } as React.CSSProperties} />
            <circle r="2.5" fill="var(--color-red)" opacity="0">
              <set attributeName="opacity" to="1" begin={`${2.4 + i * 0.35}s`} />
              <animateMotion dur={`${4.5 + (i % 4) * 0.8}s`} begin={`${2.4 + i * 0.35}s`} repeatCount="indefinite" path={L.outPath(p)} />
            </circle>
            <g className="node" style={{ "--d": `${900 + i * 70}ms` } as React.CSSProperties}>
              <circle cx={p.x} cy={p.y} r="3" fill="currentColor" />
              <text x={t.x} y={t.y} textAnchor={t.anchor} className="fill-current font-sans" style={{ fontSize: L.marketSize }}>
                {p.name}
              </text>
            </g>
          </g>
        );
      })}

      {/* the hub */}
      <g className="node" style={{ "--d": "500ms" } as React.CSSProperties}>
        <circle cx={hub.x} cy={hub.y} r="26" fill="none" stroke="var(--color-red)" strokeOpacity="0.35" />
        <circle cx={hub.x} cy={hub.y} r="9" fill="var(--color-red)" />
        <text x={L.hubLabel.x} y={L.hubLabel.y} textAnchor={L.hubLabel.anchor} className="fill-current font-display" style={{ fontSize: L.hubSize }}>
          Nogales
        </text>
        <text x={L.address.x} y={L.address.y} textAnchor={L.address.anchor} className="fill-current font-mono text-[10px] uppercase tracking-[0.18em]" opacity="0.6">
          2731 N. Donna Ave.
        </text>
      </g>
    </svg>
  );
}

// Wide: regions on the left, markets on the right.
function wide(names: string[]): Layout {
  const w = 1000;
  const h = 440;
  const hub = { x: 470, y: h / 2 };
  return {
    w,
    h,
    hub,
    left: regions.map((name, i) => ({ name, x: 120, y: h - 70 - i * ((h - 140) / (regions.length - 1)) })),
    right: names.map((name, i) => ({ name, x: 860, y: 34 + i * ((h - 68) / (names.length - 1)) })),
    inPath: (p) => `M${p.x} ${p.y} C ${p.x + 190} ${p.y}, ${hub.x - 190} ${hub.y}, ${hub.x} ${hub.y}`,
    outPath: (p) => `M${hub.x} ${hub.y} C ${hub.x + 200} ${hub.y}, ${p.x - 200} ${p.y}, ${p.x} ${p.y}`,
    border: [hub.x - 46, 10, hub.x - 46, h - 10],
    mx: { x: hub.x - 54, y: h - 14, anchor: "end" },
    us: { x: hub.x - 38, y: h - 14 },
    regionLabel: (p) => ({ x: p.x - 14, y: p.y + 7, anchor: "end" }),
    regionSize: 22,
    marketLabel: (p) => ({ x: p.x + 14, y: p.y + 5 }),
    marketSize: 15,
    hubLabel: { x: hub.x, y: hub.y - 40, anchor: "middle" },
    hubSize: 30,
    address: { x: hub.x, y: hub.y + 52, anchor: "middle" },
  };
}

// Tall: one spine down the left; regions branch in above the border, markets branch out below.
function tall(names: string[]): Layout {
  const SPINE = 46;
  const DOT = 98;
  const w = 360;
  const hub = { x: SPINE, y: 284 };
  const firstMarket = 352;
  const step = 40;
  return {
    w,
    h: firstMarket + (names.length - 1) * step + 24,
    hub,
    // Oaxaca at the top, Sonora nearest the border: the produce comes north
    left: regions.map((name, i) => ({ name, x: DOT, y: 34 + i * 44 })),
    right: names.map((name, i) => ({ name, x: DOT, y: firstMarket + i * step })),
    inPath: (p) => `M${p.x} ${p.y} C ${SPINE + 18} ${p.y}, ${SPINE} ${p.y + 12}, ${SPINE} ${p.y + 40} L ${SPINE} ${hub.y}`,
    outPath: (p) => `M${SPINE} ${hub.y} L ${SPINE} ${p.y - 40} C ${SPINE} ${p.y - 12}, ${SPINE + 18} ${p.y}, ${p.x} ${p.y}`,
    border: [0, 236, w, 236],
    mx: { x: w - 4, y: 228, anchor: "end" },
    us: { x: w - 4, y: 252, anchor: "end" },
    regionLabel: (p) => ({ x: p.x + 14, y: p.y + 6 }),
    regionSize: 20,
    marketLabel: (p) => ({ x: p.x + 14, y: p.y + 5 }),
    marketSize: 15,
    hubLabel: { x: SPINE + 38, y: hub.y + 8 },
    hubSize: 28,
    address: { x: SPINE + 40, y: hub.y + 28 },
  };
}

export default function Corridor({ lang }: { lang: Lang }) {
  const t = copy[lang].corridor;
  const names = markets.map((m) => m[lang]);
  const label = t.aria(regions.join(", "), names.join(", "));
  return (
    <div className="corridor">
      <Diagram L={wide(names)} label={label} mx={t.mx} us={t.us} className="hidden h-auto w-full md:block" />
      <Diagram L={tall(names)} label={label} mx={t.mx} us={t.us} className="mx-auto block h-auto w-full max-w-[420px] md:hidden" />
    </div>
  );
}
