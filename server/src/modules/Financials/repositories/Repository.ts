import { IFinance } from "../entities";
import { IBulkError } from "../entities";
import { IBulkUpload } from "../entities";
import { FINANCIAL_MODEL } from "./models";
import { BULK_UPLOAD_REPORT } from "./models";
import { BULK_ERROR_REPORT } from "./models";

class FinancialRepository {
  public getAll = async (
    page: number = 1,
    limit: number = 10,
    sortBy: string = "createdAt",
    sortDirection: string = "desc",
  ): Promise<IFinance[] | null> => {
    const offset = (page - 1) * limit;
    return await FINANCIAL_MODEL.find()
      .skip(offset)
      .limit(limit)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 });
  };

  public countAll = async (): Promise<number> => {
    return await FINANCIAL_MODEL.countDocuments();
  };

  public uploadCsv = async (data: IFinance[]): Promise<any> => {
    return await FINANCIAL_MODEL.insertMany(data, { ordered: false });
  };

  public uploadErrors = async (data: IBulkError[]): Promise<any> => {
    return await BULK_ERROR_REPORT.insertMany(data, { ordered: false });
  };

  public uploadBulkUploadReport = async (data: IBulkUpload): Promise<any> => {
    return await BULK_UPLOAD_REPORT.create(data);
  };
}

export { FinancialRepository };
