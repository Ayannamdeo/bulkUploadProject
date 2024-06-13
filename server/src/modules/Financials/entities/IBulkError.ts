interface IBulkError {
  uploadId: string;
  rowNumber: number;
  errorDetails: string[];
}

export { IBulkError };
