"use client";

import { motion } from "framer-motion";
import { Code2, Rocket } from "lucide-react";
import Image from "next/image";
import { ABOUT } from "@/lib/data";
import { useLanguage } from "@/components/LanguageProvider";
import {
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import CountUp from "@/components/ui/CountUp";

export default function About() {
  const { locale } = useLanguage();
  const paragraphs =
    locale === "uz"
      ? [
        "Men Farg'ona, O'zbekistondan bo'lgan Junior Frontend Developer bo'lib, tez, zamonaviy va foydalanuvchi qulay veb-tajribalar yaratishga qaratilganman. Frontend Development ta'limini Najot Ta'limda tamomlaganman va real loyihalarda ishlash tajribam bor.",
        "Hozir men freelance developer sifatida veb-ilovalar va Telegram botlarni yarataman, jumladan AvtoQoida. Shuningdek, MXSOFTda kuryer kuzatuvchi ilovada ishladim va 20+ talabalarga frontend dasturlashni o'rgatdim.",
      ]
      : ABOUT.paragraphs;

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="section-container flex flex-col gap-14">
        <SectionHeading
          eyebrow={locale === "uz" ? "Men haqimda" : "About"}
          title={locale === "uz" ? "Bir oz mening haqimda" : "A bit about me"}
          description={
            locale === "uz"
              ? "Tez, zamonaviy va ishonchli raqamli mahsulotlarni yaratishga qaratilganman."
              : "Turning ideas into fast, elegant, and reliable digital products."
          }
        />

        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Image / visual card */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={slideRight}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/30 opacity-50 blur-2xl" />
            <div className="glass-card group relative aspect-[4/5] overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-white/20 shadow-glow-lg">
                  <Image
                    src="/profile.png"
                    alt="Ro'zalibek Yo'ldashev"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/10 bg-background/50 px-4 py-3 backdrop-blur-md">
                <span className="text-sm font-medium text-white">
                  Ro&apos;zalibek
                </span>
                <span className="text-xs text-white/50">Frontend Dev</span>
              </div>
            </div>
          </motion.div>

          {/* Text + stats */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={slideLeft}
            className="flex flex-col gap-6"
          >
            <div className="flex gap-3">
              <span className="glass inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-white/70">
                <Code2 size={14} className="text-primary" /> Clean Code
              </span>
              <span className="glass inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-white/70">
                <Rocket size={14} className="text-secondary" /> Performance
              </span>
            </div>

            {paragraphs.map((p, i) => (
              <p key={i} className="text-balance leading-relaxed text-white/60">
                {p}
              </p>
            ))}

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {ABOUT.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="glass-card cursor-hover flex flex-col items-center gap-1 rounded-2xl px-3 py-5 text-center transition-shadow hover:shadow-glow"
                >
                  <span className="text-2xl font-bold text-white sm:text-3xl">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-xs text-white/50">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
