"use client";

import { useReducedMotion } from "framer-motion";

/**
 * The hero's system motif: an agent hub wired to its satellites
 * (retrieval, tools, memory, api) with data pulsing along the edges.
 * Static under reduced motion.
 */

const EDGES = [
  { id: "hg-e1", d: "M215 174 Q178 112 108 94", dur: 4.2, delay: 0 },
  { id: "hg-e2", d: "M286 175 Q326 118 392 101", dur: 5.1, delay: 1.2 },
  { id: "hg-e3", d: "M213 225 Q166 289 92 307", dur: 6, delay: 0.6 },
  { id: "hg-e4", d: "M284 227 Q322 290 386 308", dur: 4.6, delay: 1.8 },
];

const SATELLITES = [
  { x: 95, y: 84, label: "retrieval", ly: 62 },
  { x: 405, y: 92, label: "tools", ly: 66 },
  { x: 78, y: 316, label: "memory", ly: 346 },
  { x: 398, y: 318, label: "api", ly: 348 },
];

const CSS = `
.hg-flow {
  opacity: 0.5;
  animation: dash-flow linear infinite;
}
.hg-ring {
  transform-origin: 250px 200px;
  animation: hg-spin 48s linear infinite;
}
.hg-hub {
  animation: hg-breathe 5s ease-in-out infinite;
}
@keyframes hg-spin {
  to { transform: rotate(360deg); }
}
@keyframes hg-breathe {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.9; }
}
@media (prefers-reduced-motion: reduce) {
  .hg-flow, .hg-ring, .hg-hub { animation: none; }
}
`;

export function AgentGraph({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 480 400"
      fill="none"
      aria-hidden
      className={className}
      role="presentation"
    >
      <style>{CSS}</style>

      {/* edges: base wire + flowing data */}
      {EDGES.map((e) => (
        <g key={e.id}>
          <path id={e.id} d={e.d} stroke="var(--line-strong)" strokeWidth={1} />
          <path
            d={e.d}
            stroke="var(--accent)"
            strokeWidth={1}
            strokeDasharray="2 10"
            className="hg-flow"
            style={{ animationDuration: `${e.dur}s` }}
          />
          {!reduced && (
            <circle r={2.2} fill="var(--accent-2)" fillOpacity={0.9}>
              <animateMotion
                dur={`${e.dur + 1.5}s`}
                begin={`${e.delay}s`}
                repeatCount="indefinite"
              >
                <mpath href={`#${e.id}`} />
              </animateMotion>
            </circle>
          )}
        </g>
      ))}

      {/* agent hub */}
      <g>
        <circle cx={250} cy={200} r={34} fill="var(--code-bg)" stroke="var(--accent)" strokeOpacity={0.4} className="hg-hub" />
        <circle
          cx={250}
          cy={200}
          r={47}
          stroke="var(--line-strong)"
          strokeWidth={1}
          strokeDasharray="3 9"
          className="hg-ring"
        />
        <circle cx={250} cy={200} r={9} fill="var(--accent)" opacity={0.15} />
        <circle cx={250} cy={200} r={4.5} fill="var(--accent-2)" />
        <text
          x={250}
          y={268}
          textAnchor="middle"
          fill="var(--accent)"
          fontSize={10}
          letterSpacing="0.22em"
          style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
        >
          agent
        </text>
      </g>

      {/* satellites */}
      {SATELLITES.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r={7} fill="var(--code-bg)" stroke="var(--line-strong)" />
          <circle cx={s.x} cy={s.y} r={1.8} fill="var(--muted)" />
          <text
            x={s.x}
            y={s.ly}
            textAnchor="middle"
            fill="var(--muted)"
            fontSize={10}
            letterSpacing="0.18em"
            style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
          >
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
