import React from "react";

export function Marquee({ items, className = "" }: { items: string[], className?: string }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap border-y border-border bg-card py-3 flex items-center ${className}`}>
      <div className="flex animate-marquee min-w-max">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center px-4">
            <span className="font-display font-bold text-lg text-foreground/80">{item}</span>
            <span className="mx-4 text-primary">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
