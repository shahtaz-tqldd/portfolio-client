"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { hashCode, mulberry32 } from "@/lib/utils";

interface NodeNetworkProps {
  className?: string;
  density?: number; // nodes per px²
  maxNodes?: number;
  interactive?: boolean;
}

function readVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/**
 * The signature motif: a drifting node-and-edge network on canvas.
 * Pauses offscreen, renders a single static frame under reduced motion.
 */
export function NodeNetwork({ className, density = 0.00007, maxNodes = 80, interactive = true }: NodeNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = mulberry32(hashCode("argon-network"));
    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    interface P {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      hub: boolean;
    }
    let nodes: P[] = [];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(24, Math.min(maxNodes, Math.round(width * height * density)));
      nodes = Array.from({ length: count }, () => ({
        x: rand() * width,
        y: rand() * height,
        vx: (rand() - 0.5) * 0.22,
        vy: (rand() - 0.5) * 0.22,
        r: 1 + rand() * 1.8,
        hub: rand() > 0.86,
      }));
    };

    const draw = () => {
      const accent = readVar("--accent", "#2dd4bf");
      const muted = readVar("--muted", "#98a2b3");
      ctx.clearRect(0, 0, width, height);
      const linkDist = Math.min(190, Math.max(130, width * 0.14));

      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.28;
            ctx.strokeStyle = hexA(accent, alpha);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = n.hub ? hexA(accent, 0.9) : hexA(muted, 0.55);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.hub ? n.r + 1.2 : n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.hub) {
          ctx.strokeStyle = hexA(accent, 0.25);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    const step = () => {
      if (!running) return;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
        if (interactive) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < 140 && d > 0.1) {
            n.x += (dx / d) * 0.55;
            n.y += (dy / d) * 0.55;
          }
        }
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    build();
    if (reduced) {
      draw();
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          const visible = entries[0]?.isIntersecting ?? false;
          if (visible && !running) {
            running = true;
            raf = requestAnimationFrame(step);
          } else if (!visible && running) {
            running = false;
            cancelAnimationFrame(raf);
          }
        },
        { threshold: 0 },
      );
      io.observe(canvas);
      const onMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      };
      const onLeave = () => {
        mouse.x = -9999;
        mouse.y = -9999;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      const ro = new ResizeObserver(() => {
        build();
        draw();
      });
      ro.observe(canvas);
      return () => {
        running = false;
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerleave", onLeave);
      };
    }
  }, [density, maxNodes, interactive]);

  return <canvas ref={canvasRef} aria-hidden className={cn("size-full", className)} />;
}

function hexA(hexOrRgb: string, alpha: number): string {
  const s = hexOrRgb.trim();
  if (s.startsWith("#")) {
    const h = s.slice(1);
    const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return s;
}
