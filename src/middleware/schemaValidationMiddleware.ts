import { Request, Response, NextFunction } from "express";

class ValidateSchema {
  execute(schema: any) {
    return (request: Request, response: Response, next: NextFunction) => {
      const { error } = schema.validate(request.body, {
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((detail: any) => detail.message);
        return response.status(409).json({ errors });
      }

      return next();
    };
  }
}

export default new ValidateSchema();
