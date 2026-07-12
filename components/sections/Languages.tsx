"use client";

import { motion } from "framer-motion";
import { FileText, Languages as LanguagesIcon } from "lucide-react";
import { LANGUAGES } from "@/lib/data";
import { fadeUp, staggerContainer, viewportOnce, EASE } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";

const IELTS_MAX = 9;

export default function Languages() {
  return (
    <section id="languages" className="relative py-24 md:py-32">
      <div className="section-container flex flex-col gap-14">
        <SectionHeading
          eyebrow="Languages"
          title="Languages I speak"
          description="Communicating clearly across languages and cultures."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-2"
        >
          {LANGUAGES.map((lang) => (
            <motion.div
              key={lang.name}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="glass-card group flex flex-col gap-5 rounded-2xl p-6 transition-shadow hover:shadow-glow md:p-7"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-3xl">
                  {lang.flag}
                </span>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {lang.name}
                    </h3>
                    {lang.cefr && (
                      <span className="rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                        CEFR {lang.cefr}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/50">{lang.level}</p>
                </div>
                <LanguagesIcon
                  size={18}
                  className="text-white/20 transition-colors group-hover:text-primary"
                />
              </div>

              {/* Overall proficiency bar */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>Proficiency</span>
                  {lang.note && <span>{lang.note}</span>}
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.proficiency}%` }}
                    viewport={viewportOnce}
                    transition={{ duration: 1.1, ease: EASE }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
              </div>

              {/* IELTS sub-scores */}
              {lang.scores && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {lang.scores.map((score) => (
                    <div
                      key={score.label}
                      className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-2 py-3 text-center"
                    >
                      <span className="text-xl font-bold text-white">
                        {score.value}
                      </span>
                      <span className="text-[11px] text-white/45">
                        {score.label}
                      </span>
                      <div className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${(parseFloat(score.value) / IELTS_MAX) * 100}%`,
                          }}
                          viewport={viewportOnce}
                          transition={{ duration: 1, ease: EASE }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Certificate link */}
              {lang.certificate && (
                <a
                  href={lang.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.03]"
                >
                  <FileText size={16} /> View IELTS Certificate
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
