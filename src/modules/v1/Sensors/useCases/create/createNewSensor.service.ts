import { ConflictError } from "src/helpers/errors/apiErrors";
import { Sensor } from "../../entities/Sensor";
import { ISensorRepositories } from "../../repositories/ISensorRepositories";
import { inject, injectable } from "tsyringe";

interface ICreateSensorRequest {
  user_id: string;
  sensor_groups: {
    sensor_group_name: string;
    sensors: {
      sensor_name: string;
      location: { type: "Point"; coordinates: [number, number] };
    }[];
  }[];
}

@injectable()
export class CreateNewSensorService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(body: ICreateSensorRequest): Promise<Sensor> {
    const userExists = await this.sensorRepository.findCollectionByUserId(
      body.user_id
    );

    if (userExists && userExists.length > 0) {
      throw new ConflictError("User already has a sensor collection");
    }

    if (
      body.sensor_groups.length > 1 ||
      body.sensor_groups[0].sensors.length > 1
    ) {
      throw new ConflictError(
        "Only one group and sensor is allowed when creating a new sensor collection"
      );
    }

    const sensorData = new Sensor({
      user_id: body.user_id,
      sensor_groups: body.sensor_groups,
    });

    const createSensor = await this.sensorRepository.create(sensorData);

    if (!createSensor) {
      throw new Error("Error creating sensor");
    }

    return sensorData;
  }
}
