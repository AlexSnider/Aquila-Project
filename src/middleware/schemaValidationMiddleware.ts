import { Request, Response, NextFunction } from "express";
import { ObjectSchema, ValidationError } from "joi";

class ValidationException extends Error {
  public errors: string[];

  constructor(errors: string[]) {
    super("Validation failed");
    this.errors = errors;
  }
}

class ValidateSchema {
  execute(schema: ObjectSchema) {
    return (request: Request, response: Response, next: NextFunction) => {
      const { error }: { error?: ValidationError } = schema.validate(
        request.body,
        {
          abortEarly: false,
        }
      );

      if (error) {
        const errors = error.details.map((detail) => detail.message);

        if (process.env.NODE_ENV === "test") {
          throw new ValidationException(errors);
        }

        return response.status(400).json({ errors });
      }

      return next();
    };
  }
}

export { ValidationException };
export default new ValidateSchema();
