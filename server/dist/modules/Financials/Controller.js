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
const formatFileSize_1 = require("../../lib/helpers/formatFileSize");
const Services_1 = require("./Services");
class FinancialControllers {
    // private readonly
    constructor() {
        this.getAllData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { page = 1, size = 10, sortBy = "createdAt", sortDirection = "desc", } = req.query;
            console.log("size from getAll Data: ", size);
            try {
                const financeList = yield this.financialServices.getAllFinancials(Number(page), Number(size), sortBy, sortDirection);
                if (!financeList) {
                    logger_1.logger.warn("No financial data found");
                    res.status(404).json({ message: "No financial data found" });
                    return;
                }
                const totalDocuments = yield this.financialServices.countAllFinancials();
                const totalPages = Math.ceil(totalDocuments / Number(size));
                res.status(200).json({
                    financials: financeList,
                    totalPages: totalPages,
                });
            }
            catch (error) {
                logger_1.logger.error("Error while getting all financial data", error);
                res.status(500).json({ message: error.message });
            }
        });
        this.getAllBulkUploadReportData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { page = 1, size = 10, sortBy = "createdAt", sortDirection = "desc", } = req.query;
            try {
                const { data, documentCount } = yield this.financialServices.getAllBulkUploadReport(Number(page), Number(size), sortBy, sortDirection);
                if (!data) {
                    logger_1.logger.warn("No BulkUploadReport data found");
                    res.status(404).json({ message: "No BulkUploadReport data found" });
                    return;
                }
                const totalPages = Math.ceil(documentCount / Number(size));
                res.status(200).json({
                    fileReport: data,
                    totalPages: totalPages,
                });
            }
            catch (error) {
                logger_1.logger.error("Error while getting all BulkUploadReport data", error);
                res.status(500).json({ message: error.message });
            }
        });
        this.getAllErrorReportData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { page = 1, size = 10, logId } = req.query;
            console.log("inside getAllErrorReportData logId", logId);
            try {
                const { data, documentCount } = yield this.financialServices.getAllErrorReport(Number(page), Number(size), logId);
                if (!data) {
                    logger_1.logger.warn("No ErrorReport data found");
                    res.status(404).json({ message: "No ErrorReport data found" });
                    return;
                }
                const totalPages = Math.ceil(documentCount / Number(size));
                res.status(200).json({ errorReport: data, totalPages: totalPages });
            }
            catch (error) {
                logger_1.logger.error("Error while getting all ErrorReport data", error);
                res.status(500).json({ message: error.message });
            }
        });
        this.searchData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside search dAta");
            try {
                const { searchResults, totalDocuments } = yield this.financialServices.searchFinancials(req.query);
                const totalPages = Math.ceil(totalDocuments / Number(req.query.size));
                // res.status(200).send("CHECKPOINT");
                res.status(200).json({
                    financials: searchResults,
                    totalPages: totalPages,
                });
            }
            catch (error) {
                logger_1.logger.error("Error while getting all financial data", error);
                res.status(500).json({ message: error.message });
            }
        });
        this.createData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("req.body inside createData: ", req.body);
                const createdData = yield this.financialServices.CreateFinancials(req.body);
                if (Array.isArray(createdData)) {
                    res.status(400).json({ message: createdData });
                    return;
                }
                res.status(200).json(createdData);
            }
            catch (err) {
                logger_1.logger.error("error in createData Api", err);
                res.status(500).json({ message: err.message });
            }
        });
        this.updateData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("req.body inside createData: ", req.body);
                // console.log(" req.params inside createData: ", req.params);
                const updatedData = yield this.financialServices.UpdateFinancials(req.params.id, req.body);
                if (Array.isArray(updatedData)) {
                    res.status(400).json({ message: updatedData });
                    return;
                }
                // console.log("updatedData", updatedData);
                res.status(200).json(updatedData);
            }
            catch (err) {
                logger_1.logger.error("error in updateData Api", err);
                res.status(500).json({ message: err.message });
            }
        });
        this.deleteData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("id in params: ", req.params.id);
            try {
                const deletedContent = yield this.financialServices.deleteFinancials(req.params.id);
                res.status(200).json(deletedContent);
            }
            catch (err) {
                logger_1.logger.error("error in deleteData Api", err);
                res.status(500).json({ message: err.message });
            }
        });
        this.deleteAllRecords = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("req.body inside deleAllRecordes", req.body);
                console.log("req.headers inside deleAllRecordes", req.headers);
                const report = yield this.financialServices.findBulkUploadReportByUploadId(req.body.uploadId);
                if (report) {
                    if (report.userEmail === req.headers["user-agent"]) {
                        const response = yield this.financialServices.deleteBulk(req.body.uploadId);
                        res.status(200).json(response);
                        return;
                    }
                    else {
                        res.status(400).json({
                            message: "user not Authorized to delete this file Report Data",
                        });
                        return;
                    }
                }
                res
                    .status(404)
                    .json({ message: "No report by the request UploadId data found" });
                return;
            }
            catch (err) {
                logger_1.logger.error("error in deleteAllRecords Api", err);
                res.status(500).json({ message: err.message });
            }
        });
        this.uploadFile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const fileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname;
                const filePath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
                const fileSize = (_c = req.file) === null || _c === void 0 ? void 0 : _c.size;
                const formattedFileSize = (0, formatFileSize_1.formatFileSize)(fileSize);
                const userEmail = req.body.userEmail;
                console.log("filesize", formattedFileSize);
                console.log("userEmail", userEmail);
                console.log("req.body", req.body);
                if (!filePath) {
                    res.status(400).json({ message: "no file uploaded" });
                    return;
                }
                const response = yield this.financialServices.uploadCsvFile(fileName, filePath, formattedFileSize, userEmail);
                console.log("response in controller", response);
                res.status(201).json({ message: response });
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
