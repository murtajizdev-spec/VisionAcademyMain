import { Router } from "express";
import { db, blogsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

router.get("/blogs", async (req, res): Promise<void> => {
  const rows = await db.select().from(blogsTable).where(eq(blogsTable.published, true)).orderBy(desc(blogsTable.createdAt));
  let result = rows;
  if (req.query.category) result = result.filter(b => b.category === req.query.category);
  if (req.query.featured === "true") result = result.filter(b => b.featured);
  if (req.query.search) {
    const s = (req.query.search as string).toLowerCase();
    result = result.filter(b => b.title.toLowerCase().includes(s) || b.content.toLowerCase().includes(s));
  }
  res.json(result);
});

router.get("/blogs/:slug", async (req, res): Promise<void> => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const [row] = await db.select().from(blogsTable).where(eq(blogsTable.slug, slug)).limit(1);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.get("/admin/blogs", requireAdmin, async (_req, res): Promise<void> => {
  const rows = await db.select().from(blogsTable).orderBy(desc(blogsTable.createdAt));
  res.json(rows);
});

router.post("/admin/blogs", requireAdmin, async (req, res): Promise<void> => {
  const { title, slug, excerpt, content, category, tags, imageUrl, published = false, featured = false } = req.body;
  if (!title || !slug || !content || !category) {
    res.status(400).json({ error: "Missing required fields" }); return;
  }
  const publishedAt = published ? new Date() : null;
  const [row] = await db.insert(blogsTable).values({ title, slug, excerpt, content, category, tags, imageUrl, published, featured, publishedAt }).returning();
  res.status(201).json(row);
});

router.patch("/admin/blogs/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const updates = { ...req.body };
  if (updates.published && !updates.publishedAt) updates.publishedAt = new Date();
  const [row] = await db.update(blogsTable).set(updates).where(eq(blogsTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/admin/blogs/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  await db.delete(blogsTable).where(eq(blogsTable.id, id));
  res.status(204).send();
});

export default router;
