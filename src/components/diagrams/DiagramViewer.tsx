"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Minimize2, Minus, Plus, RotateCcw, X } from "lucide-react";
import type { DiagramDef, DiagramNode, DiagramView } from "@/lib/types";
import { GraphDiagram } from "./GraphDiagram";
import { kindColorVar, kindLabels } from "./icons";
import { cn, EASE } from "@/lib/utils";

interface DiagramViewerProps {
  def: DiagramDef;
  defaultView?: string;
  caption?: string;
  className?: string;
}

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 3;
/** never auto-fit a small diagram beyond this scale */
const MAX_FIT = 1.4;

/**
 * Interactive diagram stage.
 * - auto-fits each view to the stage (no scroll hijacking: wheel does nothing here)
 * - hover a component for a quick tooltip, click it for a details overlay
 * - tabs switch between views; expand opens the diagram over the whole page
 */
export function DiagramViewer({ def, defaultView, caption, className }: DiagramViewerProps) {
  const [viewIdx, setViewIdx] = useState(() => {
    const i = def.views.findIndex((v) => v.id === defaultView);
    return i >= 0 ? i : 0;
  });
  const view: DiagramView = def.views[viewIdx];

  const [hovered, setHovered] = useState<string | null>(null);
  const [detail, setDetail] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  /** true once the user zooms/pans manually; auto-fit stops overriding them */
  const touchedRef = useRef(false);

  const hoveredNode = view.nodes.find((n) => n.id === hovered) ?? null;
  const detailNode = view.nodes.find((n) => n.id === detail) ?? null;
  const activeNode = hovered ?? detail;

  /* ------------------------------ fit + zoom ------------------------------ */

  const fitView = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    const sw = el.clientWidth;
    const sh = el.clientHeight;
    if (!sw || !sh) return;
    const pad = 56;
    const z = Math.min(MAX_FIT, (sw - pad) / view.width, (sh - pad) / view.height);
    setZoom(z);
    setPan({ x: (sw - view.width * z) / 2, y: (sh - view.height * z) / 2 });
  }, [view.width, view.height]);

  // re-fit when the view or the mode changes (unless the user took control)
  useEffect(() => {
    touchedRef.current = false;
    fitView();
  }, [view.id, expanded, fitView]);

  // keep fitting while untouched (resizes, first mount)
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (!touchedRef.current) fitView();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [fitView]);

  const reset = useCallback(() => {
    touchedRef.current = false;
    fitView();
  }, [fitView]);

  const zoomAt = useCallback((factor: number) => {
    touchedRef.current = true;
    setZoom((z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z * factor)));
  }, []);

  /* ------------------------------ pan + tooltip ---------------------------- */

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest(".dg-node")) return; // let nodes take clicks
    dragRef.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    // tooltip follows the cursor
    const tip = tipRef.current;
    const stage = stageRef.current;
    if (tip && stage) {
      const r = stage.getBoundingClientRect();
      const tx = Math.min(e.clientX - r.left + 16, r.width - tip.offsetWidth - 12);
      const ty = Math.min(e.clientY - r.top + 18, r.height - tip.offsetHeight - 12);
      tip.style.transform = `translate(${Math.max(12, tx)}px, ${Math.max(12, ty)}px)`;
    }
    const d = dragRef.current;
    if (!d) return;
    touchedRef.current = true;
    setPan({ x: d.px + (e.clientX - d.x), y: d.py + (e.clientY - d.y) });
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  // keyboard panning when the stage is focused
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = 60;
    if (e.key === "ArrowLeft") setPan((p) => ({ ...p, x: p.x + step }));
    else if (e.key === "ArrowRight") setPan((p) => ({ ...p, x: p.x - step }));
    else if (e.key === "ArrowUp") setPan((p) => ({ ...p, y: p.y + step }));
    else if (e.key === "ArrowDown") setPan((p) => ({ ...p, y: p.y - step }));
    else if (e.key === "+" || e.key === "=") zoomAt(1.15);
    else if (e.key === "-") zoomAt(1 / 1.15);
    else if (e.key === "0") reset();
    else return;
    e.preventDefault();
  };

  /* ---------------------------- overlays: esc + lock ----------------------- */

  useEffect(() => {
    const overlayOpen = expanded || detail !== null;
    if (!overlayOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (detail !== null) setDetail(null);
      else setExpanded(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded, detail]);

  /* --------------------------- detail connections -------------------------- */

  const connections =
    detailNode === null
      ? []
      : view.edges
          .filter((e) => e.from === detailNode.id || e.to === detailNode.id)
          .map((e) => {
            const out = e.from === detailNode.id;
            const otherId = out ? e.to : e.from;
            const other = view.nodes.find((n) => n.id === otherId);
            return {
              key: `${e.from}->${e.to}`,
              dir: out ? "→" : "←",
              label: other?.label ?? otherId,
              edge: e.label,
            };
          });

  /* --------------------------------- render -------------------------------- */

  return (
    <figure
      className={cn(
        "card flex flex-col overflow-hidden",
        expanded ? "fixed inset-0 z-[100] rounded-none border-0 bg-bg" : "",
        className,
      )}
      aria-label={caption ?? "Diagram"}
    >
      {/* toolbar: view tabs + controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex flex-wrap items-center gap-1" role="tablist" aria-label="Diagram views">
          {def.views.length > 1
            ? def.views.map((v, i) => (
                <button
                  key={v.id}
                  role="tab"
                  aria-selected={i === viewIdx}
                  onClick={() => {
                    setViewIdx(i);
                    setHovered(null);
                    setDetail(null);
                  }}
                  className={cn(
                    "cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-300",
                    i === viewIdx ? "bg-accent/15 text-accent" : "text-muted hover:bg-surface2 hover:text-fg",
                  )}
                >
                  {v.label}
                </button>
              ))
            : null}
        </div>

        <div className="flex items-center gap-1">
          <button type="button" aria-label="Zoom out" onClick={() => zoomAt(1 / 1.2)} className="dg-tool-btn">
            <Minus className="size-3.5" />
          </button>
          <span className="w-12 text-center font-mono text-[10px] text-muted">{Math.round(zoom * 100)}%</span>
          <button type="button" aria-label="Zoom in" onClick={() => zoomAt(1.2)} className="dg-tool-btn">
            <Plus className="size-3.5" />
          </button>
          <button type="button" aria-label="Reset view" onClick={reset} className="dg-tool-btn">
            <RotateCcw className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label={expanded ? "Collapse diagram" : "Expand diagram"}
            onClick={() => setExpanded((v) => !v)}
            className="dg-tool-btn"
          >
            {expanded ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
          </button>
        </div>
      </div>

      {/* stage */}
      <div
        ref={stageRef}
        tabIndex={0}
        role="application"
        aria-label="Interactive diagram — drag to pan, click a component for details"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={cn(
          "dg-stage relative touch-pan-y overflow-hidden bg-bg2/60 [background-image:radial-gradient(var(--grid)_1px,transparent_1px)] [background-size:22px_22px]",
          expanded ? "min-h-0 flex-1" : "h-[60vh] max-h-[640px] min-h-[420px]",
        )}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: view.width,
            height: view.height,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          <GraphDiagram
            view={view}
            activeNode={activeNode}
            onNodeHover={setHovered}
            onNodeSelect={setDetail}
          />
        </div>

        {/* hover tooltip */}
        <div
          ref={tipRef}
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-0 left-0 z-10 max-w-[260px] rounded-lg border border-line bg-[var(--code-bg)] p-3 shadow-[var(--shadow-card)] backdrop-blur-md transition-opacity duration-150",
            hoveredNode && !dragRef.current ? "opacity-100" : "opacity-0",
          )}
        >
          {hoveredNode ? (
            <>
              <p className="flex items-center gap-2 font-display text-[13px] font-semibold text-fg">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ background: kindColorVar[hoveredNode.kind] }}
                  aria-hidden
                />
                {hoveredNode.label}
                <span className="font-mono text-[9px] font-normal tracking-[0.18em] text-muted uppercase">
                  {kindLabels[hoveredNode.kind]}
                </span>
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{hoveredNode.desc}</p>
              <p className="mt-2 font-mono text-[9px] tracking-[0.18em] text-accent/80 uppercase">
                click for details
              </p>
            </>
          ) : null}
        </div>

        {view.note ? (
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent px-4 pb-2.5 pt-8 text-center font-mono text-[10px] tracking-wide text-muted">
            {view.note}
          </figcaption>
        ) : null}
      </div>

      {/* component details overlay */}
      <AnimatePresence>
        {detailNode ? (
          <motion.div
            key="detail"
            role="dialog"
            aria-modal="true"
            aria-label={`${detailNode.label} details`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-bg/85 p-4 backdrop-blur-md"
            onClick={() => setDetail(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="card w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2.5 font-display text-xl font-semibold text-fg">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ background: kindColorVar[detailNode.kind] }}
                      aria-hidden
                    />
                    {detailNode.label}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
                    {kindLabels[detailNode.kind]}
                    {detailNode.sublabel ? ` · ${detailNode.sublabel}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDetail(null)}
                  aria-label="Close details"
                  className="dg-tool-btn shrink-0"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted">{detailNode.desc}</p>

              {detailNode.kind === "table" && detailNode.rows ? (
                <div className="mt-5 overflow-hidden rounded-lg border border-line">
                  <table className="w-full font-mono text-xs">
                    <tbody>
                      {detailNode.rows.map((r) => (
                        <tr key={r.name} className="border-b border-line last:border-0">
                          <td className="px-3 py-2 text-fg">{r.name}</td>
                          <td className="px-3 py-2 text-muted">{r.type}</td>
                          <td className="px-3 py-2 text-right">
                            {r.key ? (
                              <span className={r.key === "pk" ? "text-accent" : r.key === "vec" ? "text-[var(--k-vector)]" : "text-[var(--warm)]"}>
                                {r.key.toUpperCase()}
                              </span>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {connections.length > 0 ? (
                <div className="mt-5">
                  <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
                    Connections
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {connections.map((c) => (
                      <li key={c.key} className="flex items-baseline gap-2.5 text-[13px]">
                        <span className="font-mono text-accent" aria-hidden>{c.dir}</span>
                        <span className="font-medium text-fg">{c.label}</span>
                        {c.edge ? <span className="text-xs text-muted">· {c.edge}</span> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </figure>
  );
}
