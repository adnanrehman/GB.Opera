
export interface CountryFactOrderDto {
  countryFactOrdrID: number;
  countryID: number;
  esdFactIDOrder: number;
  factName?: string;
  customOrder: number;
  isActive: boolean;
  measurementUnit?: string;
  currency?: string;
}
