import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteService } from "./deleteSensor.service";

class DeleteController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      const deleteService = container.resolve(DeleteService);
      const sensor = await deleteService.execute(id);
      return response.status(200).json(sensor);
    } catch (err: any) {
      return response.status(400).send(err.message);
    }
  }
}

export default new DeleteController();
