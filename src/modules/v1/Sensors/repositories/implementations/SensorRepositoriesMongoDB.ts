import { Sensor } from "../../entities/Sensor";
import { ISensorRepositories } from "../ISensorRepositories";
import SensorSchema from "../../schemas/SensorSchema";

export class SensorRepositoriesMongoDB implements ISensorRepositories {
  async create(body: Sensor): Promise<void> {
    await SensorSchema.create(body);
  }

  async findByUserId(user_id: string): Promise<Sensor[] | null> {
    const sensors = await SensorSchema.find({ user_id }).select("-__v").lean();

    return sensors.length ? (sensors as Sensor[]) : null;
  }

  async findById(id: string): Promise<Sensor | null> {
    const sensor = await SensorSchema.findById(id).select("-__v");
    return sensor;
  }

  async findAll(limit: number, offset: number): Promise<Sensor[]> {
    const sensors = await SensorSchema.find()
      .select("-__v")
      .limit(limit)
      .skip(offset);
    return sensors;
  }

  async update(id: string, data: Sensor): Promise<void> {
    await SensorSchema.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<void> {
    await SensorSchema.findByIdAndDelete(id);
  }
}
