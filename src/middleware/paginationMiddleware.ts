import { Request, Response, NextFunction } from "express";

class PaginationMiddleware {
  execute(request: Request, response: Response, next: NextFunction): void {
    const { limit, offset } = request.query;

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    limit ? Number(limit) : 10;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    offset ? Number(offset) : 0;

    response.locals.pagination = { limit, offset };

    return next();
  }
}

export default new PaginationMiddleware();
