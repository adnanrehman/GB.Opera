
export interface CompanyPSRawOutputDto {
  productServiceRawID: number;
  psrCompanyServices: PSRCompanyServiceDto[];
  psrCompanyProducts: PSRCompanyProductDto[];
  psrCompanyRawMaterials: PSRCompanyRawMaterialDto[];
}

export interface PSRCompanyProductDto {
  compProductID: number;
  companyID: number;
  productServiceRawID: number;
  parentID: number;
  capacityPerAnnum?: number;
  productionStart?: string;
  description?: string;
  aDescription?: string;
  isActive: boolean;
}

export interface PSRCompanyRawMaterialDto {
  compRawID: number;
  companyID: number;
  productServiceRawID: number;
  parentID: number;
  usePerAnnum?: number;
  description?: string;
  aSuppliers?: string;
  suppliers?: string;
  aDescription?: string;
  isActive: boolean;
}

export interface PSRCompanyServiceDto {
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
