import { IBulkUpload } from "../../entities";
import mongoose from "mongoose";

const bulkUploadSchema: mongoose.Schema<IBulkUpload> =
  new mongoose.Schema<IBulkUpload>(
    {
      userEmail: { type: String, required: true },
      fileSize: { type: String, required: true },
      uploadId: { type: String, required: true, unique: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      fileName: { type: String, required: true },
      totalEntries: { type: Number, required: true },
      successfulEntries: { type: Number, required: true },
      failedEntries: { type: Number, required: true },
    },
    { timestamps: true },
  );

const BULK_UPLOAD_REPORT: mongoose.Model<IBulkUpload> = mongoose.model(
  "bulkuploadreport",
  bulkUploadSchema,
);

export { BULK_UPLOAD_REPORT };
