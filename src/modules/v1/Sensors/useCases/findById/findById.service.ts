import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../repositories/ISensorRepositories";
import { Sensor } from "../../entities/Sensor";
import { NotFoundError } from "../../../../../helpers/errors/apiErrors";

@injectable()
export class FindByIdService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(id: string): Promise<Sensor> {
    const sensor = await this.sensorRepository.findById(id);

    if (!sensor) {
      throw new NotFoundError("Sensor not found");
    }

    return sensor;
  }
}
