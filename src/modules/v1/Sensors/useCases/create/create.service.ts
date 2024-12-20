import { ConflictError } from "../../../../../helpers/errors/apiErrors";
import { Sensor } from "../../entities/Sensor";
import { ISensorRepositories } from "../../repositories/ISensorRepositories";
import { inject, injectable } from "tsyringe";

interface ICreateSensorRequest {
  sensor_name: string;
  user_id: string;
  location: { type: "Point"; coordinates: [number, number] };
}

@injectable()
export class CreateService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(body: ICreateSensorRequest): Promise<Sensor> {
    const sensorExists = await this.sensorRepository.findByName(
      body.sensor_name
    );

    if (sensorExists) {
      throw new ConflictError("Sensor already exists");
    }

    const sensorData = new Sensor({
      sensor_name: body.sensor_name,
      user_id: body.user_id,
      location: body.location,
    });

    await this.sensorRepository.create(sensorData);

    return sensorData;
  }
}
