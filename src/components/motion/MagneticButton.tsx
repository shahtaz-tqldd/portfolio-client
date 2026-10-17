"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  external?: boolean;
  download?: boolean;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
}

/** Magnetic hover button — desktop pointers only, disabled under reduced motion. */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  external,
  download,
  className,
  ariaLabel,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  const handleMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current || e.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.28);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.28);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "btn",
    variant === "primary"
      ? "bg-accent text-bg hover:bg-accent2 shadow-[0_0_0_0_var(--glow)] hover:shadow-[0_8px_32px_-6px_var(--glow)]"
      : "border border-linestrong bg-surface text-fg hover:border-accent hover:text-accent",
    className,
  );

  const inner = (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="inline-block"
      data-cursor
    >
      {href ? (
        external || download ? (
          <a href={href} className={classes} aria-label={ariaLabel} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...(download ? { download: true } : {})}>
            {children}
          </a>
        ) : (
          <Link href={href} className={classes} aria-label={ariaLabel}>
            {children}
          </Link>
        )
      ) : (
        <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
          {children}
        </button>
      )}
    </motion.span>
  );

  return inner;
}
