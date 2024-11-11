import type { CountryGroupDto } from '../country-groups/models';
import type { CountryDto } from '../commons/models';

export interface BankDto {
  bankID: number;
  countryProfileID: number;
  bank?: string;
  aBank?: string;
  city?: string;
  aCity?: string;
  address?: string;
  aAddress?: string;
  tel?: string;
  fax?: string;
  email?: string;
  webSite?: string;
  description?: string;
  aDescription?: string;
  creationDate?: string;
  isActive?: boolean;
}

export interface BrokerDto {
  brokerID: number;
  countryProfileID: number;
  broker?: string;
  aBroker?: string;
  city?: string;
  aCity?: string;
  address?: string;
  aAddress?: string;
  tel?: string;
  fax?: string;
  email?: string;
  webSite?: string;
  description?: string;
  aDescription?: string;
  creationDate?: string;
  isActive?: boolean;
}

export interface CountryInfoDto {
  countryID: number;
  countryGroupID: number;
  country?: string;
  aCountry?: string;
  abbr?: string;
  countryDescription?: string;
  aCountryDescription?: string;
  creationDate?: string;
  isActive: boolean;
  countryProfileID: number;
  countryProfileName?: string;
  aCountryProfileName?: string;
  econIndicatorName?: string;
  aEconIndicatorName?: string;
  description?: string;
  aDescription?: string;
}

export interface CountryInputDto {
  countryGroups: CountryGroupDto[];
  countries: CountryDto[];
  countryInfos: CountryInfoDto[];
  banks: BankDto[];
  brokers: BrokerDto[];
  economicIndicators: EconomicIndicatorDto[];
  economicIndicatorTypes: EconomicIndicatorTypeDto[];
  valueDeterminations: ValueDeterminationDto[];
}

export interface EconomicIndicatorDto {
  economicIndicatorID: number;
  economicIndicatorTypeID: number;
  countryProfileID: number;
  year: number;
  value: number;
  valueDeterminationID: number;
  description?: string;
  aDescription?: string;
  indicatorType?: string;
  valueIn?: string;
  creationDate?: string;
  isActive?: boolean;
}

export interface EconomicIndicatorTypeDto {
  economicIndicatorTypeID: number;
  economicIndicatorType?: string;
  creationDate?: string;
}

export interface ValueDeterminationDto {
  valueDeterminationID: number;
  valueDetermination?: string;
  creationDate?: string;
}
