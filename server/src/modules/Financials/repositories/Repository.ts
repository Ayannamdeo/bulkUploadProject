import { IFinance } from "../entities";
import { FINANCIAL_MODEL } from "./models";
// import { BULK_UPLOAD_REPORT } from "./models";

class FinancialRepository {
  public getAll = async (): Promise<IFinance[] | null> => {
    return await FINANCIAL_MODEL.find().limit(10);
  };

  public uploadCsv = async (data: any): Promise<any> => {
    return await FINANCIAL_MODEL.insertMany(data, { ordered: false });
  };
}

export { FinancialRepository };
