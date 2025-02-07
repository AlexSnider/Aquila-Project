import { Types } from "mongoose";
import { Sensor } from "../entities/Sensor";

export interface ISensorGroupResult {
  sensor_groups: {
    _id: Types.ObjectId;
    sensor_group_name: string;
    sensors: {
      sensor_name: string;
      location: {
        type: "Point";
        coordinates: [number, number];
      };
    }[];
  }[];
}

export interface ISensorResult {
  _id: Types.ObjectId;
  sensor_name: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
}

export interface ISensorRepositories {
  create(body: Sensor): Promise<Sensor>;

  update(id: string, data: Partial<Sensor>): Promise<void>;

  deleteByUserId(user_id: string): Promise<void>;

  deleteByUserIdAndGroupId(
    user_id: string,
    groupIdObject: Types.ObjectId
  ): Promise<void>;

  deleteByUserIdAndSensorId(
    user_id: string,
    sensorIdObject: Types.ObjectId
  ): Promise<void>;

  findAll(limit: number, offset: number): Promise<Sensor[]>;

  findCollectionByUserId(user_id: string): Promise<Sensor[]>;

  findGroupsByUserIdAndGroupId(
    user_id: string,
    groupIdObject: Types.ObjectId
  ): Promise<ISensorGroupResult[]>;

  findSensorByUserIdAndSensorId(
    user_id: string,
    sensorIdObject: Types.ObjectId
  ): Promise<ISensorResult[]>;
}
