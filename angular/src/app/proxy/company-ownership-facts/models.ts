
export interface CompanyOwnershipFactDto {
  compOwnershipID: number;
  gbOwnershipID: number;
  facts?: string;
  aFacts?: string;
  figures: number;
}

export interface CompanyOwnershipFactEditDto {
  compOwnershipID?: number;
  gbOwnershipID: number;
  companyID: number;
  parentID: number;
  facts?: string;
  value: number;
}
