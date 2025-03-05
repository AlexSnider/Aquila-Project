import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../../repositories/ISensorRepositories";
import { Sensor } from "../../../entities/Sensor";
import { NotFoundError } from "../../../../../../helpers/errors/apiErrors";
import { UUIDTypes } from "node_modules/uuid/dist/cjs";

@injectable()
export class findCollectionByUserIdSerivice {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(user_id: UUIDTypes): Promise<Sensor[]> {
    const sensor = await this.sensorRepository.findCollectionByUserId(user_id);

    if (!sensor || sensor.length === 0) {
      throw new NotFoundError("No sensors collections found");
    }

    return sensor;
  }
}
