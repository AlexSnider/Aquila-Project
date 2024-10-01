import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../repositories/ISensorRepositories";
import { Sensor } from "../../entities/Sensor";
import { NotFoundError } from "../../../../../helpers/errors/apiErrors";

@injectable()
export class FindByUserIdService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(user_id: string): Promise<Sensor[]> {
    const sensor = await this.sensorRepository.findByUserId(user_id);

    if (!sensor) {
      throw new NotFoundError("User not found");
    }

    return sensor;
  }
}
