import { Router } from "express";
import { db, eventsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

router.get("/events", async (req, res): Promise<void> => {
  const rows = await db.select().from(eventsTable).orderBy(asc(eventsTable.eventDate));
  let result = rows;
  if (req.query.upcoming === "true") {
    const now = new Date();
    result = result.filter(e => new Date(e.eventDate) >= now);
  }
  res.json(result);
});

router.get("/admin/events", requireAdmin, async (_req, res): Promise<void> => {
  const rows = await db.select().from(eventsTable).orderBy(asc(eventsTable.eventDate));
  res.json(rows);
});

router.post("/admin/events", requireAdmin, async (req, res): Promise<void> => {
  const { title, description, eventDate, location, type = "upcoming", imageUrl, registrationLink } = req.body;
  if (!title || !description || !eventDate || !location) {
    res.status(400).json({ error: "Missing required fields" }); return;
  }
  const [row] = await db.insert(eventsTable).values({ title, description, eventDate: new Date(eventDate), location, type, imageUrl, registrationLink }).returning();
  res.status(201).json(row);
});

router.patch("/admin/events/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const updates = { ...req.body };
  if (updates.eventDate) updates.eventDate = new Date(updates.eventDate);
  const [row] = await db.update(eventsTable).set(updates).where(eq(eventsTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/admin/events/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  await db.delete(eventsTable).where(eq(eventsTable.id, id));
  res.status(204).send();
});

export default router;
