import { parse } from "fast-csv";
import fs from "fs";

import { IFinance, IBulkError, IBulkUpload } from "./entities";
import { FinancialRepository } from "./repositories/Repository";
import { CsvDataValidation } from "../../lib/middlewares/csvDataValidation";
import { logger } from "../../lib/helpers/logger";

class FinancialServices {
  private readonly financialRepository: FinancialRepository;

  constructor() {
    this.financialRepository = new FinancialRepository();
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

  countAllFinancials = async (): Promise<number> => {
    return await this.financialRepository.countAll();
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
        await this.financialRepository.uploadErrors(failed);
      }

      return { passedCount: passed.length, failedCount: failed.length };
    } catch (error: any) {
      logger.error("error while processing batch: ", error);
      return { passedCount: 0, failedCount: 0 };
    }
  };

  uploadCsvFile = async (fileName: string, filePath: string): Promise<any> => {
    const batchSize = 10000;
    let currentBatch: IFinance[] = [];

    const uploadId = new Date().getTime().toString();
    const startTime: string = new Date().toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    let successfulEntries = 0;
    let failedEntries = 0;
    const csvStream = fs
      .createReadStream(filePath)
      .pipe(parse({ headers: true }))
      .on("error", (error) => logger.error(" .on(error): ", error))
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
        await this.financialRepository.uploadBulkUploadReport({
          uploadId: uploadId,
          startTime: startTime,
          endTime: endTime,
          fileName: fileName,
          totalEntries: totalEntries,
          successfulEntries: successfulEntries,
          failedEntries: failedEntries,
        });

        logger.info(`Parsed ${rowCount} rows`);
      });
  };
}

export { FinancialServices };
