import { Request, Response } from "express";
import { CreateService } from "./create.service";
import { container } from "tsyringe";

class CreateController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body;
      const createService = container.resolve(CreateService);
      await createService.execute(body);
      return response.sendStatus(201);
    } catch (err: any) {
      return response.status(400).send(err.message);
    }
  }
}

export default new CreateController();
