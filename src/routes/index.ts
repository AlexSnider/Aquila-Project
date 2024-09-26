import { Router } from "express";
import sensorRoutes from "./v1/Sensors/sensorRoute";

const router = Router();

router.use("/sensors", sensorRoutes);

export default router;
