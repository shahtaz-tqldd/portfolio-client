"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { animate } from "framer-motion";
import type { Metric } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Count-up metric; renders a clearly-marked placeholder box when no real value exists. */
export function MetricCounter({
  metric,
  className,
  size = "md",
}: {
  metric: Metric;
  className?: string;
  size?: "md" | "lg";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const value = metric.value ?? 0;
    if (value === 0) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, metric.value]);

  if (metric.value === undefined) {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-md border border-dashed border-warm/60 px-2.5 py-1 font-mono text-[11px] text-warm",
          className,
        )}
      >
        {metric.placeholder ?? "[METRIC]"}
      </span>
    );
  }

  return (
    <span ref={ref} className={cn("font-display font-semibold tabular-nums tracking-tight", size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl", className)}>
      {metric.prefix}
      {display.toLocaleString()}
      {metric.suffix}
    </span>
  );
}
