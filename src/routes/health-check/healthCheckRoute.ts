import { Router } from "express";
import healthCheckController from "../../monitoring/health-check/health-check-controller/healthCheck.controller";

const healthCheckRoute = Router();

healthCheckRoute.get("/", healthCheckController.handle);

export default healthCheckRoute;
