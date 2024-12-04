
export interface EODPrices {
  isActive: boolean;
  stockMarket?: string;
  stockMarketId: number;
  ticker?: string;
  priceID: number;
  openingPrice: number;
  highestPrice: number;
  lowestPrice: number;
  closingPrice: number;
  tradingVolume: number;
  tradingValue: number;
  trades: number;
  lastClosedPrice: number;
  lastUpdated?: string;
  companyID: number;
}

export interface FundPricesImportDto {
  temp?: string;
  id: number;
  company?: string;
  ticker?: string;
  stockMarket?: string;
  priceDate?: string;
  openingPrice?: number;
  highestPrice?: number;
  lowestPrice?: number;
  closingPrice?: number;
  tradingVolume?: number;
  tradingValue?: number;
  trades?: number;
}

export interface GCCSector {
  abbr?: string;
  stockMarketID: number;
  stockMarket?: string;
  country?: string;
  countryGroup?: string;
  aAbbr?: string;
  aStockMarket?: string;
  aCountryGroup?: string;
}
