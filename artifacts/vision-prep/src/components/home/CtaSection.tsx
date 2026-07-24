import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px] opacity-50" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
        <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-sm font-medium mb-8">
          Limited Seats Available
        </div>
        
        <h2 className="font-display text-5xl md:text-6xl font-black tracking-tight mb-8 leading-tight">
          Ready to Claim Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
            Top Position?
          </span>
        </h2>
        
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Join the institute that produces board toppers and secures maximum admissions in top medical and engineering universities.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/admissions">
            <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg bg-white text-black hover:bg-white/90 rounded-xl font-bold shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all">
              Start Application
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-lg border-border hover:bg-white/5 rounded-xl">
              Talk to Counselor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
