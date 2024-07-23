
export interface CompanyDto {
  companyID: number;
  company?: string;
  aCompany?: string;
  ticker?: string;
  aTicker?: string;
  stockMarketID: number;
  sectorID: number;
  capSizeID: number;
  gbSectorID: number;
  gbIndustrialGroupsID: number;
  gbIndustryID: number;
  internalCategoryID: number;
  overview?: string;
  aOverview?: string;
  businessActivity?: string;
  aBusinessActivity?: string;
  ownership?: string;
  aOwnership?: string;
  branches?: string;
  aBranches?: string;
  yearEnd?: string;
  mainCompany: boolean;
  hasFunds: boolean;
  activeIndices: boolean;
  financialCurrencyID: number;
  tradingMainCurrencyID: number;
  tradingSubCurrencyID: number;
  logo: number[];
  establishmentDate?: string;
  creationDate?: string;
  isActive: boolean;
  orderID: number;
  alternativeTicker?: string;
  stockTicker?: string;
  englishShortName?: string;
}
