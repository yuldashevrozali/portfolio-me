"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";
import { EASE, viewportOnce } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/LanguageProvider";

export default function Experience() {
  const { locale } = useLanguage();

  const localizedExperience = EXPERIENCE.map((item) => {
    if (locale !== "uz") return item;

    const translations: Record<string, { role: string; company: string; description: string }> = {
      "Freelance Frontend Developer": {
        role: "Frilanser Frontend Dasturchi",
        company: "Mustaqil",
        description:
          "Mijozlar uchun maxsus veb-ilovalar va Telegram botlarini ishlab chiqaman, jumladan AvtoQoida (avtoqoida.uz) va to'rt ta ishlab chiqarish botlari. Hozirda AvtoQoida platformasini yanada rivojlantirish va takomillashtirish ustida ishlayman.",
      },
      "Frontend Developer": {
        role: "Frontend Dasturchi",
        company: "MXSOFT",
        description:
          "Kuryer marshrutlarini kuzatish uchun yaratilgan ilovada frontend dasturchi sifatida ishladim. Leaflet, JavaScript va React yordamida interaktiv xarita va real-time marshrut vizualizatsiyasi xususiyatlarini ishlab chiqdim.",
      },
      "Frontend Teacher": {
        role: "Frontend O'qituvchisi",
        company: "Unco Academy",
        description:
          "20+ talabalarga frontend dasturlash asoslarini o'rgatdim: HTML, CSS va JavaScript yaxshi amaliyotlari, amaliy loyihalar ustida ishlash va shaxsiy fikr-mulohazalar yordamida ularning rivojlanishiga ko'mak berdim.",
      },
      Teacher: {
        role: "O'qituvchi",
        company: "RISHTSOFT — Onlayn O'quv Markazi",
        description:
          "Talabalar bilan onlayn darslar olib bordim, ularning ta'lim jarayoniga ko'maklashdim, kurs materiallarini ishlab chiqib berdim va jamoa bilan birga onlayn ta'lim sifati oshirishga hissa qo'shdim.",
      },
      "Frontend Development Course": {
        role: "Frontend Dasturlash Kursi",
        company: "Najot Ta'lim",
        description:
          "Farg'onada Frontend Dasturlash bo'yicha keng qamrovli kursni yakunladim. Jamoa bilan birga bir nechta loyihalar qurib, HTML, CSS, JavaScript va React bo'yicha amaliy tajribaga ega bo'ldim.",
      },
    };

    return {
      ...item,
      ...translations[item.role],
    };
  });

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="section-container flex flex-col gap-14">
        <SectionHeading
          eyebrow={locale === "uz" ? "Tajriba" : "Experience"}
          title={locale === "uz" ? "Tajriba va ta'lim" : "Experience & Education"}
          description={
            locale === "uz"
              ? "Kasbga oid yo'limni shakllantirgan lavhalar va o'rganish bosqichlari."
              : "A timeline of the roles and learning that shaped my craft."
          }
        />

        <div className="relative mx-auto w-full max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-primary/60 via-white/10 to-transparent md:left-1/2" />

          <div className="flex flex-col gap-10">
            {localizedExperience.map((item, i) => (
              <motion.div
                key={`${item.company}-${i}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, ease: EASE }}
                className={`relative flex items-start gap-6 md:w-1/2 ${i % 2 === 0
                  ? "md:self-start md:pr-12"
                  : "md:translate-x-full md:self-end md:pl-12"
                  }`}
              >
                {/* Node */}
                <span
                  className={`absolute left-4 top-2 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-white/15 bg-card shadow-glow md:left-auto ${i % 2 === 0 ? "md:-right-4 md:left-auto" : "md:-left-4"
                    }`}
                >
                  {item.kind === "education" ? (
                    <GraduationCap size={14} className="text-secondary" />
                  ) : (
                    <Briefcase size={14} className="text-primary" />
                  )}
                </span>

                <div className="glass-card ml-10 flex-1 rounded-2xl p-6 md:ml-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {item.role}
                    </h3>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {item.company}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
