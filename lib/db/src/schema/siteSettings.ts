import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const siteSettingsTable = pgTable("site_settings", {
  id: serial().primaryKey(),
  siteName: text("site_name").notNull().default("VisionPrep"),
  tagline: text("tagline").notNull().default("Transforming destinies through precision coaching for MDCAT, ECAT, NUMS, and Federal Board examinations."),
  address: text("address").notNull().default("Main Campus, 123 Education Street, F-8 Markaz, Islamabad, Pakistan"),
  phone1: text("phone1").notNull().default("+92 300 1234567"),
  phone2: text("phone2").default("+92 51 1234567"),
  email1: text("email1").notNull().default("info@visionprep.edu.pk"),
  email2: text("email2").default("admissions@visionprep.edu.pk"),
  mapEmbedUrl: text("map_embed_url").default("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.8!2d73.0479!3d33.7215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf0000000001%3A0x1!2sF-8+Markaz%2C+Islamabad!5e0!3m2!1sen!2spk!4v1!5m2!1sen!2spk"),
  websiteUrl: text("website_url").default("https://visionprep.edu.pk"),
  facebookUrl: text("facebook_url").default(""),
  twitterUrl: text("twitter_url").default(""),
  instagramUrl: text("instagram_url").default(""),
  whatsappNumber: text("whatsapp_number").default("+923001234567"),
  logoUrl: text("logo_url").default(""),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
