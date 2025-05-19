import { Request, Response, NextFunction } from "express";

const allowedOrigins = [
  "https://aquila-project.onrender.com",
  "http://localhost:3000",
];

class CorsMiddleware {
  execute(request: Request, response: Response, next: NextFunction): void {
    const origin = request.headers.origin;

    if (origin && allowedOrigins.includes(origin)) {
      response.header("Access-Control-Allow-Origin", origin);
    }

    response.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, POST, DELETE, PUT"
    );
    response.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Content-Length, X-Requested-With"
    );

    if (request.method === "OPTIONS") {
      response.sendStatus(200);
      return;
    }

    return next();
  }
}

export default new CorsMiddleware();
