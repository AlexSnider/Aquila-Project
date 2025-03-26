import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../../repositories/ISensorRepositories";
import { Sensor } from "../../../entities/Sensor";
import {
  NotFoundError,
  ServerError,
} from "../../../../../../helpers/errors/apiErrors";

@injectable()
export class FindCollectionByUserIdService {
  constructor(
    @inject("SensorRepositories")
    private readonly sensorRepository: ISensorRepositories
  ) {}

  async execute(user_id: string): Promise<Sensor[]> {
    try {
      const sensors = await this.sensorRepository.findCollectionByUserId(
        user_id
      );

      if (!sensors || sensors.length === 0) {
        throw new NotFoundError("No sensors collections found");
      }

      return sensors;
    } catch (error) {
      if (!(error instanceof NotFoundError)) {
        throw new ServerError("The server has encountered an error", error);
      }
      throw error;
    }
  }
}
