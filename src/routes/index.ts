import { Router } from "express";
import sensorRoutes from "./v1/Sensors/sensorRoute";
import healthCheckRoute from "./health-check/health-check-route/healthCheckRoute";

const router = Router();

router.use("/health-check", healthCheckRoute);
router.use("/sensors", sensorRoutes);

export default router;
