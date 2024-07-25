import type { CompanyDto } from '../companies/models';

export interface AnnouncementTypeDto {
  announcementTypeID: number;
  announcementType?: string;
}

export interface AssetsAllocationDto {
  assetsAllocationID: number;
  assetsAllocation?: string;
  aAssetsAllocation?: string;
  isActive: boolean;
}

export interface BenchmarkDto {
  benchmarkID: number;
  benchmark?: string;
  aBenchmark?: string;
  isActive: boolean;
}

export interface CapSizeDto {
  capSizeID: number;
  capSize?: string;
}

export interface CompDropdownDto {
  marketSectors: MarketSectorDto[];
  internalCategories: InternalCategoryDto[];
  gbIndustrialGroups: GBIndustrialGroupDto[];
  sectors: SectorDto[];
  capSizes: CapSizeDto[];
  currencies: CurrencyDto[];
  industries: IndustryDto[];
  subCurrencies: SubCurrencyDto[];
}

export interface CompStockMarketDto {
  stockMarketID: number;
  country?: string;
  countryGroup?: string;
  abbr?: string;
}

export interface CompaniesTickerDto {
  companyID: number;
  ticker?: string;
  aTicker?: string;
  company?: string;
  aCompany?: string;
}

export interface CompanyWithHasFundDto {
  companies: CompanyDto[];
  assetsAllocations: AssetsAllocationDto[];
  geoDiversifications: GeoDiversificationDto[];
  sectorDiversifications: SectorDiversificationDto[];
  majorInvestments: MajorInvestmentDto[];
  benchmarks: BenchmarkDto[];
  portfolioTypes: PortfolioTypeDto[];
  mfListings: MFListingDto[];
  mfRisks: MFRiskDto[];
  mfClassifications: MFClassificationDto[];
  mfCategories: MFCategoryDto[];
  mfSubCategories: MFSubCategoryDto[];
}

export interface CurrencyDto {
  currencyID: number;
  currency?: string;
  aCurrency?: string;
  description?: string;
  aDescription?: string;
  creationDate?: string;
  isActive: boolean;
}

export interface GBIndustrialGroupDto {
  gbIndustrialGroupID: number;
  gbSectorID: number;
  gbIndustrialGroup?: string;
}

export interface GeoDiversificationDto {
  geoDiversificationID: number;
  geoDiversification?: string;
  aGeoDiversification?: string;
  isActive: boolean;
}

export interface IndustryDto {
  industryID: number;
  industry?: string;
}

export interface InternalCategoryDto {
  internalCategoryID: number;
  internalCategory?: string;
}

export interface LangAnnounceTypeDto {
  languageTypes: LanguageTypeDto[];
  announcementTypes: AnnouncementTypeDto[];
}

export interface LanguageTypeDto {
  languageTypeID: number;
  languageType?: string;
}

export interface MFCategoryDto {
  categoryID: number;
  category?: string;
  aCategory?: string;
  isActive: boolean;
}

export interface MFClassificationDto {
  classificationID: number;
  classification?: string;
  aClassification?: string;
  isActive: boolean;
}

export interface MFListingDto {
  listingID: number;
  listing?: string;
  aListing?: string;
  isActive: boolean;
}

export interface MFRiskDto {
  riskID: number;
  risk?: string;
  aRisk?: string;
  isActive: boolean;
}

export interface MFSubCategoryDto {
  subCategoryID: number;
  subCategory?: string;
  aSubCategory?: string;
  isActive: boolean;
}

export interface MajorInvestmentDto {
  majorInvestmentID: number;
  majorInvestment?: string;
  aMajorInvestment?: string;
  companyID?: number;
  stockMarketID?: number;
  isActive: boolean;
}

export interface MarketLangAnnouncementDto {
  stockMarketID: number;
  abbr?: string;
}

export interface MarketSectorDto {
  marketSectorID: number;
  sectorID: number;
  sector?: string;
}

export interface PortfolioTypeDto {
  portfolioTypeID: number;
  portfolioType?: string;
  aPortfolioType?: string;
  description?: string;
  aDescription?: string;
  creationDate?: string;
  isActive: boolean;
}

export interface SectorDiversificationDto {
  sectorDiversificationID: number;
  sectorDiversification?: string;
  aSectorDiversification?: string;
  sectorID?: number;
  stockMarketID?: number;
  isActive: boolean;
}

export interface SectorDto {
  sectorID: number;
  sector?: string;
  aSector?: string;
}

export interface StockMarketDto {
  stockMarketID: number;
  stockMarket?: string;
  aStockMarket?: string;
  abbr?: string;
  aAbbr?: string;
}

export interface SubCurrencyDto {
  subCurrencyID: number;
  currencyID: number;
  subCurrency?: string;
  isActive: boolean;
}
