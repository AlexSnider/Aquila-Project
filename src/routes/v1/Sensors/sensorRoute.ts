import { Router } from "express";
import createController from "../../../modules/v1/Sensors/useCases/create/create.controller";
import paginationMiddleware from "../../../middleware/paginationMiddleware";
import findAllController from "../../../modules/v1/Sensors/useCases/findAll/findAll.controller";
import findByIdController from "../../../modules/v1/Sensors/useCases/findById/findById.controller";
import updateSensorController from "../../../modules/v1/Sensors/useCases/update/updateSensor.controller";
import deleteSensorController from "../../../modules/v1/Sensors/useCases/delete/deleteSensor.controller";
import findByUserIdController from "../../../modules/v1/Sensors/useCases/findByUserId/findByUserId.controller";
import validadeSchema from "../../../middleware/schemaValidationMiddleware";
import { SensorSchemaJoi } from "../../../modules/v1/Sensors/schemas/joi/SensorSchemajoi";

const sensorRoutes = Router();

sensorRoutes.post(
  "/",
  validadeSchema.execute(SensorSchemaJoi),
  createController.handle
);
sensorRoutes.get("/", paginationMiddleware.execute, findAllController.handle);
sensorRoutes.get("/sensors/:id", findByIdController.handle);
sensorRoutes.get("/users-sensors/:id", findByUserIdController.handle);
sensorRoutes.patch("/update/:id", updateSensorController.handle);
sensorRoutes.delete("/delete/:id", deleteSensorController.handle);

export default sensorRoutes;
