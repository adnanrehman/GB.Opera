
export interface CompanyFIPDto {
  fipid: number;
  companyID: number;
  permittedSharesToForeigners?: number;
  permittedSharesToGCCNationals?: number;
  permittedSharesToArabNationals?: number;
  permittedDate?: string;
  description?: string;
  aDescription?: string;
  creationDate?: string;
  isActive: boolean;
}

export interface CompanyOwnershipDto {
  subsidiaries: SubsidiaryDto[];
  subsCompUpds: SubsCompUpdDto[];
  sisterCompanies: SisterCompanyDto[];
  companyProducts: CompanyProductDto[];
  companyRawMaterials: CompanyRawMaterialDto[];
  companyFIPs: CompanyFIPDto[];
  miscNotes: MiscNotesDto[];
}

export interface CompanyProductDto {
  companyProductID: number;
  companyID: number;
  companyProduct?: string;
  aCompanyProduct?: string;
  launchDate?: string;
  lastProduct?: string;
  aLastProduct?: string;
  description?: string;
  aDescription?: string;
  creationDate?: string;
  isActive?: boolean;
}

export interface CompanyRawMaterialDto {
  rawMaterialID: number;
  companyID: number;
  rawMaterial?: string;
  aRawMaterial?: string;
  currentProvider?: string;
  aCurrentProvider?: string;
  lastProvider?: string;
  aLastProvider?: string;
  reason?: string;
  aReason?: string;
  description?: string;
  aDescription?: string;
  creationDate?: string;
  isActive?: boolean;
}

export interface MiscNotesDto {
  miscNotesID: number;
  companyID: number;
  date?: string;
  note?: string;
  aNote?: string;
  description?: string;
  aDescription?: string;
  creationDate?: string;
  isActive: boolean;
}

export interface SisterCompanyDto {
  sisterCompanyID: number;
  companyID: number;
  sisterCompany?: string;
  aSisterCompany?: string;
  relation?: string;
  aRelation?: string;
  description?: string;
  aDescription?: string;
  creationDate?: string;
  isActive: boolean;
}

export interface SubsCompUpdDto {
  subsCompUpdID: number;
  companyID: number;
  remarks?: string;
  aRemarks?: string;
  uploadDate?: string;
}

export interface SubsidiaryDto {
  subsidiaryID: number;
  companyID: number;
  country?: string;
  aCountry?: string;
  subsidiaryCompany?: string;
  aSubsidiaryCompany?: string;
  share?: string;
  principalActivity?: string;
  aPrincipalActivity?: string;
  customOrder?: number;
  companyTypeID?: number;
}
