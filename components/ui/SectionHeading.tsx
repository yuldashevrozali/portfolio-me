"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerContainer}
      className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : "items-start text-left"
        }`}
    >
      <motion.span
        variants={fadeUp}
        className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="max-w-2xl text-balance text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
      >
        <span className="gradient-text">{title}</span>
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="max-w-xl text-balance text-sm leading-relaxed text-white/50 sm:text-base"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
