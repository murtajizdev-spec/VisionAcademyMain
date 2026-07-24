import React from "react";
import { Link } from "wouter";
import { useGetTopResults } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export function ResultsSection() {
  const { data: results, isLoading } = useGetTopResults();

  if (!isLoading && (!results || results.length === 0)) return null;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Our <span className="text-secondary">Champions</span></h2>
            <p className="text-muted-foreground text-lg">
              Numbers speak louder than words. Meet the students who secured top positions in recent board and competitive exams.
            </p>
          </div>
          <Link href="/results">
            <button className="text-primary hover:text-white transition-colors font-medium border-b border-primary pb-1">
              View All Results →
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 rounded-xl bg-card border border-border" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results?.slice(0, 3).map((result, i) => (
              <div 
                key={result.id} 
                className="relative p-6 rounded-2xl bg-card border border-border overflow-hidden group"
              >
                {/* Decorative rank background */}
                <div className="absolute -right-4 -top-4 text-9xl font-black text-muted/20 z-0 select-none group-hover:text-primary/10 transition-colors">
                  {i + 1}
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-xl border-2 border-secondary/30">
                      {result.imageUrl ? (
                        <img src={result.imageUrl} alt={result.studentName} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        result.studentName.charAt(0)
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">{result.studentName}</h3>
                      <p className="text-muted-foreground text-sm">{result.class} • {result.year}</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm text-muted-foreground uppercase tracking-wider">{result.board || 'Board'}</span>
                      <span className="font-bold text-2xl text-secondary">{result.percentage}</span>
                    </div>
                    
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out" 
                        style={{ width: result.percentage }}
                      />
                    </div>
                    
                    <div className="mt-4 inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm font-medium text-white/90">
                      {result.position} Position
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
