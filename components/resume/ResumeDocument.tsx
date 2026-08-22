"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  Briefcase,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Send,
  Github,
  Languages as LanguagesIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  PROFILE,
  EXPERIENCE,
  SKILLS,
  CERTIFICATES,
  LANGUAGES,
} from "@/lib/data";

/**
 * A standalone, print-optimized resume. On screen it matches the site's
 * premium dark theme; when printed (or saved as PDF) it switches to a clean,
 * ink-friendly A4 layout via the print styles at the bottom.
 */
export default function ResumeDocument() {
  const work = EXPERIENCE.filter((e) => e.kind === "work");
  const education = EXPERIENCE.filter((e) => e.kind === "education");

  return (
    <div className="min-h-screen bg-background py-10 print:bg-white print:py-0">
      {/* Screen-only toolbar */}
      <div className="no-print mx-auto mb-8 flex max-w-3xl flex-col items-start justify-between gap-3 px-4 sm:flex-row sm:items-center sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} /> Back to portfolio
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.03]"
        >
          <Download size={16} /> Download PDF
        </button>
      </div>

      {/* Resume sheet */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="resume-sheet mx-auto grid max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-card shadow-card print:max-w-none print:rounded-none print:border-0 print:shadow-none md:grid-cols-[1fr_1.6fr]"
      >
        {/* Sidebar */}
        <aside className="flex flex-col gap-7 bg-gradient-to-b from-primary/15 to-secondary/10 p-7 print:bg-white">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-white/20 shadow-glow print:border-black/10">
              <Image
                src={PROFILE.photo}
                alt={PROFILE.fullName}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white print:text-black">
                {PROFILE.fullName}
              </h1>
              <p className="mt-0.5 text-sm text-primary">{PROFILE.role}</p>
            </div>
          </div>

          <SidebarBlock title="Contact">
            <ContactRow icon={MapPin}>{PROFILE.location}</ContactRow>
            <ContactRow icon={Mail} href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </ContactRow>
            <ContactRow icon={Send} href={PROFILE.telegramUrl}>
              {PROFILE.telegram}
            </ContactRow>
            <ContactRow icon={Github} href={PROFILE.githubUrl}>
              {PROFILE.github}
            </ContactRow>
          </SidebarBlock>

          <SidebarBlock title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {SKILLS.flatMap((c) => c.skills).map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-1 text-[11px] text-white/80 print:border-black/15 print:bg-black/[0.03] print:text-black"
                >
                  {skill}
                </span>
              ))}
            </div>
          </SidebarBlock>

          <SidebarBlock title="Languages" icon={LanguagesIcon}>
            <ul className="flex flex-col gap-2">
              {LANGUAGES.map((lang) => (
                <li key={lang.name} className="text-sm">
                  <span className="font-medium text-white print:text-black">
                    {lang.flag} {lang.name}
                  </span>
                  <span className="block text-xs text-white/55 print:text-black/60">
                    {lang.level}
                  </span>
                </li>
              ))}
            </ul>
          </SidebarBlock>
        </aside>

        {/* Main */}
        <div className="flex flex-col gap-7 p-7 print:p-8">
          <MainBlock title="Profile">
            <p className="text-sm leading-relaxed text-white/70 print:text-black/75">
              {PROFILE.summary}
            </p>
          </MainBlock>

          <MainBlock title="Work Experience" icon={Briefcase}>
            <div className="flex flex-col gap-5">
              {work.map((item) => (
                <TimelineEntry
                  key={item.company}
                  title={item.role}
                  subtitle={item.company}
                  period={item.period}
                  description={item.description}
                />
              ))}
            </div>
          </MainBlock>

          <MainBlock title="Education" icon={GraduationCap}>
            <div className="flex flex-col gap-5">
              {education.map((item) => (
                <TimelineEntry
                  key={item.company}
                  title={item.role}
                  subtitle={item.company}
                  period={item.period}
                  description={item.description}
                />
              ))}
            </div>
          </MainBlock>

          <MainBlock title="Certificates" icon={Award}>
            <ul className="flex flex-col gap-2.5">
              {CERTIFICATES.map((cert) => (
                <li key={cert.title} className="text-sm">
                  <span className="font-medium text-white print:text-black">
                    {cert.title}
                  </span>
                  <span className="block text-xs text-white/55 print:text-black/60">
                    {cert.issuer} · {cert.year}
                  </span>
                </li>
              ))}
            </ul>
          </MainBlock>
        </div>
      </motion.article>

      <PrintStyles />
    </div>
  );
}

function SidebarBlock({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: typeof Mail;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/45 print:text-black/50">
        {Icon && <Icon size={13} />} {title}
      </h2>
      {children}
    </section>
  );
}

function MainBlock({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: typeof Mail;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="flex items-center gap-2 border-b border-white/10 pb-2 text-sm font-bold uppercase tracking-wide text-white print:border-black/15 print:text-black">
        {Icon && <Icon size={15} className="text-primary" />} {title}
      </h2>
      {children}
    </section>
  );
}

function ContactRow({
  icon: Icon,
  href,
  children,
}: {
  icon: typeof Mail;
  href?: string;
  children: React.ReactNode;
}) {
  const content = (
    <span className="flex items-center gap-2 text-xs text-white/70 print:text-black/70">
      <Icon size={13} className="shrink-0 text-primary" />
      <span className="break-all">{children}</span>
    </span>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
}

function TimelineEntry({
  title,
  subtitle,
  period,
  description,
}: {
  title: string;
  subtitle: string;
  period: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <h3 className="font-semibold text-white print:text-black">{title}</h3>
        <span className="text-xs text-white/45 print:text-black/55">
          {period}
        </span>
      </div>
      <p className="text-xs font-medium text-primary">{subtitle}</p>
      <p className="mt-0.5 text-sm leading-relaxed text-white/60 print:text-black/70">
        {description}
      </p>
    </div>
  );
}

function PrintStyles() {
  return (
    <style jsx global>{`
      @media print {
        @page {
          size: A4;
          margin: 12mm;
        }
        .no-print {
          display: none !important;
        }
        html,
        body {
          background: #ffffff !important;
        }
        .resume-sheet {
          break-inside: avoid;
        }
      }
    `}</style>
  );
}
