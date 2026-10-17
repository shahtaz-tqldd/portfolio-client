"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE, cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "li" | "span" | "article" | "figure";
}

/** Viewport-triggered fade + translate/scale-in. Falls back to a simple fade when reduced motion is on. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  scale,
  duration = 0.75,
  once = true,
  amount = 0.2,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y, scale: scale ?? 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={reduced ? { duration: 0.3, delay } : { duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Staggered reveal container — children must use <RevealItem>. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <motion.div className={className} variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }}>
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div className={cn(className)} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
