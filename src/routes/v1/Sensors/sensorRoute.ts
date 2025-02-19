import { Router } from "express";
import {
  SensorDataSchemaJoi,
  SensorGroupSchemaJoi,
  SensorInsertDataSchemaJoi,
  SensorSchemaJoi,
} from "../../../modules/v1/Sensors/schemas/joi/SensorSchemajoi";
import createController from "../../../modules/v1/Sensors/useCases/create/createNewSensor.controller";
import paginationMiddleware from "../../../middleware/paginationMiddleware";
import findAllController from "../../../modules/v1/Sensors/useCases/find/findAll/findAll.controller";
import findCollectionByUserIdController from "../../../modules/v1/Sensors/useCases/find/findCollectionByUserId/findCollectionByUserId.controller";
import findGroupsByUserIdAndGroupIdController from "src/modules/v1/Sensors/useCases/find/findGroupsByUserIdAndGroupId/findGroupsByUserIdAndGroupId.controller";
import findSensorByUserIdAndSensorIdController from "src/modules/v1/Sensors/useCases/find/findSensorByUserIdAndSensorId/findSensorByUserIdAndSensorId.controller";
import validadeSchema from "../../../middleware/schemaValidationMiddleware";
import deleteByUserIdController from "src/modules/v1/Sensors/useCases/delete/deleteByUserId/deleteByUserId.controller";
import deleteByUserIdAndGroupIdController from "src/modules/v1/Sensors/useCases/delete/deleteByUserIdAndGroupId/deleteByUserIdAndGroupId.controller";
import deleteByUserIdAndSensorIdController from "src/modules/v1/Sensors/useCases/delete/deleteByUserIdAndSensorId/deleteByUserIdAndSensorId.controller";
import updateGroupNameController from "src/modules/v1/Sensors/useCases/update/updateGroupNameByUserId/updateGroupNameByUserId.controller";
import updateSensorDataController from "src/modules/v1/Sensors/useCases/update/updateSensorDataByUserId/updateSensorDataByUserId.controller";
import insertGroupByUserIdController from "src/modules/v1/Sensors/useCases/update/insertGroupByUserId/insertGroupByUserId.controller";
import insertSensorByUserIdController from "src/modules/v1/Sensors/useCases/update/insertSensorByUserId/insertSensorByUserId.controller";

const sensorRoutes = Router();

sensorRoutes.post(
  "/new-sensor",
  validadeSchema.execute(SensorSchemaJoi),
  createController.handle
);
sensorRoutes.get(
  "/all",
  paginationMiddleware.execute,
  findAllController.handle
);

sensorRoutes.get("/user-id/:id", findCollectionByUserIdController.handle);

sensorRoutes.get(
  "/user-id/:user_id/group-id/:_id",
  findGroupsByUserIdAndGroupIdController.handle
);

sensorRoutes.get(
  "/user-id/:user_id/sensor-id/:_id",
  findSensorByUserIdAndSensorIdController.handle
);

sensorRoutes.delete(
  "/delete/user-id/:user_id",
  deleteByUserIdController.handle
);

sensorRoutes.delete(
  "/delete/user-id/:user_id/group-id/:_id",
  deleteByUserIdAndGroupIdController.handle
);

sensorRoutes.delete(
  "/delete/user-id/:user_id/sensor-id/:_id",
  deleteByUserIdAndSensorIdController.handle
);

sensorRoutes.patch(
  "/update/user-id/:user_id/group-id/:_id",
  validadeSchema.execute(SensorGroupSchemaJoi),
  updateGroupNameController.handle
);

sensorRoutes.patch(
  "/update/user-id/:user_id/sensor-id/:_id",
  validadeSchema.execute(SensorDataSchemaJoi),
  updateSensorDataController.handle
);

sensorRoutes.put(
  "/insert-group/user-id/:user_id",
  validadeSchema.execute(SensorGroupSchemaJoi),
  insertGroupByUserIdController.handle
);

sensorRoutes.put(
  "/insert-sensor/user-id/:user_id/group-id/:_id",
  validadeSchema.execute(SensorInsertDataSchemaJoi),
  insertSensorByUserIdController.handle
);

export default sensorRoutes;
