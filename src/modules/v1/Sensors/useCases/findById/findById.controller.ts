import { container } from "tsyringe";
import { FindByIdService } from "./findById.service";
import { Request, Response } from "express";

class findByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const findByIdService = container.resolve(FindByIdService);
    const sensor = await findByIdService.execute(id);
    return response.status(200).json(sensor);
  }
}

export default new findByIdController();
