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
        /**
         * @swagger
         * /api/financials/:
         *   get:
         *     summary: Get Financials Table
         *     tags:
         *       - Financials
         *     parameters:
         *       - name: page
         *         in: query
         *         required: false
         *         schema:
         *           type: integer
         *           default: 1
         *       - name: size
         *         in: query
         *         required: false
         *         schema:
         *           type: integer
         *           default: 10
         *       - name: sortBy
         *         in: query
         *         required: false
         *         schema:
         *           type: string
         *           default: "createdAt"
         *       - name: sortDirection
         *         in: query
         *         required: false
         *         schema:
         *           type: string
         *           default: "desc"
         *     responses:
         *       200:
         *         description: A list of financial data
         *       404:
         *         description: No financial data found
         *       500:
         *         description: Internal server error
         */
        this.getAllData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { page = 1, size = 10, sortBy = "createdAt", sortDirection = "desc", } = req.query;
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
        /**
           * @swagger
           * /api/financials/filereport:
           *   get:
           *     summary: Get all csvFile Upload report data
           *     tags:
           *       - Financials
           *     parameters:
           *       - name: page
           *         in: query
           *         required: false
           *         schema:
           *           type: integer
           *           default: 1
           *       - name: size
           *         in: query
           *         required: false
           *         schema:
           *           type: integer
           *           default: 10
           *       - name: sortBy
           *         in: query
           *         required: false
           *         schema:
           *           type: string
           *           default: "createdAt"
           *       - name: sortDirection
           *         in: query
           *         required: false
           *         schema:
           *           type: string
           *           default: "desc"
           *     responses:
           *       200:
           *         description: A list of bulk upload report data
           *       404:
           *         description: No BulkUploadReport data found
           *       500:
           *         description: Internal server error
           */
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
        /**
           * @swagger
           * /api/financials/errorreport:
           *   get:
           *     summary: Get all error report data
           *     tags:
           *       - Financials
           *     parameters:
           *       - name: page
           *         in: query
           *         required: false
           *         schema:
           *           type: integer
           *           default: 1
           *       - name: size
           *         in: query
           *         required: false
           *         schema:
           *           type: integer
           *           default: 10
           *       - name: logId
           *         in: query
           *         required: false
           *         schema:
           *           type: string
           *     responses:
           *       200:
           *         description: A list of error report data
           *       404:
           *         description: No ErrorReport data found
           *       500:
           *         description: Internal server error
           */
        this.getAllErrorReportData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { page = 1, size = 10, logId } = req.query;
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
        /**
         * @swagger
         * /api/financials/search:
         *   get:
         *     summary: Search financial data
         *     tags:
         *       - Financials
         *     parameters:
         *       - name: query
         *         in: query
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: A list of search results
         *       500:
         *         description: Internal server error
         */
        this.searchData = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
        /**
           * @swagger
           * /api/financials/:
           *   post:
           *     summary: Create new financial data
           *     tags:
           *       - Financials
           *     requestBody:
           *       required: true
           *       content:
           *         application/json:
           *           schema:
           *             type: object
           *             properties:
           *               name:
           *                 type: string
           *               amount:
           *                 type: number
           *               uploadId:
           *                 type: string
           *               age:
           *                 type: number
           *               sex:
           *                 type: string
           *               country:
           *                 type: string
           *               city:
           *                 type: string
           *               accountNumber:
           *                 type: string
           *               accountName:
           *                 type: string
           *               currencyName:
           *                 type: string
           *               jobTitle:
           *                 type: string
           *               phoneNumber:
           *                 type: string
           *               companyName:
           *                 type: string
           *               transactionDescription:
           *                 type: string
           *     responses:
           *       200:
           *         description: Created financial data
           *       400:
           *         description: Bad request
           *       500:
           *         description: Internal server error
           */
        this.createData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
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
        /**
           * @swagger
           * /api/financials/{id}:
           *   put:
           *     summary: Update financial data by ID
           *     tags:
           *       - Financials
           *     parameters:
           *       - name: id
           *         in: path
           *         required: true
           *         schema:
           *           type: string
           *     requestBody:
           *       required: true
           *       content:
           *         application/json:
           *           schema:
           *             type: object
           *             properties:
           *               name:
           *                 type: string
           *               amount:
           *                 type: number
           *               uploadId:
           *                 type: string
           *               age:
           *                 type: number
           *               sex:
           *                 type: string
           *               country:
           *                 type: string
           *               city:
           *                 type: string
           *               accountNumber:
           *                 type: string
           *               accountName:
           *                 type: string
           *               currencyName:
           *                 type: string
           *               jobTitle:
           *                 type: string
           *               phoneNumber:
           *                 type: string
           *               companyName:
           *                 type: string
           *               transactionDescription:
           *                 type: string
           *     responses:
           *       200:
           *         description: Updated financial data
           *       400:
           *         description: Bad request
           *       404:
           *         description: Financial data not found
           *       500:
           *         description: Internal server error
           */
        this.updateData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
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
        /**
           * @swagger
           * /api/financials/{id}:
           *   delete:
           *     summary: Delete financial data by ID
           *     tags:
           *       - Financials
           *     parameters:
           *       - name: id
           *         in: path
           *         required: true
           *         schema:
           *           type: string
           *     responses:
           *       200:
           *         description: Deleted financial data
           *       404:
           *         description: Financial data not found
           *       500:
           *         description: Internal server error
           */
        this.deleteData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // console.log("id in params: ", req.params.id);
            try {
                const deletedContent = yield this.financialServices.deleteFinancials(req.params.id);
                res.status(200).json(deletedContent);
            }
            catch (err) {
                logger_1.logger.error("error in deleteData Api", err);
                res.status(500).json({ message: err.message });
            }
        });
        /**
           * @swagger
           * /api/financials/filereport:
           *   delete:
           *     summary: Delete all records associated with a specific upload ID
           *     tags:
           *       - Financials
           *     requestBody:
           *       required: true
           *       content:
           *         application/json:
           *           schema:
           *             type: object
           *             properties:
           *               uploadId:
           *                 type: string
           *     responses:
           *       200:
           *         description: Deleted records successfully
           *       400:
           *         description: User not authorized or bad request
           *       404:
           *         description: No report found by the requested UploadId
           *       500:
           *         description: Internal server error
           */
        this.deleteAllRecords = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const report = yield this.financialServices.findBulkUploadReportByUploadId(req.body.uploadId);
                if (report) {
                    if (report.userEmail === req.headers["user-agent"]) {
                        const response = yield this.financialServices.deleteBulk(req.body.uploadId);
                        res.status(200).json(response);
                        return;
                    }
                    else {
                        res.status(400).json({ message: "user not Authorized to delete this file Report Data" });
                        return;
                    }
                }
                res.status(404).json({ message: "No report by the request UploadId data found" });
                return;
            }
            catch (err) {
                logger_1.logger.error("error in deleteAllRecords Api", err);
                res.status(500).json({ message: err.message });
            }
        });
        /**
           * @swagger
           * /api/financials/upload:
           *   post:
           *     summary: Upload a CSV file
           *     tags:
           *       - Financials
           *     requestBody:
           *       required: true
           *       content:
           *         multipart/form-data:
           *           schema:
           *             type: object
           *             properties:
           *               userEmail:
           *                 type: string
           *               file:
           *                 type: string
           *                 format: binary
           *     responses:
           *       201:
           *         description: File uploaded successfully
           *       400:
           *         description: No file uploaded
           *       500:
           *         description: Internal server error
           */
        this.uploadFile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const fileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname;
                const filePath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
                const fileSize = (_c = req.file) === null || _c === void 0 ? void 0 : _c.size;
                const formattedFileSize = (0, formatFileSize_1.formatFileSize)(fileSize);
                const userEmail = req.body.userEmail;
                if (!filePath) {
                    res.status(400).json({ message: "no file uploaded" });
                    return;
                }
                const response = yield this.financialServices.uploadCsvFile(fileName, filePath, formattedFileSize, userEmail);
                logger_1.logger.info("response in controller", response);
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
