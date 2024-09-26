import { injectable, inject } from "tsyringe";
import { ISensorRepositories } from "../../repositories/ISensorRepositories";
import { Sensor } from "../../entities/Sensor";

@injectable()
export class FindAllService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(limit: number, offset: number): Promise<Sensor[]> {
    const sensors = await this.sensorRepository.findAll(limit, offset);

    if (!sensors.length) {
      throw new Error("Sensors not found");
    }

    return sensors;
  }
}
