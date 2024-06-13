"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BULK_UPLOAD_REPORT = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bulkUploadSchema = new mongoose_1.default.Schema({
    uploadId: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    fileName: { type: String, required: true },
    totalEntries: { type: Number, required: true },
    successfulEntries: { type: Number, required: true },
    failedEntries: { type: Number, required: true },
}, { timestamps: true });
const BULK_UPLOAD_REPORT = mongoose_1.default.model("bulkuploadreport", bulkUploadSchema);
exports.BULK_UPLOAD_REPORT = BULK_UPLOAD_REPORT;
