import { Router } from "express";
import { db, admissionsTable, coursesTable, facultyTable, usersTable, resultsTable } from "@workspace/db";
import { eq, count } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { messagesTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  const [admissionCount] = await db.select({ count: count() }).from(admissionsTable);
  const [courseCount] = await db.select({ count: count() }).from(coursesTable);
  const [facultyCount] = await db.select({ count: count() }).from(facultyTable);
  const [resultCount] = await db.select({ count: count() }).from(resultsTable);

  res.json({
    totalStudents: Number(admissionCount.count) * 3 + 1500, // estimated total over the years
    successRate: 94,
    totalCourses: Number(courseCount.count),
    yearsExperience: 12,
    topPositions: Number(resultCount.count) + 47,
    totalFaculty: Number(facultyCount.count),
  });
});

router.get("/admin/dashboard", requireAdmin, async (_req, res): Promise<void> => {
  const [totalAdmissions] = await db.select({ count: count() }).from(admissionsTable);
  const [pendingAdmissions] = await db.select({ count: count() }).from(admissionsTable).where(eq(admissionsTable.status, "pending"));
  const [totalMessages] = await db.select({ count: count() }).from(messagesTable);
  const [unreadMessages] = await db.select({ count: count() }).from(messagesTable).where(eq(messagesTable.status, "new"));
  const [totalCourses] = await db.select({ count: count() }).from(coursesTable);
  const [totalFaculty] = await db.select({ count: count() }).from(facultyTable);
  const [totalUsers] = await db.select({ count: count() }).from(usersTable);

  const recentAdmissions = await db.select().from(admissionsTable).orderBy(desc(admissionsTable.createdAt)).limit(5);
  const recentMessages = await db.select().from(messagesTable).orderBy(desc(messagesTable.createdAt)).limit(5);

  res.json({
    totalStudents: Number(totalUsers.count),
    totalAdmissions: Number(totalAdmissions.count),
    pendingAdmissions: Number(pendingAdmissions.count),
    totalMessages: Number(totalMessages.count),
    unreadMessages: Number(unreadMessages.count),
    totalCourses: Number(totalCourses.count),
    totalFaculty: Number(totalFaculty.count),
    totalBlogs: 0,
    recentAdmissions,
    recentMessages,
  });
});

router.get("/admin/users", requireAdmin, async (_req, res): Promise<void> => {
  const rows = await db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
    role: usersTable.role,
    createdAt: usersTable.createdAt,
  }).from(usersTable);
  res.json(rows);
});

export default router;
