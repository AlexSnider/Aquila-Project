import { ObjectId } from "mongoose";

export class Sensor {
  _id?: ObjectId;
  sensor_name?: string;
  user_id?: string;
  coordinates?: [number, number];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    sensor_name?: string,
    user_id?: string,
    coordinates?: [number, number],
    id?: ObjectId
  ) {
    this._id = id;
    this.sensor_name = sensor_name;
    this.user_id = user_id;
    this.coordinates = coordinates;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}