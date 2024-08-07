import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import UserService, { findUserByEmail } from "./user.service";
import { ValidationError } from "../../utils/exceptions/validationError.exception";
import {
  ErrorMessage,
  ErrorTitle,
  HttpStatusCode,
} from "../../utils/exceptions/baseError.exception";
import { CreateUserInput, createUserSchema } from "./user.schema";
import { validateResourceMidlleware } from "../../middlewares/validateResource.middleware";
import { requireUserMiddleware } from "../../middlewares/requireUser.middleware";
import { CreateSessionInput } from "../auth/auth.schema";
import AuthService from "../auth/auth.service";
import { verifyJwt } from "../../utils/jwt";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private userService = new UserService();
  private auth = new AuthService();

  constructor() {
    this.initialseRoutes();
  }

  private initialseRoutes(): void {
    this.router.post(
      `${this.path}/signup`,
      validateResourceMidlleware(createUserSchema),
      this.register
    );
    this.router.post(`${this.path}/login`, this.logIn);
    this.router.get(
      `${this.path}/me`,
      requireUserMiddleware,
      this.getCurrentUser
    );
  }

  private register = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void | ValidationError> => {
    const body = req.body;

    try {
      const user = await this.userService.signUp(body);

      return res.send(user);
    } catch (error: any) {
      if (error.code === 11000) {
        next(
          new ValidationError(
            ErrorTitle.EMAIL_USED,
            HttpStatusCode.INTERNAL_SERVER,
            ErrorMessage.EMAIL_USED
          )
        );
      }
      return next(
        new ValidationError(
          ErrorTitle.ERROR,
          HttpStatusCode.INTERNAL_SERVER,
          ErrorMessage.ERROR
        )
      );
    }
  };

  private logIn = async (
    req: Request<{}, {}, CreateSessionInput>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const message = "Invalid Email or password.";
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.send(message);

    const isValid = await user.validatePassword(password);
    if (!isValid) return res.send(message);

    const accessToken = this.auth.signAccessToken(user);

    const refreshToken = await this.auth.signRefreshToken({
      userID: user._id.toString(),
    });

    const userInfo = verifyJwt(accessToken, "accessTokenPublicKey");

    if (userInfo) res.locals.user = userInfo;
    res
      .cookie("accessToken", "Bearer " + accessToken, {
        maxAge: 900000,
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        maxAge: 86400000,
        httpOnly: true,
      });

    return res.send({ userInfo });
  };

  private getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return res.send(res.locals.user);
  };
}

export default UserController;
