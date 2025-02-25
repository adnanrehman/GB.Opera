
export interface ReviewReportDto {
  ticker?: string;
  asOfDate?: string;
  account?: string;
  value?: number;
  year: number;
  qPeriod?: string;
  customOrder: number;
}

export interface ReviewReportOutputDto {
  reviewers: ReviewerDto[];
  reviewersNew: ReviewerDto[];
  incomeStatement: ReviewReportDto[];
  balanceSheet: ReviewReportDto[];
  cashFlow: ReviewReportDto[];
}

export interface ReviewerDto {
  reviewerID: number;
}
