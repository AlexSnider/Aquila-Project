import { model, Schema } from "mongoose";
import { Sensor } from "../entities/Sensor";

const SensorSchema = new Schema<Sensor>(
  {
    sensor_name: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: [true, "user_id is required on sensor creation"],
    },
    coordinates: {
      type: [Number, Number],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default model<Sensor>("sensors", SensorSchema);
