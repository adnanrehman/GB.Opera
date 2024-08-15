
export interface Company {
  companyID: number;
  ticker?: string;
  parentID: number;
  label?: string;
  children: Company[];
}

export interface LHRUpload {
  abbr?: string;
  stockMarketID: number;
  country?: string;
  countryGroup?: string;
}
