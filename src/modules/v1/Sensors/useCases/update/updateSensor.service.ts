import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../repositories/ISensorRepositories";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../../../../../helpers/errors/apiErrors";
import { Sensor } from "../../entities/Sensor";

type IUpdateSensorDTO = Partial<
  Pick<Sensor, "user_id" | "sensor_name" | "location">
>;

@injectable()
export class UpdateService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(_id: string, data: IUpdateSensorDTO): Promise<void> {
    const sensorExists = await this.sensorRepository.findById(_id);

    if (!sensorExists) {
      throw new NotFoundError("Sensor not found");
    }

    if (data.user_id !== undefined) {
      throw new ForbiddenError("Not allowed to update user_id");
    }

    const updateFields: IUpdateSensorDTO = {};

    if (data.sensor_name) {
      if (typeof data.sensor_name !== "string") {
        throw new ConflictError("Sensor name must be a string");
      }
      updateFields.sensor_name = data.sensor_name;
    }

    if (data.location) {
      const { type, coordinates } = data.location;

      if (
        !Array.isArray(coordinates) ||
        coordinates.length !== 2 ||
        !coordinates.every((coordinate) => typeof coordinate === "number")
      ) {
        throw new ConflictError("Coordinates must be an array of two numbers");
      }

      updateFields.location = {
        type: type || "Point",
        coordinates: coordinates,
      };
    }

    await this.sensorRepository.update(_id, updateFields);
  }
}
