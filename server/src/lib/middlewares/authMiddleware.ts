import { NextFunction, Request, Response } from "express";
import JWT, { JwtPayload } from "jsonwebtoken";
import { serverConfig } from "../../config";
import { logger } from "../helpers/logger";

class AuthMiddleware {
  static authenticate = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    // logger.info("Request cookies", { cookies: req.cookies });
    // const cookietoken = req.cookies?.JWT_Token;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      logger.warn("Authorization header  is missing");
      res.status(401).json({ message: "Authorization header  is missing" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      logger.warn("Authorization token is missing");
      res.status(401).json({ message: "Authorization token is missing" });
      return;
    }

    try {
      const decoded = JWT.verify(token, serverConfig.jwtSecret) as JwtPayload;
      logger.info("jwt.verify return value = ", { decoded });
      req.headers["user-agent"] = decoded.userId;
      next();
    } catch (error) {
      logger.error("Invalid Token or Session expired", { error });
      res.status(401).json({ message: "Invalid Token or Session expired" });
    }
  };
}

export { AuthMiddleware };
