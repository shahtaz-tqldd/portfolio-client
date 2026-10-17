"use client";

import { hashCode, mulberry32 } from "@/lib/utils";

/**
 * Deterministic placeholder "screenshot": a themed mini node-graph in a browser frame.
 * Replace by giving projects real media — this keeps cards lively without fake images.
 */
export function ProjectPreview({ seed, accent, label }: { seed: string; accent: string; label: string }) {
  const rand = mulberry32(hashCode(seed));
  const w = 560;
  const h = 340;

  const nodes = Array.from({ length: 12 }, () => ({
    x: 40 + rand() * (w - 80),
    y: 30 + rand() * (h - 60),
    r: 2 + rand() * 2.5,
    hub: rand() > 0.75,
  }));

  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < 150) edges.push([i, j]);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-bg2 shadow-[var(--shadow-card)]">
      <svg viewBox={`0 0 ${w} ${h}`} className="block w-full" role="img" aria-label={`${label} system preview`}>
        <defs>
          <radialGradient id={`pg-${seed}`} cx="30%" cy="20%" r="90%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.14" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width={w} height={h} fill={`url(#pg-${seed})`} />
        {edges.map(([i, j], k) => (
          <line
            key={k}
            x1={nodes[i].x}
            y1={nodes[i].y}
            x2={nodes[j].x}
            y2={nodes[j].y}
            stroke="var(--line-strong)"
            strokeWidth="0.8"
            strokeDasharray="3 5"
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.hub ? n.r + 1.4 : n.r}
            fill={n.hub ? accent : "var(--muted)"}
            opacity={n.hub ? 0.95 : 0.55}
          />
        ))}
        <text x={24} y={h - 20} className="dg-node-sub" fontSize={11}>
          {label} — illustrative topology
        </text>
      </svg>
    </div>
  );
}
