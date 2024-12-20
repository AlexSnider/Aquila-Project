import Joi from "joi";

export const SensorSchemaJoi = Joi.object({
  sensor_name: Joi.string().min(4).alphanum().required(),
  user_id: Joi.string().uuid().required(),
  location: Joi.object({
    type: Joi.string().valid("Point").required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
  }).required(),
});
