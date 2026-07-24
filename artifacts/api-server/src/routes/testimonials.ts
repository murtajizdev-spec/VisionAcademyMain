import { Router } from "express";
import { db, testimonialsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

router.get("/testimonials", async (_req, res): Promise<void> => {
  const rows = await db.select().from(testimonialsTable);
  res.json(rows);
});

router.get("/admin/testimonials", requireAdmin, async (_req, res): Promise<void> => {
  const rows = await db.select().from(testimonialsTable);
  res.json(rows);
});

router.post("/admin/testimonials", requireAdmin, async (req, res): Promise<void> => {
  const { studentName, course, content, rating = 5, imageUrl, year, featured = false } = req.body;
  if (!studentName || !course || !content) {
    res.status(400).json({ error: "Missing required fields" }); return;
  }
  const [row] = await db.insert(testimonialsTable).values({ studentName, course, content, rating, imageUrl, year, featured }).returning();
  res.status(201).json(row);
});

router.patch("/admin/testimonials/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [row] = await db.update(testimonialsTable).set(req.body).where(eq(testimonialsTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/admin/testimonials/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  await db.delete(testimonialsTable).where(eq(testimonialsTable.id, id));
  res.status(204).send();
});

export default router;
