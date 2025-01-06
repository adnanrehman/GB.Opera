
export interface UploadBatchDto {
  batchID: number;
  countryID: number;
  reportType?: string;
  source?: string;
  aSource?: string;
  statusID: number;
  asofDate?: string;
  remarks?: string;
  aRemarks?: string;
  uploadDate?: string;
  esdFactID: number;
  hijriDate?: string;
  fileName?: string;
  note?: string;
  aNote?: string;
  gbEntryUserId?: string;
  gbReEntryUserId?: string;
}
