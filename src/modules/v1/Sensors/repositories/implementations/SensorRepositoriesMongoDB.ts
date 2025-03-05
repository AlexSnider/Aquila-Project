import { Sensor } from "../../entities/Sensor";
import { Types } from "mongoose";
import { ISensorRepositories, ISensorResult } from "../ISensorRepositories";
import SensorSchema from "../../schemas/SensorSchema";
import { UUIDTypes } from "node_modules/uuid/dist/cjs";

export class SensorRepositoriesMongoDB implements ISensorRepositories {
  async create(body: Sensor): Promise<Sensor> {
    const createdSensor = await SensorSchema.create(body);
    return createdSensor;
  }

  async deleteByUserId(user_id: UUIDTypes): Promise<void> {
    await SensorSchema.deleteMany({ user_id });
  }

  async deleteByUserIdAndGroupId(
    user_id: UUIDTypes,
    groupIdObject: Types.ObjectId
  ): Promise<void> {
    await SensorSchema.updateMany(
      { user_id, "sensor_groups._id": groupIdObject },
      { $pull: { sensor_groups: { _id: groupIdObject } } }
    );
  }

  async deleteByUserIdAndSensorId(
    user_id: UUIDTypes,
    sensorIdObject: Types.ObjectId
  ): Promise<void> {
    await SensorSchema.updateMany(
      { user_id, "sensor_groups.sensors._id": sensorIdObject },
      { $pull: { "sensor_groups.$[].sensors": { _id: sensorIdObject } } }
    );
  }

  async findAll(limit: number, offset: number): Promise<Sensor[]> {
    const sensors = await SensorSchema.find()
      .limit(limit)
      .skip(offset)
      .select("-__v");
    return sensors;
  }

  async findCollectionByUserId(user_id: UUIDTypes): Promise<Sensor[]> {
    const sensors = await SensorSchema.find({ user_id }).select("-__v");
    return sensors;
  }

  async findGroupsByUserIdAndGroupId(
    user_id: UUIDTypes,
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
    user_id: UUIDTypes,
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

  async groupNameExists(
    user_id: UUIDTypes,
    sensor_group_name: string
  ): Promise<boolean> {
    const exists = await SensorSchema.exists({
      user_id,
      "sensor_groups.sensor_group_name": sensor_group_name,
    });

    return !!exists;
  }

  async sensorNameExists(
    user_id: UUIDTypes,
    sensor_name: string
  ): Promise<boolean> {
    const exists = await SensorSchema.exists({
      user_id,
      "sensor_groups.sensors.sensor_name": sensor_name,
    });

    return !!exists;
  }

  async updateGroupName(
    user_id: UUIDTypes,
    group_id: Types.ObjectId,
    new_group_name: string
  ): Promise<void> {
    await SensorSchema.findOneAndUpdate(
      { user_id, "sensor_groups._id": group_id },
      { $set: { "sensor_groups.$.sensor_group_name": new_group_name } }
    );
  }

  async updateSensorData(
    user_id: UUIDTypes,
    sensor_id: Types.ObjectId,
    new_sensor_name: string,
    new_coordinates: { coordinates: [number, number] }
  ): Promise<void> {
    await SensorSchema.findOneAndUpdate(
      { user_id, "sensor_groups.sensors._id": sensor_id },
      {
        $set: {
          "sensor_groups.$.sensors.$[sensor].sensor_name": new_sensor_name,
          "sensor_groups.$.sensors.$[sensor].location": {
            type: "Point",
            coordinates: new_coordinates.coordinates,
          },
        },
      },
      {
        arrayFilters: [{ "sensor._id": sensor_id }],
      }
    );
  }

  async insertGroupByUserId(
    user_id: UUIDTypes,
    sensor_group_name: string
  ): Promise<void> {
    await SensorSchema.findOneAndUpdate(
      { user_id },
      {
        $push: {
          sensor_groups: {
            sensor_group_name: sensor_group_name,
            sensors: [],
          },
        },
      }
    );
  }

  async insertSensorData(
    user_id: UUIDTypes,
    groupIdObject: Types.ObjectId,
    sensor_name: string,
    coordinates: { coordinates: [number, number] }
  ): Promise<void> {
    await SensorSchema.findOneAndUpdate(
      { user_id, "sensor_groups._id": groupIdObject },
      {
        $push: {
          "sensor_groups.$.sensors": {
            sensor_name: sensor_name,
            location: {
              type: "Point",
              coordinates: coordinates.coordinates,
            },
          },
        },
      }
    );
  }
}
