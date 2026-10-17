"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/utils";

type Mode = "words" | "chars" | "clip";

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  mode?: Mode;
  once?: boolean;
  amount?: number;
}

/**
 * Masked text reveal: words/chars slide up from behind an overflow mask,
 * or the whole line wipes in via clip-path. Falls back to plain text under reduced motion.
 */
export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.035,
  mode = "words",
  once = true,
  amount = 0.5,
}: SplitTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount }}
        transition={{ duration: 0.3, delay }}
      >
        {text}
      </motion.span>
    );
  }

  if (mode === "clip") {
    // mask + translateX wipe: same technique as words/chars (transform-based,
    // immune to clip-path interpolation and early-measure stuck-hidden issues)
    return (
      <motion.span
        className={`block w-full overflow-hidden pb-[0.08em] -mb-[0.08em] ${className ?? ""}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount }}
      >
        <motion.span
          className="block will-change-transform"
          variants={{
            hidden: { x: "-102%" },
            show: { x: "0%", transition: { duration: 0.9, delay, ease: EASE } },
          }}
        >
          {text}
        </motion.span>
      </motion.span>
    );
  }

  const units = mode === "chars" ? Array.from(text) : text.split(" ");

  return (
    <motion.span
      className={`inline ${className ?? ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={text}
    >
      {units.map((u, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom" aria-hidden>
          <motion.span
            className={`inline-block will-change-transform ${wordClassName ?? ""}`}
            variants={{
              hidden: { y: "115%", rotate: mode === "chars" ? 4 : 2 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.85, ease: EASE } },
            }}
          >
            {u === " " ? "\u00A0" : u}
            {mode === "words" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
