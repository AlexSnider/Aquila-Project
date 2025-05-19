import { Request, Response, NextFunction } from "express";
import express from "express";
import rateLimit from "express-rate-limit";

const app = express();

app.set("trust proxy", true);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  statusCode: 429,
  message: "Too many requests, please try again later.",
});

class RateLimitMiddleware {
  execute(request: Request, response: Response, next: NextFunction): void {
    limiter(request, response, next);
  }
}

export default new RateLimitMiddleware();
