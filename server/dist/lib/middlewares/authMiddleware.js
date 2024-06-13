"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const logger_1 = require("../helpers/logger");
class AuthMiddleware {
}
exports.AuthMiddleware = AuthMiddleware;
AuthMiddleware.authenticate = (req, res, next) => {
    logger_1.logger.debug("Request cookies", { cookies: req.cookies });
    // const cookietoken = req.cookies?.JWT_Token;
    const authHeader = req.headers.authorization;
    console.log("authHeader", authHeader);
    if (!authHeader) {
        logger_1.logger.warn("Authorization header  is missing");
        res.status(401).json({ message: "Authorization header  is missing" });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        logger_1.logger.warn("Authorization token is missing");
        res.status(401).json({ message: "Authorization token is missing" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.serverConfig.jwtSecret);
        logger_1.logger.debug("jwt.verify return value = ", { decoded });
        next();
    }
    catch (error) {
        logger_1.logger.error("Invalid Token or Session expired", { error });
        res.status(401).json({ message: "Invalid Token or Session expired" });
    }
};
AuthMiddleware.restrictTo = (roles = []) => {
    return (req, res, next) => {
        var _a;
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.JWT_Token;
        const decoded = jsonwebtoken_1.default.decode(token);
        logger_1.logger.debug("Decoded token in restrictTo", { decoded });
        const decodedPayload = decoded;
        const existingUserRole = decodedPayload.role;
        if (!roles.includes(existingUserRole)) {
            logger_1.logger.warn("Unauthorized access attempt", { existingUserRole, roles, });
            res.status(401).json({ message: "UNAUTHORIZED" });
            return;
        }
        next();
        // res.send("CHECKPOINT");
    };
};
