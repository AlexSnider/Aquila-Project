import { ConflictError, NotFoundError } from "src/helpers/errors/apiErrors";
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
export class insertSensorByUserIdService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(body: IAddSensorToGroupRequest): Promise<void> {
    const groupExists =
      await this.sensorRepository.findGroupsByUserIdAndGroupId(
        body.user_id,
        body.groupIdObject
      );

    const sensorExists = await this.sensorRepository.sensorNameExists(
      body.user_id,
      body.sensor_name
    );

    if (!groupExists || groupExists.length === 0) {
      throw new NotFoundError("Group not found");
    }

    if (sensorExists) {
      throw new ConflictError("Sensor already exists");
    }

    await this.sensorRepository.insertSensorData(
      body.user_id,
      body.groupIdObject,
      body.sensor_name,
      body.coordinates
    );
  }
}
