export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}
export enum ErrorTitle {
  ERROR = "Error",
  WRONG_PASS = "wrong password",
  WRONG_EMAIL = "wrong email",
  EMAIL_USED = "email used"
}
export enum ErrorMessage {
  ERROR = "Something went wrong",
  WRONG_PASS = "Wrong password!!",
  WRONG_EMAIL = "Unable to find a User with this Email address or User does not exist.",
  EMAIL_USED = "This email already used.",
}
export abstract class BaseError extends Error {
  public readonly title: ErrorTitle | string;
  public readonly httpCode: HttpStatusCode;
  public readonly message: string;

  constructor(
    title: ErrorTitle | string,
    httpCode: HttpStatusCode,
    description: ErrorMessage | string
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.message = description;
    this.title = title;
    this.httpCode = httpCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
