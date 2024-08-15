import type { AssetsAllocationDto, BenchmarkDto, GeoDiversificationDto, MFCategoryDto, MFClassificationDto, MFListingDto, MFRiskDto, MFSubCategoryDto, MajorInvestmentDto, PortfolioTypeDto, SectorDiversificationDto } from '../commons/models';

export interface CompanyMutualFundSettingDropdownDto {
  assetsAllocations: AssetsAllocationDto[];
  benchmarks: BenchmarkDto[];
  mfCategories: MFCategoryDto[];
  mfClassifications: MFClassificationDto[];
  geoDiversifications: GeoDiversificationDto[];
  mfListings: MFListingDto[];
  majorInvestments: MajorInvestmentDto[];
  portfolioTypes: PortfolioTypeDto[];
  mfRisks: MFRiskDto[];
  sectorDiversifications: SectorDiversificationDto[];
  mfSubCategories: MFSubCategoryDto[];
}
