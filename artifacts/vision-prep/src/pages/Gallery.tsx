import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useGetGallery } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES = ["all", "campus", "events"];

export default function Gallery() {
  const { data: gallery, isLoading } = useGetGallery();
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<{ url: string; title: string } | null>(null);

  const filtered = gallery?.filter(
    (img) => activeCategory === "all" || img.category === activeCategory
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
              Our <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Glimpses of life at Vision Preparation — campus, events, and achievements.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex justify-center gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(0,102,255,0.4)]"
                    : "bg-card border border-border text-muted-foreground hover:text-white hover:border-primary/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {isLoading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {[...Array(9)].map((_, i) => (
                <Skeleton key={i} className="w-full rounded-xl bg-card border border-border" style={{ height: `${200 + (i % 3) * 80}px` }} />
              ))}
            </div>
          ) : (
            <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              <AnimatePresence>
                {filtered?.map((image) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="break-inside-avoid cursor-pointer group"
                    onClick={() => setLightbox({ url: image.imageUrl, title: image.title })}
                  >
                    <div className="relative rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_30px_rgba(0,102,255,0.15)]">
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div>
                          <h3 className="font-bold text-white text-sm">{image.title}</h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-white/60 hover:text-white text-xl font-bold"
              >
                ✕ Close
              </button>
              <img
                src={lightbox.url}
                alt={lightbox.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl border border-border"
              />
              <p className="text-center text-white font-medium mt-4">{lightbox.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
