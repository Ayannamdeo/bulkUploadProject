import { parse } from "fast-csv";
import fs from "fs";

import { IFinance, IBulkError, IBulkUpload } from "./entities";
import { FinancialRepository } from "./repositories/Repository";
import { CsvDataValidation } from "../../lib/middlewares/csvDataValidation";
import { abort } from "process";

class FinancialServices {
  private readonly financialRepository: FinancialRepository;

  constructor() {
    this.financialRepository = new FinancialRepository();
  }

  getAllFinancials = async (): Promise<IFinance[] | null> => {
    return await this.financialRepository.getAll();
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
  ): Promise<{ passed: IFinance[]; failed: IBulkError[] }> => {
    const passed: IFinance[] = [];
    const failed: IBulkError[] = [];
    const uploadId = new Date().getTime().toString();

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

  private processInChunks = async (data: IFinance[]): Promise<void> => {
    const chunkSize = 100000;
    const totalSize = data.length;

    for (let i = 0; i < totalSize; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      await this.financialRepository.uploadCsv(chunk);
    }
  };

  uploadCsvFile = async (fileName: string, filePath: string): Promise<any> => {
    const dataToInsert: any[] = [];
    const startTime: string = new Date().toLocaleString();

    fs.createReadStream(filePath)
      .pipe(parse({ headers: true }))
      .on("error", (error) => console.log(error))
      .on("data", (row) => {
        const transformedData = FinancialServices.transformEntry(row);
        dataToInsert.push(transformedData);
        console.log("inside createStream parsing the rows: ", transformedData);
      })
      .on("end", async (rowCount: number) => {
        const { passed, failed } =
          await FinancialServices.validateEntries(dataToInsert);
        const reponse: any = await this.processInChunks(passed);

        console.log(`Parsed ${rowCount} rows`);
      });
  };
}

export { FinancialServices };
