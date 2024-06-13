"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BULK_ERROR_REPORT = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bulkErrorSchema = new mongoose_1.default.Schema({
    uploadId: { type: String, required: true },
    rowNumber: { type: Number, required: true },
    errorDetails: { type: [String], required: true },
}, { timestamps: true });
const BULK_ERROR_REPORT = mongoose_1.default.model("bulkErrorReport", bulkErrorSchema);
exports.BULK_ERROR_REPORT = BULK_ERROR_REPORT;
