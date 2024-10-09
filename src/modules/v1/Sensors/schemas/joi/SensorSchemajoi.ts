import joi from "joi";

export const SensorSchemaJoi = joi.object({
  _id: joi.string(),

  sensor_name: joi.string().min(4).alphanum().required(),

  user_id: joi.string().required(),

  coordinates: joi.array().items(joi.number()).length(2).required(),

  createdAt: joi.date(),

  updatedAt: joi.date(),
});
