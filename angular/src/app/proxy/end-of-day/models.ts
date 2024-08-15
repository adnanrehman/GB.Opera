
export interface EODPrices {
  isActive: boolean;
  stockMarket?: string;
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
