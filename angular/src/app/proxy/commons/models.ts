
export interface AnnouncementTypeDto {
  announcementTypeID: number;
  announcementType?: string;
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

export interface CurrencyDto {
  currencyID: number;
  currency?: string;
}

export interface GBIndustrialGroupDto {
  gbIndustrialGroupID: number;
  gbSectorID: number;
  gbIndustrialGroup?: string;
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

export interface MarketLangAnnouncementDto {
  stockMarketID: number;
  abbr?: string;
}

export interface MarketSectorDto {
  marketSectorID: number;
  sectorID: number;
  sector?: string;
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
