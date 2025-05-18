import { Router } from "express";
import corsMiddleware from "../middleware/corsMiddleware";
import errorMiddleware from "../middleware/errorMiddleware";
import sensorRoutes from "./v1/Sensors/sensorRoute";
import healthCheckRoute from "./health-check/healthCheckRoute";
import sensorsRelatoriesRoute from "./sensors-reports/sensorsReportsRoute";
import DocsRoute from "./api-docs/docsRoute";

const router = Router();

router.use("/docs", corsMiddleware.execute, DocsRoute);
router.use("/health-check", corsMiddleware.execute, healthCheckRoute);
router.use("/api/v1/sensors", corsMiddleware.execute, sensorRoutes);
router.use("/api/v1/sensors/reports", corsMiddleware.execute, sensorsRelatoriesRoute);
router.use(errorMiddleware.execute);

export default router;
