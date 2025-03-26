import {
  ConflictError,
  ServerError,
} from "../../../../../helpers/errors/apiErrors";
import { Sensor } from "../../entities/Sensor";
import { ISensorRepositories } from "../../repositories/ISensorRepositories";
import { inject, injectable } from "tsyringe";

export interface ICreateSensorRequest {
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
    private readonly sensorRepository: ISensorRepositories
  ) {}

  async execute(body: ICreateSensorRequest): Promise<Sensor> {
    try {
      const sensorCollectionExists =
        await this.sensorRepository.findCollectionByUserId(body.user_id);

      if (sensorCollectionExists && sensorCollectionExists.length > 0) {
        throw new ConflictError("Sensor collection already exists");
      }

      const sensorData = new Sensor({
        user_id: body.user_id,
        sensor_groups: body.sensor_groups,
      });

      return await this.sensorRepository.create(sensorData);
    } catch (error) {
      if (!(error instanceof ConflictError)) {
        throw new ServerError("The server has encountered an error", error);
      }
      throw error;
    }
  }
}
