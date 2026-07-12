import type { Metadata } from "next";
import ResumeDocument from "@/components/resume/ResumeDocument";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Yo'ldashev Ro'zali — Junior Frontend Developer building web applications and Telegram Bots.",
};

export default function ResumePage() {
  return <ResumeDocument />;
}
