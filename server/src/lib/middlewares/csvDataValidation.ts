import express, { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema, custom } from "joi";
import { BaseValidation } from "../base/BaseValidation";

class CsvDataValidation extends BaseValidation {
  static FinancialDetailSchema = Joi.object({
    uploadId: Joi.string().required(),
    name: Joi.string().required(),
    age: Joi.number().min(18).max(65).required(),
    sex: Joi.string().valid("male", "female").required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    accountNumber: Joi.string().length(8).required(),
    accountName: Joi.string().required(),
    amount: Joi.string().required(),
    currencyName: Joi.string().required(),
    jobTitle: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    companyName: Joi.string().required(),
    transactionDescription: Joi.string().required(),
  });
}

export { CsvDataValidation };
