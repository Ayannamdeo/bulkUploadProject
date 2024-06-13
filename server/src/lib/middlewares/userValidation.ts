import express, { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema, custom } from "joi";
import { BaseValidation } from "../base/BaseValidation";

class UserValidation extends BaseValidation {
  static register = (req: Request, res: Response, next: NextFunction): void => {
    const newUser = req.body;

    const registerValidator: ObjectSchema<any> = Joi.object({
      name: Joi.string().min(4).max(30).required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .trim()
        .required(),
      password: Joi.string()
        .custom((value: string, helper: Joi.CustomHelpers<any>) => {
          if (value.length < 8) {
            return helper.message({
              custom: "Passowrd must be atleast 8 characters long",
            });
          }
        })
        .required(),
    });

    UserValidation.validate(
      res,
      next,
      registerValidator,
      newUser,
      "Register validation failed",
    );
  };

  static login = (req: Request, res: Response, next: NextFunction): void => {
    const newUser = req.body;

    const loginValidator: ObjectSchema<any> = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .trim()
        .required(),
      password: Joi.string()
        .custom((value: string, helper: Joi.CustomHelpers<any>) => {
          if (value.length < 8) {
            return helper.message({
              custom: "Passowrd must be atleast 8 characters long",
            });
          }
        })
        .required(),
    });

    UserValidation.validate(
      res,
      next,
      loginValidator,
      newUser,
      "Login validation failed",
    );
  };
}

export { UserValidation };

