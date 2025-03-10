import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/errors/apiErrors";
import Joi from "joi";

class ErrorMiddleware {
  execute(
    error: Error & ApiError,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
  ) {
    if ("errors" in error && Array.isArray(error.errors)) {
      return res.status(400).json({ errors: error.errors });
    }

    if (error instanceof Joi.ValidationError) {
      return res.status(400).json({
        errors: error.details.map((detail) => detail.message),
      });
    }

    const statusCode = error.statusCode ?? 500;
    const message = error.message || "Internal Server Error";

    return res.status(statusCode).json({ message });
  }
}

export default new ErrorMiddleware();
