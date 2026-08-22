"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { CONTACT_LINKS } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pb-10 pt-16">
      {/* Gradient divider line */}
      <div className="section-container">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <div className="section-container mt-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary text-sm font-black text-white">
            R
          </span>
          <span className="text-xs text-white/50 sm:text-sm">
            © {year} Ro&apos;zalibek. Crafted with care.
          </span>
        </div>

        <div className="flex items-center gap-2">
          {CONTACT_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={link.label}
                whileHover={{ y: -4, scale: 1.1 }}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white/60 transition-colors hover:border-primary/40 hover:text-white hover:shadow-glow"
              >
                <Icon size={18} />
              </motion.a>
            );
          })}
          <motion.button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            whileHover={{ y: -4 }}
            aria-label="Back to top"
            className="ml-2 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-glow"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
