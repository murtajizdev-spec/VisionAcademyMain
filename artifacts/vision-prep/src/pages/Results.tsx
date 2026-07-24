import React from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useGetResults } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Results() {
  const { data: results, isLoading } = useGetResults();

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-32 pb-24 bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Hall of <span className="text-secondary">Fame</span></h1>
            <p className="text-xl text-muted-foreground">Celebrating the outstanding achievements of our students.</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="h-64 rounded-xl bg-card border border-border" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results?.map((result, i) => (
                <div 
                  key={result.id} 
                  className="p-6 rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-colors group"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-xl border-2 border-secondary/30 shrink-0">
                        {result.imageUrl ? (
                          <img src={result.imageUrl} alt={result.studentName} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          result.studentName.charAt(0)
                        )}
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-white line-clamp-1">{result.studentName}</h3>
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
                          className="h-full bg-gradient-to-r from-primary to-secondary" 
                          style={{ width: result.percentage }}
                        />
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm font-medium text-white/90">
                          {result.position} Position
                        </div>
                        <div className="text-sm font-bold text-foreground">
                          {result.marks} Marks
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
}
