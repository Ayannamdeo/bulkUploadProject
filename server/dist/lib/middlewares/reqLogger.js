"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqLoggger = void 0;
const logger_1 = require("../helpers/logger");
class ReqLoggger {
}
exports.ReqLoggger = ReqLoggger;
ReqLoggger.LogHTTP = (req, res, next) => {
    logger_1.logger.info(`HTTP Request: ${req.method} - ${req.url}`);
    next();
};
