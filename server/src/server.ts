import express, { Application } from "express";
import cookieParser from "cookie-parser";
// import helmet from "helmet";
import cors from "cors";
// import { exec } from "child_process";
// import { promisify } from "util";

import { IServerConfig } from "./config";
import { DB_Connection } from "./lib/db/DB_Connection";
import router from "./routes/routes";
import { logger } from "./lib/helpers/logger";
import { ReqLoggger } from "./lib/middlewares/reqLogger";
import { swaggerUi, swaggerDocs } from "./config/swaggerConfig";

// const execAsync = promisify(exec);

class Server {
  private static instance: Server;
  private readonly app: Application;
  private readonly config: IServerConfig;
  private readonly db: DB_Connection;

  private constructor(config: IServerConfig) {
    this.app = express();
    this.config = config;
    this.db = DB_Connection.getInstance(this.config.mongoUrl);
  }

  public static getInstance(config: IServerConfig): Server {
    if (!Server.instance) {
      Server.instance = new Server(config);
      Server.instance.bootstrap();
    }
    return Server.instance;
  }

  private bootstrap(): void {
    this.configureMiddlewares();
    this.configureRoutes();
    // this.configureErrorHandler();
  }

  private configureMiddlewares(): void {
    this.app.use(ReqLoggger.LogHTTP);
    this.app.use(cors());
    // this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(cookieParser());

    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }

  private configureRoutes(): void {
    this.app.use(router);
  }

  // private configureErrorHandler(): void {
  //   this.app.use(errorHandler);
  // }

  // private async killProcessOnPort(port: number): Promise<void> {
  //   try {
  //     const { stdout } = await execAsync(`lsof -i :${port} -t`);
  //     if (stdout) {
  //       await execAsync(`lsof -i :${port} -t | xargs kill -9`);
  //       logger.info(`Successfully killed process on port ${port}`);
  //     } else {
  //       logger.info(`No process found on port ${port}`);
  //     }
  //   } catch (error: any) {
  //     logger.error(`Error killing process on port ${port}: ${error.message}`);
  //     throw error;
  //   }
  // }

  connectDB = async (): Promise<void> => {
    await this.db.connect();
  };

  disconnectDB = async (): Promise<void> => {
    await this.db.disconnect();
  };

  run = async (): Promise<void> => {
    await this.connectDB();
    logger.info("after connectDB()");

    // this.app.listen(this.config.port, () => {
    //   logger.info(`Node server started at port: ${this.config.port}`);
    // });

    const startServer = () => {
      const server = this.app.listen(this.config.port, () => {
        logger.info(`Node server started at port: ${this.config.port}`);
      });

      // server.on("error", async (error: any) => {
      //   if (error.code === "EADDRINUSE") {
      //     logger.warn(
      //       `Port ${this.config.port} is already in use, attempting to kill the process using it.`,
      //     );
      //     try {
      //       await this.killProcessOnPort(this.config.port);
      //       logger.info(
      //         `Successfully killed process on port ${this.config.port}, retrying to start server.`,
      //       );
      //       setTimeout(startServer, 1000); // Introduce a delay before restarting
      //     } catch (killError: any) {
      //       logger.error(
      //         `Failed to kill process on port ${this.config.port}: ${killError.message}`,
      //       );
      //       process.exit(1);
      //     }
      //   } else {
      //     logger.error(`Server error: ${error.message}`);
      //     throw error;
      //   }
      // });
    };

    startServer();
  };
}

export { Server };
