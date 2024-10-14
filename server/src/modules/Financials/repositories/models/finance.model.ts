import { IFinance } from "../../entities";
import mongoose from "mongoose";

const financeSchema: mongoose.Schema<IFinance> = new mongoose.Schema<IFinance>(
  {
    uploadId: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, min: 18, max: 75, required: true },
    sex: { type: String, enum: ["male", "female"], required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    accountNumber: { type: String, length: 8, required: true },
    accountName: { type: String, required: true },
    amount: { type: String, required: true },
    currencyName: { type: String, enum: ["US Dollar", "Indian Rupee", "Yen", "Euro"], required: true },
    jobTitle: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    companyName: { type: String, required: true },
    transactionDescription: { type: String, required: true },
  },
  { timestamps: true },
);

financeSchema.index(
  {
    name: "text",
    amount: "text",
    city: "text",
  },
  {
    weights: {
      name: 5,
      city: 3,
      amount: 3,
    },
  },
);

financeSchema.index({ createdAt: -1 });
financeSchema.index({ currencyName: 1 });
financeSchema.index({ accountName: 1 });

const FINANCIAL_MODEL: mongoose.Model<IFinance> = mongoose.model<IFinance>(
  "financial",
  financeSchema,
);

export { FINANCIAL_MODEL };
