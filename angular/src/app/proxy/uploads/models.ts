import type { CompanyDto } from '../companies/models';

export interface FinancialEntryTypes {
  financialEntryTypeID: number;
  financialEntryType?: string;
}

export interface Periods {
  periodTypeID: number;
  period?: string;
}

export interface QPeriodTypes {
  qPeriodID: number;
  qPeriod?: string;
}

export interface Upload {
  financialsID: number;
  companyID: number;
  asOfDate?: string;
  ticker?: string;
  year?: string;
  period?: string;
  isYearly?: string;
  entryUser?: string;
  reEntryUser?: string;
  qPeriodID?: string;
}

export interface UploadFinancialListDto {
  ticker?: string;
  asOfDate?: string;
  year?: number;
  period?: string;
  isYearly: boolean;
  entryUser?: string;
  reEntryUser?: string;
  qPeriodID: number;
}

export interface UploadFinancials {
  financialsID: number;
  companyID: number;
  asOfDate?: string;
  periodTypeID: number;
  financialEntryTypeID: number;
  remarks?: string;
  aRemarks?: string;
  year?: number;
  qPeriodId: number;
  isYearly: boolean;
  periodNote?: string;
  aPeriodNote?: string;
  userID?: string;
  entryUser?: string;
  reEntryUser?: string;
}

export interface UploadwithHasDtos {
  uploads: Upload[];
  financialEntryType: FinancialEntryTypes[];
  period: Periods[];
  qPeriodType: QPeriodTypes[];
  companies: CompanyDto[];
}

export interface Users {
  userID?: string;
  userName?: string;
  userType?: string;
}
