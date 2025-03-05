import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../../repositories/ISensorRepositories";
import { NotFoundError } from "../../../../../../helpers/errors/apiErrors";
import { Types } from "mongoose";
import { UUIDTypes } from "node_modules/uuid/dist/cjs";

@injectable()
export class DeleteByUserIdAndGroupIdService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(user_id: UUIDTypes, groupIdObject: Types.ObjectId): Promise<void> {
    const sensorGroups = await this.sensorRepository.findGroupsByUserIdAndGroupId(
      user_id,
      groupIdObject
    );

    if (!sensorGroups || sensorGroups.length === 0) {
      throw new NotFoundError("Group not found");
    }

    await this.sensorRepository.deleteByUserIdAndGroupId(
      user_id,
      groupIdObject
    );
  }
}
