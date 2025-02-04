import Joi from "joi";

export const SensorSchemaJoi = Joi.object({
  user_id: Joi.string().uuid().required(),
  sensor_groups: Joi.array()
    .items(
      Joi.object({
        sensor_group_name: Joi.string().min(4).max(50).strict().required(),
        sensors: Joi.array()
          .items(
            Joi.object({
              sensor_name: Joi.string().min(4).max(50).strict().required(),
              location: Joi.object({
                type: Joi.string().valid("Point").required(),
                coordinates: Joi.array()
                  .items(Joi.number().strict().required())
                  .length(2)
                  .required(),
              }).required(),
            })
          )
          .max(25)
          .required(),
      })
    )
    .max(10)
    .required(),
});
