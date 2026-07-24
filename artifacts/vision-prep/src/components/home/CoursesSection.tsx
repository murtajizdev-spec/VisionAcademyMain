import React, { useState } from "react";
import { Link } from "wouter";
import { useGetCourses } from "@workspace/api-client-react";
import { GlowCard } from "../shared/GlowCard";
import { Skeleton } from "@/components/ui/skeleton";

export function CoursesSection() {
  const [activeTab, setActiveTab] = useState("all");
  const { data: courses, isLoading } = useGetCourses();

  const categories = ["all", "School", "College", "Competitive"];

  const filteredCourses = courses?.filter(
    (c) => activeTab === "all" || c.category === activeTab
  ).slice(0, 6); // show max 6 on home

  return (
    <section className="py-24 bg-card/50 relative border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Premium <span className="text-primary">Programs</span></h2>
          <p className="text-muted-foreground text-lg">
            Meticulously crafted curriculums designed to maximize scoring potential and conceptual clarity.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === cat
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,102,255,0.4)]"
                  : "bg-background border border-border text-foreground/80 hover:bg-primary/10"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-border p-6 bg-card h-64 flex flex-col gap-4">
                <Skeleton className="h-6 w-32 bg-muted/50" />
                <Skeleton className="h-4 w-full bg-muted/50" />
                <Skeleton className="h-4 w-2/3 bg-muted/50" />
                <div className="mt-auto flex justify-between">
                  <Skeleton className="h-8 w-24 bg-muted/50" />
                  <Skeleton className="h-8 w-24 bg-muted/50" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses?.map((course) => (
              <GlowCard key={course.id} className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full font-medium">
                    {course.category}
                  </span>
                  {course.featured && (
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      Featured
                    </span>
                  )}
                </div>
                
                <h3 className="font-display text-2xl font-bold mb-2">{course.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3">
                  {course.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs uppercase tracking-wider">Duration</span>
                    <span className="font-medium text-foreground">{course.duration}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs uppercase tracking-wider">Fee</span>
                    <span className="font-medium text-primary">{course.fee}</span>
                  </div>
                </div>
                
                <Link href={`/courses/${course.slug}`} className="w-full mt-auto">
                  <button className="w-full py-3 rounded-lg bg-background border border-border hover:border-primary hover:text-primary transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    View Details
                    <span>→</span>
                  </button>
                </Link>
              </GlowCard>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/courses">
            <button className="text-primary hover:text-white transition-colors font-medium border-b border-primary pb-1">
              View All Programs
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
