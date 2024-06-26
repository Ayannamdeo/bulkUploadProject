import express, { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema, custom } from "joi";
import { BaseValidation } from "../base/BaseValidation";

class CsvDataValidation extends BaseValidation {
  static FinancialDetailSchema: ObjectSchema<any> = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().min(18).max(65).required(),
    sex: Joi.string().valid("male", "female").required(),
    city: Joi.string().required(),
    accountNumber: Joi.string().length(8).required(),
    accountName: Joi.string().required(), // valid....
    amount: Joi.string().required(),
    currencyName: Joi.string().required(), // valid....
  });
}

export { CsvDataValidation };
