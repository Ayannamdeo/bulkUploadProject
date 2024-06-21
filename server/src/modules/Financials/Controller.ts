import { Request, Response } from "express";

import { logger } from "../../lib/helpers/logger";
import { FinancialServices } from "./Services";
import { IFinance } from "./entities";

class FinancialControllers {
  private readonly financialServices: FinancialServices;

  constructor() {
    this.financialServices = new FinancialServices();
  }

  getAllData = async (req: Request, res: Response): Promise<void> => {
    const {
      page = 1,
      size = 10,
      sortBy = "createdAt",
      sortDirection = "desc",
    } = req.query;
    console.log("size from getAll Data: ", size);

    try {
      const financeList = await this.financialServices.getAllFinancials(
        Number(page),
        Number(size),
        sortBy as string,
        sortDirection as string,
      );
      if (!financeList) {
        logger.warn("No financial data found");
        res.status(404).json({ message: "No financial data found" });
        return;
      }
      const totalDocuments = await this.financialServices.countAllFinancials();
      const totalPages = Math.ceil(totalDocuments / Number(size));
      res.status(200).json({
        financials: financeList,
        totalPages: totalPages,
      });
    } catch (error: any) {
      logger.error("Error while getting all financial data", error);
      res.status(500).json({ message: error.message });
    }
  };
  uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const fileName: string | undefined = req.file?.originalname;
      const filePath: string | undefined = req.file?.path;
      if (!filePath) {
        res.status(400).json({ message: "no file uploaded" });
        return;
      }
      await this.financialServices.uploadCsvFile(fileName as string, filePath);
      res.status(201).json({
        message: "CSV data uploaded and saved to MongoDB successfully",
      });
      return;
    } catch (error: any) {
      logger.error("error while uploading the file", error);
      res.status(500).json({ message: error.message });
    }
  };
}

export { FinancialControllers };
