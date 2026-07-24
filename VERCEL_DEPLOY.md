# Deploying Vision Prep to Vercel

This guide walks through deploying the **API server** and **frontend** as separate Vercel projects, backed by your Neon PostgreSQL database.

---

## Prerequisites

- [Vercel account](https://vercel.com) (free tier works)
- [Neon database](https://neon.tech) provisioned and connection string ready
- Code pushed to a GitHub repository

---

## Part 1 — Deploy the API Server

### 1. Create a new Vercel project for the API

1. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository.
2. When asked **which directory to deploy**, set the **Root Directory** to `artifacts/api-server`.
3. Set the **Framework Preset** to **Other**.

### 2. Configure build settings

In the Vercel project settings → **Build & Output Settings**:

| Setting | Value |
|---|---|
| Build Command | `cd ../.. && pnpm install && pnpm --filter @workspace/api-server run build` |
| Output Directory | `dist` |
| Install Command | *(leave blank — handled by build command)* |

### 3. Set environment variables

In Vercel → **Settings → Environment Variables**, add:

| Key | Value |
|---|---|
| `NEON_DATABASE_URL` | Your Neon connection string (`postgresql://...`) |
| `JWT_SECRET` | A strong random secret (32+ chars) |
| `NODE_ENV` | `production` |
| `PORT` | `8080` |

### 4. Add a `vercel.json` in `artifacts/api-server/`

Create `artifacts/api-server/vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.mjs",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "dist/index.mjs"
    }
  ]
}
```

### 5. Deploy

Click **Deploy**. After deployment, note your API URL (e.g. `https://vision-prep-api.vercel.app`).

---

## Part 2 — Deploy the Frontend

### 1. Create a new Vercel project for the frontend

1. Go to [vercel.com/new](https://vercel.com/new) and import the same GitHub repository again as a **second** project.
2. Set the **Root Directory** to `artifacts/vision-prep`.
3. Set the **Framework Preset** to **Vite**.

### 2. Configure build settings

| Setting | Value |
|---|---|
| Build Command | `cd ../.. && pnpm install && pnpm --filter @workspace/vision-prep run build` |
| Output Directory | `dist/public` |
| Install Command | *(leave blank)* |

### 3. Set environment variables

| Key | Value |
|---|---|
| `VITE_API_URL` | Your deployed API URL + `/api` (e.g. `https://vision-prep-api.vercel.app/api`) |
| `PORT` | `20697` |
| `BASE_PATH` | `/` |

### 4. Add a `vercel.json` in `artifacts/vision-prep/`

Create `artifacts/vision-prep/vercel.json`:

```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

### 5. Deploy

Click **Deploy**. Your frontend will be live at the assigned Vercel domain.

---

## Part 3 — Push Schema to Neon

After both projects are deployed, run this once locally or in a Replit shell to push the database schema to Neon:

```bash
NEON_DATABASE_URL="postgresql://..." pnpm --filter @workspace/db run push
```

---

## Connecting custom domains (optional)

In each Vercel project → **Settings → Domains**, add your custom domain. If both API and frontend share the same domain (e.g. using `/api` path prefix), configure Vercel's **Rewrites** in the frontend project to proxy `/api/(.*)` to the API project URL — this avoids CORS entirely.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| API returns 500 on startup | Check `NEON_DATABASE_URL` and `JWT_SECRET` are set in Vercel env |
| Frontend shows blank sections | Check `VITE_API_URL` points to the deployed API, not localhost |
| CORS errors in browser | Add the frontend Vercel domain to CORS config in `artifacts/api-server/src/app.ts` |
| Schema errors | Run `pnpm --filter @workspace/db run push` against Neon |
