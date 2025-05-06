import { Router } from "express";
import sensorsRelatoriesController from "../../modules/v1/Sensors/useCases/find/findSensorsByUserIdAndGenerateReports/findSensorsByUserIdAndGenerateReports.controller";

const sensorsRelatoriesRoute = Router();

sensorsRelatoriesRoute.get("/sensors-reports/user-id/:user_id", sensorsRelatoriesController.handle);

export default sensorsRelatoriesRoute;
