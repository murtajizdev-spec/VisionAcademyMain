import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="min-h-[80vh] flex items-center justify-center pt-20"
      >
        <div className="text-center px-4">
          <h1 className="font-display text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
            404
          </h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              Return Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </Layout>
  );
}
