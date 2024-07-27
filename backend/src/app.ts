import express, { Application } from "express";
import cors from "cors";
import Controller from "../utils/interfaces/controller.interface";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import mongoose from "mongoose";
import { erroMiddleware } from "../middlewares/errorHandler.middleware";

class App {
  public express: Application;
  public port: number;

  constructor(port: number, controllers: Controller[]) {
    this.express = express();
    this.port = port;

    this.initialiseMiddleware();
    this.initialiseDatabaseConnection();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandler();
  }

  private initialiseMiddleware(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(compression());
    this.express.use(morgan("dev"));
  }
  private initialiseDatabaseConnection(): void {
    mongoose
      .connect("mongodb://localhost:27017/Chatapp")
      .then(() => console.log("Database is ONLINE"));
  }
  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }
  private initialiseErrorHandler(): void{
    this.express.use(erroMiddleware);
  };

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Server is ONLINE on port: ${this.port}`);
    });
  }
}

export default App;
