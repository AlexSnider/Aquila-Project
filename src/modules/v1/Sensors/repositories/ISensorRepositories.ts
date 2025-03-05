import { Types } from "mongoose";
import { Sensor } from "../entities/Sensor";
import { UUIDTypes } from "node_modules/uuid/dist/cjs";

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

  deleteByUserId(user_id: UUIDTypes): Promise<void>;

  deleteByUserIdAndGroupId(
    user_id: UUIDTypes,
    groupIdObject: Types.ObjectId
  ): Promise<void>;

  deleteByUserIdAndSensorId(
    user_id: UUIDTypes,
    sensorIdObject: Types.ObjectId
  ): Promise<void>;

  findAll(limit: number, offset: number): Promise<Sensor[]>;

  findCollectionByUserId(user_id: UUIDTypes): Promise<Sensor[]>;

  findGroupsByUserIdAndGroupId(
    user_id: UUIDTypes,
    groupIdObject: Types.ObjectId
  ): Promise<ISensorGroupResult[]>;

  findSensorByUserIdAndSensorId(
    user_id: UUIDTypes,
    sensorIdObject: Types.ObjectId
  ): Promise<ISensorResult[]>;

  groupNameExists(
    user_id: UUIDTypes,
    sensor_group_name: string
  ): Promise<boolean>;

  sensorNameExists(user_id: UUIDTypes, sensor_name: string): Promise<boolean>;

  updateGroupName(
    user_id: UUIDTypes,
    group_id: Types.ObjectId,
    new_group_name: string
  ): Promise<void>;

  updateSensorData(
    user_id: UUIDTypes,
    sensor_id: Types.ObjectId,
    new_sensor_name: string,
    new_coordinates: { coordinates: [number, number] }
  ): Promise<void>;

  insertGroupByUserId(
    user_id: UUIDTypes,
    sensor_group_name: string
  ): Promise<void>;

  insertSensorData(
    user_id: UUIDTypes,
    groupIdObject: Types.ObjectId,
    sensor_name: string,
    coordinates: { coordinates: [number, number] }
  ): Promise<void>;
}
