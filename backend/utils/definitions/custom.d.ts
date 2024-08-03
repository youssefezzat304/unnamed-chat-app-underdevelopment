import User from "../../routes/user/user.interface";

declare global {
  namespace Express {
    export interface Request {
      user: User
    }
  }
}