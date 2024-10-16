import { container } from "tsyringe";
import { FindByUserIdService } from "./findByUserId.service";
import { Request, Response } from "express";

class findByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const findByUserIdService = container.resolve(FindByUserIdService);
    const sensor = await findByUserIdService.execute(id);
    return response.status(200).json(sensor);
  }
}

export default new findByIdController();
