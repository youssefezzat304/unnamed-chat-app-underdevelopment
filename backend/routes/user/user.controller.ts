import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import UserService from "./user.service";
import validationMiddleware from "../../middlewares/validation.middleware";
import validate from "./user.validation";
import { ValidationError } from "../../utils/exceptions/validationError.exception";
import {
  ErrorTitle,
  HttpStatusCode,
} from "../../utils/exceptions/baseError.exception";
import { authenticatedMiddleware } from "../../middlewares/authenticated.middleware";
import { Tokens } from "../../utils/interfaces/token.interface";
import { CreateUserInput } from "./user.interface";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private userService = new UserService();

  constructor() {
    this.initialseRoutes();
  }

  private initialseRoutes(): void {
    this.router.post(
      `${this.path}/signup`,
      validationMiddleware(validate.signUp),
      this.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.logIn),
      authenticatedMiddleware,
      this.logIn
    );
    this.router.get(`${this.path}`, authenticatedMiddleware, this.getUser);
  }

  private register = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void | ValidationError> => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      next(
        new ValidationError(
          ErrorTitle.ERROR,
          HttpStatusCode.INTERNAL_SERVER,
          "The passwords do not match. Please ensure that the 'Password' and 'Confirm Password' fields are identical."
        )
      );
    }
    try {
      const tokens = await this.userService.signUp(email, password);
      const { accessToken, refreshToken } = tokens;

      res.cookie("accessToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(201).send({ accessToken });
    } catch (error) {
      next(error);
    }
  };

  private logIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;

      const token = await this.userService.login(email, password);
      const status = 200;
      return res.status(200).send({ status, token });
    } catch (error) {
      next(error);
    }
  };

  private getUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    return res.status(200).send("Yaaaaaaaaaaay");
  };
}

export default UserController;
