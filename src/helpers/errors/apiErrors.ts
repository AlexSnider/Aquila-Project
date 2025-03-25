export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly error?: unknown;

  constructor(message: string, statusCode: number, error?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}

export class BadRequest extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class ServerError extends ApiError {
  constructor(message: string, error?: unknown) {
    super(message, 500, error);
  }
}
