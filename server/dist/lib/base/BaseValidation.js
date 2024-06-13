"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseValidation = void 0;
const logger_1 = require("../helpers/logger");
class BaseValidation {
}
exports.BaseValidation = BaseValidation;
BaseValidation.validate = (res, next, validator, value, failedMessage) => {
    const validationResult = validator.validate(value, {
        abortEarly: false,
    });
    if (validationResult.error) {
        logger_1.logger.error(`BaseValidation: ${failedMessage} => ${validationResult.error}`);
        res.status(400).json({ message: validationResult.error });
        return;
    }
    next();
};
