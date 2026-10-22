"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASE, cn } from "@/lib/utils";

export interface Chapter {
  id: string;
  label: string;
}

/** Sticky chapter navigation with scroll-spy progress (side rail on desktop, collapsible menu on mobile). */
export function ChapterNav({
  chapters,
  accent,
}: {
  chapters: Chapter[];
  accent: string;
}) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -52% 0px" },
    );
    sections.forEach((s) => io.observe(s));

    const onScroll = () => {
      const doc = document.documentElement;
      const p =
        (window.scrollY / Math.max(doc.scrollHeight - doc.clientHeight, 1)) *
        100;
      setProgress(Math.min(100, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [chapters]);

  const go = (id: string) => {
    const w = window as unknown as {
      __smoothScroll?: { scrollTo: (t: string, o?: number) => void };
    };
    if (w.__smoothScroll) w.__smoothScroll.scrollTo(`#${id}`, -96);
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const jump = (id: string) => {
    setOpen(false);
    go(id);
  };

  const activeChapter = chapters.find((c) => c.id === active);
  const activeIndex = chapters.findIndex((c) => c.id === active);

  return (
    <>
      {/* mobile menu */}
      <nav
        aria-label="Chapters"
        className="sticky top-16 z-[65] border-b border-line bg-bg/85 backdrop-blur-xl lg:hidden"
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="chapter-menu"
          className="flex w-full items-center justify-between gap-3 px-5 py-3"
        >
          <span className="flex min-w-0 items-center gap-2.5 font-mono text-sm tracking-wider">
            {activeChapter ? (
              <>
                <span className="shrink-0 text-muted/60">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="truncate text-accent">
                  {activeChapter.label}
                </span>
              </>
            ) : (
              <span className="text-muted">Chapters</span>
            )}
          </span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted transition-transform duration-300",
              open && "rotate-180 text-accent",
            )}
            aria-hidden
          />
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.ul
              id="chapter-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <li className="flex flex-wrap gap-1.5 px-5 pb-3">
                {chapters.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => jump(c.id)}
                    className={cn(
                      "whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-sm tracking-wider transition-colors duration-300",
                      active === c.id
                        ? "border-accent/60 bg-accent/10 text-accent"
                        : "border-line bg-surface text-muted",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")} {c.label}
                  </button>
                ))}
              </li>
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </nav>

      {/* desktop rail */}
      <nav
        aria-label="Chapters"
        className="sticky top-28 hidden self-start lg:block"
      >
        <p className="font-mono text-[10px] tracking-[0.28em] text-muted uppercase">
          Chapters
        </p>
        <hr className="mt-4" />
        <ul className="mt-5 space-y-2.5">
          {chapters.map((c, i) => {
            const isActive = active === c.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => go(c.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-lg px-2.5 py-1.5 text-left transition-colors duration-300",
                    isActive
                      ? "text-accent"
                      : "text-muted hover:text-fg cursor-pointer",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-sm transition-colors",
                      isActive ? "text-accent" : "text-muted/50",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "h-4 w-px transition-all duration-500",
                      isActive
                        ? "bg-accent"
                        : "bg-line group-hover:bg-linestrong",
                    )}
                    aria-hidden
                  />
                  <span
                    className={cn(
                      "font-mono text-sm tracking-wide",
                      isActive ? "text-accent" : "",
                    )}
                  >
                    {c.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
