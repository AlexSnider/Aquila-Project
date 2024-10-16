import { ConflictError } from "../../../../../helpers/errors/apiErrors";
import { Sensor } from "../../entities/Sensor";
import { ISensorRepositories } from "../../repositories/ISensorRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(body: Sensor): Promise<Sensor> {
    const sensorExists = await this.sensorRepository.findByName(
      body.sensor_name as string
    );

    if (sensorExists) {
      throw new ConflictError("Sensor already exists");
    }

    await this.sensorRepository.create(body);
    return body;
  }
}
