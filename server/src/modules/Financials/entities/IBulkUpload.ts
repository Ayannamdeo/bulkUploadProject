interface IBulkUpload {
  userName: string;
  fileSize: string;
  uploadId: string;
  startTime: string;
  endTime: string;
  fileName: string;
  totalEntries: number;
  successfulEntries: number;
  failedEntries: number;
}

export { IBulkUpload };
