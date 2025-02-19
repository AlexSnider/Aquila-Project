import { injectable, inject } from "tsyringe";
import { ISensorRepositories } from "../../../repositories/ISensorRepositories";
import { Sensor } from "../../../entities/Sensor";
import { NotFoundError } from "src/helpers/errors/apiErrors";

@injectable()
export class FindAllService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(limit: number, offset: number): Promise<Sensor[]> {
    const sensors = await this.sensorRepository.findAll(limit, offset);

    if (sensors.length === 0) {
      throw new NotFoundError("No sensors collections found");
    }

    return sensors;
  }
}
