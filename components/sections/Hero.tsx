"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, FileText, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { HERO } from "@/lib/data";
import { EASE } from "@/lib/animations";
import Button from "@/components/ui/Button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero() {
  // Parallax for the avatar card
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 15,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 15,
  });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center pt-28 md:pt-24"
    >
      <div className="section-container grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left column */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={item}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white/70"
          >
            <span className="text-lg">👋</span>
            {HERO.greeting}, welcome to my corner of the web
          </motion.span>

          <div className="space-y-2">
            <motion.p
              variants={item}
              className="text-lg font-medium text-white/60"
            >
              I&apos;m
            </motion.p>
            <motion.h1
              variants={item}
              className="text-balance text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
            >
              <span className="gradient-text-primary">{HERO.name}</span>
            </motion.h1>
            <motion.h2
              variants={item}
              className="pt-1 text-2xl font-semibold tracking-tight text-white/90 sm:text-3xl md:text-4xl"
            >
              {HERO.role}
            </motion.h2>
          </div>

          <motion.p
            variants={item}
            className="max-w-md text-balance text-lg leading-relaxed text-white/50"
          >
            {HERO.tagline}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3 pt-1">
            <Button href="#projects">
              View Projects
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
            <Button href="#contact" variant="ghost">
              <Mail size={16} />
              Contact Me
            </Button>
            <Button href="/resume" variant="ghost">
              <FileText size={16} />
              Resume
            </Button>
          </motion.div>

          {/* Tech badges */}
          <motion.ul
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } },
            }}
            className="flex flex-wrap gap-2 pt-4"
          >
            {HERO.badges.map((badge) => (
              <motion.li
                key={badge}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 8 },
                  show: { opacity: 1, scale: 1, y: 0 },
                }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="glass cursor-hover rounded-lg px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-primary/40 hover:text-white"
              >
                {badge}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right column — avatar card with parallax + float */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          style={{ perspective: 1000 }}
          className="relative mx-auto hidden w-full max-w-sm lg:block"
        >
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="animate-float"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/40 to-secondary/40 opacity-60 blur-3xl" />

            <div className="glass-card relative overflow-hidden rounded-3xl p-8">
              {/* Avatar photo */}
              <div className="relative mx-auto grid h-44 w-44 place-items-center">
                <div className="absolute inset-0 animate-float-slow rounded-full bg-gradient-to-br from-primary to-secondary opacity-90 blur-md" />
                <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-white/20 shadow-glow">
                  <Image
                    src="/profile.png"
                    alt="Ro'zalibek Yo'ldashev"
                    fill
                    sizes="160px"
                    className="object-cover"
                    priority
                  />
                </div>
                <Sparkles
                  className="absolute -right-1 top-2 text-secondary drop-shadow"
                  size={22}
                />
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-white/50">Status</span>
                  <span className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    Available for work
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-white/50">Focus</span>
                  <span className="text-sm font-medium text-white/90">
                    Web & Telegram Bots
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-white/50">Based in</span>
                  <span className="text-sm font-medium text-white/90">
                    Uzbekistan 🇺🇿
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
