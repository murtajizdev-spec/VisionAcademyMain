import React from "react";
import { Link } from "wouter";
import { useGetFaculty } from "@workspace/api-client-react";
import { GlowCard } from "../shared/GlowCard";
import { Skeleton } from "@/components/ui/skeleton";

export function FacultySection() {
  const { data: faculty, isLoading } = useGetFaculty({ featured: "true" });

  return (
    <section className="py-24 relative bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Architects of <span className="text-primary">Success</span></h2>
            <p className="text-muted-foreground text-lg">
              Learn from industry veterans, board examiners, and subject specialists who have shaped thousands of careers.
            </p>
          </div>
          <Link href="/faculty">
            <button className="px-6 py-3 rounded-full bg-card border border-border hover:border-primary text-sm font-medium transition-colors whitespace-nowrap">
              Meet All Faculty
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl border border-border p-4 bg-card">
                <Skeleton className="w-full aspect-[3/4] rounded-lg bg-muted/50 mb-4" />
                <Skeleton className="h-6 w-3/4 bg-muted/50 mb-2" />
                <Skeleton className="h-4 w-1/2 bg-muted/50" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {faculty?.slice(0, 4).map((member) => (
              <div key={member.id} className="group relative rounded-xl overflow-hidden border border-border bg-card">
                {/* Image or placeholder */}
                <div className="w-full aspect-[3/4] relative overflow-hidden bg-muted">
                  {member.imageUrl ? (
                    <img 
                      src={member.imageUrl} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxMzFjMzUiLz48L3N2Zz4='; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-4xl font-display font-bold">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-secondary text-sm font-bold tracking-wider uppercase mb-1 block">
                      {member.subject}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-1">{member.qualification}</p>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex items-center gap-2 text-xs font-medium text-white/80">
                      <span>⭐ {member.experience} Exp.</span>
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
