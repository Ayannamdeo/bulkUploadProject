import { PipelineStage } from "mongoose";
import { IFinance } from "../entities";
import { IBulkError } from "../entities";
import { IBulkUpload } from "../entities";
import { FINANCIAL_MODEL } from "./models";
import { BULK_UPLOAD_REPORT } from "./models";
import { BULK_ERROR_REPORT } from "./models";

interface AggregationResult {
  searchResults: IFinance[];
  countResults: { totalDocuments: number }[];
}

interface IBulkReportResult {
  data: IBulkUpload[] | null;
  documentCount: number;
}

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

  async create(data: IFinance): Promise<IFinance> {
    return await FINANCIAL_MODEL.create(data);
  }
  async update(id: string, data: IFinance): Promise<IFinance | null> {
    return await FINANCIAL_MODEL.findByIdAndUpdate(id, data, { new: true });
  }

  public delete = async (id: string): Promise<any> => {
    return await FINANCIAL_MODEL.findByIdAndDelete(id);
  };

  public countAll = async (): Promise<number> => {
    return await FINANCIAL_MODEL.countDocuments();
  };

  public search = async (
    pipeline: PipelineStage[],
  ): Promise<AggregationResult[]> => {
    return await FINANCIAL_MODEL.aggregate(pipeline).exec();
  };

  public uploadCsv = async (data: IFinance[]): Promise<any> => {
    return await FINANCIAL_MODEL.insertMany(data, { ordered: false });
  };
}

class BulkUploadReportRepository {
  public uploadBulkUploadReport = async (data: IBulkUpload): Promise<any> => {
    return await BULK_UPLOAD_REPORT.create(data);
  };

  public getAllUploadReport = async (
    page: number = 1,
    limit: number = 10,
    sortBy: string = "createdAt",
    sortDirection: string = "desc",
  ): Promise<IBulkReportResult> => {
    const offset = (page - 1) * limit;
    const documentCount = await BULK_UPLOAD_REPORT.countDocuments();
    const data = await BULK_UPLOAD_REPORT.find()
      .skip(offset)
      .limit(limit)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 });
    return { data, documentCount };
  };
}

class BulkErrorRepository {
  public uploadErrors = async (data: IBulkError[]): Promise<any> => {
    return await BULK_ERROR_REPORT.insertMany(data, { ordered: false });
  };

  public getAllErrorReport = async (
    page: number = 1,
    limit: number = 10,
    logId: string,
  ): Promise<{ data: IBulkError[] | null; documentCount: number }> => {
    const offset = (page - 1) * limit;
    const documentCount = await BULK_ERROR_REPORT.countDocuments();
    const data = await BULK_ERROR_REPORT.find({ uploadId: logId })
      .skip(offset)
      .limit(limit);
    return { data, documentCount };
  };
}

export { FinancialRepository, BulkUploadReportRepository, BulkErrorRepository };
