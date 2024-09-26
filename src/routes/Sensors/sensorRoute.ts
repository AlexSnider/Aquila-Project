import { Router } from "express";
import createController from "../../modules/Sensors/useCases/create/create.controller";
import findAllController from "../../modules/Sensors/useCases/findAll/findAll.controller";
import paginationMiddleware from "../../middleware/paginationMiddleware";
import findByIdController from "../../modules/Sensors/useCases/findById/findById.controller";
import updateSensorController from "../../modules/Sensors/useCases/update/updateSensor.controller";
import deleteSensorController from "../../modules/Sensors/useCases/delete/deleteSensor.controller";

const sensorRoutes = Router();

sensorRoutes.post("/", createController.handle);
sensorRoutes.get("/", paginationMiddleware.execute, findAllController.handle);
sensorRoutes.get("/find/:id", findByIdController.handle);
sensorRoutes.patch("/update/:id", updateSensorController.handle);
sensorRoutes.delete("/delete/:id", deleteSensorController.handle);

export default sensorRoutes;
