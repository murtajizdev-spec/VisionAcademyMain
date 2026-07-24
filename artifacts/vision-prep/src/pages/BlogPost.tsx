import React from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useGetBlog } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "wouter";
import { Calendar, Tag, ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { data: blog, isLoading, isError } = useGetBlog(slug!);

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-32 pb-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-8 w-32 bg-muted mb-8 rounded-full" />
            <Skeleton className="h-12 w-full bg-muted mb-4 rounded" />
            <Skeleton className="h-6 w-64 bg-muted mb-12 rounded" />
            <Skeleton className="w-full h-64 bg-muted rounded-2xl mb-8" />
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full bg-muted mb-3 rounded" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (isError || !blog) {
    return (
      <Layout>
        <div className="pt-32 pb-24 bg-background flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you are looking for does not exist.</p>
            <Link href="/blog">
              <span className="inline-flex items-center gap-2 text-primary hover:underline cursor-pointer">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </span>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-32 pb-24 bg-background"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back link */}
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary/70" />
                <span>
                  {blog.publishedAt
                    ? new Date(blog.publishedAt).toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
                    : "Recent"}
                </span>
              </div>
              {blog.tags && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-secondary/70" />
                  <span>{blog.tags}</span>
                </div>
              )}
            </div>
          </div>

          {/* Feature Image */}
          {blog.imageUrl && (
            <div className="rounded-2xl overflow-hidden mb-10 border border-border">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:text-white
              prose-p:text-foreground/85 prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-li:text-foreground/85
              prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-3"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* CTA */}
          <div className="mt-16 glass-panel p-8 rounded-2xl border border-primary/30 text-center">
            <h3 className="font-display text-2xl font-bold mb-3">Ready to Start Your Journey?</h3>
            <p className="text-muted-foreground mb-6">Join thousands of students who have achieved their dreams with Vision Preparation.</p>
            <Link href="/admissions">
              <span className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-colors cursor-pointer">
                Apply for Admission
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
