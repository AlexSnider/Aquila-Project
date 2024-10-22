import { Types } from "mongoose";

export class Sensor {
  _id: Types.ObjectId;
  sensor_name: string;
  user_id: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    sensor_name: string;
    user_id: string;
    location: { type: "Point"; coordinates: [number, number] };
    _id?: Types.ObjectId;
  }) {
    this._id = new Types.ObjectId();
    this.sensor_name = data.sensor_name;
    this.user_id = data.user_id;
    this.location = data.location;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
