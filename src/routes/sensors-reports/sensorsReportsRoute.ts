import { Router } from "express";
import sensorsRelatoriesController from "../../modules/v1/Sensors/useCases/find/findSensorsByUserIdAndGenerateReports/findSensorsByUserIdAndGenerateReports.controller";

const sensorsRelatoriesRoute = Router();

sensorsRelatoriesRoute.get("/user-id/:user_id", sensorsRelatoriesController.handle);

export default sensorsRelatoriesRoute;
