import { Router } from "express";
import sensorRoutes from "./Sensors/sensorRoute";

const router = Router();

router.use("/sensors", sensorRoutes);

export default router;
