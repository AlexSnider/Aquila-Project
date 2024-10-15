import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../repositories/ISensorRepositories";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../../../../../helpers/errors/apiErrors";
import { Types } from "mongoose";

interface IUpdateSensorDTO {
  _id: Types.ObjectId;
  sensor_name: string;
  coordinates: [Number, Number];
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}

@injectable()
export class UpdateService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(_id: string, data: Partial<IUpdateSensorDTO>): Promise<void> {
    const sensorExists = await this.sensorRepository.findById(_id);

    if (!sensorExists) {
      throw new NotFoundError("Sensor not found");
    }

    if (data.user_id) {
      throw new ForbiddenError("Not allowed to update");
    }

    const updateFields: Partial<IUpdateSensorDTO> = {};

    if (data.sensor_name) {
      if (typeof data.sensor_name !== "string") {
        throw new ConflictError("Sensor name must be a string");
      }
      updateFields.sensor_name = data.sensor_name;
    }
    if (data.coordinates) {
      if (
        !Array.isArray(data.coordinates) ||
        data.coordinates.length !== 2 ||
        !data.coordinates.every((coordinate) => typeof coordinate === "number")
      ) {
        throw new ConflictError("Coordinates must be an array of two numbers");
      }

      updateFields.coordinates = data.coordinates;
    }

    const updatedSensor = await this.sensorRepository.update(
      _id,
      updateFields as IUpdateSensorDTO
    );

    return updatedSensor;
  }
}
