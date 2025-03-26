import { Types } from "mongoose";

export class Sensor {
  _id: Types.ObjectId;
  user_id: string;
  sensor_groups: {
    _id: Types.ObjectId;
    sensor_group_name: string;
    sensors: {
      _id: Types.ObjectId;
      sensor_name: string;
      location: {
        type: "Point";
        coordinates: [number, number];
      };
    }[];
  }[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    user_id: string;
    sensor_groups: {
      sensor_group_name: string;
      sensors: {
        sensor_name: string;
        location: { type: "Point"; coordinates: [number, number] };
      }[];
    }[];
  }) {
    this._id = new Types.ObjectId();
    this.user_id = data.user_id;
    this.sensor_groups = data.sensor_groups.map((group) => ({
      _id: new Types.ObjectId(),
      sensor_group_name: group.sensor_group_name,
      sensors: group.sensors.map((sensor) => ({
        ...sensor,
        _id: new Types.ObjectId(),
      })),
    }));
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
