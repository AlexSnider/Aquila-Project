import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllService } from "./findAll.service";

class findAllController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { limit, offset } = response.locals.pagination;

    const findAllService = container.resolve(FindAllService);
    const sensors = await findAllService.execute(limit, offset);
    return response.status(200).json(sensors);
  }
}

export default new findAllController();
