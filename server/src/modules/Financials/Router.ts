import express, { Request, Response, Router } from "express";

import { upload } from "../../lib/helpers/multerHelpers";
import { FinancialControllers } from "./Controller";

class Financials_Router_Class {
  private static instance: Financials_Router_Class;
  router: Router;
  private readonly financialControllers: FinancialControllers;

  private constructor() {
    this.router = express.Router();
    this.financialControllers = new FinancialControllers();
    this.setupRoutes();
  }

  static getInstance(): Financials_Router_Class {
    if (!Financials_Router_Class.instance) {
      Financials_Router_Class.instance = new Financials_Router_Class();
    }
    return Financials_Router_Class.instance;
  }

  private setupRoutes(): void {
    this.router.get("/", this.financialControllers.getAllData);
    this.router.get("/search", this.financialControllers.searchData);
    this.router.post("/", this.financialControllers.createData);
    this.router.patch("/:id", this.financialControllers.updateData);
    this.router.delete("/:id", this.financialControllers.deleteData);

    this.router.get(
      "/filereport",
      this.financialControllers.getAllBulkUploadReportData,
    );
    this.router.get(
      "/errorreport",
      this.financialControllers.getAllErrorReportData,
    );

    this.router.post(
      "/upload",
      upload.single("csvfile"),
      this.financialControllers.uploadFile,
    );
  }
}

const FinancialsRouter = Financials_Router_Class.getInstance().router;

export { FinancialsRouter };
