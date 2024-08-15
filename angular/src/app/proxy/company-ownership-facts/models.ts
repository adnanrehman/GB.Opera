
export interface CompanyOwnershipFactDto {
  gbOwnershipID: number;
  facts?: string;
  aFacts?: string;
  figures: number;
}

export interface CompanyOwnershipFactEditDto {
  gbOwnershipID: number;
  companyID: number;
  parentID: number;
  facts?: string;
  value: number;
}
