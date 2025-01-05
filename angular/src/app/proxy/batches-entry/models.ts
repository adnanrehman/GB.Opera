
export interface BatchesEntries {
  batchDetailID: number;
  esdFactID: number;
  parentID: number;
  isTitle: boolean;
  value: number;
  batchID: number;
  remarks?: string;
  aRemarks?: string;
}

export interface BatchesEntryDto {
  batchID: number;
  countryID: number;
  reportType?: string;
  source?: string;
  aSource?: string;
  statusID: number;
  asofDate?: string;
  gbEntryUserId?: string;
  gbReEntryUserId?: string;
  remarks?: string;
  aRemarks?: string;
  uploadDate?: string;
  hijriDate?: string;
  fileName?: string;
  esdFactID?: number;
  abbr?: string;
  batchText?: string;
}

export interface ESDFactsMappings {
  batchDetailID: number;
  esdFactID: number;
  parentID: number;
  esdFact?: string;
  isTitle: boolean;
  value: number;
}
