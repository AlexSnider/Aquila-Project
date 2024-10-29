import { Router } from "express";
import sensorRoutes from "./v1/Sensors/sensorRoute";
import healthCheckRoute from "./health-check/health-check-route/healthCheckRoute";
import corsMiddleware from "src/middleware/corsMiddleware";

const router = Router();

router.use("/health-check", corsMiddleware.execute, healthCheckRoute);
router.use("/sensors", corsMiddleware.execute, sensorRoutes);

export default router;
