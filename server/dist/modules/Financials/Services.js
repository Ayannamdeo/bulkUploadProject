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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialServices = void 0;
const fast_csv_1 = require("fast-csv");
const fs_1 = __importDefault(require("fs"));
const Repository_1 = require("./repositories/Repository");
const csvDataValidation_1 = require("../../lib/middlewares/csvDataValidation");
const logger_1 = require("../../lib/helpers/logger");
class FinancialServices {
    constructor() {
        this.getAllFinancials = (...args_1) => __awaiter(this, [...args_1], void 0, function* (page = 1, limit = 10, sortBy = "createdAt", sortDirection = "desc") {
            return yield this.financialRepository.getAll(page, limit, sortBy, sortDirection);
        });
        this.countAllFinancials = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.financialRepository.countAll();
        });
        this.processInBatch = (batch, uploadId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { passed, failed } = yield _a.validateEntries(batch, uploadId);
                yield this.financialRepository.uploadCsv(passed);
                if (failed.length > 0) {
                    yield this.financialRepository.uploadErrors(failed);
                }
                return { passedCount: passed.length, failedCount: failed.length };
            }
            catch (error) {
                logger_1.logger.error("error while processing batch: ", error);
                return { passedCount: 0, failedCount: 0 };
            }
        });
        this.uploadCsvFile = (fileName, filePath) => __awaiter(this, void 0, void 0, function* () {
            const batchSize = 10000;
            let currentBatch = [];
            const uploadId = new Date().getTime().toString();
            const startTime = new Date().toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            });
            let successfulEntries = 0;
            let failedEntries = 0;
            const csvStream = fs_1.default
                .createReadStream(filePath)
                .pipe((0, fast_csv_1.parse)({ headers: true }))
                .on("error", (error) => logger_1.logger.error(" .on(error): ", error))
                .on("data", (row) => __awaiter(this, void 0, void 0, function* () {
                const transformedData = _a.transformEntry(row);
                currentBatch.push(transformedData);
                if (currentBatch.length >= batchSize) {
                    csvStream.pause();
                    const { passedCount, failedCount } = yield this.processInBatch(currentBatch, uploadId);
                    successfulEntries += passedCount;
                    failedEntries += failedCount;
                    currentBatch = [];
                    csvStream.resume();
                }
            }))
                .on("end", (rowCount) => __awaiter(this, void 0, void 0, function* () {
                const totalEntries = rowCount;
                if (currentBatch.length > 0) {
                    const { passedCount, failedCount } = yield this.processInBatch(currentBatch, uploadId);
                    successfulEntries += passedCount;
                    failedEntries += failedCount;
                }
                fs_1.default.unlinkSync(filePath);
                const endTime = new Date().toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                });
                yield this.financialRepository.uploadBulkUploadReport({
                    uploadId: uploadId,
                    startTime: startTime,
                    endTime: endTime,
                    fileName: fileName,
                    totalEntries: totalEntries,
                    successfulEntries: successfulEntries,
                    failedEntries: failedEntries,
                });
                logger_1.logger.info(`Parsed ${rowCount} rows`);
            }));
        });
        this.financialRepository = new Repository_1.FinancialRepository();
    }
}
exports.FinancialServices = FinancialServices;
_a = FinancialServices;
FinancialServices.transformEntry = (csvRowData) => {
    const transformedRow = {
        name: csvRowData.name,
        age: parseInt(csvRowData.age, 10), // Convert age to a number
        sex: csvRowData.sex,
        city: csvRowData.city,
        accountNumber: csvRowData.accountNumber, // Keep accountNumber as a string it's an identifier
        accountName: csvRowData.accountName,
        amount: csvRowData.amount,
        currencyName: csvRowData.currencyName,
    };
    return transformedRow;
};
FinancialServices.validateEntries = (entries, uploadId) => __awaiter(void 0, void 0, void 0, function* () {
    const passed = [];
    const failed = [];
    // const uploadId = new Date().getTime().toString();
    entries.forEach((entry, index) => {
        const { error } = csvDataValidation_1.CsvDataValidation.FinancialDetailSchema.validate(entry, { abortEarly: false });
        if (error) {
            failed.push({
                uploadId,
                rowNumber: index + 1,
                errorDetails: error === null || error === void 0 ? void 0 : error.details.map((err) => `${err.message}\n`),
            });
        }
        else {
            passed.push(entry);
        }
    });
    return { passed, failed };
});
