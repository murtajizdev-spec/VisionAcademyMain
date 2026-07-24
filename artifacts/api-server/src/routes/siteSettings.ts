import { Router } from "express";
import { db, siteSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

// Ensure a singleton row exists
async function getOrCreateSettings() {
  const [existing] = await db.select().from(siteSettingsTable).where(eq(siteSettingsTable.id, 1)).limit(1);
  if (existing) return existing;
  const [created] = await db.insert(siteSettingsTable).values({ id: 1 }).returning();
  return created;
}

// GET /site-settings — public
router.get("/site-settings", async (_req, res): Promise<void> => {
  const settings = await getOrCreateSettings();
  res.json(settings);
});

// PUT /admin/site-settings — admin only
router.put("/admin/site-settings", requireAdmin, async (req, res): Promise<void> => {
  const {
    siteName, tagline, address, phone1, phone2,
    email1, email2, mapEmbedUrl, websiteUrl,
    facebookUrl, twitterUrl, instagramUrl, whatsappNumber,
  } = req.body;

  await getOrCreateSettings(); // ensure row exists

  const [updated] = await db
    .update(siteSettingsTable)
    .set({
      ...(siteName !== undefined && { siteName }),
      ...(tagline !== undefined && { tagline }),
      ...(address !== undefined && { address }),
      ...(phone1 !== undefined && { phone1 }),
      ...(phone2 !== undefined && { phone2 }),
      ...(email1 !== undefined && { email1 }),
      ...(email2 !== undefined && { email2 }),
      ...(mapEmbedUrl !== undefined && { mapEmbedUrl }),
      ...(websiteUrl !== undefined && { websiteUrl }),
      ...(facebookUrl !== undefined && { facebookUrl }),
      ...(twitterUrl !== undefined && { twitterUrl }),
      ...(instagramUrl !== undefined && { instagramUrl }),
      ...(whatsappNumber !== undefined && { whatsappNumber }),
      updatedAt: new Date(),
    })
    .where(eq(siteSettingsTable.id, 1))
    .returning();

  res.json(updated);
});

export default router;
