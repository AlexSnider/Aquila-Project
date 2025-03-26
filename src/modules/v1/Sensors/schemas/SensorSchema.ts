import { model, Schema, Types } from "mongoose";

interface ILocation {
  type: "Point";
  coordinates: [number, number];
}

interface ISensor {
  _id: Types.ObjectId;
  sensor_name: string;
  location: ILocation;
}

interface ISensorGroup {
  _id: Types.ObjectId;
  sensor_group_name: string;
  sensors: ISensor[];
}

interface ISensorDocument {
  _id: Types.ObjectId;
  user_id: string;
  sensor_groups: ISensorGroup[];
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<ILocation>(
  {
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
  { _id: false }
);

const SensorSchema = new Schema<ISensor>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    sensor_name: {
      type: String,
      required: true,
    },
    location: {
      type: LocationSchema,
      required: true,
    },
  },
  { _id: false }
);

const SensorGroupSchema = new Schema<ISensorGroup>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      default: () => new Types.ObjectId(),
    },
    sensor_group_name: {
      type: String,
      required: true,
    },
    sensors: {
      type: [SensorSchema],
      required: true,
    },
  },
  { _id: false }
);

const SensorDocumentSchema = new Schema<ISensorDocument>(
  {
    user_id: {
      type: String,
      required: true,
    },
    sensor_groups: {
      type: [SensorGroupSchema],
      required: true,
    },
  },
  { timestamps: true }
);

SensorDocumentSchema.index({ "sensor_groups.sensors.location": "2dsphere" });

export default model<ISensorDocument>("SensorDocument", SensorDocumentSchema);
