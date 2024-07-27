import "dotenv/config";
import App from "./app";
import "express-async-error"
import UserController from "../routes/user/user.controller";

const app = new App(Number(process.env.PORT),[new UserController()])

app.listen()