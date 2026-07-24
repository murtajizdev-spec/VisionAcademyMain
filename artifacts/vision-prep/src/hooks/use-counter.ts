import { useEffect, useState, useRef } from "react";
import { useIntersectionObserver } from "./use-intersection-observer";
import gsap from "gsap";

export function useCounter(end: number, duration: number = 2) {
  const [count, setCount] = useState(0);
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true,
  });

  const objRef = useRef({ value: 0 });

  useEffect(() => {
    if (isIntersecting) {
      gsap.to(objRef.current, {
        value: end,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          setCount(Math.round(objRef.current.value));
        },
      });
    }
  }, [isIntersecting, end, duration]);

  return { count, ref };
}
