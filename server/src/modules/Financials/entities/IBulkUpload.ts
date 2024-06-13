interface IBulkUpload {
  uploadId: string;
  startTime: Date;
  endTime: Date;
  fileName: string;
  totalEntries: number;
  successfulEntries: number;
  failedEntries: number;
}

export { IBulkUpload };
