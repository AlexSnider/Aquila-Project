import { inject, injectable } from "tsyringe";
import { ISensorRepositories } from "../../repositories/ISensorRepositories";

interface IUpdateSensorDTO {
  sensor_name: string;
  coordinates: [number, number];
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
      throw new Error("Sensor not found");
    }

    const { sensor_name, coordinates } = data;

    const updateFields: Partial<IUpdateSensorDTO> = {};

    if (sensor_name) {
      updateFields.sensor_name = sensor_name;
    }
    if (coordinates) {
      updateFields.coordinates = coordinates;
    }

    const updatedSensor = await this.sensorRepository.update(_id, updateFields);
    return updatedSensor;
  }
}
