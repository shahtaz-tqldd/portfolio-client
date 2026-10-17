"use client";

import { cn } from "@/lib/utils";

type Tint = "teal" | "cyan" | "amber" | "slate";

interface SectionBackgroundProps {
  /** where the primary blob sits */
  from?: "left" | "right" | "center";
  tint?: Tint;
  grid?: boolean;
  className?: string;
}

const tints: Record<Tint, string> = {
  teal: "bg-emerald-500/5",
  cyan: "bg-accent2/10",
  amber: "bg-warm/10",
  slate: "bg-[#94a3b8]/10",
};

/**
 * Per-section ambient gradient "chapter". Radial blobs drift very slowly;
 * a blueprint grid fades in with a radial mask. Purely decorative.
 */
export function SectionBackground({ from = "left", tint = "teal", grid = true, className }: SectionBackgroundProps) {
  const primaryX = from === "left" ? "-12%" : from === "right" ? "auto" : "50%";
  const primaryRight = from === "right" ? "-12%" : "auto";

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div
        className={cn("absolute top-[-20%] size-[46rem] rounded-full blur-[120px] animate-slow-drift", tints[tint])}
        style={{ left: primaryX, right: primaryRight, transform: "translateX(-50%)" }}
      />
      <div className={cn("absolute bottom-[-30%] size-[38rem] rounded-full blur-[110px] opacity-70 animate-slow-drift", tints.slate)}
        style={{ right: from === "left" ? "-10%" : "auto", left: from === "right" ? "-10%" : "auto", animationDelay: "-13s" }} />
      {grid ? (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 80% 65% at 50% 40%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 40%, black 30%, transparent 100%)",
          }}
        />
      ) : null}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg to-transparent" />
    </div>
  );
}
