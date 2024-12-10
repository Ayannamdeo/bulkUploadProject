"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvDataValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const BaseValidation_1 = require("../base/BaseValidation");
class CsvDataValidation extends BaseValidation_1.BaseValidation {
}
exports.CsvDataValidation = CsvDataValidation;
CsvDataValidation.FinancialDetailSchema = joi_1.default.object({
    uploadId: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    age: joi_1.default.number().min(18).max(65).required(),
    sex: joi_1.default.string().valid("male", "female").required(),
    country: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    accountNumber: joi_1.default.string().length(8).required(),
    accountName: joi_1.default.string().required(),
    amount: joi_1.default.string().required(),
    currencyName: joi_1.default.string().required(),
    jobTitle: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string().required(),
    companyName: joi_1.default.string().required(),
    transactionDescription: joi_1.default.string().required(),
});
