import { Router } from "express";
import { db, messagesTable, admissionsTable, newsletterTable } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

// ── Public form submissions ──────────────────────────────────────────────────

router.post("/contact", async (req, res): Promise<void> => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !phone || !message) {
    res.status(400).json({ error: "Missing required fields" }); return;
  }
  await db.insert(messagesTable).values({ name, email, phone, subject, message });
  res.status(201).json({ success: true, message: "Your message has been received. We'll get back to you soon!" });
});

router.post("/admissions", async (req, res): Promise<void> => {
  const { studentName, guardianName, email, phone, course, class: cls, address, previousSchool, message } = req.body;
  if (!studentName || !guardianName || !email || !phone || !course || !cls) {
    res.status(400).json({ error: "Missing required fields" }); return;
  }
  await db.insert(admissionsTable).values({ studentName, guardianName, email, phone, course, class: cls, address, previousSchool, message });
  res.status(201).json({ success: true, message: "Your admission application has been submitted. We'll contact you within 24 hours!" });
});

router.post("/newsletter", async (req, res): Promise<void> => {
  const { email, name } = req.body;
  if (!email) {
    res.status(400).json({ error: "Email required" }); return;
  }
  try {
    await db.insert(newsletterTable).values({ email, name });
    res.status(201).json({ success: true, message: "You've been subscribed to our newsletter!" });
  } catch {
    res.status(400).json({ error: "Email already subscribed" });
  }
});

// ── Admin: Messages ──────────────────────────────────────────────────────────

router.get("/admin/messages", requireAdmin, async (_req, res): Promise<void> => {
  const rows = await db.select().from(messagesTable).orderBy(desc(messagesTable.createdAt));
  res.json(rows);
});

router.patch("/admin/messages/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { status, notes } = req.body;
  const [row] = await db.update(messagesTable).set({ status, notes }).where(eq(messagesTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

// ── Admin: Admissions ────────────────────────────────────────────────────────

router.get("/admin/admissions", requireAdmin, async (_req, res): Promise<void> => {
  const rows = await db.select().from(admissionsTable).orderBy(desc(admissionsTable.createdAt));
  res.json(rows);
});

router.patch("/admin/admissions/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { status, notes } = req.body;
  const [row] = await db.update(admissionsTable).set({ status, notes }).where(eq(admissionsTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

export default router;
