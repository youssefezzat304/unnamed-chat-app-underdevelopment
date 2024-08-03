import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ValidationError } from "../utils/exceptions/validationError.exception";
import { verifyToken } from "../utils/token";
import { Token } from "../utils/interfaces/token.interface";
import userModel from "../routes/user/user.model";

export async function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const authHeader = req.headers.cookie

    if (!authHeader || !authHeader.startsWith("jwt=")) {
      return next(new Error("Unauthorised"));
    }


    const accessToken = authHeader.split("jwt=")[1];
    console.log(accessToken)
    const payload = await verifyToken(accessToken);

    // const user = await userModel
    //   .findById(payload.id)
    //   .select("-password")
    //   .exec();

    // if (!user) {
    //   return next(new Error("NOT USER"));
    // }

    // req.body = user;
    console.log(payload)
    return next();
  } catch (error) {
    return next(new Error("Unexpected Error"));
  }
}
