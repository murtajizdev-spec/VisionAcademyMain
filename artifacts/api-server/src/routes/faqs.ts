import { Router } from "express";
import { db, faqsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

router.get("/faqs", async (req, res): Promise<void> => {
  const rows = await db.select().from(faqsTable).orderBy(asc(faqsTable.sortOrder));
  let result = rows;
  if (req.query.category) result = result.filter(f => f.category === req.query.category);
  res.json(result);
});

router.get("/admin/faqs", requireAdmin, async (_req, res): Promise<void> => {
  const rows = await db.select().from(faqsTable).orderBy(asc(faqsTable.sortOrder));
  res.json(rows);
});

router.post("/admin/faqs", requireAdmin, async (req, res): Promise<void> => {
  const { question, answer, category = "general", sortOrder = 0 } = req.body;
  if (!question || !answer) {
    res.status(400).json({ error: "Missing required fields" }); return;
  }
  const [row] = await db.insert(faqsTable).values({ question, answer, category, sortOrder }).returning();
  res.status(201).json(row);
});

router.patch("/admin/faqs/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [row] = await db.update(faqsTable).set(req.body).where(eq(faqsTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/admin/faqs/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  await db.delete(faqsTable).where(eq(faqsTable.id, id));
  res.status(204).send();
});

export default router;
