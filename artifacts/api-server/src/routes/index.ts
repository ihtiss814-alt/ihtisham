import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import adminCloudinaryRouter from "./admin-cloudinary.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminCloudinaryRouter);

export default router;
