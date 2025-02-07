import { inject, injectable } from "tsyringe";
import {
  ISensorRepositories,
  ISensorResult,
} from "../../../repositories/ISensorRepositories";
import { NotFoundError } from "../../../../../../helpers/errors/apiErrors";
import { Types } from "mongoose";

@injectable()
export class FindSensorByUserIdAndSensorIdService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(
    user_id: string,
    sensorIdObject: Types.ObjectId
  ): Promise<ISensorResult[]> {
    const sensor = await this.sensorRepository.findSensorByUserIdAndSensorId(
      user_id,
      sensorIdObject
    );

    if (!sensor || sensor.length === 0) {
      throw new NotFoundError("Sensor not found");
    }

    return sensor;
  }
}
