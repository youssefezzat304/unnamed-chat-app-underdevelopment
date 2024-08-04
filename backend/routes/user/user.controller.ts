import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import UserService from "./user.service";
import validationMiddleware from "../../middlewares/validation.middleware";
import validate from "./user.validation";
import { ValidationError } from "../../utils/exceptions/validationError.exception";
import {
  ErrorMessage,
  ErrorTitle,
  HttpStatusCode,
} from "../../utils/exceptions/baseError.exception";
import { CreateUserInput, createUserSchema } from "./user.interface";
import { validateResourceMidlleware } from "../../middlewares/validateResource.middleware";

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
      validateResourceMidlleware(createUserSchema),
      this.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.logIn),
      this.logIn
    );
    this.router.get(`${this.path}`, this.getUser);
  }

  private register = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void | ValidationError> => {
    const body = req.body;

    try {
      const user = await this.userService.signUp(body);

      return res.send("User successfully created.");
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
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    return;
    // try {
    //   const { email, password } = req.body;

    //   const token = await this.userService.login();
    //   const status = 200;
    //   return res.status(200).send({ status, token });
    // } catch (error) {
    //   next(error);
    // }
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
