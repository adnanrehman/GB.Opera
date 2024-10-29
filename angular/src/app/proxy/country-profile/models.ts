
export interface AssignSection {
  cpAdSectionID: number;
  cpSectionID: number;
  cpSectionTitle?: string;
  acpSectionTitle?: string;
  countryProfileID: number;
  creationDate?: string;
  isActive: boolean;
}

export interface CPSectionsFalse {
  grant: boolean;
  title?: string;
  aTitle?: string;
  cpSectionID: number;
  cpSectionName?: string;
  acpSectionName?: string;
  isDefault: boolean;
  creationDate?: string;
  isActive: boolean;
}

export interface CPsection {
  cpSectionID: number;
  cpSectionName?: string;
  acpSectionName?: string;
  isDefault: boolean;
  creationDate?: string;
  isActive: boolean;
}

export interface CountryProfileDto {
  assignSection: AssignSection[];
  countryProfiles: CountryProfiles[];
  cPsection: CPsection[];
  cpSectionsFalse: CPSectionsFalse[];
}

export interface CountryProfiles {
  countryProfileName?: string;
  aCountryProfileName?: string;
  countryProfileID: number;
}
