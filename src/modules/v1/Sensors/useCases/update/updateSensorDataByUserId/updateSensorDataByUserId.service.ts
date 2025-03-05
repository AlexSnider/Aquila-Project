import { NotFoundError } from "../../../../../../helpers/errors/apiErrors";
import { ISensorRepositories } from "../../../repositories/ISensorRepositories";
import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";
import { UUIDTypes } from "node_modules/uuid/dist/cjs";

interface IUpdateSensorRequest {
  user_id: UUIDTypes;
  sensor_groups: Array<{
    sensors: Array<{
      _id: Types.ObjectId;
      sensor_name: string;
      location: {
        coordinates: [number, number];
      };
    }>;
  }>;
}

@injectable()
export class UpdateSensorDataService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(body: IUpdateSensorRequest): Promise<void> {
    const sensorExists =
      await this.sensorRepository.findSensorByUserIdAndSensorId(
        body.user_id,
        body.sensor_groups[0].sensors[0]._id
      );

    if (!sensorExists || sensorExists.length === 0) {
      throw new NotFoundError("Sensor not found");
    }

    await this.sensorRepository.updateSensorData(
      body.user_id,
      body.sensor_groups[0].sensors[0]._id,
      body.sensor_groups[0].sensors[0].sensor_name,
      body.sensor_groups[0].sensors[0].location
    );
  }
}
