import { Sensor } from "../../entities/Sensor";
import { ISensorRepositories } from "../ISensorRepositories";
import SensorSchema from "../../schemas/SensorSchema";

export class SensorRepositoriesMongoDB implements ISensorRepositories {
  async create(body: Sensor): Promise<Sensor> {
    const createdSensor = await SensorSchema.create(body);
    return createdSensor;
  }

  async update(id: string, data: Partial<Sensor>): Promise<void> {
    await SensorSchema.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await SensorSchema.findByIdAndDelete(id);
  }

  async findAll(limit: number, offset: number): Promise<Sensor[]> {
    const sensors = await SensorSchema.find()
      .select("-__v")
      .limit(limit)
      .skip(offset);
    return sensors;
  }

  async findById(id: string): Promise<Sensor | null> {
    const sensor = await SensorSchema.findById(id).select("-__v");
    return sensor;
  }

  async findByUserId(user_id: string): Promise<Sensor[]> {
    const sensors = await SensorSchema.find({ user_id }).select("-__v");
    return sensors;
  }

  async findByName(sensor_name: string): Promise<Sensor | null> {
    const sensor = await SensorSchema.findOne({ sensor_name }).select("-__v");
    return sensor;
  }
}
