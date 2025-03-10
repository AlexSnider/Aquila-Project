import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../../repositories/ISensorRepositories";
import { NotFoundError } from "../../../../../../helpers/errors/apiErrors";
import { Types } from "mongoose";

@injectable()
export class DeleteByUserIdAndSensorIdService {
  constructor(
    @inject("SensorRepositories")
    private readonly sensorRepository: ISensorRepositories
  ) {}

  async execute(
    user_id: string,
    sensorIdObject: Types.ObjectId
  ): Promise<void> {
    const sensor = await this.sensorRepository.findSensorByUserIdAndSensorId(
      user_id,
      sensorIdObject
    );

    if (!sensor || sensor.length === 0) {
      throw new NotFoundError("Sensor not found");
    }

    await this.sensorRepository.deleteByUserIdAndSensorId(
      user_id,
      sensorIdObject
    );
  }
}
