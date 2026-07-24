import React from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

export default function About() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-32 pb-24 bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Our <span className="text-primary">Legacy</span></h1>
            <p className="text-xl text-muted-foreground">Transforming aspirations into achievements since 2010.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <div className="glass-panel p-8 rounded-3xl border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px]" />
              <h3 className="font-display text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To provide unparalleled educational coaching that empowers students to excel in competitive and board examinations. We strive to create an ecosystem of academic rigor, conceptual clarity, and strategic preparation.
              </p>
            </div>
            
            <div className="glass-panel p-8 rounded-3xl border border-border/50 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-[50px]" />
              <h3 className="font-display text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To be the undisputed leader in educational coaching across Pakistan, recognized for shaping the future leaders in medicine, engineering, and technology through uncompromising standards of teaching.
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-center mb-12">Director's Message</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center bg-card rounded-3xl p-8 md:p-12 border border-border">
              <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full bg-muted border-4 border-primary/20 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/20 flex items-center justify-center text-4xl font-display font-bold text-white">DR</div>
              </div>
              <div>
                <p className="text-lg text-foreground/90 italic mb-6 leading-relaxed">
                  "Education is not merely about passing exams; it's about building the intellectual resilience required to navigate complex challenges. At Vision Preparation, we don't just teach subjects—we engineer mindsets capable of achieving greatness. Our students' consistent top positions are a testament to our methodology."
                </p>
                <h4 className="font-display text-2xl font-bold">Dr. Asad Rehman</h4>
                <p className="text-primary font-medium">Founder & Managing Director</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
