import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../../repositories/ISensorRepositories";
import { NotFoundError } from "../../../../../../helpers/errors/apiErrors";
import { UUIDTypes } from "node_modules/uuid/dist/cjs";

@injectable()
export class DeleteByUserIdService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(user_id: UUIDTypes): Promise<void> {
    const sensor = await this.sensorRepository.findCollectionByUserId(user_id);

    if (!sensor || sensor.length === 0) {
      throw new NotFoundError("Sensors collection not found");
    }

    await this.sensorRepository.deleteByUserId(user_id);
  }
}
