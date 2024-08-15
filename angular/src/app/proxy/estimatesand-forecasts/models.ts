
export interface EstimatesandForecastDto {
  efid: number;
  companyID: number;
  year: number;
  asofDate?: string;
  reportDate?: string;
  reportSourceID: number;
  remarks?: string;
  aRemarks?: string;
  revenue?: number;
  netProfit?: number;
  totalAssets?: number;
  totalLiabilities?: number;
  ownersEquity?: number;
  fairValue?: number;
  eps?: number;
  pe?: number;
  pb?: number;
  recommendation?: string;
  aRecommendation?: string;
}

export interface EstimatesandForecastOutputDto {
  estimatesandForecasts: EstimatesandForecastDto[];
  reportSources: ReportSourceDto[];
}

export interface ReportSourceDto {
  reportSourceID: number;
  source?: string;
}
