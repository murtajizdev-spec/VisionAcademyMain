import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useGetBlogs } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Calendar, Tag } from "lucide-react";

const CATEGORIES = ["All", "Exam Tips", "Study Tips", "Career Guidance", "News"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: blogs, isLoading } = useGetBlogs(
    activeCategory !== "All" ? { category: activeCategory } : {}
  );

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-32 pb-24 bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Knowledge <span className="text-primary">Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Expert advice, exam strategies, and educational insights from our faculty.
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(0,102,255,0.4)]"
                    : "bg-card border border-border text-muted-foreground hover:text-white hover:border-primary/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                  <Skeleton className="w-full h-48 bg-muted/50" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-24 bg-muted/50" />
                    <Skeleton className="h-6 w-full bg-muted/50" />
                    <Skeleton className="h-4 w-full bg-muted/50" />
                    <Skeleton className="h-4 w-3/4 bg-muted/50" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs?.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-xl">No articles found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs?.map((blog, i) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link href={`/blog/${blog.slug}`}>
                    <div className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,102,255,0.1)] cursor-pointer h-full flex flex-col">
                      {/* Thumbnail */}
                      <div className="relative h-48 overflow-hidden bg-muted">
                        {blog.imageUrl ? (
                          <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                            <span className="text-4xl">📝</span>
                          </div>
                        )}
                        {blog.featured && (
                          <div className="absolute top-3 left-3 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full">
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {blog.category}
                          </span>
                        </div>

                        <h3 className="font-display text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          {blog.title}
                        </h3>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                          {blog.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {blog.publishedAt
                                ? new Date(blog.publishedAt).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" })
                                : "Recent"}
                            </span>
                          </div>
                          {blog.tags && (
                            <div className="flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              <span className="line-clamp-1">{blog.tags.split(",")[0]?.trim()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
}
