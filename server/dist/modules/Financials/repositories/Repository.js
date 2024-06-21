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
exports.FinancialRepository = void 0;
const models_1 = require("./models");
const models_2 = require("./models");
const models_3 = require("./models");
class FinancialRepository {
    constructor() {
        this.getAll = (...args_1) => __awaiter(this, [...args_1], void 0, function* (page = 1, limit = 10, sortBy = "createdAt", sortDirection = "desc") {
            const offset = (page - 1) * limit;
            return yield models_1.FINANCIAL_MODEL.find()
                .skip(offset)
                .limit(limit)
                .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 });
        });
        this.countAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield models_1.FINANCIAL_MODEL.countDocuments();
        });
        this.uploadCsv = (data) => __awaiter(this, void 0, void 0, function* () {
            return yield models_1.FINANCIAL_MODEL.insertMany(data, { ordered: false });
        });
        this.uploadErrors = (data) => __awaiter(this, void 0, void 0, function* () {
            return yield models_3.BULK_ERROR_REPORT.insertMany(data, { ordered: false });
        });
        this.uploadBulkUploadReport = (data) => __awaiter(this, void 0, void 0, function* () {
            return yield models_2.BULK_UPLOAD_REPORT.create(data);
        });
    }
}
exports.FinancialRepository = FinancialRepository;
