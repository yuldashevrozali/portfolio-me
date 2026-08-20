"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Github, Send, Star } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/data";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/LanguageProvider";

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${project.gradient}`}
    >
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-7xl drop-shadow-lg transition-transform duration-700 group-hover:scale-110">
          {project.emoji}
        </span>
      </div>
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/80 transition-colors hover:border-white/25 hover:text-white"
        >
          <Github size={15} /> Code
        </a>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-secondary px-3 py-2 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.04]"
        >
          Live Demo <ArrowUpRight size={15} />
        </a>
      )}
    </div>
  );
}

function TechTags({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <li
          key={t}
          className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-white/60"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function getLocalizedProject(project: Project, locale: "uz" | "en") {
  if (locale !== "uz") return project;

  const translations: Record<string, { description: string; features?: string[] }> = {
    AvtoQoida: {
      description:
        "Haydovchilik qoidalari va trafik topshiriqlarini o'rganish uchun mo'ljallangan keng qamrovli platforma. Interaktiv darslar, real imtihon simulyatsiyasi va taraqqiyotni kuzatish — o'quvchilarga haydovchilik imtihonini ishonch bilan topshirishga yordam beradi. 200+ o'quvchi foydalanadi va hozirda 1 ta driving school tomonidan qo'llanilmoqda.",
      features: [
        "Interaktiv darslar",
        "Real imtihon simulyatsiyasi",
        "Taraqqiyotni kuzatish",
      ],
    },
    "Dokon — Online Store Platform": {
      description:
        "Kichik bizneslar uchun yaratilgan to'liq funksionalli internet-do'kon platformasi. Mahsulot boshqaruvi, buyurtma kuzatuvi va admin paneli mavjud.",
      features: [
        "Mahsulot boshqaruvi",
        "Buyurtma kuzatuvi",
        "Admin panel",
      ],
    },
    "Akfa Sigma — Door & Window Company": {
      description:
        "Eshiklar va derazalar ishlab chiqaruvchi kompaniya uchun korporativ veb-sayt. Mahsulot katalogi, aloqa formalari va sanoat korxonalari uchun yaratilgan zamonaviy dizayn.",
      features: [
        "Mahsulot katalogi",
        "Aloqa formalari",
        "Zamonaviy sanoat dizayni",
      ],
    },
    "Milliy Sertifikat Bot": {
      description:
        "Test markazlari va maktablar uchun Telegram bot. Testlar AI orqali hal etiladi (Rasch Model). Har kim bepul testlar yaratishi mumkin, to'liq admin panel nazorati bilan.",
      features: [
        "AI bilan test yechish",
        "Har kim uchun bepul test yaratish",
        "To'liq admin panel",
        "Telegram botlari orqali 200+ foydalanuvchi",
      ],
    },
    "IELTS Zone Farg'ona Bot": {
      description:
        "IELTS Zone Farg'ona uchun tavsiya asosidagi Telegram bot. Foydalanuvchilar do'stlarini taklif qilish orqali ochkolar to'playdi va ularni IELTS mock testlari uchun almashadi.",
      features: [
        "Avtomatik ballar bilan referal tizim",
        "TOP foydalanuvchilar reytingi",
        "Ballarni mock testlarga almashish",
        "Telegram botlari bo'yicha 3,000+ foydalanuvchi",
      ],
    },
    "Buxoro Xorazm Nukus Taksi Bot": {
      description:
        "Shaharlararo taksi buyurtma bot. Yo'lovchilar sayohat ma'lumotlarini yuboradi, buyurtmalar avtomatik tarzda drayverlar guruhlari tomon yuboriladi.",
      features: [
        "4 shahar yo'nalishi",
        "Buyurtmalarni drayverlarga avtomatik yuborish",
        "Drayver va yo'lovchi statistikasi",
      ],
    },
    "IELTS ZONE Voting Bot": {
      description:
        "Ta'lim markazlari uchun rivojlangan ovoz berish boti. O'quvchilar sevimli o'qituvchilar va guruhlar uchun ovoz beradilar, qo'shimcha ovozlar uchun referallar mavjud, TOP 15 reytingi va sovg'alar bo'limi ishlab turibdi.",
      features: [
        "Har foydalanuvchi uchun 1 ovoz + referal bonusi",
        "TOP 15 guruh reytingi",
        "Sovg'alar va mukofotlar bo'limi",
        "Telegram botlari bo'yicha 7,000+ foydalanuvchi",
      ],
    },
  };

  return { ...project, ...translations[project.title] };
}

export default function Projects() {
  const { locale } = useLanguage();
  const featured = PROJECTS.find((p) => p.featured);
  const web = PROJECTS.filter((p) => !p.featured && p.category === "web");
  const bots = PROJECTS.filter((p) => p.category === "bot");
  const localizedFeatured = featured ? getLocalizedProject(featured, locale) : null;
  const localizedWeb = web.map((project) => getLocalizedProject(project, locale));
  const localizedBots = bots.map((project) => getLocalizedProject(project, locale));

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="section-container flex flex-col gap-14">
        <SectionHeading
          eyebrow={locale === "uz" ? "Loyihalar" : "Projects"}
          title={locale === "uz" ? "Tanlangan ishlar" : "Selected work"}
          description={
            locale === "uz"
              ? "Men yaratgan mahsulotlar, veb-ilovalar va botlar to'plami."
              : "A collection of products, apps, and bots I've designed and built."
          }
        />

        {/* Featured project */}
        {localizedFeatured && (
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="glass-card group relative grid overflow-hidden rounded-3xl transition-shadow hover:shadow-glow-lg lg:grid-cols-2"
          >
            <div className="relative min-h-[18rem] overflow-hidden lg:min-h-[24rem]">
              <ProjectVisual project={localizedFeatured} />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-background/60 px-3 py-1.5 text-xs font-medium text-amber-300 backdrop-blur-md">
                <Star size={13} className="fill-amber-300" />
                {locale === "uz" ? "Tanlangan loyiha" : "Featured Project"}
              </span>
            </div>

            <div className="flex flex-col justify-center gap-5 p-8 md:p-10">
              <h3 className="text-3xl font-bold text-white">{localizedFeatured.title}</h3>
              <p className="text-balance leading-relaxed text-white/60">
                {localizedFeatured.description}
              </p>
              <TechTags tech={localizedFeatured.tech} />
              <div className="pt-2">
                <ProjectLinks project={localizedFeatured} />
              </div>
            </div>
          </motion.article>
        )}

        {/* Web project grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-2"
        >
          {localizedWeb.map((project) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -10, rotate: -0.5 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="glass-card group relative flex flex-col overflow-hidden rounded-2xl transition-shadow hover:shadow-glow"
            >
              <div className="relative h-48 overflow-hidden">
                <ProjectVisual project={project} />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">
                  {project.description}
                </p>
                {project.features && (
                  <ul className="flex flex-1 flex-col gap-1.5">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-white/70"
                      >
                        <Check size={14} className="shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                <TechTags tech={project.tech} />
                <div className="pt-1 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <ProjectLinks project={project} />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Telegram bots */}
        {bots.length > 0 && (
          <div className="flex flex-col gap-6">
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              className="flex items-center gap-2 text-lg font-semibold text-white/80"
            >
              <span className="text-xl">🤖</span>
              {locale === "uz" ? "Telegram botlari" : "Telegram Bots"}
            </motion.h3>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer}
              className="grid gap-6 md:grid-cols-2"
            >
              {localizedBots.map((bot) => (
                <motion.article
                  key={bot.title}
                  variants={fadeUp}
                  whileHover={{ y: -8, rotate: -0.5 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="glass-card group flex flex-col gap-4 rounded-2xl p-6 transition-shadow hover:shadow-glow"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${bot.gradient} text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                    >
                      {bot.emoji}
                    </div>
                    <h4 className="text-lg font-semibold leading-snug text-white">
                      {bot.title}
                    </h4>
                  </div>

                  <p className="text-sm leading-relaxed text-white/55">
                    {bot.description}
                  </p>

                  {bot.features && (
                    <ul className="flex flex-col gap-2">
                      {bot.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-white/70"
                        >
                          <Check
                            size={15}
                            className="shrink-0 text-primary"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
                    <TechTags tech={bot.tech} />
                  </div>

                  {bot.demo && (
                    <a
                      href={bot.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-secondary px-3 py-2 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.04]"
                    >
                      <Send size={14} /> {locale === "uz" ? "Botni ochish" : "Open Bot"}
                    </a>
                  )}
                </motion.article>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
