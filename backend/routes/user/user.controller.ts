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
      this.logIn
    );
  }

  private register = async (
    req: Request,
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
      const newUser = await this.userService.signUp(email, password);
      res.status(201).send({ newUser });
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

      const checkLogin = await this.userService.login(email, password);
      const status = 200;
      return res.status(200).send({ status, checkLogin });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
