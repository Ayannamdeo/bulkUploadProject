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
exports.DB_Connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../helpers/logger");
class DB_Connection {
    constructor(url) {
        this.mongoUrl = url;
        logger_1.logger.debug("DB_Connection constructor called", {
            mongoUrl: this.mongoUrl,
        });
    }
    static getInstance(mongoUrl) {
        if (!DB_Connection.instance) {
            DB_Connection.instance = new DB_Connection(mongoUrl + "bulkUploaderProject");
            logger_1.logger.info("new db_connection instance created", {
                instance: DB_Connection.instance,
            });
        }
        else {
            logger_1.logger.debug("db_connection instance reused", {
                instance: DB_Connection.instance,
            });
        }
        return DB_Connection.instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.debug("Attempting to connect to mongoDB");
            try {
                yield mongoose_1.default.connect(this.mongoUrl);
                logger_1.logger.info("connected to MongoDB");
            }
            catch (error) {
                logger_1.logger.error(`MongoDB connection error: ${error.message}`);
                throw new Error(`mongodb connection error: ${error}`);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.debug("Attempting to disconnect to mongoDB");
            try {
                yield mongoose_1.default.disconnect();
                logger_1.logger.info("diconnected from MongoDB");
            }
            catch (error) {
                logger_1.logger.error(`MongoDB disconnection error: ${error.message}`);
                throw new Error(`mongodb disconnection error: ${error}`);
            }
        });
    }
}
exports.DB_Connection = DB_Connection;
