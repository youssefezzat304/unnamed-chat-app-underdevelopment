import "dotenv/config";
import App from "./app";
import "express-async-error";
import UserController from "../routes/user/user.controller";
import AuthController from "../routes/auth/auth.controller";

const app = new App(Number(process.env.PORT), [
  new UserController(),
  new AuthController(),
]);

app.listen();
