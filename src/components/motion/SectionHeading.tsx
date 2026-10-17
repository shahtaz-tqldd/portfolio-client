"use client";

import { cn } from "@/lib/utils";
import { SplitText } from "./SplitText";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  index: string; // e.g. "01"
  kicker: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  variant?: "words" | "clip";
  headingId?: string;
}

/**
 * Section header with a distinct-but-cohesive treatment:
 * mono kicker + index, split masked title, animated accent underline, optional lead.
 */
export function SectionHeading({
  index,
  kicker,
  title,
  lead,
  align = "left",
  className,
  variant = "words",
  headingId,
}: SectionHeadingProps) {
  return (
    <div className={cn("relative", align === "center" && "text-center", className)}>
      <Reveal y={12} duration={0.55}>
        <p className={cn("kicker text-xs flex items-center gap-2", align === "center" && "justify-center")}>
          <span className="text-muted/70">{index}</span>
          <span className="h-px bg-accent/60" aria-hidden />
          <span>{kicker}</span>
        </p>
      </Reveal>

      <h2 id={headingId} className="mt-4 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-5xl">
        <SplitText text={title} mode={variant} amount={0.3} />
      </h2>

      {lead ? (
        <Reveal delay={0.15} y={16} className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {lead}
        </Reveal>
      ) : null}
    </div>
  );
}
