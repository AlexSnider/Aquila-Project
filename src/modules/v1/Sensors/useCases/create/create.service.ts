import { Sensor } from "../../entities/Sensor";
import { ISensorRepositories } from "../../repositories/ISensorRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(body: Sensor): Promise<void> {
    const sensorExists = await this.sensorRepository.findById(
      body._id as unknown as string
    );

    if (sensorExists) {
      throw new Error("Sensor already exists");
    }

    await this.sensorRepository.create(body);
  }
}
