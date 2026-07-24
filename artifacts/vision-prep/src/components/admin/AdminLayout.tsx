import React from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { logout, role } = useAuth();
  
  // Protect admin layout (should be checked in router, but extra safety here)
  if (role !== "admin" && role !== "editor") {
    return null; 
  }

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/admin/admissions", label: "Admissions", icon: "🎓" },
    { href: "/admin/messages", label: "Messages", icon: "✉️" },
    { href: "/admin/courses", label: "Courses", icon: "📚" },
    { href: "/admin/faculty", label: "Faculty", icon: "👨‍🏫" },
    { href: "/admin/blogs", label: "Blogs", icon: "📝" },
    { href: "/admin/events", label: "Events", icon: "📅" },
    { href: "/admin/results", label: "Results", icon: "🏆" },
    { href: "/admin/gallery", label: "Gallery", icon: "🖼️" },
    { href: "/admin/testimonials", label: "Testimonials", icon: "💬" },
    { href: "/admin/faqs", label: "FAQs", icon: "❓" },
    { href: "/admin/settings", label: "Site Settings", icon: "⚙️" },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col hidden md:flex">
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/admin/dashboard" className="font-display text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground text-sm">V</div>
            <span>ADMIN<span className="text-primary">PANEL</span></span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                location.startsWith(link.href) 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}>
                <span>{link.icon}</span>
                <span className="font-medium text-sm">{link.label}</span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="p-4 border-t border-sidebar-border">
          <button 
            onClick={() => {
              logout();
              window.location.href = "/admin";
            }}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <span>🚪</span>
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
          <h2 className="font-display font-bold text-lg">
            {links.find(l => location.startsWith(l.href))?.label || "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              View Site ↗
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {role === "admin" ? "A" : "E"}
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
