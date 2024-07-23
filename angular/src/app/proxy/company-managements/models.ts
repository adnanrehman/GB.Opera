
export interface AuditorDto {
  auditorID: number;
  companyID: number;
  title?: string;
  aTitle?: string;
  auditor?: string;
  aAuditor?: string;
  since?: string;
  till?: string;
  isActive?: boolean;
  gulfbaseUpdateDate?: string;
}

export interface BoardMemberDto {
  boardMemberID: number;
  companyID: number;
  title?: string;
  aTitle?: string;
  boardMember?: string;
  aBoardMember?: string;
  since?: string;
  till?: string;
  isActive?: boolean;
  gulfbaseUpdateDate?: string;
  customOrder?: number;
}

export interface BranchDto {
  branchID: number;
  companyID: number;
  branchName?: string;
  aBranchName?: string;
  city?: string;
  aCity?: string;
  streetAddress?: string;
  aStreetAddress?: string;
  website?: string;
  email?: string;
  poBox?: string;
  apoBox?: string;
  pinCode?: string;
  telex?: string;
  aTelex?: string;
  telephone?: string;
  cell?: string;
  fax?: string;
  openingDate?: string;
  description?: string;
  aDescription?: string;
  region?: string;
  aRegion?: string;
  creationDate?: string;
  isActive: boolean;
  gulfbaseUpdateDate?: string;
}

export interface CompanyFinancialOverviewDto {
  overviewID: number;
  companyID: number;
  listedDate?: string;
  employees?: number;
  initialCapital?: number;
  authorizedCapital?: number;
  subscribedCapital?: number;
  paidupCapital?: number;
  outstandingShares?: number;
  parValuePerShare?: number;
  treasuryStocks?: number;
  beta?: number;
  creationDate?: string;
  isActive: boolean;
  gulfbaseUpdateDate?: string;
}

export interface CompanyManagementDto {
  managements: ManagementDto[];
  seniorManagements: SeniorManagementDto[];
  boardMembers: BoardMemberDto[];
  auditors: AuditorDto[];
  branches: BranchDto[];
  companyFinancialOverviews: CompanyFinancialOverviewDto[];
  contactInformations: ContactInformationDto[];
  companyProjects: CompanyProjectDto[];
  projectStatuses: ProjectStatusDto[];
}

export interface CompanyProjectDto {
  projectID: number;
  companyID: number;
  projectStatusID: number;
  startDate?: string;
  endDate?: string;
  name?: string;
  aName?: string;
  description?: string;
  aDescription?: string;
  projectStatus?: string;
  active: boolean;
}

export interface ContactInformationDto {
  contactInfoID: number;
  companyID: number;
  branchName?: string;
  aBranchName?: string;
  city?: string;
  aCity?: string;
  streetAddress?: string;
  aStreetAddress?: string;
  website?: string;
  email?: string;
  poBox?: string;
  apoBox?: string;
  pinCode?: string;
  telex?: string;
  aTelex?: string;
  telephone?: string;
  cell?: string;
  fax?: string;
  creationDate?: string;
  isActive?: boolean;
  gulfbaseUpdateDate?: string;
}

export interface ManagementDto {
  managementID: number;
  companyID: number;
  chairman?: string;
  aChairman?: string;
  honoraryChairman?: string;
  aHonoraryChairman?: string;
  viceChairman?: string;
  aViceChairman?: string;
  president?: string;
  aPresident?: string;
  honoraryPresident?: string;
  aHonoraryPresident?: string;
  vicePresident?: string;
  aVicePresident?: string;
  managingDirector?: string;
  aManagingDirector?: string;
  deputyManagingDirector?: string;
  aDeputyManagingDirector?: string;
  generalManager?: string;
  aGeneralManager?: string;
  ceo?: string;
  aceo?: string;
  since?: string;
  till?: string;
  creationDate?: string;
  isActive: boolean;
  gulfbaseUpdateDate?: string;
}

export interface ProjectStatusDto {
  projectStatusID: number;
  projectStatus?: string;
  aProjectStatus?: string;
}

export interface SeniorManagementDto {
  seniorManagementID: number;
  companyID: number;
  title?: string;
  aTitle?: string;
  seniorManagement?: string;
  aSeniorManagement?: string;
  since?: string;
  till?: string;
  isActive?: boolean;
  gulfbaseUpdateDate?: string;
}
