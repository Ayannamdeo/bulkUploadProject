import mongoose from "mongoose";
import { logger } from "../helpers/logger";

class DB_Connection {
  private static instance: DB_Connection;
  mongoUrl: string;

  private constructor(url: string) {
    this.mongoUrl = url;
    logger.debug("DB_Connection constructor called", {
      mongoUrl: this.mongoUrl,
    });
  }

  public static getInstance(mongoUrl: string): DB_Connection {
    if (!DB_Connection.instance) {
      DB_Connection.instance = new DB_Connection(mongoUrl + "bulkUploaderProject");
      logger.info("new db_connection instance created", {
        instance: DB_Connection.instance,
      });
    } else {
      logger.debug("db_connection instance reused", {
        instance: DB_Connection.instance,
      });
    }
    return DB_Connection.instance;
  }

  async connect(): Promise<void> {
    logger.debug("Attempting to connect to mongoDB");
    try {
      await mongoose.connect(this.mongoUrl);
      logger.info("connected to MongoDB");
    } catch (error: any) {
      logger.error(`MongoDB connection error: ${error.message}`);
      throw new Error(`mongodb connection error: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    logger.debug("Attempting to disconnect to mongoDB");
    try {
      await mongoose.disconnect();
      logger.info("diconnected from MongoDB");
    } catch (error: any) {
      logger.error(`MongoDB disconnection error: ${error.message}`);
      throw new Error(`mongodb disconnection error: ${error}`);
    }
  }
}

export { DB_Connection };

