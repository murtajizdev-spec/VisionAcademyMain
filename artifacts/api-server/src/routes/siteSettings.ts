import path from "path";
import fs from "fs";
import { Router, Request } from "express";
import multer from "multer";
import { db, siteSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

// Ensure uploads directory exists
const UPLOADS_DIR = path.resolve(process.cwd(), "uploads");
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Multer storage — keep original extension, sanitise filename
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safe = `logo-${Date.now()}${ext}`;
    cb(null, safe);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

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

// POST /admin/upload-logo — upload logo image, returns { url }
router.post(
  "/admin/upload-logo",
  requireAdmin,
  upload.single("logo"),
  (req: Request, res): void => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    const url = `/api/uploads/${req.file.filename}`;
    res.json({ url });
  },
);

// PUT /admin/site-settings — admin only
router.put("/admin/site-settings", requireAdmin, async (req, res): Promise<void> => {
  const {
    siteName, tagline, address, phone1, phone2,
    email1, email2, mapEmbedUrl, websiteUrl,
    facebookUrl, twitterUrl, instagramUrl, whatsappNumber, logoUrl,
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
      ...(logoUrl !== undefined && { logoUrl }),
      updatedAt: new Date(),
    })
    .where(eq(siteSettingsTable.id, 1))
    .returning();

  res.json(updated);
});

export default router;
