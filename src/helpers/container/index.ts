import { container } from "tsyringe";

import { ISensorRepositories } from "../../modules/Sensors/repositories/ISensorRepositories";
import { SensorRepositoriesMongoDB } from "../../modules/Sensors/repositories/implementations/SensorRepositoriesMongoDB";

container.registerSingleton<ISensorRepositories>(
  "SensorRepositories",
  SensorRepositoriesMongoDB
);  
