import dynamic from "next/dynamic";
import BackgroundFX from "@/components/background/BackgroundFX";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
// Async server component — fetches GitHub data with daily ISR caching.
import GithubActivity from "@/components/sections/GithubActivity";

// Below-the-fold sections are code-split for a lighter initial payload.
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Languages = dynamic(() => import("@/components/sections/Languages"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Certificates = dynamic(() => import("@/components/sections/Certificates"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

export default function Home() {
  return (
    <>
      <Loader />
      <CustomCursor />
      <BackgroundFX />
      <ScrollProgress />
      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <GithubActivity />
        <Languages />
        <Experience />
        <Certificates />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
