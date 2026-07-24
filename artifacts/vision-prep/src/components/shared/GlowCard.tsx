import React from "react";
import { motion } from "framer-motion";

export function GlowCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`glass-panel rounded-xl p-6 glow-border transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,102,255,0.15)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
