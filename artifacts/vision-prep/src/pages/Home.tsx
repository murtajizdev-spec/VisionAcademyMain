import React from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/shared/Marquee";
import { AboutSection } from "@/components/home/AboutSection";
import { CoursesSection } from "@/components/home/CoursesSection";
import { FacultySection } from "@/components/home/FacultySection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqsSection } from "@/components/home/FaqsSection";
import { CtaSection } from "@/components/home/CtaSection";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0 }
};

export default function Home() {
  useSmoothScroll();

  return (
    <Layout>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Hero />
        <Marquee items={["MDCAT", "ECAT", "Federal Board", "SSC", "HSSC", "NUMS", "NTS", "PPSC", "FPSC"]} />
        <AboutSection />
        <CoursesSection />
        <FacultySection />
        <ResultsSection />
        <TestimonialsSection />
        <FaqsSection />
        <CtaSection />
      </motion.div>
    </Layout>
  );
}
