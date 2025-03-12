
export interface AsOfDateDto {
  asOfDate?: string;
  financialsID: number;
  companyID: number;
  hasChanges: boolean;
}

export interface AsofDatesFinancialDto {
  financialsDetails: FinancialsDetailDto[];
  finEntryInReviews: FinEntryInReviewDto[];
}

export interface AsofDatesFinancialInputDto {
  financialsID: number;
  isNew: boolean;
  companyID: number;
}

export interface CompanyAccountsDto {
  financialsDetails: FinancialsDetailDto[];
  asOfDates: AsOfDateDto[];
  finValueMatches: FinValueMatchDto[];
  reentryMatches: ReentryMatchDto[];
}

export interface CompanyAccountsInputDto {
  financialsID: number;
  newReviewFinancialID: number;
  isNew: boolean;
  companyID: number;
}

export interface FinEntryInReviewDto {
  finEntryInReviewID: number;
  financialsID: number;
  financialDetailID: number;
  userID: number;
  reviewEntryDate?: string;
  isActive: boolean;
}

export interface FinValueMatchDto {
  finValueMatchID: number;
  newReviewFinancialID: number;
  financialDetailID: number;
  userID: number;
}

export interface FinancialsDetailDto {
  financialDetailId?: number;
  gbFactID: number;
  parentID: number;
  gbFact?: string;
  gbFactName?: string;
  value?: number;
  financialsID: number;
  isTitle: boolean;
  customOrder: number;
  checkMe: boolean;
}

export interface ReentryMatchDto {
  reentryMatchID: number;
  financialsID: number;
  financialDetailID: number;
  gbFactID: number;
  value: number;
  isMatched: boolean;
}

export interface StatusFinancialsDto {
  financialsID: number;
  asOfDate?: string;
  companyID: number;
  newReviewFinancialID: number;
  uploadedPath?: string;
  secondaryUploadedPath?: string;
  fileName?: string;
  remarks?: string;
  aRemarks?: string;
  uploadedBy?: string;
  uploadedDate?: string;
  company?: string;
  ticker?: string;
  financialEntryTypeID: number;
  country?: string;
}
