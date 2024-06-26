"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialsRouter = void 0;
const express_1 = __importDefault(require("express"));
const multerHelpers_1 = require("../../lib/helpers/multerHelpers");
const Controller_1 = require("./Controller");
class Financials_Router_Class {
    constructor() {
        this.router = express_1.default.Router();
        this.financialControllers = new Controller_1.FinancialControllers();
        this.setupRoutes();
    }
    static getInstance() {
        if (!Financials_Router_Class.instance) {
            Financials_Router_Class.instance = new Financials_Router_Class();
        }
        return Financials_Router_Class.instance;
    }
    setupRoutes() {
        this.router.get("/", this.financialControllers.getAllData);
        this.router.get("/search", this.financialControllers.searchData);
        this.router.post("/", this.financialControllers.createData);
        this.router.patch("/:id", this.financialControllers.updateData);
        this.router.delete("/:id", this.financialControllers.deleteData);
        this.router.get("/filereport", this.financialControllers.getAllBulkUploadReportData);
        this.router.get("/errorreport", this.financialControllers.getAllErrorReportData);
        this.router.post("/upload", multerHelpers_1.upload.single("csvfile"), this.financialControllers.uploadFile);
    }
}
const FinancialsRouter = Financials_Router_Class.getInstance().router;
exports.FinancialsRouter = FinancialsRouter;
