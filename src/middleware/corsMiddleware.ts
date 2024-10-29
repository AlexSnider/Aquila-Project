import { Request, Response, NextFunction } from "express";

class CorsMiddleware {
  execute(request: Request, response: Response, next: NextFunction): void {
    response.header("Access-Control-Allow-Origin", "localhost");
    response.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
    response.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Content-Length, X-Requested-With"
    );

    if (request.method === "OPTIONS") {
      response.status(200).send();
    }

    return next();
  }
}

export default new CorsMiddleware();
