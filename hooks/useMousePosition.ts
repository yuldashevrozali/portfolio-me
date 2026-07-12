"use client";

import { useEffect, useState } from "react";

type MousePosition = { x: number; y: number };

/**
 * Tracks the pointer position, normalized to [-0.5, 0.5] on both axes.
 * Skips work on touch devices where there is no fine pointer.
 */
export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    let frame = 0;
    const handle = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setPosition({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        });
      });
    };

    window.addEventListener("mousemove", handle, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handle);
      cancelAnimationFrame(frame);
    };
  }, []);

  return position;
}
