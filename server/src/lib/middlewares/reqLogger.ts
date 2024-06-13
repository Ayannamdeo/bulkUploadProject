import { NextFunction, Request, Response } from "express";
import { logger } from "../helpers/logger";

class ReqLoggger {
  static LogHTTP = (req: Request, res: Response, next: NextFunction): void => {
    logger.info(`HTTP Request: ${req.method} - ${req.url}`);
    next();
  };
}

export {ReqLoggger};