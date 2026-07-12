"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/animations";

const NAME = "Ro'zalibek";

/**
 * Intro loading overlay. Reveals the name letter-by-letter with a gradient
 * sweep, then fades away to hand off to the hero. Runs ~1.8s.
 */
export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1900);
    // Lock scroll while loading
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              className="flex overflow-hidden text-4xl font-bold tracking-tight md:text-6xl"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {NAME.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="gradient-text-primary inline-block"
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    show: {
                      y: "0%",
                      opacity: 1,
                      transition: { duration: 0.6, ease: EASE },
                    },
                  }}
                >
                  {char === " " ? " " : char}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="h-full w-full rounded-full bg-gradient-to-r from-primary to-secondary"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.3, ease: EASE, delay: 0.4 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
