import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteService } from "./deleteSensor.service";

class DeleteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const deleteService = container.resolve(DeleteService);
    await deleteService.execute(id);
    return response.sendStatus(204);
  }
}

export default new DeleteController();
