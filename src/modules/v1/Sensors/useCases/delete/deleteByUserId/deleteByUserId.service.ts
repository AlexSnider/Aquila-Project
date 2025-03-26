import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../../repositories/ISensorRepositories";
import {
  NotFoundError,
  ServerError,
} from "../../../../../../helpers/errors/apiErrors";

@injectable()
export class DeleteByUserIdService {
  constructor(
    @inject("SensorRepositories")
    private readonly sensorRepository: ISensorRepositories
  ) {}

  async execute(user_id: string): Promise<void> {
    try {
      const sensor = await this.sensorRepository.findCollectionByUserId(
        user_id
      );

      if (!sensor || sensor.length === 0) {
        throw new NotFoundError("Sensors collection not found");
      }

      await this.sensorRepository.deleteByUserId(user_id);
    } catch (error) {
      if (!(error instanceof NotFoundError)) {
        throw new ServerError("The server has encountered an error", error);
      }
      throw error;
    }
  }
}
