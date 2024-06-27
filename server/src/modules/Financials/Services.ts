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

  findBulkUploadReportByUploadId = async (
    id: string,
  ): Promise<IBulkUpload | null> => {
    return await this.bulkUploadReportRepository.getBulkUploadReportByUploadId(
      id,
    );
  };

  CreateFinancials = async (data: any): Promise<IFinance | string[]> => {
    const newUploadId = new Date().getTime().toString();
    const dataWithUploadId = { uploadId: newUploadId, ...data };
    const { error } = CsvDataValidation.FinancialDetailSchema.validate(
      dataWithUploadId,
      { abortEarly: false },
    );
    if (error) {
      const errorDetails = error?.details.map((err) => `${err.message}\n`);
      return errorDetails;
    } else {
      return await this.financialRepository.create(dataWithUploadId);
    }
  };

  UpdateFinancials = async (
    id: string,
    data: any,
  ): Promise<IFinance | string[] | null> => {
    const keysToFilter = ["_id", "__v", "createdAt", "updatedAt"];
    const filteredData = Object.keys(data).reduce((acc: any, key) => {
      if (!keysToFilter.includes(key)) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    const { error } = CsvDataValidation.FinancialDetailSchema.validate(
      filteredData,
      {
        abortEarly: false,
      },
    );
    if (error) {
      const errorDetails = error?.details.map((err) => `${err.message}\n`);
      return errorDetails;
    } else {
      return await this.financialRepository.update(id, filteredData);
    }
  };

  deleteFinancials = async (id: string): Promise<any> => {
    return await this.financialRepository.delete(id);
  };

  deleteBulk = async (id: string): Promise<any> => {
    const r1 = await this.bulkErrorRepository.deleteAllErrorReports(id);
    const r2 = await this.financialRepository.deleteManyRecords(id);
    return { r1, r2 };
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

  private static transformEntry = (
    csvRowData: any,
    uploadId: string,
  ): IFinance => {
    const transformedRow = {
      uploadId: uploadId,
      name: csvRowData.name,
      age: parseInt(csvRowData.age, 10), // Convert age to a number
      sex: csvRowData.sex,
      country: csvRowData.country,
      city: csvRowData.city,
      accountNumber: csvRowData.accountNumber,
      accountName: csvRowData.accountName,
      amount: csvRowData.amount,
      currencyName: csvRowData.currencyName,
      jobTitle: csvRowData.jobTitle,
      phoneNumber: csvRowData.phoneNumber,
      companyName: csvRowData.companyName,
      transactionDescription: csvRowData.transactionDescription,
    };
    return transformedRow;
  };

  private static validateEntries = async (
    entries: IFinance[],
    uploadId: string,
  ): Promise<{ passed: IFinance[]; failed: IBulkError[] }> => {
    const passed: IFinance[] = [];
    const failed: IBulkError[] = [];

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
    userEmail: string,
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
          reject(error);
        })
        .on("data", async (row) => {
          const transformedData = FinancialServices.transformEntry(
            row,
            uploadId,
          );
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
            userEmail: userEmail,
            fileSize: fileSize,
            startTime: startTime,
            endTime: endTime,
            fileName: fileName,
            totalEntries: totalEntries,
            successfulEntries: successfulEntries,
            failedEntries: failedEntries,
          });

          logger.info(`Parsed ${rowCount} rows`);
          resolve("CSV data uploaded and saved to MongoDB successfully");
        });
    });
  };
}

export { FinancialServices };
