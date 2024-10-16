import { Request, Response, NextFunction } from "express";

class PaginationMiddleware {
  execute(request: Request, response: Response, next: NextFunction): void {
    const { limit, offset } = request.query;

    limit ? Number(limit) : 10;
    offset ? Number(offset) : 0;

    response.locals.pagination = { limit, offset };

    return next();
  }
}

export default new PaginationMiddleware();
