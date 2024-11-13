
export interface CapacitySizes {
  capSizeID: number;
  capSize?: string;
}

export interface Countriesdto {
  countryID?: number;
  country?: string;
  countryGroupID?: number;
  abbr?: string;
}

export interface CountryGroupsector {
  countryGroupID?: number;
  countryGroup?: string;
}

export interface Currencies {
  currencyID: number;
  currency?: string;
}

export interface GBMarketCaps {
  capSize?: string;
  gbMarketCapID: number;
  capSizeID: number;
  stockMarketID: number;
}

export interface InsertmarketsectorDto {
  stockMarketByID: StockMarketByID;
  marketsSector: MarketsSector[];
  marketCaps: MarketCaps[];
}

export interface MarketCaps {
  marketCapID: number;
  capSizeID: number;
  stockMarketID: number;
  capSize?: string;
}

export interface MarketSectorDto {
  countrygroup: CountryGroupsector[];
  country: Countriesdto[];
  capacitySize: CapacitySizes[];
  stockMarket: StockMarkets[];
  stockMarketById: StockMarketByID[];
  marketCap: MarketCaps[];
  gbMarketCap: GBMarketCaps[];
  sector: Sectors[];
  marketSectors: MarketsSector[];
  currency: Currencies[];
}

export interface MarketsSector {
  marketSectorID: number;
  sectorID: number;
  stockMarketID: number;
  sector?: string;
}

export interface Sectors {
  sectorID: number;
  sector?: string;
}

export interface StockMarketByID {
  stockMarketID?: number;
  countryID?: number;
  stockMarket?: string;
  aStockMarket?: string;
  abbr?: string;
  aAbbr?: string;
  indexName?: string;
  aIndexName?: string;
  description?: string;
  aDescription?: string;
  isActive?: boolean;
  financialCurrencyID?: number;
}

export interface StockMarkets {
  stockMarketID: number;
  stockMarket?: string;
}
