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
// import { BULK_UPLOAD_REPORT } from "./models";
class FinancialRepository {
    constructor() {
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield models_1.FINANCIAL_MODEL.find().limit(10);
        });
        this.uploadCsv = (data) => __awaiter(this, void 0, void 0, function* () {
            return yield models_1.FINANCIAL_MODEL.insertMany(data, { ordered: false });
        });
    }
}
exports.FinancialRepository = FinancialRepository;
