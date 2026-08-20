import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://yoldashev.uz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ro'zalibek — Frontend Developer",
    template: "%s | Ro'zalibek",
  },
  description:
    "Frontend Developer building modern web applications and Telegram Bots with React, Next.js, and TypeScript. Premium, fast, and accessible experiences.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Telegram Bot Developer",
    "Portfolio",
    "Ro'zalibek",
  ],
  authors: [{ name: "Ro'zalibek" }],
  creator: "Ro'zalibek",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Ro'zalibek — Frontend Developer",
    description:
      "Frontend Developer building modern web applications and Telegram Bots.",
    siteName: "Ro'zalibek Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ro'zalibek — Frontend Developer",
    description:
      "Frontend Developer building modern web applications and Telegram Bots.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
