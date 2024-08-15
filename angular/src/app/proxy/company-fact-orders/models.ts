
export interface CompanyFactOrderDto {
  companyFactOrdrID: number;
  companyID: number;
  gbFactIDOrder: number;
  factName?: string;
  customOrder: number;
  isActive: boolean;
  checkMe: boolean;
  isQuarterly: boolean;
  iRy?: boolean;
  iRq?: boolean;
}
