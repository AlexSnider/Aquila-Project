import {
  ConflictError,
  NotFoundError,
  ServerError,
} from "../../../../../../helpers/errors/apiErrors";
import { ISensorRepositories } from "../../../repositories/ISensorRepositories";
import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";

interface IAddSensorToGroupRequest {
  user_id: string;
  groupIdObject: Types.ObjectId;
  sensor_name: string;
  coordinates: {
    coordinates: [number, number];
  };
}

@injectable()
export class InsertSensorByUserIdService {
  constructor(
    @inject("SensorRepositories")
    private readonly sensorRepository: ISensorRepositories
  ) {}

  async execute(body: IAddSensorToGroupRequest): Promise<void> {
    try {
      const groupExists =
        await this.sensorRepository.findGroupsByUserIdAndGroupId(
          body.user_id,
          body.groupIdObject
        );

      if (!groupExists || groupExists.length === 0) {
        throw new NotFoundError("Group not found");
      }

      const sensorExists = await this.sensorRepository.sensorNameExists(
        body.user_id,
        body.sensor_name
      );

      if (sensorExists) {
        throw new ConflictError("Sensor name already exists");
      }

      await this.sensorRepository.insertSensorData(
        body.user_id,
        body.groupIdObject,
        body.sensor_name,
        body.coordinates
      );
    } catch (error) {
      if (!(error instanceof NotFoundError || error instanceof ConflictError)) {
        throw new ServerError("The server has encountered an error", error);
      }
      throw error;
    }
  }
}
