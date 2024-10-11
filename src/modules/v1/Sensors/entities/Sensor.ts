import { Types } from "mongoose";

export class Sensor {
  _id: Types.ObjectId;
  sensor_name: string;
  user_id: string;
  coordinates: [Number, Number];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    sensor_name: string,
    user_id: string,
    coordinates: [Number, Number],
    _id: Types.ObjectId
  ) {
    this._id = _id;
    this.sensor_name = sensor_name;
    this.user_id = user_id;
    this.coordinates = coordinates;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
