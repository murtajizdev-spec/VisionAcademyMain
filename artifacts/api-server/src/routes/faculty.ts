import { Router } from "express";
import { db, facultyTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

router.get("/faculty", async (req, res): Promise<void> => {
  const rows = await db.select().from(facultyTable).orderBy(asc(facultyTable.sortOrder));
  let result = rows;
  if (req.query.featured === "true") result = result.filter(f => f.featured);
  res.json(result);
});

router.get("/faculty/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [row] = await db.select().from(facultyTable).where(eq(facultyTable.id, id)).limit(1);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.get("/admin/faculty", requireAdmin, async (_req, res): Promise<void> => {
  const rows = await db.select().from(facultyTable).orderBy(asc(facultyTable.sortOrder));
  res.json(rows);
});

router.post("/admin/faculty", requireAdmin, async (req, res): Promise<void> => {
  const { name, subject, qualification, experience, bio, imageUrl, featured = false, sortOrder = 0 } = req.body;
  if (!name || !subject || !qualification || !experience) {
    res.status(400).json({ error: "Missing required fields" }); return;
  }
  const [row] = await db.insert(facultyTable).values({ name, subject, qualification, experience, bio, imageUrl, featured, sortOrder }).returning();
  res.status(201).json(row);
});

router.patch("/admin/faculty/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [row] = await db.update(facultyTable).set(req.body).where(eq(facultyTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/admin/faculty/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  await db.delete(facultyTable).where(eq(facultyTable.id, id));
  res.status(204).send();
});

export default router;
