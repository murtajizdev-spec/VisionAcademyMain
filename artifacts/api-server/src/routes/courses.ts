import { Router } from "express";
import { db, coursesTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

router.get("/courses", async (req, res): Promise<void> => {
  let query = db.select().from(coursesTable);
  const rows = await db.select().from(coursesTable).orderBy(asc(coursesTable.sortOrder));
  let result = rows;
  if (req.query.category) {
    result = result.filter(c => c.category === req.query.category);
  }
  if (req.query.featured === "true") {
    result = result.filter(c => c.featured);
  }
  res.json(result);
});

router.get("/courses/:slug", async (req, res): Promise<void> => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const [course] = await db.select().from(coursesTable).where(eq(coursesTable.slug, slug)).limit(1);
  if (!course) { res.status(404).json({ error: "Not found" }); return; }
  res.json(course);
});

// Admin
router.get("/admin/courses", requireAdmin, async (_req, res): Promise<void> => {
  const rows = await db.select().from(coursesTable).orderBy(asc(coursesTable.sortOrder));
  res.json(rows);
});

router.post("/admin/courses", requireAdmin, async (req, res): Promise<void> => {
  const { title, slug, category, description, overview, subjects, duration, fee, schedule, imageUrl, featured = false, sortOrder = 0 } = req.body;
  if (!title || !slug || !category || !description || !duration || !fee) {
    res.status(400).json({ error: "Missing required fields" }); return;
  }
  const [row] = await db.insert(coursesTable).values({ title, slug, category, description, overview, subjects, duration, fee, schedule, imageUrl, featured, sortOrder }).returning();
  res.status(201).json(row);
});

router.patch("/admin/courses/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const updates = req.body;
  const [row] = await db.update(coursesTable).set(updates).where(eq(coursesTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/admin/courses/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  await db.delete(coursesTable).where(eq(coursesTable.id, id));
  res.status(204).send();
});

export default router;
