"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode, MouseEvent } from "react";

type Variant = "primary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

const base =
  "ripple group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60";

const variants: Record<Variant, string> = {
  primary:
    "text-white shadow-glow bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_45px_-8px_rgba(139,92,246,0.7)]",
  ghost:
    "text-white/80 hover:text-white glass hover:border-white/20 hover:bg-white/[0.06]",
};

function handleRipple(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--ripple-x", `${e.clientX - rect.left}px`);
  el.style.setProperty("--ripple-y", `${e.clientY - rect.top}px`);
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  external,
  ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  const content = (
    <motion.span
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="contents"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        onMouseDown={handleRipple}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseDown={handleRipple}
      className={classes}
    >
      {content}
    </button>
  );
}
