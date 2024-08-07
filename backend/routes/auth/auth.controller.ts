import { Request, Response, Router } from "express";
import { CreateSessionInput, createSessionSchema } from "./auth.schema";
import { findUserByEmail, findUserById } from "../user/user.service";
import AuthService from "./auth.service";
import Controller from "../../utils/interfaces/controller.interface";
import { validateResourceMidlleware } from "../../middlewares/validateResource.middleware";
import { get } from "lodash";
import { verifyJwt } from "../../utils/jwt";
import { ValidationError } from "../../utils/exceptions/validationError.exception";
import { ErrorMessage, ErrorTitle, HttpStatusCode } from "../../utils/exceptions/baseError.exception";

class AuthController implements Controller {
  public path = "/sessions";
  public router = Router();
  private auth = new AuthService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}`,
      validateResourceMidlleware(createSessionSchema),
      this.createSessionHandler
    );
    this.router.post(
      `${this.path}/refresh`,
      this.refreshAccessTokenHandler
    );
  }

  private createSessionHandler = async (
    req: Request<{}, {}, CreateSessionInput>,
    res: Response
  ) => {
    const message = new ValidationError(
      ErrorTitle.WRONG_CRED,
      HttpStatusCode.INTERNAL_SERVER,
      ErrorMessage.WRONG_CRED
    );
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(500).send(message);

    const isValid = await user.validatePassword(password);
    if (!isValid) return res.status(500).send(message);

    const accessToken = this.auth.signAccessToken(user);

    const refreshToken = await this.auth.signRefreshToken({
      userID: user._id.toString(),
    });

    return res.send({ accessToken, refreshToken });
  };

  private refreshAccessTokenHandler = async (req: Request, res: Response) => {
    const refreshToken = get(req, "headers.x-refresh") as string
    
    const decoded = verifyJwt<{session: string}>(refreshToken, "refreshTokenPublicKey")

    if(!decoded) return res.status(401).send("Could not refresh access token.")

    const session = await this.auth.findSessionById(decoded.session)

    if (!session || !session.valid) return res.status(401).send("Could not refresh access token");

    const user = await findUserById(String(session.user));
    
    if (!user) return res.status(401).send("Could not refresh access token");

    const accessToken = this.auth.signAccessToken(user);

    return res.send({ accessToken });
  };
}

export default AuthController;
