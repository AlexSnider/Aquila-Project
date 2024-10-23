import { Router } from "express";
import healthCheckController from "../health-check-controller/healthCheck.controller";

const healthCheckRoute = Router();

healthCheckRoute.get("/", healthCheckController.handle);

export default healthCheckRoute;
