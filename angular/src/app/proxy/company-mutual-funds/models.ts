
export interface CompanyMutualFundDto {
  mFundID: number;
  companyID?: number;
  name?: string;
  aName?: string;
  shortName?: string;
  aShortName?: string;
  manager?: string;
  aManager?: string;
  currencyID?: number;
  categoryID?: number;
  subCategoryID?: number;
  classificationID?: number;
  listingID?: number;
  managementFee?: number;
  managementFeeType?: string;
  aManagementFeeType?: string;
  feeDescription?: string;
  aFeeDescription?: string;
  dateOfInception?: string;
  priceAtInception?: number;
  minimumInitialSubscription?: number;
  additionalSubscription?: number;
  portfolioTypeID?: number;
  investmentManager?: string;
  aInvestmentManager?: string;
  administrator?: string;
  aAdministrator?: string;
  auditor?: string;
  aAuditor?: string;
  custodian?: string;
  aCustodian?: string;
  managementTeam?: string;
  aManagementTeam?: string;
  subscriptionDeadLine?: string;
  aSubscriptionDeadLine?: string;
  redemptionDeadLine?: string;
  aRedemptionDeadLine?: string;
  valuationDate?: string;
  aValuationDate?: string;
  announceOn?: string;
  aAnnounceOn?: string;
  riskID?: number;
  fundAssets?: number;
  fundBenchMark?: string;
  aFundBenchMark?: string;
  fundObjective?: string;
  aFundObjective?: string;
  investmentPolicy?: string;
  aInvestmentPolicy?: string;
  riskProfile?: string;
  aRiskProfile?: string;
  fundsBenefits?: string;
  aFundsBenefits?: string;
  fundsComponents?: string;
  aFundsComponents?: string;
  fundManagerComments?: string;
  aFundManagerComments?: string;
  unitPriceCalculation?: string;
  aUnitPriceCalculation?: string;
  benchmarkID?: number;
  city?: string;
  aCity?: string;
  streetAddress?: string;
  aStreetAddress?: string;
  website?: string;
  email?: string;
  poBox?: string;
  apoBox?: string;
  pinCode?: string;
  telex?: string;
  aTelex?: string;
  telephone?: string;
  cell?: string;
  fax?: string;
  searchTags?: string;
  aSearchTags?: string;
  pageDescription?: string;
  aPageDescription?: string;
  creationDate?: string;
  isActive?: boolean;
}

export interface GetCompanyMutualFundsDto {
  companyMutualFunds: CompanyMutualFundDto[];
  mFundGeoDiversPercents: MFundGeoDiversPercentDto[];
  mFundAssestAllocsPercents: MFundAssestAllocsPercentDto[];
  mFundMajorInvestPercents: MFundMajorInvestPercentDto[];
  mFundSectorDiversPercents: MFundSectorDiversPercentDto[];
}

export interface MFundAssestAllocsPercentDto {
  mFundAssestAllocsPercentID: number;
  mFundID: number;
  assetsAllocationID: number;
  value: number;
}

export interface MFundGeoDiversPercentDto {
  mFundGeoDiversPercentID: number;
  mFundID: number;
  geoDiversificationID: number;
  value: number;
}

export interface MFundMajorInvestPercentDto {
  mFundMajorInvestPercentID: number;
  mFundID: number;
  majorInvestmentID: number;
  value?: string;
}

export interface MFundSectorDiversPercentDto {
  mFundSectorDiversPercentID: number;
  mFundID: number;
  sectorDiversificationID: number;
  value: number;
}
