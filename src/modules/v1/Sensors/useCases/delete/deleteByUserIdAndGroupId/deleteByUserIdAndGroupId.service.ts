import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../../repositories/ISensorRepositories";
import { NotFoundError } from "../../../../../../helpers/errors/apiErrors";
import { Types } from "mongoose";

@injectable()
export class DeleteByUserIdAndGroupIdService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(user_id: string, groupIdObject: Types.ObjectId): Promise<void> {
    const sensor = await this.sensorRepository.findGroupsByUserIdAndGroupId(
      user_id,
      groupIdObject
    );

    if (!sensor || sensor.length === 0) {
      throw new NotFoundError("Group not found");
    }

    await this.sensorRepository.deleteByUserIdAndGroupId(
      user_id,
      groupIdObject
    );
  }
}
