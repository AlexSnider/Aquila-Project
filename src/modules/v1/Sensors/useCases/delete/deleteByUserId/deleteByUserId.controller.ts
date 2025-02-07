import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteByUserIdService } from "./deleteByUserId.service";

class deleteByUserIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.user_id;

    const deleteByUserId = container.resolve(DeleteByUserIdService);

    await deleteByUserId.execute(user_id);

    return response.sendStatus(204);
  }
}

export default new deleteByUserIdController();
