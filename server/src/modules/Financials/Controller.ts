import { Request, Response, response } from "express";

import { logger } from "../../lib/helpers/logger";
import { formatFileSize } from "../../lib/helpers/formatFileSize";
import { FinancialServices } from "./Services";
import { IFinance } from "./entities";

class FinancialControllers {
  private readonly financialServices: FinancialServices;
  // private readonly

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

  getAllBulkUploadReportData = async ( req: Request, res: Response,): Promise<void> => {
    const {
      page = 1,
      size = 10,
      sortBy = "createdAt",
      sortDirection = "desc",
    } = req.query;

    try {
      const { data, documentCount } =
        await this.financialServices.getAllBulkUploadReport( Number(page), Number(size), sortBy as string, sortDirection as string,);
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

  getAllErrorReportData = async ( req: Request, res: Response,): Promise<void> => {
    const { page = 1, size = 10, logId } = req.query;
    // console.log("inside getAllErrorReportData logId", logId);

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
      // console.log("req.body inside createData: ", req.body);
      const createdData = await this.financialServices.CreateFinancials( req.body,);
      if (Array.isArray(createdData)) {
        res.status(400).json({ message: createdData });
        return;
      }
      res.status(200).json(createdData);
    } catch (err: any) {
      logger.error("error in createData Api", err);
      res.status(500).json({ message: err.message });
    }
  };

  updateData = async (req: Request, res: Response): Promise<void> => {
    try {
      // console.log("req.body inside createData: ", req.body);
      // console.log(" req.params inside createData: ", req.params);
      const updatedData = await this.financialServices.UpdateFinancials(
        req.params.id,
        req.body,
      );
      if (Array.isArray(updatedData)) {
        res.status(400).json({ message: updatedData });
        return;
      }
      // console.log("updatedData", updatedData);
      res.status(200).json(updatedData);
    } catch (err: any) {
      logger.error("error in updateData Api", err);
      res.status(500).json({ message: err.message });
    }
  };

  deleteData = async (req: Request, res: Response): Promise<void> => {
    // console.log("id in params: ", req.params.id);
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

  deleteAllRecords = async (req: Request, res: Response): Promise<void> => {
    try {
      // console.log("req.body inside deleAllRecordes", req.body);
      // console.log("req.headers inside deleAllRecordes", req.headers);

      const report = await this.financialServices.findBulkUploadReportByUploadId( req.body.uploadId,);
      if (report) {
        if (report.userEmail === req.headers["user-agent"]) {
          const response = await this.financialServices.deleteBulk(req.body.uploadId);
          res.status(200).json(response);
          return;
        } else {
          res.status(400).json({ message: "user not Authorized to delete this file Report Data" });
          return;
        }
      }
      res.status(404).json({ message: "No report by the request UploadId data found" });
      return;
    } catch (err: any) {
      logger.error("error in deleteAllRecords Api", err);
      res.status(500).json({ message: err.message });
    }
  };

  uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const fileName: string | undefined = req.file?.originalname;
      const filePath: string | undefined = req.file?.path;
      const fileSize: number | undefined = req.file?.size;
      const formattedFileSize = formatFileSize(fileSize as number);
      const userEmail = req.body.userEmail;
      if (!filePath) {
        res.status(400).json({ message: "no file uploaded" });
        return;
      }
      const response = await this.financialServices.uploadCsvFile( fileName as string, filePath, formattedFileSize, userEmail);
      logger.info("response in controller", response);
      res.status(201).json({ message: response });
      return;
    } catch (error: any) {
      logger.error("error while uploading the file", error);
      res.status(500).json({ message: error.message });
    }
  };
}

export { FinancialControllers };
