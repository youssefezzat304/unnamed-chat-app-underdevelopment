import jwt from "jsonwebtoken";
import User from "../routes/user/user.interface";
import { Token } from "./interfaces/token.interface";

export const createToken = (user: User, secret:string | undefined, expireDate: string): string => {
  return jwt.sign({ id: user._id }, secret as jwt.Secret, {
    expiresIn: expireDate,
  });
};

export const verifyToken = async (
  token: string
): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((res, rej) => {
    jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as jwt.Secret,
      (err, payload) => {
        if (err) return rej(err);

        res(payload as Token);
      }
    );
  });
};

export default {createToken, verifyToken}