"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/animations";

type RevealProps = {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
};

/** Wraps content in a scroll-triggered reveal animation. */
export default function Reveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
