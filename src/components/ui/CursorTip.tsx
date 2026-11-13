"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface CursorTipProps {
  /** Hover target */
  children: ReactNode;
  /** Tooltip body — same card style as the architecture diagram tooltips */
  content: ReactNode;
  className?: string;
}

/**
 * Wraps a hover target and shows a small card that follows the cursor
 * (portal-rendered, so it never clips inside overflow containers).
 */
export function CursorTip({ children, content, className }: CursorTipProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const move = useCallback((e: React.PointerEvent) => {
    const tip = tipRef.current;
    if (!tip) return;
    const x = Math.min(e.clientX + 16, window.innerWidth - tip.offsetWidth - 12);
    const y = Math.min(e.clientY + 18, window.innerHeight - tip.offsetHeight - 12);
    tip.style.transform = `translate(${Math.max(12, x)}px, ${Math.max(12, y)}px)`;
  }, []);

  return (
    <span
      className={cn("inline-flex", className)}
      onPointerEnter={() => setVisible(true)}
      onPointerMove={move}
      onPointerLeave={() => setVisible(false)}
      onPointerDown={() => setVisible(false)}
    >
      {children}
      {mounted
        ? createPortal(
            <div
              ref={tipRef}
              aria-hidden
              className={cn(
                "pointer-events-none fixed top-0 left-0 z-[120] max-w-[260px] rounded-lg border border-line bg-[var(--code-bg)] p-3 shadow-[var(--shadow-card)] backdrop-blur-md transition-opacity duration-150",
                visible ? "opacity-100" : "opacity-0",
              )}
            >
              {content}
            </div>,
            document.body,
          )
        : null}
    </span>
  );
}
