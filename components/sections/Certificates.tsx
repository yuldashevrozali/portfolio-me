"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { CERTIFICATES } from "@/lib/data";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-24 md:py-32">
      <div className="section-container flex flex-col gap-14">
        <SectionHeading
          eyebrow="Certificates"
          title="Credentials"
          description="Continuous learning is part of the craft."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mx-auto grid w-full max-w-3xl gap-5 sm:grid-cols-2"
        >
          {CERTIFICATES.map((cert) => (
            <motion.div
              key={cert.title}
              variants={fadeUp}
              whileHover={{ y: -8, rotate: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="glass-card group flex flex-col gap-4 rounded-2xl p-6 transition-shadow hover:shadow-glow"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary transition-transform duration-500 group-hover:scale-110">
                  <Award size={20} />
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/50">
                  {cert.year}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold leading-snug text-white">
                  {cert.title}
                </h3>
                <p className="mt-1 text-sm text-white/50">{cert.issuer}</p>
              </div>
              {cert.certificate && (
                <a
                  href={cert.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-secondary"
                >
                  View certificate <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
