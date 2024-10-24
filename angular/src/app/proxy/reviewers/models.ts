
export interface ReviewReportDto {
  ticker?: string;
  asOfDate?: string;
  account?: string;
  value?: number;
  year?: string;
  qPeriod?: string;
}

export interface ReviewReportOutputDto {
  reviewers: ReviewerDto[];
  reviewersNew: ReviewerDto[];
  incomeStatement: ReviewReportDto[];
  balanceSheet: ReviewReportDto[];
}

export interface ReviewerDto {
  reviewerID: number;
}
