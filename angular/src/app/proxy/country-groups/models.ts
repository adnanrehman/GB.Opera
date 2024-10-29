import type { CapSizeDto, SectorDto } from '../commons/models';

export interface CountryGroupDto {
  countryGroupID: number;
  countryGroup?: string;
  aCountryGroup?: string;
  numberOfCountries?: number;
  formationDate?: string;
  overview?: string;
  aOverview?: string;
  description?: string;
  aDescription?: string;
  creationDate?: string;
  isActive: boolean;
}

export interface CountryGroupInputDto {
  countryGroups: CountryGroupDto[];
  sectors: SectorDto[];
  capSizes: CapSizeDto[];
  gbSectors: GBSectorDto[];
  gbCapSizes: GBSectorDto[];
}

export interface GBSectorDto {
  gbSectorID: number;
  sectorID: number;
  gbSector?: string;
  agbSector?: string;
  isCapSize: boolean;
  countryGroupID: number;
}

export interface InsertCountryGroupDto {
  countryGroup: CountryGroupDto;
  gbSectors: GBSectorDto[];
  gbCapSizes: GBSectorDto[];
}
