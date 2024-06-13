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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialServices = void 0;
const fast_csv_1 = require("fast-csv");
const fs_1 = __importDefault(require("fs"));
const Repository_1 = require("./repositories/Repository");
class FinancialServices {
    constructor() {
        this.getAllFinancials = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.financialRepository.getAll();
        });
        this.uploadCsvFile = (fileName, filePath) => __awaiter(this, void 0, void 0, function* () {
            // const dataToInsert: any[] = [];
            // const validData: any[] = [];
            // const invalidData: any[] = [];
            // const startTime: string = new Date().toLocaleString();
            // const uploadId = new Date().getTime().toString();
            fs_1.default.createReadStream(filePath)
                .pipe((0, fast_csv_1.parse)({ headers: true }))
                .on("error", (error) => console.log(error))
                .on("data", (row) => {
                const transformedRow = {
                    name: row.name,
                    age: parseInt(row.age, 10), // Convert age to a number
                    sex: row.sex,
                    city: row.city,
                    accountNumber: row.accountNumber, // Keep accountNumber as a string it's an identifier
                    accountName: row.accountName,
                    amount: row.amount,
                    currencyName: row.currencyName,
                };
                console.log("inside createStream parsing the rows: ", transformedRow);
            })
                .on("end", (rowCount) => console.log(`Parsed ${rowCount} rows`));
        });
        this.financialRepository = new Repository_1.FinancialRepository();
    }
}
exports.FinancialServices = FinancialServices;
