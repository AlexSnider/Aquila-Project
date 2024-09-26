import { Router } from "express";
import createController from "../../../modules/v1/Sensors/useCases/create/create.controller";
import paginationMiddleware from "../../../middleware/paginationMiddleware";
import findAllController from "../../../modules/v1/Sensors/useCases/findAll/findAll.controller";
import findByIdController from "../../../modules/v1/Sensors/useCases/findById/findById.controller";
import updateSensorController from "../../../modules/v1/Sensors/useCases/update/updateSensor.controller";
import deleteSensorController from "../../../modules/v1/Sensors/useCases/delete/deleteSensor.controller";

const sensorRoutes = Router();

sensorRoutes.post("/", createController.handle);
sensorRoutes.get("/", paginationMiddleware.execute, findAllController.handle);
sensorRoutes.get("/find/:id", findByIdController.handle);
sensorRoutes.patch("/update/:id", updateSensorController.handle);
sensorRoutes.delete("/delete/:id", deleteSensorController.handle);

export default sensorRoutes;
