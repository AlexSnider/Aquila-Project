import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../repositories/ISensorRepositories";
import { NotFoundError } from "../../../../../helpers/errors/apiErrors";

@injectable()
export class DeleteService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(_id: string): Promise<void> {
    const sensor = await this.sensorRepository.findById(_id);

    if (!sensor) {
      throw new NotFoundError("Sensor not found");
    }

    await this.sensorRepository.delete(_id);
  }
}
