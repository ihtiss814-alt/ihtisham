import { Router, type IRouter } from "express";
import healthRouter from "./health";
import adminCloudinaryRouter from "./admin-cloudinary";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminCloudinaryRouter);

export default router;
