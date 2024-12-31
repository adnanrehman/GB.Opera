
export interface BatchStatusUpdateDto {
  batchID: number;
  statusID: number;
  remarks?: string;
  aRemarks?: string;
}

export interface BatchesESDFactsMappingDto {
  batchDetailID: number;
  batchID: number;
  esdFactID: number;
  parentID: number;
  esdFact?: string;
  isTitle: boolean;
  checkMe: boolean;
  value?: number;
  originalValue?: number;
}

export interface BatchesReEntryDto {
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
