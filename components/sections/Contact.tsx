"use client";

import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CONTACT_LINKS } from "@/lib/data";
import {
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/LanguageProvider";

type Status = "idle" | "sending" | "sent" | "error";

// Web3Forms access key — obtained for free at https://web3forms.com (delivers to your Gmail)
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function Contact() {
  const { locale } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");

  const isUz = locale === "uz";

  const heading = {
    eyebrow: isUz ? "Aloqa" : "Contact",
    title: isUz ? "Biror narsani birga yaratamiz" : "Let's build something",
    description: isUz
      ? "Loyihangiz bormi yoki shunchaki salom demoqchimisiz? Mening xatlarim doimo ochiq."
      : "Have a project in mind or just want to say hi? My inbox is always open.",
  };

  const labels = {
    name: isUz ? "Ism" : "Name",
    email: isUz ? "Email" : "Email",
    message: isUz ? "Xabar" : "Message",
    namePlaceholder: isUz ? "Ismingiz" : "Your name",
    emailPlaceholder: isUz ? "siz@email.com" : "you@email.com",
    messagePlaceholder: isUz
      ? "Loyihangiz haqida yozing..."
      : "Tell me about your project...",
    send: isUz ? "Xabar yuborish" : "Send Message",
    sending: isUz ? "Yuborilmoqda..." : "Sending...",
    sent: isUz ? "Xabar yuborildi!" : "Message sent!",
    error: isUz ? "Nimadir xato ketdi" : "Something went wrong",
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY ?? "");
    data.append("subject", "New message from your portfolio");
    data.append("from_name", "Portfolio Contact Form");

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("sent");
        form.reset();
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="section-container flex flex-col gap-14">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Contact links */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="flex flex-col gap-4"
          >
            {CONTACT_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                  className="glass-card group flex items-center gap-4 rounded-2xl p-5 transition-shadow hover:shadow-glow"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      {link.label}
                    </p>
                    <p className="truncate font-medium text-white/90">
                      {link.value}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="ml-auto text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
                  />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={slideLeft}
            className="glass-card flex flex-col gap-5 rounded-3xl p-7 md:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={labels.name} htmlFor="name">
                <input
                  id="name"
                  name="name"
                  required
                  placeholder={labels.namePlaceholder}
                  className="input"
                />
              </Field>
              <Field label={labels.email} htmlFor="email">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={labels.emailPlaceholder}
                  className="input"
                />
              </Field>
            </div>
            <Field label={labels.message} htmlFor="message">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder={labels.messagePlaceholder}
                className="input resize-none"
              />
            </Field>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
              whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
              className={`ripple group relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 font-medium text-white shadow-glow transition-shadow hover:shadow-[0_0_45px_-8px_rgba(139,92,246,0.7)] disabled:opacity-90 ${status === "error"
                  ? "bg-gradient-to-r from-red-500 to-rose-600"
                  : "bg-gradient-to-r from-primary to-secondary"
                }`}
            >
              {status === "idle" && (
                <>
                  {labels.send}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
              {status === "sending" && (
                <>
                  <Loader2 size={16} className="animate-spin" /> {labels.sending}
                </>
              )}
              {status === "sent" && (
                <>
                  <Check size={16} /> {labels.sent}
                </>
              )}
              {status === "error" && (
                <>
                  <AlertCircle size={16} /> {labels.error}
                </>
              )}
            </motion.button>
            {!WEB3FORMS_KEY && (
              <p className="text-center text-xs text-amber-400/80">
                ⚠️ Add your Web3Forms access key to <code>.env.local</code> to
                enable email delivery.
              </p>
            )}
          </motion.form>
        </div>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          color: #fafafa;
          transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
        }
        :global(.input::placeholder) {
          color: rgba(255, 255, 255, 0.3);
        }
        :global(.input:focus) {
          outline: none;
          border-color: rgba(59, 130, 246, 0.6);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <motion.label
      variants={slideRight}
      htmlFor={htmlFor}
      className="flex flex-col gap-2 text-sm"
    >
      <span className="font-medium text-white/70">{label}</span>
      {children}
    </motion.label>
  );
}
