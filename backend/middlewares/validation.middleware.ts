import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";
import { ErrorMessage, ErrorTitle, HttpStatusCode } from "../utils/exceptions/baseError.exception";
import { ValidationError } from "../utils/exceptions/validationError.exception";

function validationMiddleware(schema: Joi.Schema): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };
    try {
      const value = await schema.validateAsync(req.body, validationOptions);
      req.body = value;
      next();
    } catch (err) {
      const error = new ValidationError(ErrorTitle.ERROR, HttpStatusCode.INTERNAL_SERVER, ErrorMessage.ERROR)
      next(error)
    }
  };
}

export default validationMiddleware;