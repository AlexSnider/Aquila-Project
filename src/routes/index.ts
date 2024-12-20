import { Router } from "express";
import corsMiddleware from "../middleware/corsMiddleware";
import sensorRoutes from "./v1/Sensors/sensorRoute";
import healthCheckRoute from "./health-check/healthCheckRoute";
import DocsRoute from "./docs/docsRoute";

const router = Router();

router.use("/api-docs", corsMiddleware.execute, DocsRoute);
router.use("/health-check", corsMiddleware.execute, healthCheckRoute);
router.use("/sensors", corsMiddleware.execute, sensorRoutes);

export default router;
