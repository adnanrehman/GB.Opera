
export interface CompaniesQNetProfitDto {
  compQNProfitID: number;
  companyID: number;
  year: number;
  qPeriodID: number;
  asOfDate?: string;
  periodTypeID: number;
  isYearly: boolean;
  netProfit: number;
  previousNP?: number;
  netProfitChange?: number;
  eps?: number;
  pe?: number;
  fiveYearGrowth?: number;
  announcementDate?: string;
  remarks?: string;
  aRemarks?: string;
  ownersEquity?: number;
  previousOwnersEquity?: number;
  ownersEquityChange?: number;
  totalAssets?: number;
  previousTotalAssets?: number;
  totalAssetsChange?: number;
  revenues?: number;
  previousRevenues?: number;
  revenuesChange?: number;
  ticker?: string;
  qPeriod?: string;
  period?: string;
}

export interface CompaniesQNetProfitListDto {
  companiesQNetProfits: CompaniesQNetProfitDto[];
  currencyOutstandings: CurrencyOutstandingDto[];
}

export interface CurrencyOutstandingDto {
  currency?: string;
  aDescription?: string;
  outstandingShares?: number;
}
