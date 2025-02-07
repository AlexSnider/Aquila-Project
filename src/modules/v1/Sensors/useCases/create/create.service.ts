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
export class CreateService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(body: ICreateSensorRequest): Promise<Sensor> {
    const sensorDocument = new Sensor({
      user_id: body.user_id,
      sensor_groups: body.sensor_groups,
    });

    const createSensor = await this.sensorRepository.create(sensorDocument);

    if (!createSensor) {
      throw new Error("Error creating sensor");
    }

    return sensorDocument;
  }
}
