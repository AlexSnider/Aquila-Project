import { container } from "tsyringe";

import { ISensorRepositories } from "../../modules/v1/Sensors/repositories/ISensorRepositories";
import { SensorRepositoriesMongoDB } from "../../modules/v1/Sensors/repositories/implementations/SensorRepositoriesMongoDB";

container.registerSingleton<ISensorRepositories>(
  "SensorRepositories",
  SensorRepositoriesMongoDB
);
