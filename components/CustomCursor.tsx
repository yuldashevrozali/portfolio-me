"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * A two-part custom cursor: a small solid dot that tracks precisely, and a
 * larger springy ring that grows and changes color over interactive elements.
 * Rendered only on devices with a fine pointer.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest(
          "a, button, [role='button'], input, textarea, .cursor-hover"
        )
      );
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        style={{ x, y, opacity: hidden ? 0 : 1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          opacity: hidden ? 0 : 1,
        }}
        animate={{
          width: hovering ? 52 : 32,
          height: hovering ? 52 : 32,
          borderColor: hovering
            ? "rgba(139,92,246,0.9)"
            : "rgba(255,255,255,0.35)",
          backgroundColor: hovering
            ? "rgba(139,92,246,0.12)"
            : "rgba(255,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </>
  );
}
