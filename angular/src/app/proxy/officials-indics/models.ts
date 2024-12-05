
export interface GlobalIndices {
  isActive: boolean;
  market?: string;
  globalIndexID: number;
  date?: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  lastUpdated?: string;
}

export interface GulfbasePrices {
  isActive: boolean;
  gulfbaseIndexID: number;
  stockMarket?: string;
  sector?: string;
  indexValue: number;
  lastUpdated?: string;
  previousValue: number;
  volume: number;
  isCapSize: boolean;
}

export interface ImportGlobalIndicesDto {
  stockMarket?: string;
  date?: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ImportOfficialIndicesDto {
  stockMarket?: string;
  sector?: string;
  date?: string;
  opening: number;
  highest: number;
  lowest: number;
  closing: number;
  volume: number;
  transactions: number;
  tradingValue: number;
  previousClose: number;
}

export interface MFundCompanies {
  companyID: number;
  company?: string;
  aCompany?: string;
  ticker?: string;
  aTicker?: string;
  stockMarketID: number;
  sectorID: number;
}

export interface MFundPrices {
  mFundPriceID: number;
  mFundID: number;
  priceDate?: string;
  closingPrice: number;
  tradingVolume: number;
  lastClosePrice: number;
  lastUpdated?: string;
  ticker?: string;
  mFund?: string;
  isActive: boolean;
}

export interface MFunds {
  mFundID: number;
  name?: string;
  aName?: string;
  shortName?: string;
  aShortName?: string;
}

export interface OfficialIndics {
  isActive: boolean;
  officialIndexID: number;
  stockMarket?: string;
  sector?: string;
  opening: number;
  closing: number;
  highest: number;
  lowest: number;
  volume: number;
  transactions: number;
  tradingValue: number;
  lastUpdated?: string;
  previousClose: number;
}
