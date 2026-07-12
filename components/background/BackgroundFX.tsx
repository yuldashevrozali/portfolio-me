"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * Full-screen ambient background: aurora gradient, drifting blur orbs with
 * mouse-driven parallax, a subtle grid pattern, and a fine noise overlay.
 * Everything is GPU-accelerated (transform/opacity only) and pointer-events-none.
 */
export default function BackgroundFX() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 40, damping: 20 });
  const springY = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [mx, my]);

  const orb1X = useTransform(springX, [-0.5, 0.5], [-40, 40]);
  const orb1Y = useTransform(springY, [-0.5, 0.5], [-40, 40]);
  const orb2X = useTransform(springX, [-0.5, 0.5], [50, -50]);
  const orb2Y = useTransform(springY, [-0.5, 0.5], [50, -50]);
  const orb3X = useTransform(springX, [-0.5, 0.5], [30, -30]);
  const orb3Y = useTransform(springY, [-0.5, 0.5], [-25, 25]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Aurora base */}
      <div className="absolute left-1/2 top-0 h-[60vh] w-[120vw] -translate-x-1/2 opacity-60">
        <div className="animate-aurora absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_55%)]" />
      </div>

      {/* Blur orbs with parallax */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="absolute -left-32 top-[-10%] h-[38rem] w-[38rem] rounded-full bg-primary/20 blur-[130px] animate-float-slow"
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute -right-40 top-1/3 h-[42rem] w-[42rem] rounded-full bg-secondary/20 blur-[140px] animate-float-slow"
      />
      <motion.div
        style={{ x: orb3X, y: orb3Y }}
        className="absolute bottom-[-15%] left-1/3 h-[34rem] w-[34rem] rounded-full bg-indigo-500/15 blur-[130px] animate-float-slow"
      />

      {/* Fine grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
        }}
      />

      {/* Noise overlay */}
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />

      {/* Vignette to deepen the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}
