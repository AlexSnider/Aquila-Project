import { container } from "tsyringe";
import { FindByIdService } from "./findById.service";
import { Request, Response } from "express";

class findByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      const findByIdService = container.resolve(FindByIdService);
      const sensor = await findByIdService.execute(id);
      return response.status(200).json(sensor);
    } catch (err: any) {
      return response.status(400).send(err.message);
    }
  }
}

export default new findByIdController();
