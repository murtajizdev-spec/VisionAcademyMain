import React from "react";
import { useRoute, Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useGetCourse } from "@workspace/api-client-react";
import { getGetCourseQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function CourseDetail() {
  const [, params] = useRoute("/courses/:slug");
  const slug = params?.slug || "";

  const { data: course, isLoading } = useGetCourse(slug, {
    query: { enabled: !!slug, queryKey: getGetCourseQueryKey(slug) }
  });

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-32 pb-24 bg-background min-h-screen"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          {isLoading ? (
            <div className="space-y-8">
              <Skeleton className="h-12 w-3/4 bg-card border border-border" />
              <Skeleton className="h-6 w-full bg-card border border-border" />
              <Skeleton className="h-6 w-5/6 bg-card border border-border" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <Skeleton className="h-32 bg-card border border-border" />
                <Skeleton className="h-32 bg-card border border-border" />
                <Skeleton className="h-32 bg-card border border-border" />
              </div>
            </div>
          ) : !course ? (
            <div className="text-center py-24">
              <h2 className="text-3xl font-bold mb-4">Course Not Found</h2>
              <Link href="/courses">
                <Button>Back to Courses</Button>
              </Link>
            </div>
          ) : (
            <>
              <Link href="/courses" className="text-primary hover:underline font-medium mb-8 inline-block">
                ← Back to All Courses
              </Link>
              
              <div className="flex justify-between items-start gap-6 mb-8 flex-col md:flex-row">
                <div>
                  <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full font-medium mb-4 uppercase tracking-wider">
                    {course.category}
                  </div>
                  <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{course.title}</h1>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                    {course.description}
                  </p>
                </div>
                
                <div className="shrink-0 w-full md:w-auto">
                  <Link href="/admissions">
                    <Button size="lg" className="w-full h-14 px-8 text-lg bg-primary text-white glow-border">
                      Enroll Now
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                <div className="glass-panel p-6 rounded-2xl border border-border">
                  <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Duration</div>
                  <div className="font-bold text-xl">{course.duration}</div>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-border">
                  <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Fee</div>
                  <div className="font-bold text-xl text-primary">{course.fee}</div>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-border">
                  <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Schedule</div>
                  <div className="font-bold text-lg">{course.schedule || "Regular"}</div>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-border">
                  <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Format</div>
                  <div className="font-bold text-lg">On-Campus</div>
                </div>
              </div>

              {course.overview && (
                <div className="mb-12">
                  <h3 className="font-display text-3xl font-bold mb-6">Course Overview</h3>
                  <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p className="whitespace-pre-wrap">{course.overview}</p>
                  </div>
                </div>
              )}

              {course.subjects && (
                <div className="mb-12">
                  <h3 className="font-display text-3xl font-bold mb-6">Subjects Covered</h3>
                  <div className="glass-panel p-8 rounded-2xl border border-border">
                    <p className="whitespace-pre-wrap text-muted-foreground">{course.subjects}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </Layout>
  );
}
