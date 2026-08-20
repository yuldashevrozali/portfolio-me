import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "uz" | "en";

export const LOCALE_OPTIONS: Locale[] = ["uz", "en"];

export const TEXT = {
  uz: {
    nav: {
      home: "Asosiy",
      about: "Men haqimda",
      projects: "Loyihalar",
      skills: "Ko'nikmalar",
      contact: "Aloqa",
    },
    hero: {
      greeting: "Salom",
      welcome: "Veb-saytimga xush kelibsiz",
      iam: "Men",
      tagline: "Men zamonaviy veb-ilovalar va Telegram botlarni yarataman.",
      viewProjects: "Loyihalarni ko'rish",
      contactMe: "Bog'lanish",
      resume: "CV",
      letsTalk: "Bog'lanamiz",
      badges: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind",
        "Firebase",
        "Node.js",
        "Telegram Bot",
        "Postman",
      ],
    },
    about: {
      eyebrow: "Men haqimda",
      title: "Bir oz mening haqimda",
      description: "Tez, zamonaviy va foydalanuvchi uchun qulay mahsulotlar yaratishga e'tibor qarataman.",
      paragraphs: [
        "Men Farg'ona, O'zbekistondan bo'lgan Junior Frontend Developer bo'lib, tez, zamonaviy va foydalanuvchi qulay veb-tajribalar yaratishga qaratilganman. Frontend Development ta'limini Najot Ta'limda tamomlaganman va real loyihalarda ishlash tajribam bor.",
        "Hozir men freelance developer sifatida veb-ilovalar va Telegram botlarni yarataman, jumladan AvtoQoida. Shuningdek, MXSOFTda kuryer kuzatuvchi ilovada ishladim va 20+ talabalarga frontend dasturlashni o'rgatdim.",
      ],
    },
    sectionHeadings: {
      skills: {
        eyebrow: "Ko'nikmalar",
        title: "Mening asboblarim",
        description: "Mahsulotlarni hayotga olib chiqishda ishlatadigan texnologiyalar va vositalar.",
      },
      languages: {
        eyebrow: "Tillar",
        title: "Menga qanday tillar ma'lum",
        description: "Til orqali aniq va qulay muloqot qilish.",
      },
      projects: {
        eyebrow: "Loyihalar",
        title: "Tanlangan ishlar",
        description: "Men yaratgan web-ilovalar, saytlar va botlar to'plami.",
      },
      experience: {
        eyebrow: "Tajriba",
        title: "Tajriba va ta'lim",
        description: "Mening kasbiy yo'limni shakllantirgan lavhalar.",
      },
      certificates: {
        eyebrow: "Sertifikatlar",
        title: "Hisobga olinadigan ma'lumotlar",
        description: "Doimiy o'rganish va rivojlanish qismi.",
      },
      contact: {
        eyebrow: "Aloqa",
        title: "Biror narsani birga yaratamiz",
        description: "Loyihangiz bormi yoki shunchaki salom demoqchimisiz? Xat qoldirishni xush ko'raman.",
      },
    },
    projects: {
      telegramBots: "Telegram botlari",
    },
    footer: {
      crafted: "Ehtiyotkorlik bilan yaratilgan.",
    },
    contactForm: {
      name: "Ism",
      email: "Email",
      message: "Xabar",
      placeholders: {
        name: "Ismingiz",
        email: "siz@email.com",
        message: "Loyihangiz haqida yozing...",
      },
      send: "Xabar yuborish",
      sending: "Yuborilmoqda...",
      sent: "Xabar yuborildi!",
      error: "Nimadir xato ketdi",
    },
    languageToggle: {
      label: "Til",
      uz: "UZ",
      en: "EN",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello",
      welcome: "Welcome to my corner of the web",
      iam: "I'm",
      tagline: "I build modern web applications and Telegram Bots.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      resume: "Resume",
      letsTalk: "Let's talk",
      badges: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind",
        "Firebase",
        "Node.js",
        "Telegram Bot",
        "Postman",
      ],
    },
    about: {
      eyebrow: "About",
      title: "A bit about me",
      description: "Turning ideas into fast, elegant, and reliable digital products.",
      paragraphs: [
        "I'm a Junior Frontend Developer from Fergana, Uzbekistan, focused on building fast, modern, and user-friendly web experiences. I completed my Frontend Development training at Najot Ta'lim and have experience working on real-world projects.",
        "I currently work as a freelance developer, building web applications and Telegram bots, including AvtoQoida. I've also worked with MXSOFT on a courier tracking app and taught frontend development to 20+ students.",
      ],
    },
    sectionHeadings: {
      skills: {
        eyebrow: "Skills",
        title: "My toolkit",
        description: "Technologies and tools I use to bring products to life.",
      },
      languages: {
        eyebrow: "Languages",
        title: "Languages I speak",
        description: "Communicating clearly across languages and cultures.",
      },
      projects: {
        eyebrow: "Projects",
        title: "Selected work",
        description: "A collection of products, apps, and bots I've designed and built.",
      },
      experience: {
        eyebrow: "Experience",
        title: "Experience & Education",
        description: "A timeline of the roles and learning that shaped my craft.",
      },
      certificates: {
        eyebrow: "Certificates",
        title: "Credentials",
        description: "Continuous learning is part of the craft.",
      },
      contact: {
        eyebrow: "Contact",
        title: "Let's build something",
        description: "Have a project in mind or just want to say hi? My inbox is always open.",
      },
    },
    projects: {
      telegramBots: "Telegram Bots",
    },
    footer: {
      crafted: "Crafted with care.",
    },
    contactForm: {
      name: "Name",
      email: "Email",
      message: "Message",
      placeholders: {
        name: "Your name",
        email: "you@email.com",
        message: "Tell me about your project...",
      },
      send: "Send Message",
      sending: "Sending...",
      sent: "Message sent!",
      error: "Something went wrong",
    },
    languageToggle: {
      label: "Language",
      uz: "UZ",
      en: "EN",
    },
  },
} as const;

export function getText(locale: Locale) {
  return TEXT[locale];
}

export const LanguageContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof TEXT)[Locale];
} | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("uz");

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-locale") as Locale | null;
    const initial = stored === "uz" || stored === "en" ? stored : "uz";
    setLocaleState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "uz" ? "uz" : "en";
    window.localStorage.setItem("portfolio-locale", locale);
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    document.documentElement.lang = nextLocale === "uz" ? "uz" : "en";
    window.localStorage.setItem("portfolio-locale", nextLocale);
  };

  const value = useMemo(
    () => ({ locale, setLocale, t: TEXT[locale] }),
    [locale]
  );

  return createElement(LanguageContext.Provider, { value }, children);
}
