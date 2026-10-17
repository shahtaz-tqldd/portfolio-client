"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StackTool {
  name: string;
  why: string;
  /** Names of related tools. Connections are bidirectional. */
  links?: string[];
}

export interface StackLayer {
  key: string;
  label: string;
  caption?: string;
  /** Hex color for this layer's tint, nodes and edges. */
  accent: string;
  tools: StackTool[];
}

interface StackRegistryProps {
  filename: string;
  meta?: string;
  layers: StackLayer[];
  className?: string;
}

type Point = { x: number; y: number };
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Architecture-style skills map. Layers are swimlanes, tools are nodes.
 * Hover/focus previews a node, click/tap pins it. Edges to related tools
 * are drawn on demand, unrelated nodes dim, and a side panel explains the tool.
 */
export function StackRegistry({ filename, meta, layers, className }: StackRegistryProps) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLElement | null>>({});

  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [pos, setPos] = useState<Record<string, Point>>({});
  const [size, setSize] = useState({ w: 0, h: 0 });

  const active = hovered ?? pinned;

  /* lookups + bidirectional adjacency */
  const { meta: toolMeta, adjacency } = useMemo(() => {
    const m = new Map<string, { tool: StackTool; layer: StackLayer; index: number }>();
    layers?.forEach((layer, index) => layer.tools.forEach((tool) => m.set(tool.name, { tool, layer, index })));

    const adj = new Map<string, Set<string>>();
    const add = (a: string, b: string) => {
      if (!m.has(a) || !m.has(b)) return;
      if (!adj.has(a)) adj.set(a, new Set());
      if (!adj.has(b)) adj.set(b, new Set());
      adj.get(a)!.add(b);
      adj.get(b)!.add(a);
    };
    layers?.forEach((l) => l.tools.forEach((t) => t.links?.forEach((n) => add(t.name, n))));
    return { meta: m, adjacency: adj };
  }, [layers]);

  /* measure node centers relative to the map container */
  const measure = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    const cr = c.getBoundingClientRect();
    const next: Record<string, Point> = {};
    for (const [name, el] of Object.entries(nodeRefs.current)) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      next[name] = { x: r.left - cr.left + r.width / 2, y: r.top - cr.top + r.height / 2 };
    }
    setPos(next);
    setSize({ w: cr.width, h: cr.height });
  }, []);

  useEffect(() => {
    measure();
    const c = containerRef.current;
    const ro = c ? new ResizeObserver(measure) : null;
    if (c && ro) ro.observe(c);
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 1200); // after entrance animations settle
    document.fonts?.ready.then(measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, [measure]);

  const neighbors = active ? adjacency.get(active) ?? new Set<string>() : null;
  const activeInfo = active ? toolMeta.get(active) : null;
  const accent = activeInfo?.layer.accent ?? "#5eead4";

  /* edges from the active node to its neighbors */
  const edges = useMemo(() => {
    if (!active || !neighbors || !pos[active]) return [];
    const a = pos[active];
    return [...neighbors]
      .filter((n) => pos[n])
      .map((n) => {
        const b = pos[n];
        const sameRow = Math.abs(a.y - b.y) < 8;
        const d = sameRow
          ? `M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${a.y - 38} ${b.x} ${b.y}`
          : `M ${a.x} ${a.y} C ${a.x} ${(a.y + b.y) / 2}, ${b.x} ${(a.y + b.y) / 2}, ${b.x} ${b.y}`;
        return { to: n, d, end: b };
      });
  }, [active, neighbors, pos]);

  const total = toolMeta.size;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-[var(--code-bg)] shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {/* header strip */}
      <div className="flex items-center justify-between gap-4 border-b border-[rgba(148,163,184,0.14)] px-5 py-3 font-mono text-[11px]">
        <span className="flex items-center gap-2 tracking-[0.2em] text-[#aab6c8] uppercase">
          <span className="size-1.5 rounded-full bg-[#5eead4] shadow-[0_0_10px_#5eead4]" aria-hidden />
          {filename}
        </span>
        {meta && <span className="text-[#5a6678]">{meta}</span>}
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_300px]">
        {/* ───────── system map ───────── */}
        <div
          className="relative p-4 sm:p-6"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.045) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        >
          <div ref={containerRef} className="relative flex flex-col gap-3">
            {/* edges (behind nodes) */}
            <svg
              className="pointer-events-none absolute inset-0 z-0"
              width={size.w}
              height={size.h}
              aria-hidden
            >
              {edges.map((e) => (
                <g key={`${active}->${e.to}`}>
                  <motion.path
                    d={e.d}
                    fill="none"
                    stroke={accent}
                    strokeWidth={1.25}
                    strokeOpacity={0.55}
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                  {!reduce && (
                    <motion.path
                      d={e.d}
                      fill="none"
                      stroke={accent}
                      strokeWidth={2.25}
                      strokeLinecap="round"
                      strokeDasharray="2 14"
                      animate={{ strokeDashoffset: [0, -32] }}
                      transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
                      style={{ filter: `drop-shadow(0 0 4px ${accent})` }}
                    />
                  )}
                  <circle cx={e.end.x} cy={e.end.y} r={3} fill={accent} fillOpacity={0.9} />
                </g>
              ))}
            </svg>

            {layers?.map((layer, li) => (
              <motion.div
                key={layer.key}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: li * 0.05, ease: EASE }}
                className="relative z-10 rounded-xl border px-3 py-3 sm:px-4"
                style={{
                  borderColor: `${layer.accent}26`,
                  background: `linear-gradient(135deg, ${layer.accent}12, ${layer.accent}04 60%, transparent)`,
                }}
              >
                <div className="mb-2.5 flex items-baseline gap-2.5 font-mono">
                  <span className="text-[10px] font-semibold" style={{ color: layer.accent }}>
                    L{li + 1}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-[#aab6c8] uppercase">{layer.label}</span>
                  {layer.caption && (
                    <span className="hidden text-[10px] text-[#5a6678] sm:inline">// {layer.caption}</span>
                  )}
                </div>

                <ul className="flex flex-wrap gap-2">
                  {layer.tools.map((t, ti) => {
                    const isActive = active === t.name;
                    const isLinked = !!neighbors?.has(t.name);
                    const dimmed = !!active && !isActive && !isLinked;
                    return (
                      <motion.li
                        key={t.name}
                        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: li * 0.05 + ti * 0.04, ease: EASE }}
                      >
                        <button
                          type="button"
                          ref={(el) => {
                            nodeRefs.current[t.name] = el;
                          }}
                          aria-pressed={pinned === t.name}
                          aria-label={`${t.name}: ${t.why}`}
                          onMouseEnter={() => setHovered(t.name)}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => setHovered(t.name)}
                          onBlur={() => setHovered(null)}
                          onClick={() => setPinned(pinned === t.name ? null : t.name)}
                          className="flex cursor-pointer items-center gap-2 rounded-lg border bg-[#0b111b] px-3 py-1.5 font-mono text-[12px] outline-none transition-all duration-300 focus-visible:ring-2"
                          style={{
                            opacity: dimmed ? 0.28 : 1,
                            color: isActive || isLinked ? "#f1f5f9" : "#aab6c8",
                            borderColor: isActive
                              ? layer.accent
                              : isLinked
                                ? `${layer.accent}99`
                                : "rgba(148,163,184,0.2)",
                            boxShadow: isActive ? `0 0 22px -4px ${layer.accent}` : undefined,
                            transform: isActive ? "translateY(-1px)" : undefined,
                            ["--tw-ring-color" as string]: layer.accent,
                          }}
                        >
                          <span
                            className="size-1.5 rounded-full"
                            style={{
                              backgroundColor: layer.accent,
                              boxShadow: isActive ? `0 0 8px ${layer.accent}` : undefined,
                            }}
                            aria-hidden
                          />
                          {t.name}
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ───────── detail panel ───────── */}
        <aside
          className="border-t border-[rgba(148,163,184,0.14)] bg-[rgba(255,255,255,0.02)] p-5 lg:border-t-0 lg:border-l"
          aria-live="polite"
        >
          <div className="lg:sticky lg:top-24">
            {activeInfo ? (
              <div key={active} className="animate-[fadeIn_0.35s_ease-out]">
                <p
                  className="font-mono text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: accent }}
                >
                  L{activeInfo.index + 1} · {activeInfo.layer.label}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#f1f5f9]">{active}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9aa7ba]">{activeInfo.tool.why}</p>

                <div className="mt-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[#5a6678] uppercase">
                    Connected to · {neighbors?.size ?? 0}
                  </p>
                  {neighbors && neighbors.size > 0 ? (
                    <ul className="mt-2.5 flex flex-wrap gap-1.5">
                      {[...neighbors].map((n) => {
                        const nl = toolMeta.get(n)!.layer;
                        return (
                          <li key={n}>
                            <button
                              type="button"
                              onClick={() => setPinned(n)}
                              className="cursor-pointer rounded-md border px-2 py-0.5 font-mono text-[11px] transition-colors hover:text-white"
                              style={{ borderColor: `${nl.accent}66`, color: nl.accent }}
                            >
                              {n}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="mt-2 font-mono text-[11px] text-[#5a6678]">Standalone</p>
                  )}
                </div>

                {pinned === active && (
                  <button
                    type="button"
                    onClick={() => setPinned(null)}
                    className="mt-6 cursor-pointer font-mono text-[10px] tracking-widest text-[#5a6678] uppercase hover:text-[#aab6c8]"
                  >
                    × Unpin
                  </button>
                )}
              </div>
            ) : (
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#5eead4]/80 uppercase">
                  How to read this
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#9aa7ba]">
                  Layers run from what users see down to the language underneath. Hover, focus or tap a
                  tool to trace how it connects across the stack.
                </p>
                <ul className="mt-5 space-y-2">
                  {layers?.map((l, i) => (
                    <li key={l.key} className="flex items-center justify-between font-mono text-[11px]">
                      <span className="flex items-center gap-2 text-[#aab6c8]">
                        <span
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: l.accent, boxShadow: `0 0 8px ${l.accent}` }}
                          aria-hidden
                        />
                        L{i + 1} {l.label}
                      </span>
                      <span className="text-[#5a6678]">{l.tools.length}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-[rgba(148,163,184,0.14)] pt-4 font-mono text-[11px] text-[#5a6678]">
                  {total} tools · {layers?.length} layers
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}