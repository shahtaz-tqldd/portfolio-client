"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, Minus, Plus, RotateCcw } from "lucide-react";
import type { DiagramDef, DiagramView } from "@/lib/types";
import { GraphDiagram } from "./GraphDiagram";
import { kindColorVar, kindLabels } from "./icons";
import { cn, hashCode } from "@/lib/utils";

interface DiagramViewerProps {
  def: DiagramDef;
  defaultView?: string;
  caption?: string;
  className?: string;
}

const MIN_ZOOM = 0.55;
const MAX_ZOOM = 3;

/** Interactive diagram stage: zoom/pan, fullscreen, view toggles, hover-focus side panel. */
export function DiagramViewer({ def, defaultView, caption, className }: DiagramViewerProps) {
  const [viewIdx, setViewIdx] = useState(() => {
    const i = def.views.findIndex((v) => v.id === defaultView);
    return i >= 0 ? i : 0;
  });
  const view: DiagramView = def.views[viewIdx];

  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [fullscreen, setFullscreen] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  const activeNode = hovered ?? selected;
  const activeDef = view.nodes.find((n) => n.id === activeNode) ?? null;

  const reset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const zoomAt = useCallback((factor: number, cx?: number, cy?: number) => {
    setZoom((z) => {
      const nz = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z * factor));
      if (cx === undefined || cy === undefined) return nz;
      setPan((p) => ({
        x: cx - ((cx - p.x) * nz) / z,
        y: cy - ((cy - p.y) * nz) / z,
      }));
      return nz;
    });
  }, []);

  // wheel zoom (non-passive so we can preventDefault)
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      zoomAt(e.deltaY < 0 ? 1.12 : 1 / 1.12, e.clientX - rect.left, e.clientY - rect.top);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  // fullscreen events
  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await wrapRef.current?.requestFullscreen();
    } catch {}
  };

  // drag to pan
  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest(".dg-node")) return; // let nodes take clicks
    dragRef.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
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

  const kinds = Array.from(new Set(view.nodes.map((n) => n.kind)));
  const hotId = `dg-${hashCode(JSON.stringify(view.nodes.map((n) => n.id)))}-${viewIdx}`;

  return (
    <figure className={cn("card overflow-hidden", className)} aria-label={caption ?? "Diagram"}>
      {/* toolbar */}
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
                    reset();
                    setHovered(null);
                    setSelected(null);
                  }}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-300",
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
            aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
            onClick={toggleFullscreen}
            className="dg-tool-btn"
          >
            <Maximize2 className="size-3.5" />
          </button>
        </div>
      </div>

      <div className={cn("grid", fullscreen ? "block" : "lg:grid-cols-[1fr_280px]")}>
        {/* stage */}
        <div
          ref={stageRef}
          tabIndex={0}
          role="application"
          aria-label="Interactive diagram — drag to pan, scroll to zoom, arrow keys to pan"
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={cn(
            "dg-stage relative touch-pan-y overflow-hidden bg-bg2/60 [background-image:radial-gradient(var(--grid)_1px,transparent_1px)] [background-size:22px_22px]",
            fullscreen ? "h-screen" : "max-h-[74vh] cursor-grab active:cursor-grabbing",
          )}
        >
          <div
            className="origin-top-left"
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
            key={hotId}
          >
            <GraphDiagram view={view} activeNode={activeNode} onNodeHover={setHovered} onNodeSelect={setSelected} />
          </div>

          {view.note ? (
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent px-4 pb-2.5 pt-8 text-center font-mono text-[10px] tracking-wide text-muted">
              {view.note}
            </figcaption>
          ) : null}
        </div>

        {/* side panel */}
        {!fullscreen ? (
          <aside className="border-t border-line p-4 lg:border-l lg:border-t-0" aria-live="polite">
            <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">Component</p>
            <div className="mt-3 min-h-[120px]">
              {activeDef ? (
                <div>
                  <p className="flex items-center gap-2 font-display text-sm font-semibold text-fg">
                    <span className="size-2 rounded-full" style={{ background: kindColorVar[activeDef.kind] }} aria-hidden />
                    {activeDef.label}
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-wider text-accent uppercase">{kindLabels[activeDef.kind]}</p>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">{activeDef.desc}</p>
                </div>
              ) : (
                <p className="font-mono text-[11px] leading-relaxed text-muted/80">
                  // hover, click or tab-focus any node to inspect its role and highlight connected paths
                </p>
              )}
            </div>

            <p className="mt-6 font-mono text-[10px] tracking-[0.22em] text-muted uppercase">Legend</p>
            <ul className="mt-3 space-y-1.5">
              {kinds.map((k) => (
                <li key={k} className="flex items-center gap-2 font-mono text-[10px] text-muted">
                  <span className="size-2 rounded-sm" style={{ background: kindColorVar[k] }} aria-hidden />
                  {kindLabels[k]}
                </li>
              ))}
              <li className="flex items-center gap-2 pt-1 font-mono text-[10px] text-muted">
                <span className="inline-block h-px w-4" style={{ background: "var(--k-queue)" }} aria-hidden /> async / animated flow
              </li>
              <li className="flex items-center gap-2 font-mono text-[10px] text-muted">
                <span className="inline-block h-px w-4" style={{ background: "var(--line-strong)" }} aria-hidden /> sync call
              </li>
            </ul>
          </aside>
        ) : null}
      </div>

    </figure>
  );
}

