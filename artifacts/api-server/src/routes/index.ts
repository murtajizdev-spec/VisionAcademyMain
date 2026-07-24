import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import coursesRouter from "./courses";
import facultyRouter from "./faculty";
import testimonialsRouter from "./testimonials";
import blogsRouter from "./blogs";
import eventsRouter from "./events";
import galleryRouter from "./gallery";
import resultsRouter from "./results";
import faqsRouter from "./faqs";
import formsRouter from "./forms";
import statsRouter from "./stats";
import siteSettingsRouter from "./siteSettings";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(siteSettingsRouter);
router.use(coursesRouter);
router.use(facultyRouter);
router.use(testimonialsRouter);
router.use(blogsRouter);
router.use(eventsRouter);
router.use(galleryRouter);
router.use(resultsRouter);
router.use(faqsRouter);
router.use(formsRouter);
router.use(statsRouter);

export default router;
