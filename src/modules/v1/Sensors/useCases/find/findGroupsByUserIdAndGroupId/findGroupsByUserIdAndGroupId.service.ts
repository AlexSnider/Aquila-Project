import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../../repositories/ISensorRepositories";
import { ISensorGroupResult } from "../../../repositories/ISensorRepositories";
import { Types } from "mongoose";
import { NotFoundError } from "src/helpers/errors/apiErrors";

@injectable()
export class FindGroupsByUserIdAndGroupIdService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(
    user_id: string,
    groupIdObject: Types.ObjectId
  ): Promise<ISensorGroupResult[]> {
    const findGroups = await this.sensorRepository.findGroupsByUserIdAndGroupId(
      user_id,
      groupIdObject
    );

    if (!findGroups || findGroups.length === 0) {
      throw new NotFoundError("No groups found");
    }

    return findGroups;
  }
}
