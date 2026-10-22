"use client";

import { useEffect, useRef, useState } from "react";
import type { RenderTask } from "pdfjs-dist";

/**
 * Renders the first page of a PDF fitted (contain) into its container.
 * No browser PDF viewer chrome: no toolbar, no zoom, no scrollbars.
 */
export function ResumeViewer({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const taskRef = useRef<RenderTask | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    let observer: ResizeObserver | null = null;
    let loadingTask: ReturnType<typeof import("pdfjs-dist").getDocument> | null = null;

    (async () => {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();

      loadingTask = pdfjs.getDocument({ url: src });
      const doc = await loadingTask.promise;
      const page = await doc.getPage(1);

      const render = () => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas || cancelled) return;

        const availW = container.clientWidth;
        if (availW < 2 || cancelled) return;

        const base = page.getViewport({ scale: 1 });
        const scale = availW / base.width;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const viewport = page.getViewport({ scale: scale * dpr });

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.style.width = `${Math.floor(base.width * scale)}px`;
        canvas.style.height = `${Math.floor(base.height * scale)}px`;

        taskRef.current?.cancel();
        const task = page.render({ canvas, viewport });
        taskRef.current = task;
        task.promise.catch(() => {});
      };

      await render();
      if (cancelled) return;
      setStatus("ready");

      observer = new ResizeObserver(() => requestAnimationFrame(render));
      if (containerRef.current) observer.observe(containerRef.current);
    })().catch(() => {
      if (!cancelled) setStatus("error");
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      taskRef.current?.cancel();
      loadingTask?.destroy();
    };
  }, [src]);

  if (status === "error") {
    return (
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="grid h-full w-full place-items-center rounded-2xl border border-line bg-surface font-mono text-xs tracking-wide text-muted transition-colors hover:border-accent hover:text-accent"
      >
        Couldn&apos;t render the PDF — open it in a new tab instead
      </a>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-full w-full items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={title}
        className="rounded-3xl shadow-[var(--shadow-card)] ring-1 ring-line"
      />
      {status === "loading" ? (
        <div className="absolute inset-0 animate-pulse rounded-2xl bg-surface" aria-hidden />
      ) : null}
    </div>
  );
}
