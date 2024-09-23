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
class FinancialServices {
    constructor() {
        this.getAllFinancials = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.financialRepository.getAll();
        });
        this.processInChunks = (data) => __awaiter(this, void 0, void 0, function* () {
            const chunkSize = 100000;
            const totalSize = data.length;
            for (let i = 0; i < totalSize; i += chunkSize) {
                const chunk = data.slice(i, i + chunkSize);
                yield this.financialRepository.uploadCsv(chunk);
            }
        });
        this.uploadCsvFile = (fileName, filePath) => __awaiter(this, void 0, void 0, function* () {
            const dataToInsert = [];
            const startTime = new Date().toLocaleString();
            fs_1.default.createReadStream(filePath)
                .pipe((0, fast_csv_1.parse)({ headers: true }))
                .on("error", (error) => console.log(error))
                .on("data", (row) => {
                const transformedData = _a.transformEntry(row);
                dataToInsert.push(transformedData);
                console.log("inside createStream parsing the rows: ", transformedData);
            })
                .on("end", (rowCount) => __awaiter(this, void 0, void 0, function* () {
                const { passed, failed } = yield _a.validateEntries(dataToInsert);
                const reponse = yield this.processInChunks(passed);
                console.log(`Parsed ${rowCount} rows`);
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
FinancialServices.validateEntries = (entries) => __awaiter(void 0, void 0, void 0, function* () {
    const passed = [];
    const failed = [];
    const uploadId = new Date().getTime().toString();
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
