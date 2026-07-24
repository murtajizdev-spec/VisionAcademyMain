import { Router } from "express";
import { db, galleryTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

router.get("/gallery", async (req, res): Promise<void> => {
  const rows = await db.select().from(galleryTable).orderBy(desc(galleryTable.createdAt));
  let result = rows;
  if (req.query.category) result = result.filter(g => g.category === req.query.category);
  res.json(result);
});

router.get("/admin/gallery", requireAdmin, async (_req, res): Promise<void> => {
  const rows = await db.select().from(galleryTable).orderBy(desc(galleryTable.createdAt));
  res.json(rows);
});

router.post("/admin/gallery", requireAdmin, async (req, res): Promise<void> => {
  const { title, imageUrl, category = "campus" } = req.body;
  if (!title || !imageUrl) {
    res.status(400).json({ error: "Missing required fields" }); return;
  }
  const [row] = await db.insert(galleryTable).values({ title, imageUrl, category }).returning();
  res.status(201).json(row);
});

router.delete("/admin/gallery/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  await db.delete(galleryTable).where(eq(galleryTable.id, id));
  res.status(204).send();
});

export default router;
