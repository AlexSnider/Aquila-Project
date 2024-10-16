import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/errors/apiErrors";

class ErrorMiddleware {
  execute(
    error: Error & ApiError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const statusCode = error.statusCode ?? 500;
    const message = error.message || "Internal Server Error";

    return res.status(statusCode).json({ message });
  }
}

export default new ErrorMiddleware();
