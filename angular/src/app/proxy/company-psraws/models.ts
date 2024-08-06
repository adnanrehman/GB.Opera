
export interface CompanyPSRawDto {
  compServiceID: number;
  companyID: number;
  productServiceRawID: number;
  parentID: number;
  serviceRange?: number;
  serviceStart?: string;
  description?: string;
  aDescription?: string;
  isActive: boolean;
}

export interface CompanyPSRawOutputDto {
  productServiceRawID: number;
  companyPSRaws: CompanyPSRawDto[];
}
