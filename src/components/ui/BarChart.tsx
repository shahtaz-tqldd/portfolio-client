"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ChartData } from "@/lib/types";
import { EASE } from "@/lib/utils";

/** Minimal animated before/after bar chart. Renders an 'illustrative' badge when flagged. */
export function BarChart({ data }: { data: ChartData }) {
  const reduced = useReducedMotion();
  const max = Math.max(...data.series.map((s) => s.value), 1);

  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="font-display text-sm font-semibold text-fg">{data.title}</p>
        {data.illustrative ? (
          <span className="rounded-full border border-dashed border-warm/60 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-warm">
            ILLUSTRATIVE
          </span>
        ) : null}
      </div>

      <div className="mt-6 space-y-5">
        {data.series.map((s, i) => (
          <div key={s.label}>
            <div className="flex items-baseline justify-between font-mono text-[11px]">
              <span className="text-muted">{s.label}</span>
              <span className="text-fg">
                {s.value.toLocaleString()}
                {data.unit ? ` ${data.unit.replace(/\(.*\)/, "").trim()}` : ""}
              </span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-surface2">
              <motion.div
                className={`h-full rounded-full ${i === data.series.length - 1 ? "bg-gradient-to-r from-accent to-accent2" : "bg-[var(--line-strong)]"}`}
                initial={reduced ? { width: `${(s.value / max) * 100}%` } : { width: 0 }}
                whileInView={{ width: `${(s.value / max) * 100}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.15, ease: EASE }}
              />
            </div>
            {s.hint ? <p className="mt-1.5 font-mono text-[10px] text-muted/70">{s.hint}</p> : null}
          </div>
        ))}
      </div>

      {data.note ? <p className="mt-6 font-mono text-[11px] leading-relaxed text-muted/80">// {data.note}</p> : null}
    </div>
  );
}
