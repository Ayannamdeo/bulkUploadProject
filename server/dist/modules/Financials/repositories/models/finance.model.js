"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FINANCIAL_MODEL = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const financeSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    age: { type: Number, min: 18, max: 75, required: true },
    sex: { type: String, enum: ["male", "female"], required: true },
    city: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    accountName: { type: String, required: true },
    amount: { type: String, required: true },
    currencyName: {
        type: String,
        enum: ["US Dollar", "Indian Rupee", "Yen", "Euro"],
        required: true,
    },
}, { timestamps: true });
const FINANCIAL_MODEL = mongoose_1.default.model("financial", financeSchema);
exports.FINANCIAL_MODEL = FINANCIAL_MODEL;
