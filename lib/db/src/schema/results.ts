import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const resultsTable = pgTable("results", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  class: text("class").notNull(),
  year: text("year").notNull(),
  marks: text("marks").notNull(),
  percentage: text("percentage").notNull(),
  position: text("position").notNull(),
  board: text("board"),
  imageUrl: text("image_url"),
});

export const insertResultSchema = createInsertSchema(resultsTable).omit({ id: true });
export type InsertResult = z.infer<typeof insertResultSchema>;
export type Result = typeof resultsTable.$inferSelect;
