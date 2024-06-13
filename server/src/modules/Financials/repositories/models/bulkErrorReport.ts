import { IBulkError } from "../../entities";
import mongoose from "mongoose";

const bulkErrorSchema: mongoose.Schema<IBulkError> =
  new mongoose.Schema<IBulkError>(
    {
      uploadId: { type: String, required: true },
      rowNumber: { type: Number, required: true },
      errorDetails: { type: [String], required: true },
    },
    { timestamps: true },
  );

const BULK_ERROR_REPORT: mongoose.Model<IBulkError> = mongoose.model(
  "bulkErrorReport",
  bulkErrorSchema,
);

export { BULK_ERROR_REPORT };
