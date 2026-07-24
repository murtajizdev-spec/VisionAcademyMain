import React from "react";
import { Link } from "wouter";
import { useSiteSettings } from "@/hooks/useSiteSettings";

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function Footer() {
  const { data: s } = useSiteSettings();

  const socialLinks = [
    { href: s?.facebookUrl, icon: <FacebookIcon />, label: "Facebook" },
    { href: s?.twitterUrl, icon: <TwitterIcon />, label: "Twitter / X" },
    { href: s?.instagramUrl, icon: <InstagramIcon />, label: "Instagram" },
    {
      href: s?.whatsappNumber ? `https://wa.me/${s.whatsappNumber.replace(/\D/g, "")}` : null,
      icon: <WhatsAppIcon />,
      label: "WhatsApp",
    },
  ].filter(l => l.href);

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <img src={s?.logoUrl || "/logo.png"} alt={s?.siteName ?? "VisionPrep"} className="h-9 w-auto object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {s?.tagline}
            </p>

            {/* Social icons */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/courses" className="hover:text-primary transition-colors">Programs &amp; Courses</Link></li>
              <li><Link href="/faculty" className="hover:text-primary transition-colors">Expert Faculty</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/admissions" className="hover:text-primary transition-colors">Admissions</Link></li>
              <li><Link href="/results" className="hover:text-primary transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Programs</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/courses/entry-test-mdcat-ecat" className="hover:text-primary transition-colors">MDCAT / ECAT Preparation</Link></li>
              <li><Link href="/courses/intermediate-fsc-fa-ics" className="hover:text-primary transition-colors">FSc / ICS / FA</Link></li>
              <li><Link href="/courses/matric-secondary" className="hover:text-primary transition-colors">Matriculation (9th &amp; 10th)</Link></li>
              <li><Link href="/courses/css-pms-competitive" className="hover:text-primary transition-colors">CSS / PMS Coaching</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {s?.address && (
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-0.5">📍</span>
                  <span>{s.address}</span>
                </li>
              )}
              {s?.phone1 && (
                <li className="flex items-center gap-3">
                  <span className="text-primary">📞</span>
                  <a href={`tel:${s.phone1.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">{s.phone1}</a>
                </li>
              )}
              {s?.phone2 && (
                <li className="flex items-center gap-3">
                  <span className="text-primary">📞</span>
                  <a href={`tel:${s.phone2.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">{s.phone2}</a>
                </li>
              )}
              {s?.email1 && (
                <li className="flex items-center gap-3">
                  <span className="text-primary">✉️</span>
                  <a href={`mailto:${s.email1}`} className="hover:text-primary transition-colors">{s.email1}</a>
                </li>
              )}
              {s?.email2 && (
                <li className="flex items-center gap-3">
                  <span className="text-primary">✉️</span>
                  <a href={`mailto:${s.email2}`} className="hover:text-primary transition-colors">{s.email2}</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {s?.siteName ?? "Vision Preparation"}. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
