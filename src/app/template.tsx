"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/utils";

/** Route transition: subtle rise + fade on every navigation. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
