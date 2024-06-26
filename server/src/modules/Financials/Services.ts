import { parse } from "fast-csv";
import fs from "fs";

import { IFinance, IBulkError, IBulkUpload } from "./entities";
import {
  FinancialRepository,
  BulkErrorRepository,
  BulkUploadReportRepository,
} from "./repositories/Repository";
import { CsvDataValidation } from "../../lib/middlewares/csvDataValidation";
import { logger } from "../../lib/helpers/logger";
import { buildPipeline } from "../../lib/helpers/buildPipeline";

interface SearchFinancialsResult {
  searchResults: IFinance[];
  totalDocuments: number;
}

class FinancialServices {
  private readonly financialRepository: FinancialRepository;
  private readonly bulkUploadReportRepository: BulkUploadReportRepository;
  private readonly bulkErrorRepository: BulkErrorRepository;

  constructor() {
    this.financialRepository = new FinancialRepository();
    this.bulkUploadReportRepository = new BulkUploadReportRepository();
    this.bulkErrorRepository = new BulkErrorRepository();
  }

  getAllFinancials = async (
    page: number = 1,
    limit: number = 10,
    sortBy: string = "createdAt",
    sortDirection: string = "desc",
  ): Promise<IFinance[] | null> => {
    return await this.financialRepository.getAll(
      page,
      limit,
      sortBy,
      sortDirection,
    );
  };

  CreateFinancials = async (data: IFinance): Promise<IFinance> => {
    return await this.financialRepository.create(data);
  };

  UpdateFinancials = async (
    id: string,
    data: IFinance,
  ): Promise<IFinance | null> => {
    return await this.financialRepository.update(id, data);
  };

  deleteFinancials = async (id: string): Promise<any> => {
    return await this.financialRepository.delete(id);
  };

  countAllFinancials = async (): Promise<number> => {
    return await this.financialRepository.countAll();
  };

  searchFinancials = async (query: any): Promise<SearchFinancialsResult> => {
    console.log("query inside searchFiancials: ", query);
    const pipeline = buildPipeline(query);
    console.log("searchfinancials pipeline ", pipeline);
    const [response] = await this.financialRepository.search(pipeline);
    console.log("searchfinancials response after await ", response);

    // Extract search results and count from the response
    const searchResults = response.searchResults || [];
    const totalDocuments =
      response.countResults.length > 0
        ? response.countResults[0].totalDocuments
        : 0;

    return { searchResults, totalDocuments };
  };

  getAllBulkUploadReport = async (
    page: number = 1,
    limit: number = 10,
    sortBy: string = "createdAt",
    sortDirection: string = "desc",
  ): Promise<{ data: IBulkUpload[] | null; documentCount: number }> => {
    return await this.bulkUploadReportRepository.getAllUploadReport(
      page,
      limit,
      sortBy,
      sortDirection,
    );
  };

  getAllErrorReport = async (
    page: number = 1,
    limit: number = 10,
    logId: string,
  ): Promise<{ data: IBulkError[] | null; documentCount: number }> => {
    return await this.bulkErrorRepository.getAllErrorReport(page, limit, logId);
  };

  private static transformEntry = (csvRowData: any): IFinance => {
    const transformedRow = {
      name: csvRowData.name,
      age: parseInt(csvRowData.age, 10), // Convert age to a number
      sex: csvRowData.sex,
      city: csvRowData.city,
      accountNumber: csvRowData.accountNumber, // Keep accountNumber as a string it's an identifier
      accountName: csvRowData.accountName,
      amount: csvRowData.amount,
      currencyName: csvRowData.currencyName,
    };
    return transformedRow;
  };

  private static validateEntries = async (
    entries: IFinance[],
    uploadId: string,
  ): Promise<{ passed: IFinance[]; failed: IBulkError[] }> => {
    const passed: IFinance[] = [];
    const failed: IBulkError[] = [];
    // const uploadId = new Date().getTime().toString();

    entries.forEach((entry: any, index: number) => {
      const { error } = CsvDataValidation.FinancialDetailSchema.validate(
        entry,
        { abortEarly: false },
      );
      if (error) {
        failed.push({
          uploadId,
          rowNumber: index + 1,
          errorDetails: error?.details.map((err) => `${err.message}\n`),
        });
      } else {
        passed.push(entry);
      }
    });

    return { passed, failed };
  };

  private processInBatch = async (
    batch: IFinance[],
    uploadId: string,
  ): Promise<{ passedCount: number; failedCount: number }> => {
    try {
      const { passed, failed } = await FinancialServices.validateEntries(
        batch,
        uploadId,
      );
      await this.financialRepository.uploadCsv(passed);
      if (failed.length > 0) {
        await this.bulkErrorRepository.uploadErrors(failed);
      }

      return { passedCount: passed.length, failedCount: failed.length };
    } catch (error: any) {
      logger.error("error while processing batch: ", error);
      return { passedCount: 0, failedCount: 0 };
    }
  };

  uploadCsvFile = async (
    fileName: string,
    filePath: string,
    fileSize: string,
    userName: string,
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const batchSize = 10000;
      let currentBatch: IFinance[] = [];
      let successfulEntries = 0;
      let failedEntries = 0;

      const uploadId = new Date().getTime().toString();
      const startTime: string = new Date().toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });

      const csvStream = fs
        .createReadStream(filePath)
        .pipe(parse({ headers: true }))
        .on("error", (error) => {
          logger.error(".on(error): ", error);
          reject(error); // Reject the Promise on error
        })
        .on("data", async (row) => {
          const transformedData = FinancialServices.transformEntry(row);
          currentBatch.push(transformedData);

          if (currentBatch.length >= batchSize) {
            csvStream.pause();
            const { passedCount, failedCount } = await this.processInBatch(
              currentBatch,
              uploadId,
            );
            successfulEntries += passedCount;
            failedEntries += failedCount;
            currentBatch = [];
            csvStream.resume();
          }
        })
        .on("end", async (rowCount: number) => {
          const totalEntries = rowCount;
          if (currentBatch.length > 0) {
            const { passedCount, failedCount } = await this.processInBatch(
              currentBatch,
              uploadId,
            );
            successfulEntries += passedCount;
            failedEntries += failedCount;
          }

          fs.unlinkSync(filePath);

          const endTime: string = new Date().toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          });

          await this.bulkUploadReportRepository.uploadBulkUploadReport({
            uploadId: uploadId,
            userName: userName,
            fileSize: fileSize,
            startTime: startTime,
            endTime: endTime,
            fileName: fileName,
            totalEntries: totalEntries,
            successfulEntries: successfulEntries,
            failedEntries: failedEntries,
          });

          logger.info(`Parsed ${rowCount} rows`);
          resolve("CSV data uploaded and saved to MongoDB successfully"); // Resolve the Promise with success message
        });
    });
  };
}

export { FinancialServices };
