import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../../repositories/ISensorRepositories";
import { Sensor } from "../../../entities/Sensor";
import { NotFoundError } from "../../../../../../helpers/errors/apiErrors";

@injectable()
export class FindCollectionByUserIdSerivice {
  constructor(
    @inject("SensorRepositories")
    private readonly sensorRepository: ISensorRepositories
  ) {}

  async execute(user_id: string): Promise<Sensor[]> {
    const sensor = await this.sensorRepository.findCollectionByUserId(user_id);

    if (!sensor || sensor.length === 0) {
      throw new NotFoundError("No sensors collections found");
    }

    return sensor;
  }
}
