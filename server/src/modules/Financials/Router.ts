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
    this.router.post(
      "/upload",
      upload.single("csvfile"),
      this.financialControllers.uploadFile,
    );
  }
}

const FinancialsRouter = Financials_Router_Class.getInstance().router;

export { FinancialsRouter };
