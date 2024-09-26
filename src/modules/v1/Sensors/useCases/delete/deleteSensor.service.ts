import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../repositories/ISensorRepositories";

@injectable()
export class DeleteService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(id: string): Promise<void> {
    const sensor = await this.sensorRepository.findById(id);

    if (!sensor) {
      throw new Error("No sensor found");
    }

    await this.sensorRepository.delete(id);
  }
}
