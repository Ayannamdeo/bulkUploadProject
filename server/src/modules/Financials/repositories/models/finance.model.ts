import { string } from "joi";
import { IFinance } from "../../entities";
import mongoose from "mongoose";

const financeSchema: mongoose.Schema<IFinance> = new mongoose.Schema<IFinance>(
  {
    name: { type: String, required: true },
    age: { type: Number, min: 18, max: 75, required: true },
    sex: { type: String, enum: ["male", "female"], required: true },
    city: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    accountName: { type: String, required: true },
    amount: { type: String, required: true },
    currencyName: {
      type: String,
      enum: ["US Dollar", "Indian Rupee", "Yen", "Euro"],
      required: true,
    },
  },
  { timestamps: true },
);

const FINANCIAL_MODEL: mongoose.Model<IFinance> = mongoose.model<IFinance>(
  "financial",
  financeSchema,
);

export { FINANCIAL_MODEL };
