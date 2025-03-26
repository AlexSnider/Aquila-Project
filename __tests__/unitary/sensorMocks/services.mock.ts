import { SensorRepositoriesMongoDB } from "src/modules/v1/Sensors/repositories/implementations/SensorRepositoriesMongoDB";
import { CreateNewSensorService } from "src/modules/v1/Sensors/useCases/create/createNewSensor.service";
import { DeleteByUserIdService } from "src/modules/v1/Sensors/useCases/delete/deleteByUserId/deleteByUserId.service";
import { DeleteByUserIdAndGroupIdService } from "src/modules/v1/Sensors/useCases/delete/deleteByUserIdAndGroupId/deleteByUserIdAndGroupId.service";
import { DeleteByUserIdAndSensorIdService } from "src/modules/v1/Sensors/useCases/delete/deleteByUserIdAndSensorId/deleteByUserIdAndSensorId.service";
import { FindAllService } from "src/modules/v1/Sensors/useCases/find/findAll/findAll.service";
import { FindCollectionByUserIdService } from "src/modules/v1/Sensors/useCases/find/findCollectionByUserId/findCollectionByUserId.service";
import { FindGroupsByUserIdAndGroupIdService } from "src/modules/v1/Sensors/useCases/find/findGroupsByUserIdAndGroupId/findGroupsByUserIdAndGroupId.service";
import { FindSensorByUserIdAndSensorIdService } from "src/modules/v1/Sensors/useCases/find/findSensorByUserIdAndSensorId/findSensorByUserIdAndSensorId.service";
import { InsertGroupByUserIdService } from "src/modules/v1/Sensors/useCases/update/insertGroupByUserId/insertGroupByUserId.service";
import { InsertSensorByUserIdService } from "src/modules/v1/Sensors/useCases/update/insertSensorByUserId/insertSensorByUserId.service";
import { UpdateGroupNameService } from "src/modules/v1/Sensors/useCases/update/updateGroupNameByUserId/updateGroupNameByUserId.service";
import { UpdateSensorDataService } from "src/modules/v1/Sensors/useCases/update/updateSensorDataByUserId/updateSensorDataByUserId.service";

export const sensorRepository = new SensorRepositoriesMongoDB();
export const createNewSensorService = new CreateNewSensorService(
  sensorRepository
);
export const findAllSensorsService = new FindAllService(sensorRepository);
export const findCollectionByUserIdService = new FindCollectionByUserIdService(
  sensorRepository
);
export const findGroupsByUserIdAndGroupId =
  new FindGroupsByUserIdAndGroupIdService(sensorRepository);
export const findSensorByUserIdAndSensorId =
  new FindSensorByUserIdAndSensorIdService(sensorRepository);
export const deleteByUserIdService = new DeleteByUserIdService(
  sensorRepository
);
export const deleteByUserIdAndGroupIdService =
  new DeleteByUserIdAndGroupIdService(sensorRepository);
export const deleteByUserIdAndSensorIdService =
  new DeleteByUserIdAndSensorIdService(sensorRepository);
export const updateGroupNameByUserIdService = new UpdateGroupNameService(
  sensorRepository
);
export const updateSensorDataByUserIdService = new UpdateSensorDataService(
  sensorRepository
);

export const insertGroupByUserIdService = new InsertGroupByUserIdService(
  sensorRepository
);
export const insertSensorByUserIdService = new InsertSensorByUserIdService(
  sensorRepository
);
