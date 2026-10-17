"use client";

import { useMemo } from "react";
import type { DiagramEdge, DiagramNode, DiagramView } from "@/lib/types";
import { kindColorVar, kindIcons } from "./icons";
import { cn } from "@/lib/utils";

const DEFAULT_W = 180;
const DEFAULT_H = 64;
const TABLE_ROW_H = 23;
const TABLE_HEAD_H = 40;
const TABLE_PAD = 8;

function nodeBox(n: DiagramNode): { x: number; y: number; w: number; h: number } {
  if (n.kind === "table") {
    const w = n.w ?? 300;
    const h = n.h ?? TABLE_HEAD_H + (n.rows?.length ?? 0) * TABLE_ROW_H + TABLE_PAD;
    return { x: n.x, y: n.y, w, h };
  }
  return { x: n.x, y: n.y, w: n.w ?? DEFAULT_W, h: n.h ?? DEFAULT_H };
}

function anchor(from: DiagramNode, to: DiagramNode): { x1: number; y1: number; x2: number; y2: number } {
  const a = nodeBox(from);
  const b = nodeBox(to);
  const acx = a.x + a.w / 2;
  const acy = a.y + a.h / 2;
  const bcx = b.x + b.w / 2;
  const bcy = b.y + b.h / 2;
  const dx = bcx - acx;
  const dy = bcy - acy;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  // distance from center to rect border along direction
  const aExt =
    Math.abs(ux) > 0.0001 && Math.abs(uy) > 0.0001
      ? Math.min(Math.abs(a.w / 2 / ux), Math.abs(a.h / 2 / uy))
      : Math.abs(ux) > 0.0001
        ? Math.abs(a.w / 2 / ux)
        : Math.abs(a.h / 2 / uy);
  const bExt =
    Math.abs(ux) > 0.0001 && Math.abs(uy) > 0.0001
      ? Math.min(Math.abs(b.w / 2 / ux), Math.abs(b.h / 2 / uy))
      : Math.abs(ux) > 0.0001
        ? Math.abs(b.w / 2 / ux)
        : Math.abs(b.h / 2 / uy);
  const gap = 8;
  return {
    x1: acx + ux * (aExt + gap),
    y1: acy + uy * (aExt + gap),
    x2: bcx - ux * (bExt + gap + 7),
    y2: bcy - uy * (bExt + gap + 7),
  };
}

function edgePath(e: DiagramEdge, nodes: Map<string, DiagramNode>): { d: string; mid: { x: number; y: number } } {
  const from = nodes.get(e.from);
  const to = nodes.get(e.to);
  if (!from || !to) return { d: "", mid: { x: 0, y: 0 } };
  const { x1, y1, x2, y2 } = anchor(from, to);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const horizontal = Math.abs(dx) >= Math.abs(dy);
  const c = 0.42;
  const c1x = horizontal ? x1 + dx * c : x1;
  const c1y = horizontal ? y1 : y1 + dy * c;
  const c2x = horizontal ? x2 - dx * c : x2;
  const c2y = horizontal ? y2 : y2 - dy * c;
  const mid = {
    x: (x1 + 3 * c1x + 3 * c2x + x2) / 8,
    y: (y1 + 3 * c1y + 3 * c2y + y2) / 8,
  };
  return { d: `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`, mid };
}

interface GraphDiagramProps {
  view: DiagramView;
  activeNode: string | null;
  onNodeHover: (id: string | null) => void;
  onNodeSelect: (id: string | null) => void;
  className?: string;
}

/** SVG diagram renderer — rounded nodes color-coded by kind, bezier edges with animated flow. */
export function GraphDiagram({ view, activeNode, onNodeHover, onNodeSelect, className }: GraphDiagramProps) {
  const nodes = useMemo(() => new Map(view.nodes.map((n) => [n.id, n])), [view.nodes]);

  const neighbors = useMemo(() => {
    if (!activeNode) return null;
    const set = new Set<string>([activeNode]);
    for (const e of view.edges) {
      if (e.from === activeNode) set.add(e.to);
      if (e.to === activeNode) set.add(e.from);
    }
    return set;
  }, [activeNode, view.edges]);

  return (
    <svg
      viewBox={`0 0 ${view.width} ${view.height}`}
      className={cn("block h-auto w-full select-none", className)}
      role="img"
      aria-label={view.note ?? "System diagram"}
    >
      <defs>
        <marker id="dg-a-sync" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--line-strong)" />
        </marker>
        <marker id="dg-a-async" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--k-queue)" />
        </marker>
        <marker id="dg-a-data" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--k-db)" />
        </marker>
        <marker id="dg-a-hot" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* groups */}
      {view.groups?.map((g) => (
        <g key={g.id}>
          <rect x={g.x} y={g.y} width={g.w} height={g.h} rx={16} className="dg-group-box" />
          <text x={g.x + 16} y={g.y + 22} className="dg-group-label">
            {g.label}
          </text>
        </g>
      ))}

      {/* edges */}
      {view.edges.map((e, i) => {
        const { d, mid } = edgePath(e, nodes);
        if (!d) return null;
        const touches = activeNode === null || e.from === activeNode || e.to === activeNode;
        const hot = activeNode !== null && touches;
        const animate = e.animate ?? (e.kind !== "sync");
        return (
          <g key={`${e.from}-${e.to}-${i}`} style={{ opacity: touches ? 1 : 0.13 }}>
            <path
              d={d}
              className={cn("dg-edge", e.kind, hot && "hot", animate && !e.dashed && "flow")}
              strokeDasharray={e.dashed ? "4 6" : undefined}
              markerEnd={`url(#dg-a-${hot ? "hot" : e.kind})`}
              markerStart={e.both ? `url(#dg-a-${hot ? "hot" : e.kind})` : undefined}
            />
            {e.label ? (
              <text x={mid.x} y={mid.y - 5} textAnchor="middle" className="dg-edge-label">
                {e.label}
              </text>
            ) : null}
          </g>
        );
      })}

      {/* nodes */}
      {view.nodes.map((n) => {
        const box = nodeBox(n);
        const dimmed = neighbors !== null && !neighbors.has(n.id);
        const hot = activeNode === n.id;
        const Icon = kindIcons[n.kind];
        const color = kindColorVar[n.kind];

        if (n.kind === "table" && n.rows) {
          return (
            <g
              key={n.id}
              className={cn("dg-node", hot && "hot")}
              style={{ opacity: dimmed ? 0.3 : 1 }}
              tabIndex={0}
              role="button"
              aria-label={`${n.label} table: ${n.desc}`}
              onMouseEnter={() => onNodeHover(n.id)}
              onMouseLeave={() => onNodeHover(null)}
              onFocus={() => onNodeSelect(n.id)}
              onBlur={() => onNodeSelect(null)}
              onClick={() => onNodeSelect(hot ? null : n.id)}
            >
              <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={12} className="dg-node-box" stroke={color} />
              <rect x={box.x} y={box.y} width={box.w} height={TABLE_HEAD_H} rx={12} fill="var(--surface-2)" />
              <rect x={box.x} y={box.y + TABLE_HEAD_H - 12} width={box.w} height={12} fill="var(--surface-2)" />
              <line x1={box.x} y1={box.y + TABLE_HEAD_H} x2={box.x + box.w} y2={box.y + TABLE_HEAD_H} stroke={color} strokeOpacity={0.4} />
              <text x={box.x + 14} y={box.y + 25} className="dg-table-head">
                {n.label}
              </text>
              {n.rows.map((r, ri) => (
                <text key={r.name} x={box.x + 14} y={box.y + TABLE_HEAD_H + 16 + ri * TABLE_ROW_H} className="dg-table-row">
                  {r.key ? (
                    <tspan fill={r.key === "pk" ? "var(--accent)" : r.key === "vec" ? "var(--k-vector)" : "var(--warm)"} fontWeight={600}>
                      [{r.key.toUpperCase()}]
                    </tspan>
                  ) : null}
                  {r.key ? " " : ""}
                  <tspan fill="var(--fg)" opacity={0.85}>
                    {r.name}
                  </tspan>
                  <tspan dx={8} opacity={0.6}>
                    {r.type}
                  </tspan>
                </text>
              ))}
            </g>
          );
        }

        return (
          <g
            key={n.id}
            className={cn("dg-node", hot && "hot")}
            style={{ opacity: dimmed ? 0.3 : 1 }}
            tabIndex={0}
            role="button"
            aria-label={`${n.label}: ${n.desc}`}
            onMouseEnter={() => onNodeHover(n.id)}
            onMouseLeave={() => onNodeHover(null)}
            onFocus={() => onNodeSelect(n.id)}
            onBlur={() => onNodeSelect(null)}
            onClick={() => onNodeSelect(hot ? null : n.id)}
          >
            <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={13} className="dg-node-box" stroke={color} strokeWidth={1.4} />
            {/* icon */}
            <svg x={box.x + 12} y={box.y + box.h / 2 - 10} width={20} height={20} viewBox="0 0 24 24" aria-hidden>
              <Icon width={20} height={20} color={color} strokeWidth={1.8} />
            </svg>
            {/* labels */}
            <text x={box.x + 42} y={n.sublabel ? box.y + box.h / 2 - 4 : box.y + box.h / 2 + 4} className="dg-node-label">
              {n.label}
            </text>
            {n.sublabel ? (
              <text x={box.x + 42} y={box.y + box.h / 2 + 14} className="dg-node-sub">
                {n.sublabel}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
