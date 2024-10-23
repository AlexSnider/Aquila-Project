import { Request, Response } from "express";
import apiHealthCheck from "../health-check/api.health-check";

class HealthCheckController {
  async handle(request: Request, response: Response): Promise<Response> {
    const healthCheck = await apiHealthCheck.execute();
    return response.status(200).json(healthCheck);
  }
}

export default new HealthCheckController();
