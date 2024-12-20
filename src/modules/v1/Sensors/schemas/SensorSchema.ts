import { model, Schema } from "mongoose";

interface ISensor {
  sensor_name: string;
  user_id: string;
  location: { type: "Point"; coordinates: [number, number] };
  createdAt: Date;
  updatedAt: Date;
}

const SensorSchema = new Schema(
  {
    sensor_name: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

SensorSchema.index({ location: "2dsphere" });

export default model<ISensor>("Sensor", SensorSchema);
