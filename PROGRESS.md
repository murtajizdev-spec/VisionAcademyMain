# Vision Preparation Evening Coaching — Build Progress

## Status: 🚧 IN PROGRESS

Last updated: 2026-07-23

---

## Phase 1 — Scaffold & Architecture
- [x] Read project brief from attached_assets
- [x] Create progress tracking file
- [ ] Set up MongoDB integration
- [ ] Create react-vite artifact (main website)
- [ ] Write OpenAPI spec (lib/api-spec/openapi.yaml)
- [ ] Run codegen
- [ ] Set up backend routes (Express API server)

## Phase 2 — Backend
- [ ] MongoDB models: Users, Courses, Faculty, Admissions, Results, Gallery, Blogs, Testimonials, Messages, Newsletters, Events, FAQs, Settings, Media, Analytics
- [ ] JWT Authentication (login, register, forgot/reset password, role-based)
- [ ] Email system (Nodemailer) — admin notifications + student auto-reply
- [ ] Media upload (Cloudinary)
- [ ] All form handlers (Contact, Admission, Inquiry, Scholarship, Newsletter, Career, Callback, Demo Class)
- [ ] Seed data (courses, teachers, testimonials, blog posts)

## Phase 3 — Frontend Pages
- [ ] Loading Screen + Animated Cursor
- [ ] Navbar (sticky, animated)
- [ ] Home Page
  - [ ] Hero (3D Three.js scene: books, graduation cap, atom, particles)
  - [ ] About Section
  - [ ] Courses Section
  - [ ] Why Choose Us
  - [ ] Statistics (animated counters)
  - [ ] Top Teachers
  - [ ] Student Success / Testimonials (animated carousel)
  - [ ] Gallery
  - [ ] Results
  - [ ] Video Section
  - [ ] Latest News/Blog
  - [ ] FAQs
  - [ ] Call to Action
  - [ ] Contact
  - [ ] Footer
- [ ] About Page (History, Mission, Vision, Chairman Message, Director Message, Faculty, Achievements, Campus, Timeline, Gallery)
- [ ] Courses Pages
  - [ ] 9th Class, 10th Class, 1st Year, 2nd Year
  - [ ] Federal Board, Competitive Exams
  - [ ] MDCAT, ECAT, NUMS, NTS, CSS, PPSC, FPSC
  - [ ] Entry Test Preparation
- [ ] Admissions Page
- [ ] Faculty Page
- [ ] Results Page
- [ ] Gallery Page
- [ ] Blog Page + Individual Post
- [ ] Events Page
- [ ] Contact Page
- [ ] Student Dashboard

## Phase 4 — CMS / Admin Dashboard
- [ ] Login/Auth
- [ ] Dashboard (analytics charts)
- [ ] Courses Management
- [ ] Faculty Management
- [ ] Blogs Management
- [ ] Gallery Management
- [ ] Results Management
- [ ] Testimonials Management
- [ ] Students & Admissions
- [ ] Events Management
- [ ] FAQs Management
- [ ] Media Library
- [ ] Settings & Homepage Builder
- [ ] SEO Manager
- [ ] Contact Messages
- [ ] Newsletter
- [ ] Users & Role Management
- [ ] Analytics

## Phase 5 — Animations & Polish
- [ ] GSAP + ScrollTrigger throughout all sections
- [ ] Framer Motion page transitions
- [ ] Three.js 3D scene (homepage hero)
- [ ] Lenis smooth scroll
- [ ] Mouse parallax / glow effects
- [ ] Infinite marquee, floating elements
- [ ] Typing animation
- [ ] Text scramble / reveal
- [ ] Card tilt / magnetic buttons
- [ ] WhatsApp floating button
- [ ] Back to top
- [ ] Cookie banner
- [ ] Search overlay
- [ ] Theme toggle
- [ ] Page transitions (loading screen)

## Phase 6 — SEO & Performance
- [ ] Dynamic metadata / OpenGraph
- [ ] Sitemap + robots.txt
- [ ] Structured data
- [ ] Lazy loading + code splitting
- [ ] Image optimization
- [ ] .env.example
- [ ] README.md

---

## Tech Stack
- **Frontend**: React 19 + Vite, TypeScript, Tailwind CSS
- **Animations**: GSAP + ScrollTrigger, Framer Motion, Three.js + React Three Fiber + Drei, Lenis
- **UI**: Shadcn/UI, Lucide Icons
- **Backend**: Express 5 (existing API server)
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + Secure Cookies
- **Email**: Nodemailer
- **Media**: Cloudinary
- **State**: TanStack Query (React Query)

## Color Theme
- Primary: Deep Navy (`#0a0e1a`)
- Accent: Electric Blue (`#0066ff`)
- Secondary: White (`#ffffff`)
- Highlight: Golden Yellow (`#fbbf24`)
- Glassmorphism + Aurora Backgrounds + Animated Gradients
