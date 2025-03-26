import {
  NotFoundError,
  ServerError,
} from "../../../../../../helpers/errors/apiErrors";
import { ISensorRepositories } from "../../../repositories/ISensorRepositories";
import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";

interface IUpdateSensorRequest {
  user_id: string;
  sensor_groups: Array<{ _id: Types.ObjectId; sensor_group_name: string }>;
}

@injectable()
export class UpdateGroupNameService {
  constructor(
    @inject("SensorRepositories")
    private readonly sensorRepository: ISensorRepositories
  ) {}

  async execute(body: IUpdateSensorRequest): Promise<void> {
    try {
      const groupExists =
        await this.sensorRepository.findGroupsByUserIdAndGroupId(
          body.user_id,
          body.sensor_groups[0]._id
        );

      if (!groupExists || groupExists.length === 0) {
        throw new NotFoundError("Group not found");
      }

      await this.sensorRepository.updateGroupName(
        body.user_id,
        body.sensor_groups[0]._id,
        body.sensor_groups[0].sensor_group_name
      );
    } catch (error) {
      if (!(error instanceof NotFoundError)) {
        throw new ServerError("The server has encountered an error", error);
      }
      throw error;
    }
  }
}
