import { Request, Response } from "express";

import { logger } from "../../lib/helpers/logger";
import { formatFileSize } from "../../lib/helpers/formatFileSize";
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

  getAllBulkUploadReportData = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const {
      page = 1,
      size = 10,
      sortBy = "createdAt",
      sortDirection = "desc",
    } = req.query;

    try {
      const { data, documentCount } =
        await this.financialServices.getAllBulkUploadReport(
          Number(page),
          Number(size),
          sortBy as string,
          sortDirection as string,
        );
      if (!data) {
        logger.warn("No BulkUploadReport data found");
        res.status(404).json({ message: "No BulkUploadReport data found" });
        return;
      }
      const totalPages = Math.ceil(documentCount / Number(size));
      res.status(200).json({
        fileReport: data,
        totalPages: totalPages,
      });
    } catch (error: any) {
      logger.error("Error while getting all BulkUploadReport data", error);
      res.status(500).json({ message: error.message });
    }
  };

  getAllErrorReportData = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { page = 1, size = 10, logId } = req.query;
    console.log("inside getAllErrorReportData logId", logId);

    try {
      const { data, documentCount } =
        await this.financialServices.getAllErrorReport(
          Number(page),
          Number(size),
          logId as string,
        );
      if (!data) {
        logger.warn("No ErrorReport data found");
        res.status(404).json({ message: "No ErrorReport data found" });
        return;
      }
      const totalPages = Math.ceil(documentCount / Number(size));
      res.status(200).json({ errorReport: data, totalPages: totalPages });
    } catch (error: any) {
      logger.error("Error while getting all ErrorReport data", error);
      res.status(500).json({ message: error.message });
    }
  };

  searchData = async (req: Request, res: Response): Promise<void> => {
    console.log("inside search dAta");

    try {
      const { searchResults, totalDocuments } =
        await this.financialServices.searchFinancials(req.query);
      const totalPages = Math.ceil(totalDocuments / Number(req.query.size));
      // res.status(200).send("CHECKPOINT");
      res.status(200).json({
        financials: searchResults,
        totalPages: totalPages,
      });
    } catch (error: any) {
      logger.error("Error while getting all financial data", error);
      res.status(500).json({ message: error.message });
    }
  };

  createData = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("req.body inside createData: ", req.body);
      const createdData = await this.financialServices.CreateFinancials(
        req.body,
      );
      res.status(200).json(createdData);
    } catch (err: any) {
      logger.error("error in createData Api", err);
      res.status(500).json({ message: err.message });
    }
  };

  updateData = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("req.body inside createData: ", req.body);
      console.log(" req.params inside createData: ", req.params);
      const updatedData = await this.financialServices.UpdateFinancials(
        req.params.id,
        req.body,
      );
      res.status(200).json(updatedData);
    } catch (err: any) {
      logger.error("error in updateData Api", err);
      res.status(500).json({ message: err.message });
    }
  };

  deleteData = async (req: Request, res: Response): Promise<void> => {
    console.log("id in params: ", req.params.id);
    try {
      const deletedContent = await this.financialServices.deleteFinancials(
        req.params.id,
      );
      res.status(200).json(deletedContent);
    } catch (err: any) {
      logger.error("error in deleteData Api", err);
      res.status(500).json({ message: err.message });
    }
  };

  uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const fileName: string | undefined = req.file?.originalname;
      const filePath: string | undefined = req.file?.path;
      const fileSize: number | undefined = req.file?.size;
      const formattedFileSize = formatFileSize(fileSize as number);
      const userName = req.body.userName;
      console.log("filesize", formattedFileSize);
      console.log("userName", userName);
      console.log("req.body", req.body);
      if (!filePath) {
        res.status(400).json({ message: "no file uploaded" });
        return;
      }
      const response = await this.financialServices.uploadCsvFile(
        fileName as string,
        filePath,
        formattedFileSize,
        userName,
      );
      console.log("response in controller", response);
      res.status(201).json({ message: response });
      return;
    } catch (error: any) {
      logger.error("error while uploading the file", error);
      res.status(500).json({ message: error.message });
    }
  };
}

export { FinancialControllers };
