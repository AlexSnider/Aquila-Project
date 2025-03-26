import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../../repositories/ISensorRepositories";
import {
  NotFoundError,
  ServerError,
} from "../../../../../../helpers/errors/apiErrors";
import { Types } from "mongoose";

@injectable()
export class DeleteByUserIdAndGroupIdService {
  constructor(
    @inject("SensorRepositories")
    private readonly sensorRepository: ISensorRepositories
  ) {}

  async execute(user_id: string, groupIdObject: Types.ObjectId): Promise<void> {
    try {
      const sensorGroups =
        await this.sensorRepository.findGroupsByUserIdAndGroupId(
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
    } catch (error) {
      if (!(error instanceof NotFoundError)) {
        throw new ServerError("The server has encountered an error", error);
      }
      throw error;
    }
  }
}
