import React from "react";
import { useCounter } from "@/hooks/use-counter";

export function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2 }: { end: number, suffix?: string, prefix?: string, duration?: number }) {
  const { count, ref } = useCounter(end, duration);
  
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}
