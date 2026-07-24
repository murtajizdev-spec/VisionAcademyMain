import { Router } from "express";
import { db, resultsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

router.get("/results", async (req, res): Promise<void> => {
  const rows = await db.select().from(resultsTable);
  let result = rows;
  if (req.query.year) result = result.filter(r => r.year === req.query.year);
  if (req.query.class) result = result.filter(r => r.class === req.query.class);
  res.json(result);
});

router.get("/results/top", async (_req, res): Promise<void> => {
  const rows = await db.select().from(resultsTable);
  // Return results where position includes "1st" or is a top holder
  const top = rows.filter(r => r.position.toLowerCase().includes("1st") || r.position.toLowerCase().includes("position")).slice(0, 10);
  res.json(top.length > 0 ? top : rows.slice(0, 10));
});

router.get("/admin/results", requireAdmin, async (_req, res): Promise<void> => {
  const rows = await db.select().from(resultsTable);
  res.json(rows);
});

router.post("/admin/results", requireAdmin, async (req, res): Promise<void> => {
  const { studentName, class: cls, year, marks, percentage, position, board, imageUrl } = req.body;
  if (!studentName || !cls || !year || !marks || !percentage || !position) {
    res.status(400).json({ error: "Missing required fields" }); return;
  }
  const [row] = await db.insert(resultsTable).values({ studentName, class: cls, year, marks, percentage, position, board, imageUrl }).returning();
  res.status(201).json(row);
});

router.delete("/admin/results/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  await db.delete(resultsTable).where(eq(resultsTable.id, id));
  res.status(204).send();
});

export default router;
