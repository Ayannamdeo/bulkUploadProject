"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const BaseValidation_1 = require("../base/BaseValidation");
class UserValidation extends BaseValidation_1.BaseValidation {
}
exports.UserValidation = UserValidation;
UserValidation.register = (req, res, next) => {
    const newUser = req.body;
    const registerValidator = joi_1.default.object({
        name: joi_1.default.string().min(4).max(30).required(),
        email: joi_1.default.string()
            .email({ tlds: { allow: false } })
            .trim()
            .required(),
        password: joi_1.default.string()
            .custom((value, helper) => {
            if (value.length < 8) {
                return helper.message({
                    custom: "Passowrd must be atleast 8 characters long",
                });
            }
        })
            .required(),
    });
    UserValidation.validate(res, next, registerValidator, newUser, "Register validation failed");
};
UserValidation.login = (req, res, next) => {
    const newUser = req.body;
    const loginValidator = joi_1.default.object({
        email: joi_1.default.string()
            .email({ tlds: { allow: false } })
            .trim()
            .required(),
        password: joi_1.default.string()
            .custom((value, helper) => {
            if (value.length < 8) {
                return helper.message({
                    custom: "Passowrd must be atleast 8 characters long",
                });
            }
        })
            .required(),
    });
    UserValidation.validate(res, next, loginValidator, newUser, "Login validation failed");
};
