"use client";

import { useEffect, useRef, useState } from "react";
import type { PageViewport, RenderTask } from "pdfjs-dist";

/** A link annotation mapped to an anchor positioned over the rendered page. */
type PageLink = {
  href: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

type LinkAnnotation = {
  subtype?: string;
  url?: string;
  unsafeUrl?: string;
  rect?: number[];
};

const SAFE_HREF = /^(https?:|mailto:)/i;

/** Resume-shaped skeleton sections for the loading state. */
const SKELETON_SECTIONS: { head: string; rows: string[] }[] = [
  { head: "w-1/3", rows: ["w-full", "w-5/6", "w-2/3"] },
  { head: "w-1/4", rows: ["w-full", "w-3/5"] },
];

/**
 * Renders the first page of a PDF fitted (contain) into its container, with
 * the page's link annotations overlaid as real anchors that open in a new tab.
 * No browser PDF viewer chrome: no toolbar, no zoom, no scrollbars.
 */
export function ResumeViewer({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const taskRef = useRef<RenderTask | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [links, setLinks] = useState<PageLink[]>([]);

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

      const annotations = (await page.getAnnotations()) as LinkAnnotation[];
      const linkAnnots = annotations.filter(
        (a): a is LinkAnnotation & { rect: number[] } =>
          a.subtype === "Link" &&
          Array.isArray(a.rect) &&
          SAFE_HREF.test(a.url ?? a.unsafeUrl ?? ""),
      );

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
        const cssW = Math.floor(base.width * scale);
        const cssH = Math.floor(base.height * scale);
        canvas.style.width = `${cssW}px`;
        canvas.style.height = `${cssH}px`;

        // place the link anchors over the page, in CSS pixels
        const cssViewport: PageViewport = page.getViewport({ scale });
        const toCssX = cssW / cssViewport.width;
        const toCssY = cssH / cssViewport.height;
        setLinks(
          linkAnnots.map((a) => {
            const [x1, y1] = cssViewport.convertToViewportPoint(a.rect[0], a.rect[1]);
            const [x2, y2] = cssViewport.convertToViewportPoint(a.rect[2], a.rect[3]);
            return {
              href: a.url ?? a.unsafeUrl ?? "",
              left: Math.min(x1, x2) * toCssX,
              top: Math.min(y1, y2) * toCssY,
              width: Math.abs(x2 - x1) * toCssX,
              height: Math.abs(y2 - y1) * toCssY,
            };
          }),
        );

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
      <div className="relative">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={title}
          className={`block rounded-3xl shadow-[var(--shadow-card)] ring-1 ring-line ${
            status === "ready"
              ? "animate-[fadeIn_0.6s_cubic-bezier(0.22,1,0.36,1)_both]"
              : "opacity-0"
          }`}
        />

        {links.map((l, i) => (
          <a
            key={`${l.href}-${i}`}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.href}
            title={l.href}
            className="absolute rounded-sm ring-1 ring-accent/0 transition-colors duration-200 hover:bg-accent/10 hover:ring-accent/50"
            style={{ left: l.left, top: l.top, width: l.width, height: l.height }}
          />
        ))}
      </div>

      {status === "loading" ? (
        <div
          role="status"
          aria-live="polite"
          className="absolute inset-0 z-10 grid place-items-center"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-44 rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-card)] sm:w-52">
              <div className="mx-auto h-2.5 w-3/5 animate-pulse rounded-full bg-surface2" />
              <div className="mx-auto mt-2 h-1.5 w-2/5 animate-pulse rounded-full bg-surface2" />
              {SKELETON_SECTIONS.map((section, s) => (
                <div key={s} className="mt-5 space-y-2">
                  <div
                    style={{ animationDelay: `${s * 450}ms` }}
                    className={`h-1.5 animate-pulse rounded-full bg-linestrong ${section.head}`}
                  />
                  {section.rows.map((w, i) => (
                    <div
                      key={i}
                      style={{ animationDelay: `${(s * 4 + i) * 150}ms` }}
                      className={`h-1.5 animate-pulse rounded-full bg-surface2 ${w}`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <p className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.3em] text-muted uppercase">
              <span aria-hidden className="size-1.5 animate-blink rounded-full bg-accent" />
              Loading resume
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
