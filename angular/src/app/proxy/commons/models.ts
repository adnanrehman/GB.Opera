
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

export interface MarketSectorDto {
  marketSectorID: number;
  sectorID: number;
  sector?: string;
}

export interface SectorDto {
  sectorID: number;
  sector?: string;
}

export interface SubCurrencyDto {
  subCurrencyID: number;
  currencyID: number;
  subCurrency?: string;
  isActive: boolean;
}
