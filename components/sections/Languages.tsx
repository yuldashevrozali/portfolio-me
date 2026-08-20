"use client";

import { motion } from "framer-motion";
import { FileText, Languages as LanguagesIcon } from "lucide-react";
import { LANGUAGES } from "@/lib/data";
import { fadeUp, staggerContainer, viewportOnce, EASE } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/LanguageProvider";

const IELTS_MAX = 9;

export default function Languages() {
  const { locale } = useLanguage();

  return (
    <section id="languages" className="relative py-24 md:py-32">
      <div className="section-container flex flex-col gap-14">
        <SectionHeading
          eyebrow={locale === "uz" ? "Tillar" : "Languages"}
          title={locale === "uz" ? "Menga qanday tillar ma'lum" : "Languages I speak"}
          description={
            locale === "uz"
              ? "Til orqali aniq va qulay muloqot qilish."
              : "Communicating clearly across languages and cultures."
          }
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
                  <h3 className="text-lg font-semibold text-white">{lang.name}</h3>
                  <p className="text-sm text-white/50">{lang.level}</p>
                </div>
                <LanguagesIcon
                  size={18}
                  className="text-white/20 transition-colors group-hover:text-primary"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>{locale === "uz" ? "Bilim darajasi" : "Proficiency"}</span>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
