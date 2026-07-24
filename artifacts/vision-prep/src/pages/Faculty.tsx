import React from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useGetFaculty } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Faculty() {
  const { data: faculty, isLoading } = useGetFaculty();

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
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Expert <span className="text-primary">Faculty</span></h1>
            <p className="text-xl text-muted-foreground">The brilliant minds behind our students' extraordinary success.</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="rounded-xl border border-border p-4 bg-card">
                  <Skeleton className="w-full aspect-[3/4] rounded-lg bg-muted/50 mb-4" />
                  <Skeleton className="h-6 w-3/4 bg-muted/50 mb-2" />
                  <Skeleton className="h-4 w-1/2 bg-muted/50" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {faculty?.map((member) => (
                <div key={member.id} className="group relative rounded-xl overflow-hidden border border-border bg-card shadow-lg hover:shadow-[0_0_30px_rgba(0,102,255,0.15)] transition-all duration-300">
                  <div className="w-full aspect-[3/4] relative overflow-hidden bg-muted">
                    {member.imageUrl ? (
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxMzFjMzUiLz48L3N2Zz4='; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-5xl font-display font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-secondary text-sm font-bold tracking-wider uppercase mb-2 block drop-shadow-md">
                        {member.subject}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white mb-2">{member.name}</h3>
                      <p className="text-primary-foreground/80 text-sm mb-4 font-medium">{member.qualification}</p>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex flex-col gap-2 text-sm text-white/90">
                        <div className="flex items-center gap-2">
                          <span className="text-secondary">⭐</span> {member.experience} Experience
                        </div>
                        {member.bio && (
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-3">
                            {member.bio}
                          </p>
                        )}
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
