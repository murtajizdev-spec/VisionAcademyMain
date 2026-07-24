import React from "react";
import { Link } from "wouter";
import { useGetFaqs } from "@workspace/api-client-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

export function FaqsSection() {
  const { data: faqs, isLoading } = useGetFaqs();

  return (
    <section className="py-24 bg-card/30 border-y border-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Common <span className="text-primary">Questions</span></h2>
          <p className="text-muted-foreground text-lg">Everything you need to know about admissions, courses, and our methodology.</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-full bg-card border border-border rounded-lg" />)}
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs?.slice(0, 6).map((faq) => (
              <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors">
                <AccordionTrigger className="text-left font-medium text-lg hover:no-underline hover:text-primary py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Link href="/contact">
            <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-sm font-medium">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
