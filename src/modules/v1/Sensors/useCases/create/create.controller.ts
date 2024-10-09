import { Request, Response } from "express";
import { CreateService } from "./create.service";
import { container } from "tsyringe";

class CreateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const body = request.body;
    const createService = container.resolve(CreateService);
    const sensor = await createService.execute(body);
    return response.status(201).json(sensor);
  }
}

export default new CreateController();
