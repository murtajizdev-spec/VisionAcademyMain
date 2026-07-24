# VisionPrep — Educational Institute Website

A full-stack coaching institute website for MDCAT, ECAT, NUMS, FSc, Matric, and CSS/PMS preparation.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS + shadcn/ui + framer-motion + three.js |
| Backend | Express 5 (TypeScript, ESM, built with esbuild) |
| Database | PostgreSQL via Replit's built-in DB + Drizzle ORM |
| Monorepo | pnpm workspaces |

## How to Run

Two workflows start automatically:

- **`artifacts/vision-prep: web`** — Vite dev server (frontend). Port is set by the `PORT` env var.
- **`artifacts/api-server: API Server`** — Express API. Always runs on port 8080.

The frontend proxies `/api` → `http://localhost:8080` so they work together seamlessly.

## Environment Variables (development)

| Variable | Purpose |
|---|---|
| `PORT` | Frontend Vite dev server port |
| `BASE_PATH` | Vite `base` config (set to `/`) |
| `JWT_SECRET` | Signs admin JWT tokens |
| `ADMIN_PASSWORD` | Initial admin account password |
| `DATABASE_URL` | Auto-injected by Replit (PostgreSQL) |

## Admin Panel

Visit `/admin` to log in. Default credentials use the `ADMIN_PASSWORD` env var. The admin panel includes:

- Courses, Faculty, Admissions, Messages, Blog, Events, Gallery, Results, Testimonials, FAQs
- **Site Settings** — edit contact info, social links, site name, tagline, and upload the site logo

## Site Settings / CMS

`/admin/settings` lets you edit everything shown sitewide:
- Site name, tagline, website URL
- Logo (upload image — stored in `artifacts/api-server/uploads/`, served at `/api/uploads/*`)
- Contact: address, 2 phones, 2 emails, Google Maps embed URL
- Social links: Facebook, Instagram, Twitter/X, WhatsApp

## Project Structure

```
artifacts/
  vision-prep/      # React frontend
  api-server/       # Express backend
  mockup-sandbox/   # Canvas component previews (design tool)
lib/
  db/               # Drizzle schema + DB connection
  api-spec/         # OpenAPI spec
  api-client-react/ # Generated React Query hooks
  api-zod/          # Zod validators
```

## User Preferences

- Keep existing project structure and stack
- Do not migrate to a different database or framework
