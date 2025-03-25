import { inject, injectable } from "tsyringe";
import {
  ISensorGroupResult,
  ISensorRepositories,
} from "../../../repositories/ISensorRepositories";
import {
  NotFoundError,
  ServerError,
} from "../../../../../../helpers/errors/apiErrors";
import { Types } from "mongoose";

@injectable()
export class FindGroupsByUserIdAndGroupIdService {
  constructor(
    @inject("SensorRepositories")
    private readonly sensorRepository: ISensorRepositories
  ) {}

  async execute(
    user_id: string,
    groupIdObject: Types.ObjectId
  ): Promise<ISensorGroupResult[]> {
    try {
      const findGroups =
        await this.sensorRepository.findGroupsByUserIdAndGroupId(
          user_id,
          groupIdObject
        );

      if (!findGroups || findGroups.length === 0) {
        throw new NotFoundError("No groups found");
      }

      return findGroups;
    } catch (error) {
      if (!(error instanceof NotFoundError)) {
        throw new ServerError("The server has encountered an error", error);
      }
      throw error;
    }
  }
}
