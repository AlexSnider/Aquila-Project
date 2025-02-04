import { Sensor } from "../../entities/Sensor";
import { ISensorRepositories, ISensorResult } from "../ISensorRepositories";
import SensorSchema from "../../schemas/SensorSchema";
import { Types } from "mongoose";

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
      .limit(limit)
      .skip(offset)
      .select("-__v");
    return sensors;
  }

  async findCollectionByUserId(user_id: string): Promise<Sensor[]> {
    const sensors = await SensorSchema.find({ user_id }).select("-__v");
    return sensors;
  }

  async findGroupsByUserIdAndGroupId(
    user_id: string,
    groupIdObject: Types.ObjectId
  ): Promise<Sensor[]> {
    const sensors = await SensorSchema.aggregate([
      {
        $match: {
          user_id: user_id,
          "sensor_groups._id": groupIdObject,
        },
      },
      {
        $project: {
          _id: 0,
          sensor_groups: {
            $filter: {
              input: "$sensor_groups",
              as: "group",
              cond: { $eq: ["$$group._id", groupIdObject] },
            },
          },
        },
      },
    ]);
    return sensors;
  }

  async findSensorByUserIdAndSensorId(
    user_id: string,
    sensorIdObject: Types.ObjectId
  ): Promise<ISensorResult[]> {
    const sensors = await SensorSchema.aggregate([
      {
        $match: {
          user_id: user_id,
          "sensor_groups.sensors._id": sensorIdObject,
        },
      },
      {
        $unwind: "$sensor_groups",
      },
      {
        $unwind: "$sensor_groups.sensors",
      },
      {
        $match: {
          "sensor_groups.sensors._id": sensorIdObject,
        },
      },
      {
        $project: {
          _id: 0,
          "sensor_groups.sensors": 1,
        },
      },
    ]);

    return sensors.map((item) => item.sensor_groups.sensors);
  }
}
