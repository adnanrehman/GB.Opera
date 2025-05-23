
export interface AdminStatus {
  statusId: number;
  status?: string;
}

export interface BatchAdminDto {
  countries: CountriesAdmin[];
  entryusers: Entryusers[];
  adminStatus: AdminStatus[];
}

export interface CountriesAdmin {
  countryID: number;
  abbr?: string;
}

export interface Entryusers {
  userId?: string;
  userName?: string;
  userType?: string;
}

export interface SearchBatches {
  batchID: number;
  countryID: number;
  reportType?: string;
  source?: string;
  aSource?: string;
  statusID: number;
  asofDate?: string;
  entryUserID: number;
  reEntryUserID: number;
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
  batchText?: string;
  esdFact?: string;
   asofTimestamp?: number;
}
