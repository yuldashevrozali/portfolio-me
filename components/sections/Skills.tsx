"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Database,
  Layers,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SKILLS } from "@/lib/data";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/LanguageProvider";

const ICONS: Record<string, LucideIcon> = {
  Frontend: Layers,
  Backend: Boxes,
  Database: Database,
  Tools: Wrench,
};

export default function Skills() {
  const { locale } = useLanguage();

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="section-container flex flex-col gap-14">
        <SectionHeading
          eyebrow={locale === "uz" ? "Ko'nikmalar" : "Skills"}
          title={locale === "uz" ? "Mening Ko'nikmalarim" : "My toolkit"}
          description={
            locale === "uz"
              ? "Mahsulotlarni hayotga olib chiqishda ishlatadigan texnologiyalar va vositalar."
              : "Technologies and tools I use to bring products to life."
          }
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid gap-6 sm:grid-cols-2"
        >
          {SKILLS.map((category) => {
            const Icon = ICONS[category.title] ?? Layers;
            return (
              <motion.div
                key={category.title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-shadow hover:shadow-glow"
              >
                {/* Hover gradient wash */}
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 to-secondary/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/10 group-hover:to-secondary/10 group-hover:opacity-100" />

                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon size={20} />
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {category.title}
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.li
                      key={skill}
                      whileHover={{ scale: 1.08, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="cursor-hover rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-white hover:shadow-[0_0_20px_-6px_rgba(59,130,246,0.6)]"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
