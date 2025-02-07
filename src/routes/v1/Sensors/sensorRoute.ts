import { Router } from "express";
import { SensorSchemaJoi } from "../../../modules/v1/Sensors/schemas/joi/SensorSchemajoi";
import createController from "../../../modules/v1/Sensors/useCases/create/create.controller";
import paginationMiddleware from "../../../middleware/paginationMiddleware";
import findAllController from "../../../modules/v1/Sensors/useCases/find/findAll/findAll.controller";
import findCollectionByUserIdController from "../../../modules/v1/Sensors/useCases/find/findCollectionByUserId/findCollectionByUserId.controller";
import findGroupsByUserIdAndGroupIdController from "src/modules/v1/Sensors/useCases/find/findGroupsByUserIdAndGroupId/findGroupsByUserIdAndGroupId.controller";
import findSensorByUserIdAndSensorIdController from "src/modules/v1/Sensors/useCases/find/findSensorByUserIdAndSensorId/findSensorByUserIdAndSensorId.controller";
import updateSensorController from "../../../modules/v1/Sensors/useCases/update/updateSensor.controller";
import validadeSchema from "../../../middleware/schemaValidationMiddleware";
import deleteByUserIdController from "src/modules/v1/Sensors/useCases/delete/deleteByUserId/deleteByUserId.controller";
import deleteByUserIdAndGroupIdController from "src/modules/v1/Sensors/useCases/delete/deleteByUserIdAndGroupId/deleteByUserIdAndGroupId.controller";
import deleteByUserIdAndSensorIdController from "src/modules/v1/Sensors/useCases/delete/deleteByUserIdAndSensorId/deleteByUserIdAndSensorId.controller";

const sensorRoutes = Router();

sensorRoutes.post(
  "/register",
  validadeSchema.execute(SensorSchemaJoi),
  createController.handle
);
sensorRoutes.get(
  "/collections",
  paginationMiddleware.execute,
  findAllController.handle
);

sensorRoutes.get(
  "/user-collection/:id",
  findCollectionByUserIdController.handle
);

sensorRoutes.get(
  "/:user_id/group-id/:_id",
  findGroupsByUserIdAndGroupIdController.handle
);

sensorRoutes.get(
  "/:user_id/sensor-id/:_id",
  findSensorByUserIdAndSensorIdController.handle
);

sensorRoutes.delete("/:user_id", deleteByUserIdController.handle);

sensorRoutes.delete(
  "/user_id/:user_id/group-id/:_id",
  deleteByUserIdAndGroupIdController.handle
);

sensorRoutes.delete(
  "/user_id/:user_id/sensor-id/:_id",
  deleteByUserIdAndSensorIdController.handle
);

sensorRoutes.patch("/update/:id", updateSensorController.handle);

export default sensorRoutes;
