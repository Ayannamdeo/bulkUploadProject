"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialsRouter = void 0;
const express_1 = __importDefault(require("express"));
const multerHelpers_1 = require("../../lib/helpers/multerHelpers");
const Controller_1 = require("./Controller");
const authMiddleware_1 = require("../../lib/middlewares/authMiddleware");
class Financials_Router_Class {
    constructor() {
        this.router = express_1.default.Router();
        this.financialControllers = new Controller_1.FinancialControllers();
        // this.setMiddlewares();
        this.setupRoutes();
    }
    static getInstance() {
        if (!Financials_Router_Class.instance) {
            Financials_Router_Class.instance = new Financials_Router_Class();
        }
        return Financials_Router_Class.instance;
    }
    // private setMiddlewares(): void {
    //   this.router.use(AuthMiddleware.authenticate);
    // }
    setupRoutes() {
        this.router.get("/filereport", this.financialControllers.getAllBulkUploadReportData);
        this.router.delete("/filereport", authMiddleware_1.AuthMiddleware.authenticate, this.financialControllers.deleteAllRecords);
        this.router.get("/errorreport", this.financialControllers.getAllErrorReportData);
        this.router.post("/upload", authMiddleware_1.AuthMiddleware.authenticate, multerHelpers_1.upload.single("csvfile"), this.financialControllers.uploadFile);
        this.router.get("/", this.financialControllers.getAllData);
        this.router.get("/search", this.financialControllers.searchData);
        this.router.post("/", authMiddleware_1.AuthMiddleware.authenticate, this.financialControllers.createData);
        this.router.patch("/:id", authMiddleware_1.AuthMiddleware.authenticate, this.financialControllers.updateData);
        this.router.delete("/:id", authMiddleware_1.AuthMiddleware.authenticate, this.financialControllers.deleteData);
    }
}
const FinancialsRouter = Financials_Router_Class.getInstance().router;
exports.FinancialsRouter = FinancialsRouter;
