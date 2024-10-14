"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import helmet from "helmet";
const cors_1 = __importDefault(require("cors"));
const DB_Connection_1 = require("./lib/db/DB_Connection");
const routes_1 = __importDefault(require("./routes/routes"));
const logger_1 = require("./lib/helpers/logger");
const reqLogger_1 = require("./lib/middlewares/reqLogger");
// const execAsync = promisify(exec);
class Server {
    constructor(config) {
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
        this.connectDB = () => __awaiter(this, void 0, void 0, function* () {
            yield this.db.connect();
        });
        this.disconnectDB = () => __awaiter(this, void 0, void 0, function* () {
            yield this.db.disconnect();
        });
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            yield this.connectDB();
            logger_1.logger.info("after connectDB()");
            // this.app.listen(this.config.port, () => {
            //   logger.info(`Node server started at port: ${this.config.port}`);
            // });
            const startServer = () => {
                const server = this.app.listen(this.config.port, () => {
                    logger_1.logger.info(`Node server started at port: ${this.config.port}`);
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
        });
        this.app = (0, express_1.default)();
        this.config = config;
        this.db = DB_Connection_1.DB_Connection.getInstance(this.config.mongoUrl);
    }
    static getInstance(config) {
        if (!Server.instance) {
            Server.instance = new Server(config);
            Server.instance.bootstrap();
        }
        return Server.instance;
    }
    bootstrap() {
        this.configureMiddlewares();
        this.configureRoutes();
        // this.configureErrorHandler();
    }
    configureMiddlewares() {
        this.app.use(reqLogger_1.ReqLoggger.LogHTTP);
        this.app.use((0, cors_1.default)());
        // this.app.use(helmet());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
    }
    configureRoutes() {
        this.app.use(routes_1.default);
    }
}
exports.Server = Server;
