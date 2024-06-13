import { logger } from "../helpers/logger";
import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";

class BaseValidation {
  static validate = (
    res: Response,
    next: NextFunction,
    validator: ObjectSchema<any>,
    value: any,
    failedMessage: string,
  ): void => {
    const validationResult: ValidationResult = validator.validate(value, {
      abortEarly: false,
    });
    if (validationResult.error) {
      logger.error(
        `BaseValidation: ${failedMessage} => ${validationResult.error}`,
      );
      res.status(400).json({ message: validationResult.error });
      return;
    }
    next();
  };
}

export { BaseValidation };
