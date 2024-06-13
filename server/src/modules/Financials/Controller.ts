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
    try {
      const financeList = await this.financialServices.getAllFinancials();
      if (!financeList) {
        logger.warn("NO financial Data found");
        res.status(404).json({ message: "NO financial Data found" });
        return;
      }
      res.status(200).json(financeList);
    } catch (error: any) {
      logger.error("error while getting all financial Data", error);
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
      res
        .status(201)
        .json({
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
