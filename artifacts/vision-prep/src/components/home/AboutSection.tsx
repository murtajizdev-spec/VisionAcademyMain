import React from "react";
import { Link } from "wouter";
import { useGetSiteStats } from "@workspace/api-client-react";
import { AnimatedCounter } from "../shared/AnimatedCounter";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  const { data: stats } = useGetSiteStats();

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/10 blur-3xl -z-10 rounded-full" />
            <div className="glass-panel p-8 rounded-2xl border border-border/50 relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Forging Champions Since <span className="text-primary">2010</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Vision Preparation is not just a coaching center; it's a launchpad for the nation's brightest minds. We combine rigorous academic discipline with strategic exam preparation to ensure our students don't just pass—they dominate.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Our faculty consists of subject-matter experts, board examiners, and top-tier professionals dedicated to translating complex concepts into actionable knowledge.
              </p>
              
              <Link href="/about">
                <Button className="group">
                  Read Our Story 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center border-t border-l border-primary/20">
              <div className="text-primary text-3xl mb-4">👨‍🎓</div>
              <div className="font-display text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={stats?.totalStudents || 15000} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Students Enrolled</div>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center border-t border-r border-secondary/20 translate-y-8">
              <div className="text-secondary text-3xl mb-4">🎯</div>
              <div className="font-display text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={stats?.successRate || 95} suffix="%" />
              </div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Success Rate</div>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center border-b border-l border-primary/20">
              <div className="text-primary text-3xl mb-4">🏆</div>
              <div className="font-display text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={stats?.topPositions || 500} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Board Positions</div>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center border-b border-r border-secondary/20 translate-y-8">
              <div className="text-secondary text-3xl mb-4">👨‍🏫</div>
              <div className="font-display text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={stats?.totalFaculty || 150} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Expert Faculty</div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
