"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { MediaItem } from "@/lib/types";
import { EASE, cn } from "@/lib/utils";

const spanClass: Record<NonNullable<MediaItem["span"]>, string> = {
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
  big: "sm:col-span-2 sm:row-span-2",
};

/** Bento media gallery with lightbox and lazy loading. Only items with a real src are passed in. */
export function MediaGallery({ media }: { media: MediaItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const nav = useCallback(
    (dir: 1 | -1) => setOpen((o) => (o === null ? o : (o + dir + media.length) % media.length)),
    [media.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft") nav(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, nav]);

  return (
    <>
      <div className="grid auto-rows-[170px] grid-cols-1 gap-4 sm:grid-cols-4">
        {media.map((m, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: i * 0.07, ease: EASE }}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-line text-left",
              m.span ? spanClass[m.span] : "",
            )}
            aria-label={`Open media: ${m.caption}`}
          >
            <Image
              src={m.src}
              alt={m.caption}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-outexpo group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-bg/95 via-bg/60 to-transparent p-3 pt-10">
              <span className="font-mono text-[10px] leading-snug tracking-wide text-muted">{m.caption}</span>
              <Maximize2 className="size-3.5 shrink-0 text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={media[open].caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-md"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              autoFocus
              className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-linestrong bg-surface text-fg"
            >
              <X className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); nav(-1); }}
              aria-label="Previous"
              className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-linestrong bg-surface text-fg"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); nav(1); }}
              aria-label="Next"
              className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-linestrong bg-surface text-fg"
            >
              <ChevronRight className="size-5" />
            </button>

            <motion.figure
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-hidden rounded-xl border border-line">
                <Image
                  src={media[open].src}
                  alt={media[open].caption}
                  width={1600}
                  height={1000}
                  className="h-auto w-full object-contain"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between font-mono text-xs text-muted">
                <span>{media[open].caption}</span>
                <span>
                  {open + 1} / {media.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
