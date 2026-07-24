import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroScene } from "../three/HeroScene";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [webglAvailable] = useState(() => isWebGLAvailable());
  const texts = ["MDCAT", "ECAT", "Federal Board", "9th & 10th", "FSc Pre-Med", "NUMS & NTS"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      {/* 3D Canvas Background */}
      {webglAvailable && (
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <HeroScene />
          </Canvas>
        </div>
      )}

      {/* Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center mt-16">
        <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 backdrop-blur-sm">
          Admissions Open for 2025 Session
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 drop-shadow-lg">
          Transform Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Future
          </span>
        </h1>
        
        <div className="h-12 md:h-16 mb-8 flex items-center justify-center text-xl md:text-3xl text-muted-foreground font-medium">
          <span>Premium Coaching for</span>
          <div className="relative w-[200px] md:w-[280px] h-full flex items-center overflow-hidden ml-3">
            {texts.map((text, i) => (
              <span
                key={text}
                className={`absolute left-0 text-white transition-all duration-500 font-display ${
                  i === textIndex 
                    ? "opacity-100 translate-y-0" 
                    : i < textIndex 
                      ? "opacity-0 -translate-y-full" 
                      : "opacity-0 translate-y-full"
                }`}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/admissions">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl glow-border">
              Apply Now
            </Button>
          </Link>
          <Link href="/courses">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg border-border hover:bg-white/5 rounded-xl glass-panel">
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 animate-bounce">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
