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

export interface UploadFinancials {
  financialsId: number;
  companyId: number;
  asOfDate?: string;
  periodTypeId: number;
  financialEntryTypeId: number;
  userId: number;
  remarks?: string;
  aRemarks?: string;
  year: number;
  qPeriodId: number;
  isYearly: boolean;
  periodNote?: string;
  aPeriodNote?: string;
  ticker?: string;
  period?: string;
  entryUser?: string;
  reEntryUser?: string;
  qPeriodID: number;
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
