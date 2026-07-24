import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CustomCursor } from "../shared/CustomCursor";
import { LoadingScreen } from "../shared/LoadingScreen";
import { WhatsAppButton } from "../shared/WhatsAppButton";
import { BackToTop } from "../shared/BackToTop";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col w-full relative">
      <CustomCursor />
      <LoadingScreen />
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}
