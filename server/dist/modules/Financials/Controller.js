"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialControllers = void 0;
const logger_1 = require("../../lib/helpers/logger");
const Services_1 = require("./Services");
class FinancialControllers {
    constructor() {
        this.getAllData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const financeList = yield this.financialServices.getAllFinancials();
                if (!financeList) {
                    logger_1.logger.warn("NO financial Data found");
                    res.status(404).json({ message: "NO financial Data found" });
                    return;
                }
                res.status(200).json(financeList);
            }
            catch (error) {
                logger_1.logger.error("error while getting all financial Data", error);
                res.status(500).json({ message: error.message });
            }
        });
        this.uploadFile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const fileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname;
                const filePath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
                if (!filePath) {
                    res.status(400).json({ message: "no file uploaded" });
                    return;
                }
                yield this.financialServices.uploadCsvFile(fileName, filePath);
                res
                    .status(201)
                    .json({
                    message: "CSV data uploaded and saved to MongoDB successfully",
                });
                return;
            }
            catch (error) {
                logger_1.logger.error("error while uploading the file", error);
                res.status(500).json({ message: error.message });
            }
        });
        this.financialServices = new Services_1.FinancialServices();
    }
}
exports.FinancialControllers = FinancialControllers;
