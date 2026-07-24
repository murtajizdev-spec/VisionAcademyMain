import React, { useRef } from "react";
import { useGetTestimonials } from "@workspace/api-client-react";
import { GlowCard } from "../shared/GlowCard";

export function TestimonialsSection() {
  const { data: testimonials } = useGetTestimonials();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simple auto-scroll for testimonials
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    let animationId: number;
    const scroll = () => {
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += 1;
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    
    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => {
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(scroll);
    };
    
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    
    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, [testimonials]);

  if (!testimonials?.length) return null;

  return (
    <section className="py-24 bg-card/30 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Student <span className="text-secondary">Stories</span></h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Hear from those who transformed their potential into top positions and medical/engineering college admissions.
        </p>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 snap-x hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {[...testimonials, ...testimonials].map((testimonial, i) => (
          <GlowCard key={`${testimonial.id}-${i}`} className="min-w-[350px] max-w-[400px] snap-center shrink-0 flex flex-col">
            <div className="flex text-secondary mb-4 text-sm">
              {"★".repeat(testimonial.rating)}
              {"☆".repeat(5 - testimonial.rating)}
            </div>
            <p className="text-foreground/90 italic mb-6 flex-grow relative">
              <span className="text-4xl text-primary/20 absolute -top-4 -left-2 font-serif">"</span>
              {testimonial.content}
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden border border-primary/30">
                {testimonial.imageUrl ? (
                  <img src={testimonial.imageUrl} alt={testimonial.studentName} className="w-full h-full object-cover" />
                ) : (
                  testimonial.studentName.charAt(0)
                )}
              </div>
              <div>
                <h4 className="font-bold text-white">{testimonial.studentName}</h4>
                <p className="text-xs text-muted-foreground">{testimonial.course} {testimonial.year ? `• ${testimonial.year}` : ''}</p>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}
