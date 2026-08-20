"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { FileText, Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { useActiveSection } from "@/hooks/useActiveSection";
import { EASE } from "@/lib/animations";
import { useLanguage } from "@/components/LanguageProvider";

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const { scrollY } = useScroll();
  const { locale, setLocale } = useLanguage();
  const navLabels = {
    home: locale === "uz" ? "Asosiy" : "Home",
    about: locale === "uz" ? "Men haqimda" : "About",
    projects: locale === "uz" ? "Loyihalar" : "Projects",
    skills: locale === "uz" ? "Ko'nikmalar" : "Skills",
    contact: locale === "uz" ? "Aloqa" : "Contact",
  };

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
      >
        <motion.nav
          animate={{
            marginTop: scrolled ? 12 : 20,
            paddingTop: scrolled ? 8 : 12,
            paddingBottom: scrolled ? 8 : 12,
            width: scrolled ? "min(56rem, 100%)" : "min(64rem, 100%)",
          }}
          transition={{ duration: 0.4, ease: EASE }}
          className={`flex items-center justify-between gap-4 rounded-2xl px-4 md:px-6 transition-[background,border,box-shadow] duration-500 ${scrolled
            ? "border border-white/10 bg-background/70 shadow-card backdrop-blur-xl"
            : "border border-transparent bg-transparent"
            }`}
        >
          {/* Logo */}
          <button
            onClick={() => go("home")}
            className="cursor-hover flex items-center gap-2 text-lg font-bold tracking-tight"
            aria-label="Go to home"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary text-sm font-black text-white shadow-glow">
              R
            </span>
            <span className="hidden gradient-text sm:inline">Ro&apos;zalibek</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  className="relative rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg border border-white/10 bg-white/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={
                      active === link.id ? "text-white" : undefined
                    }
                  >
                    {navLabels[link.id as keyof typeof navLabels] ?? link.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1 md:flex">
              <button
                onClick={() => setLocale("uz")}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${locale === "uz"
                  ? "bg-primary text-white"
                  : "text-white/60 hover:text-white"
                  }`}
                aria-label="Set language to Uzbek"
              >
                UZ
              </button>
              <button
                onClick={() => setLocale("en")}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${locale === "en"
                  ? "bg-primary text-white"
                  : "text-white/60 hover:text-white"
                  }`}
                aria-label="Set language to English"
              >
                EN
              </button>
            </div>
            <Link
              href="/resume"
              className="hidden items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/20 hover:text-white md:inline-flex"
            >
              <FileText size={15} /> {locale === "uz" ? "CV" : "Resume"}
            </Link>
            <button
              onClick={() => go("contact")}
              className="hidden rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.03] md:inline-flex"
            >
              {locale === "uz" ? "Bog'lanamiz" : "Let&apos;s talk"}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute inset-x-4 top-24 rounded-2xl border border-white/10 bg-card/90 p-3 shadow-card backdrop-blur-xl"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06 } } }}
                className="flex flex-col gap-1"
              >
                {NAV_LINKS.map((link) => (
                  <motion.li
                    key={link.id}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <button
                      onClick={() => go(link.id)}
                      className={`w-full rounded-xl px-4 py-3 text-left text-base font-medium transition-colors ${active === link.id
                        ? "bg-white/[0.06] text-white"
                        : "text-white/60 hover:text-white"
                        }`}
                    >
                      {navLabels[link.id as keyof typeof navLabels] ?? link.label}
                    </button>
                  </motion.li>
                ))}
                <motion.li
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href="/resume"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-base font-medium text-white/60 transition-colors hover:text-white"
                  >
                    <FileText size={17} /> {locale === "uz" ? "CV" : "Resume"}
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
