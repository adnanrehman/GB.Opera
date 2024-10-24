
export interface CashDivDateDto {
  cashDivID: number;
  dateSelection?: string;
  cashDivDate?: string;
}

export interface CreateHistoricalCashDividendDto {
  historicalCashDividend: HistoricalCashDividendDto;
  cashDivDates: CashDivDateDto[];
}

export interface EPeriodDto {
  extraPeriodID?: string;
  ePeriod?: string;
}

export interface HistoricalCashDividendDto {
  cashDivID: number;
  companyID: number;
  extraPeriodID?: string;
  otherPeriod?: string;
  aOtherPeriod?: string;
  year?: number;
  remarks?: string;
  aRemarks?: string;
  totalAmount?: number;
  perShareAmount?: number;
  treasuryShares?: number;
  outstandingShares?: number;
  sourceID: number;
  cashDivDates: CashDivDateDto[];
  asOf: boolean;
  announcedOn: boolean;
  approvedOn: boolean;
  dueOn: boolean;
  xDividendDate: boolean;
  asOfDateTime?: string;
  announcedOnDateTime?: string;
  approvedOnDateTime?: string;
  dueOnDateTime?: string;
  xDividendDateTime?: string;
}

export interface HistoricalCashDividendListDto {
  historicalCashDividends: HistoricalCashDividendDto[];
  cashDivDates: CashDivDateDto[];
  ePeriods: EPeriodDto[];
  sources: SourceDto[];
}

export interface SourceDto {
  sourceID: number;
  source?: string;
}
