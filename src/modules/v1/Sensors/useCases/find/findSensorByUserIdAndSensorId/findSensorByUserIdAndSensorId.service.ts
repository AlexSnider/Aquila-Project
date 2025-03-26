import { inject, injectable } from "tsyringe";
import {
  ISensorRepositories,
  ISensorResult,
} from "../../../repositories/ISensorRepositories";
import {
  NotFoundError,
  ServerError,
} from "../../../../../../helpers/errors/apiErrors";
import { Types } from "mongoose";

@injectable()
export class FindSensorByUserIdAndSensorIdService {
  constructor(
    @inject("SensorRepositories")
    private readonly sensorRepository: ISensorRepositories
  ) {}

  async execute(
    user_id: string,
    sensorIdObject: Types.ObjectId
  ): Promise<ISensorResult[]> {
    try {
      const sensor = await this.sensorRepository.findSensorByUserIdAndSensorId(
        user_id,
        sensorIdObject
      );

      if (!sensor || sensor.length === 0) {
        throw new NotFoundError("Sensor not found");
      }

      return sensor;
    } catch (error) {
      if (!(error instanceof NotFoundError)) {
        throw new ServerError("The server has encountered an error", error);
      }
      throw error;
    }
  }
}
