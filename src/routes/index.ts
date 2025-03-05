import { Router } from "express";
import corsMiddleware from "../middleware/corsMiddleware";
import errorMiddleware from "../middleware/errorMiddleware";
import sensorRoutes from "./v1/Sensors/sensorRoute";
import healthCheckRoute from "./health-check/healthCheckRoute";
import DocsRoute from "./docs/docsRoute";

const router = Router();

router.use("/api-docs", corsMiddleware.execute, DocsRoute);
router.use("/health-check", corsMiddleware.execute, healthCheckRoute);
router.use("/api/v1/sensors", corsMiddleware.execute, sensorRoutes);
router.use(errorMiddleware.execute);

export default router;
