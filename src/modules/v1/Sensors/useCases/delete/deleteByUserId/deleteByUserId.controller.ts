import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteByUserIdService } from "./deleteByUserId.service";

class DeleteByUserIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.user_id;

    const deleteByUserId = container.resolve(DeleteByUserIdService);

    await deleteByUserId.execute(user_id);

    return response.status(204).send();
  }
}

export default new DeleteByUserIdController();
