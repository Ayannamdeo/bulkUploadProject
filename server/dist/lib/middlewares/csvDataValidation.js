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
    name: joi_1.default.string().required(),
    age: joi_1.default.number().min(18).max(65).required(),
    sex: joi_1.default.string().valid("male", "female").required(),
    city: joi_1.default.string().required(),
    accountNumber: joi_1.default.string().length(8).required(),
    accountName: joi_1.default.string().required(),
    amount: joi_1.default.string().required(),
    currencyName: joi_1.default.string().required(),
});
