import { Github, Mail, Send, type LucideIcon } from "lucide-react";

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export const PROFILE = {
  fullName: "Yo'ldashev Ro'zali",
  role: "Junior Frontend Developer",
  location: "Fergana, Uzbekistan",
  email: "yuldashevrozalibek1@gmail.com",
  telegram: "@dasturchi_2008",
  telegramUrl: "https://t.me/dasturchi_2008",
  github: "github.com/yuldashevrozali",
  githubUrl: "https://github.com/yuldashevrozali",
  photo: "/profile.png",
  summary:
    "Aspiring Junior Frontend Developer from Fergana with strong skills in modern web technologies. Experienced in building web applications and Telegram Bots, and in teaching frontend development to 20+ students.",
};

export const HERO = {
  greeting: "Salom",
  name: "Ro'zalibek",
  role: "Frontend Developer",
  tagline: "I build modern web applications and Telegram Bots.",
  badges: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind",
    "Firebase",
    "Node.js",
    "Telegram Bot",
  ],
};

export const ABOUT = {
  paragraphs: [
    "I'm a Junior Frontend Developer from Fergana, Uzbekistan, passionate about building fast, accessible, and delightful web experiences. I completed the Frontend Development course at Najot Ta'lim, where I worked on real team projects and gained hands-on experience with modern web technologies.",
    "Today I work as a freelance frontend developer, building custom web applications and Telegram Bots for clients — including AvtoQoida (avtoqoida.uz), which I'm actively developing. Previously I worked at MXSOFT on a courier route-tracking app with Leaflet, and I've taught frontend development to 20+ students at Unco Academy and RISHTSOFT. I'm always eager to learn and grow as a developer.",
  ],
  stats: [
    { label: "Projects", value: 7, suffix: "+" },
    { label: "Students Taught", value: 20, suffix: "+" },
    { label: "Telegram Bots", value: 4, suffix: "" },
    { label: "Technologies", value: 12, suffix: "+" },
  ],
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      "HTML5",
      "CSS3",
      "SCSS",
      "JavaScript",
      "React",
      "Redux",
      "Next.js",
      "Leaflet",
      "Responsive Design",
    ],
  },
  {
    title: "Backend",
    skills: ["Node.js", "REST API", "Telegram Bot API"],
  },
  {
    title: "Database",
    skills: ["Firebase", "MongoDB"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Vercel"],
  },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  features?: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  category: "web" | "bot";
  gradient: string;
  emoji: string;
};

export const PROJECTS: Project[] = [
  {
    title: "AvtoQoida",
    description:
      "A comprehensive platform for driving rules and traffic-test preparation. Interactive lessons, real exam simulations, and progress tracking — designed to help learners pass their driving exam with confidence.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Framer Motion"],
    demo: "https://avtoqoida.uz",
    featured: true,
    category: "web",
    gradient: "from-blue-500/30 via-indigo-500/20 to-violet-500/30",
    emoji: "🚗",
  },
  {
    title: "Dokon — Online Store Platform",
    description:
      "A full-featured e-commerce platform built for small businesses. Includes product management, order tracking, and an admin dashboard. Custom order project.",
    tech: ["Next.js", "TypeScript", "MongoDB Atlas", "Tailwind CSS"],
    features: [
      "Product management",
      "Order tracking",
      "Admin dashboard",
    ],
    demo: "https://dokon-71x7.vercel.app/dashboard",
    category: "web",
    gradient: "from-emerald-500/30 to-teal-500/20",
    emoji: "🛍️",
  },
  {
    title: "Akfa Sigma — Door & Window Company",
    description:
      "A corporate website for a door and window manufacturing company. Product catalogue, contact forms, and a modern design tailored for industrial businesses. Custom order.",
    tech: ["Next.js", "TypeScript", "MongoDB Atlas", "Tailwind CSS"],
    features: [
      "Product catalogue",
      "Contact forms",
      "Modern industrial design",
    ],
    demo: "https://akfa-sigma.vercel.app/login",
    category: "web",
    gradient: "from-fuchsia-500/30 to-pink-500/20",
    emoji: "🚪",
  },
  {
    title: "Milliy Sertifikat Bot",
    description:
      "Telegram bot for test centers and schools. Tests are solved via AI (Rasch Model). Anyone can create free tests with full admin panel control.",
    tech: ["Node.js", "JavaScript", "Telegram API"],
    features: [
      "AI (Rasch Model) test solving",
      "Free test creation for all",
      "Full admin panel",
    ],
    demo: "https://t.me/MS_TEST_FizMat_bot",
    category: "bot",
    gradient: "from-sky-500/30 to-blue-500/20",
    emoji: "📝",
  },
  {
    title: "IELTS Zone Farg'ona Bot",
    description:
      "Referral-based Telegram bot for IELTS Zone Farg'ona. Users earn points by inviting friends and exchange them for IELTS mock tests.",
    tech: ["Node.js", "JavaScript", "MongoDB", "Telegram API"],
    features: [
      "Referral system with auto points",
      "TOP users leaderboard",
      "Exchange points for mock tests",
    ],
    demo: "https://t.me/ielts_zone_fergana_bot",
    category: "bot",
    gradient: "from-emerald-500/30 to-teal-500/20",
    emoji: "🎯",
  },
  {
    title: "Buxoro Xorazm Nukus Taksi Bot",
    description:
      "Intercity taxi ordering bot. Passengers submit trip info, and orders are automatically sent to drivers' groups across 4 cities.",
    tech: ["Node.js", "JavaScript", "MongoDB", "Telegram API"],
    features: [
      "4-city route support",
      "Auto-send orders to drivers",
      "Driver & passenger statistics",
    ],
    demo: "https://t.me/Buxoro_Xorazm_Nukus_bot",
    category: "bot",
    gradient: "from-amber-500/30 to-orange-500/20",
    emoji: "🚕",
  },
  {
    title: "IELTS ZONE Voting Bot",
    description:
      "Advanced voting bot for education centers. Students vote for their favorite teacher and group, with referrals for extra votes, a TOP 15 leaderboard, and a gifts section.",
    tech: ["Node.js", "JavaScript", "MongoDB", "Telegram API"],
    features: [
      "1 vote per user + referral bonus",
      "TOP 15 group leaderboard",
      "Gifts & rewards section",
    ],
    demo: "https://t.me/IELTS_ZONE_votingbot",
    category: "bot",
    gradient: "from-fuchsia-500/30 to-pink-500/20",
    emoji: "🗳️",
  },
];

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  kind: "work" | "education";
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Freelance Frontend Developer",
    company: "Self-employed",
    period: "2025 — Present",
    kind: "work",
    description:
      "Building custom web applications and Telegram Bots on commission for clients, including AvtoQoida (avtoqoida.uz) and four production Telegram Bots. Currently continuing to develop and improve the AvtoQoida platform.",
  },
  {
    role: "Frontend Developer",
    company: "MXSOFT",
    period: "2024",
    kind: "work",
    description:
      "Worked as a frontend developer on a courier route-tracking application, building interactive map and real-time route visualization features with Leaflet, JavaScript, and React.",
  },
  {
    role: "Frontend Teacher",
    company: "Unco Academy",
    period: "2024",
    kind: "work",
    description:
      "Taught frontend development concepts to 20+ students, explaining HTML, CSS, and JavaScript best practices, guiding them through practical projects, and giving personalized feedback to help them grow.",
  },
  {
    role: "Teacher",
    company: "RISHTSOFT — Online Learning Center",
    period: "2024",
    kind: "work",
    description:
      "Conducted online lessons and provided educational support to students, developed and delivered course materials, and collaborated with the team to improve the quality of online education.",
  },
  {
    role: "Frontend Development Course",
    company: "Najot Ta'lim",
    period: "2023 — 2024",
    kind: "education",
    description:
      "Completed a comprehensive Frontend Development course in Fergana. Built multiple projects as part of a team, gaining hands-on experience with HTML, CSS, JavaScript, and React.",
  },
];

export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  certificate?: string; // path to a viewable/downloadable file
};

export const CERTIFICATES: Certificate[] = [
  {
    title: "Certificate of Completion — Frontend Development",
    issuer: "Najot Ta'lim, Uzbekistan",
    year: "April 2024",
  },
  {
    title: "IELTS Academic — Overall Band 5.0 (B1)",
    issuer: "British Council / IDP / Cambridge",
    year: "2026",
    certificate: "/ielts-certificate.pdf",
  },
];

export type Language = {
  name: string;
  level: string;
  proficiency: number; // 0–100 for the visual bar
  flag: string;
  note?: string;
  certificate?: string; // path to a downloadable/viewable certificate
  scores?: { label: string; value: string }[];
  cefr?: string;
};

export const LANGUAGES: Language[] = [
  {
    name: "Uzbek",
    level: "Native",
    proficiency: 100,
    flag: "🇺🇿",
    note: "Mother tongue",
  },
  {
    name: "English",
    level: "IELTS Academic — Overall 5.0",
    proficiency: 62,
    flag: "🇬🇧",
    cefr: "B1",
    certificate: "/ielts-certificate.pdf",
    scores: [
      { label: "Listening", value: "4.5" },
      { label: "Reading", value: "5.0" },
      { label: "Writing", value: "5.0" },
      { label: "Speaking", value: "5.5" },
    ],
  },
];

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: "Email",
    value: "yuldashevrozalibek1@gmail.com",
    href: "mailto:yuldashevrozalibek1@gmail.com",
    icon: Mail,
  },
  {
    label: "Telegram",
    value: "@dasturchi_2008",
    href: "https://t.me/dasturchi_2008",
    icon: Send,
  },
  {
    label: "GitHub",
    value: "github.com/yuldashevrozali",
    href: "https://github.com/yuldashevrozali",
    icon: Github,
  },
];
