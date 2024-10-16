import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateService } from "./updateSensor.service";

class UpdateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const _id = request.params.id;
    const data = request.body;
    const updateService = container.resolve(UpdateService);
    const sensor = await updateService.execute(_id, data);
    return response.status(204).json(sensor);
  }
}

export default new UpdateController();
