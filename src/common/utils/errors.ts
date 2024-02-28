export class CustomError extends Error {
  constructor(public readonly statusCode: number, public readonly message: string) {
    super(message);
  }

  static BadRequest(message: string) {
    return new CustomError(400, message);
  }

  static Unauthorized(message: string) {
    return new CustomError(401, message);
  }

  static Forbidden(message: string) {
    return new CustomError(403, message);
  }

  static NotFound(message: string) {
    return new CustomError(404, message);
  }

  static InternalServer(message: string) {
    return new CustomError(500, message);
  }
}
