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
const buildPipeline_1 = require("../../lib/helpers/buildPipeline");
class FinancialServices {
    constructor() {
        this.getAllFinancials = (...args_1) => __awaiter(this, [...args_1], void 0, function* (page = 1, limit = 10, sortBy = "createdAt", sortDirection = "desc") {
            return yield this.financialRepository.getAll(page, limit, sortBy, sortDirection);
        });
        this.findBulkUploadReportByUploadId = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.bulkUploadReportRepository.getBulkUploadReportByUploadId(id);
        });
        this.CreateFinancials = (data) => __awaiter(this, void 0, void 0, function* () {
            const newUploadId = new Date().getTime().toString();
            const dataWithUploadId = Object.assign({ uploadId: newUploadId }, data);
            const { error } = csvDataValidation_1.CsvDataValidation.FinancialDetailSchema.validate(dataWithUploadId, { abortEarly: false });
            if (error) {
                const errorDetails = error === null || error === void 0 ? void 0 : error.details.map((err) => `${err.message}\n`);
                return errorDetails;
            }
            else {
                return yield this.financialRepository.create(dataWithUploadId);
            }
        });
        this.UpdateFinancials = (id, data) => __awaiter(this, void 0, void 0, function* () {
            const keysToFilter = ["_id", "__v", "createdAt", "updatedAt"];
            const filteredData = Object.keys(data).reduce((acc, key) => {
                if (!keysToFilter.includes(key)) {
                    acc[key] = data[key];
                }
                return acc;
            }, {});
            const { error } = csvDataValidation_1.CsvDataValidation.FinancialDetailSchema.validate(filteredData, {
                abortEarly: false,
            });
            if (error) {
                const errorDetails = error === null || error === void 0 ? void 0 : error.details.map((err) => `${err.message}\n`);
                return errorDetails;
            }
            else {
                return yield this.financialRepository.update(id, filteredData);
            }
        });
        this.deleteFinancials = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.financialRepository.delete(id);
        });
        this.deleteBulk = (id) => __awaiter(this, void 0, void 0, function* () {
            const r1 = yield this.bulkErrorRepository.deleteAllErrorReports(id);
            const r2 = yield this.financialRepository.deleteManyRecords(id);
            return { r1, r2 };
        });
        this.countAllFinancials = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.financialRepository.countAll();
        });
        this.searchFinancials = (query) => __awaiter(this, void 0, void 0, function* () {
            const pipeline = (0, buildPipeline_1.buildPipeline)(query);
            const [response] = yield this.financialRepository.search(pipeline);
            // Extract search results and count from the response
            const searchResults = response.searchResults || [];
            const totalDocuments = response.countResults.length > 0 ? response.countResults[0].totalDocuments : 0;
            return { searchResults, totalDocuments };
        });
        this.getAllBulkUploadReport = (...args_2) => __awaiter(this, [...args_2], void 0, function* (page = 1, limit = 10, sortBy = "createdAt", sortDirection = "desc") {
            return yield this.bulkUploadReportRepository.getAllUploadReport(page, limit, sortBy, sortDirection);
        });
        this.getAllErrorReport = (...args_3) => __awaiter(this, [...args_3], void 0, function* (page = 1, limit = 10, logId) {
            return yield this.bulkErrorRepository.getAllErrorReport(page, limit, logId);
        });
        this.processInBatch = (batch, uploadId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { passed, failed } = yield _a.validateEntries(batch, uploadId);
                yield this.financialRepository.uploadCsv(passed);
                if (failed.length > 0) {
                    yield this.bulkErrorRepository.uploadErrors(failed);
                }
                return { passedCount: passed.length, failedCount: failed.length };
            }
            catch (error) {
                logger_1.logger.error("error while processing batch: ", error);
                return { passedCount: 0, failedCount: 0 };
            }
        });
        this.uploadCsvFile = (fileName, filePath, fileSize, userEmail) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const batchSize = 10000;
                let currentBatch = [];
                let successfulEntries = 0;
                let failedEntries = 0;
                const uploadId = new Date().getTime().toString();
                const startTime = new Date().toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                });
                const csvStream = fs_1.default
                    .createReadStream(filePath)
                    .pipe((0, fast_csv_1.parse)({ headers: true }))
                    .on("error", (error) => {
                    logger_1.logger.error(".on(error): ", error);
                    reject(error);
                })
                    .on("data", (row) => __awaiter(this, void 0, void 0, function* () {
                    const transformedData = _a.transformEntry(row, uploadId);
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
                    yield this.bulkUploadReportRepository.uploadBulkUploadReport({
                        uploadId: uploadId,
                        userEmail: userEmail,
                        fileSize: fileSize,
                        startTime: startTime,
                        endTime: endTime,
                        fileName: fileName,
                        totalEntries: totalEntries,
                        successfulEntries: successfulEntries,
                        failedEntries: failedEntries,
                    });
                    logger_1.logger.info(`Parsed ${rowCount} rows`);
                    resolve("CSV data uploaded and saved to MongoDB successfully");
                }));
            });
        });
        this.financialRepository = new Repository_1.FinancialRepository();
        this.bulkUploadReportRepository = new Repository_1.BulkUploadReportRepository();
        this.bulkErrorRepository = new Repository_1.BulkErrorRepository();
    }
}
exports.FinancialServices = FinancialServices;
_a = FinancialServices;
FinancialServices.transformEntry = (csvRowData, uploadId) => {
    const transformedRow = {
        uploadId: uploadId,
        name: csvRowData.name,
        age: parseInt(csvRowData.age, 10), // Convert age to a number
        sex: csvRowData.sex,
        country: csvRowData.country,
        city: csvRowData.city,
        accountNumber: csvRowData.accountNumber,
        accountName: csvRowData.accountName,
        amount: csvRowData.amount,
        currencyName: csvRowData.currencyName,
        jobTitle: csvRowData.jobTitle,
        phoneNumber: csvRowData.phoneNumber,
        companyName: csvRowData.companyName,
        transactionDescription: csvRowData.transactionDescription,
    };
    return transformedRow;
};
FinancialServices.validateEntries = (entries, uploadId) => __awaiter(void 0, void 0, void 0, function* () {
    const passed = [];
    const failed = [];
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
