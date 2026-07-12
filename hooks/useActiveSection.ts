"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently closest to the top of the viewport.
 * Uses IntersectionObserver for efficiency (no scroll listeners).
 */
export function useActiveSection(sectionIds: readonly string[]) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          visible.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          let best = sectionIds[0];
          let bestRatio = 0;
          visible.forEach((ratio, key) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = key;
            }
          });
          if (bestRatio > 0) setActive(best);
        },
        { threshold: [0.15, 0.35, 0.55, 0.75], rootMargin: "-20% 0px -35% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return active;
}
