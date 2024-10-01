import type { PeriodTypeDto, QPeriodDto } from '../commons/models';

export interface NewFinancialReviewOutputDto {
  newReviewFinancials: NewReviewFinancialDto[];
  periodTypes: PeriodTypeDto[];
  qPeriods: QPeriodDto[];
  entryUsers: UserDto[];
  reEntryUsers: UserDto[];
  statuses: StatusDto[];
}

export interface NewReviewFinancialDto {
  newReviewFinancialID: number;
  financialsID: number;
  isAudited: boolean;
  isActive: boolean;
  asOfDate?: string;
  periodTypeID: number;
  year: number;
  qPeriod?: string;
  qPeriodID: number;
  isYearly?: boolean;
  entryUser?: number;
  reEntryUser?: number;
  statusID?: number;
  uploadedPath?: string;
  fileName?: string;
  secondaryUploadedPath?: string;
  secondaryFileName?: string;
  remarks?: string;
  aRemarks?: string;
  financialEntryTypeID?: number;
  periodNote?: string;
  aPeriodNote?: string;
}

export interface StatusDto {
  statusID: number;
  status?: string;
}

export interface UserDto {
  userID?: string;
  userName?: string;
  userType?: string;
}
